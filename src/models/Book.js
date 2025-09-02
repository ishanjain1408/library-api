import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    author: { type: String, required: true, trim: true, index: true },
    isbn: { type: String, required: true, unique: true, trim: true, index: true },
    copiesAvailable: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

// Helpful index for listing by availability
bookSchema.index({ copiesAvailable: 1 });

const Book = mongoose.model('Book', bookSchema);
export default Book;
