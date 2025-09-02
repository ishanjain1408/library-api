import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
    borrowedAt: { type: Date, default: Date.now },
    dueAt: { type: Date, required: true },
    returnedAt: { type: Date, default: null },
    fee: { type: Number, default: 0 } // INR
  },
  { timestamps: true }
);

// Open/active loans index
loanSchema.index({ returnedAt: 1, dueAt: 1 });
loanSchema.index({ member: 1, returnedAt: 1 });

const Loan = mongoose.model('Loan', loanSchema);
export default Loan;
