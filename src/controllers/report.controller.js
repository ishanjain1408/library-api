import dayjs from 'dayjs';
import asyncHandler from '../utils/asyncHandler.js';
import Loan from '../models/Loan.js';
import User from '../models/User.js';

const FEE_PER_DAY = 10;

export const memberReport = asyncHandler(async (req, res) => {
  // reuse myLoans logic via aggregation to compute pending fees accurately at query time
  const loans = await Loan.find({ member: req.user._id })
    .populate('book', 'title author isbn')
    .sort({ createdAt: -1 });

  const now = dayjs();
  const pendingFees = loans
    .filter(l => !l.returnedAt && now.isAfter(dayjs(l.dueAt)))
    .reduce((sum, l) => {
      const lateDays = Math.max(0, now.startOf('day').diff(dayjs(l.dueAt).startOf('day'), 'day'));
      return sum + lateDays * FEE_PER_DAY;
    }, 0);

  res.json({ success: true, data: { loans, pendingFees } });
});

export const adminReport = asyncHandler(async (_req, res) => {
  // For each open loan, compute accrued fees to date
  const now = dayjs();

  const loans = await Loan.find().populate('member', 'name email').populate('book', 'title author isbn');

  const rows = loans.map(l => {
    const accrued =
      l.returnedAt
        ? l.fee
        : Math.max(0, now.startOf('day').diff(dayjs(l.dueAt).startOf('day'), 'day')) * FEE_PER_DAY;
    return {
      member: l.member,
      book: l.book,
      borrowedAt: l.borrowedAt,
      dueAt: l.dueAt,
      returnedAt: l.returnedAt,
      feeRecorded: l.fee,
      feeAccrued: accrued
    };
  });

  // Group pending fees by member
  const pendingByMember = {};
  rows.forEach(r => {
    if (!r.returnedAt) {
      const key = r.member._id.toString();
      pendingByMember[key] = (pendingByMember[key] || 0) + r.feeAccrued;
    }
  });

  // Shape admin view
  const pendingSummary = await Promise.all(
    Object.entries(pendingByMember).map(async ([memberId, amount]) => {
      const user = await User.findById(memberId).select('name email');
      return { member: user, pendingFees: amount };
    })
  );

  res.json({
    success: true,
    data: {
      loans: rows,
      pendingSummary
    }
  });
});
