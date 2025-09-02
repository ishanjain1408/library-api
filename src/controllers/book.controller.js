import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import Book from '../models/Book.js';

export const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ success: true, data: book });
});

export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!book) throw new ApiError(404, 'Book not found');
  res.json({ success: true, data: book });
});

export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  if (!book) throw new ApiError(404, 'Book not found');
  res.json({ success: true, data: { id: book._id } });
});

export const listBooks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, q = '' } = req.query;
  const filter = q
    ? { $or: [{ title: new RegExp(q, 'i') }, { author: new RegExp(q, 'i') }, { isbn: new RegExp(q, 'i') }] }
    : {};

  const [items, total] = await Promise.all([
    Book.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Book.countDocuments(filter)
  ]);

  res.json({ success: true, data: items, meta: { page: Number(page), limit: Number(limit), total } });
});
