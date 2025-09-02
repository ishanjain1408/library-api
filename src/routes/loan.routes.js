import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { permit } from '../middleware/role.js';
import { validate } from '../middleware/validate.js';
import { borrowBook, returnBook, myLoans } from '../controllers/loan.controller.js';
import { borrowParamsSchema, returnParamsSchema } from '../validators/loan.validator.js';

const router = Router();

// Member-only
router.post('/borrow/:bookId', auth, permit('Member', 'Admin'), validate(borrowParamsSchema, 'params'), borrowBook);
router.post('/return/:loanId', auth, permit('Member', 'Admin'), validate(returnParamsSchema, 'params'), returnBook);
router.get('/me', auth, permit('Member', 'Admin'), myLoans);

export default router;
