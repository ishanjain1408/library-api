import dayjs from 'dayjs';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import Book from '../models/Book.js';
import Loan from '../models/Loan.js';

const BORROW_DAYS = 14;
const FEE_PER_DAY = 10; // INR

// Borrow a book (Member only)
export const borrowBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  // Atomically decrement copies only if available
  const book = await Book.findOneAndUpdate(
    { _id: bookId, copiesAvailable: { $gt: 0 } },
    { $inc: { copiesAvailable: -1 } },
    { new: true }
  );
  if (!book) throw new ApiError(400, 'No copies available for this book');

  const now = dayjs();
  const due = now.add(BORROW_DAYS, 'day');

  const loan = await Loan.create({
    member: req.user._id,
    book: book._id,
    borrowedAt: now.toDate(),
    dueAt: due.toDate()
  });

  res.status(201).json({ success: true, data: loan });
});

// Return a book (Member only)
export const returnBook = asyncHandler(async (req, res) => {
  const { loanId } = req.params;

  const loan = await Loan.findById(loanId);
  if (!loan) throw new ApiError(404, 'Loan not found');
  if (String(loan.member) !== String(req.user._id) && req.user.role !== 'Admin') {
    throw new ApiError(403, 'You can only return your own loans');
  }
  if (loan.returnedAt) throw new ApiError(400, 'Book already returned');

  const now = dayjs();
  const lateDays = Math.max(0, now.startOf('day').diff(dayjs(loan.dueAt).startOf('day'), 'day'));
  const fee = lateDays * FEE_PER_DAY;

  loan.returnedAt = now.toDate();
  loan.fee = fee;
  await loan.save();

  await Book.findByIdAndUpdate(loan.book, { $inc: { copiesAvailable: 1 } });

  res.json({ success: true, data: loan });
});

// List my loans (Member)
export const myLoans = asyncHandler(async (req, res) => {
  const status = (req.query.status || 'all').toLowerCase(); // active|returned|all
  const filter = { member: req.user._id };
  if (status === 'active') filter.returnedAt = null;
  if (status === 'returned') filter.returnedAt = { $ne: null };

  const loans = await Loan.find(filter).populate('book', 'title author isbn').sort({ createdAt: -1 });
  const pendingFees = loans.filter(l => !l.returnedAt && dayjs().isAfter(dayjs(l.dueAt))).reduce((sum, l) => {
    const lateDays = Math.max(0, dayjs().startOf('day').diff(dayjs(l.dueAt).startOf('day'), 'day'));
    return sum + lateDays * FEE_PER_DAY;
  }, 0);

  res.json({ success: true, data: loans, meta: { pendingFees } });
});
