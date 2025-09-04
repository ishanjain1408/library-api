import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { permit } from '../middleware/role.js';
import { validate } from '../middleware/validate.js';   // ✅ named import
import { createBook, updateBook, deleteBook, listBooks } from '../controllers/book.controller.js';
import { createBookSchema, updateBookSchema, listQuerySchema } from '../validators/book.validator.js';

const router = Router();

// List books (authenticated users; change to Admin-only if you want to strictly follow spec)
router.get('/', auth, permit('Admin'), validate(listQuerySchema, 'query'), listBooks);

// Admin-only management
router.post('/', auth, permit('Admin'), validate(createBookSchema), createBook);
router.put('/:id', auth, permit('Admin'), validate(updateBookSchema), updateBook);
router.delete('/:id', auth, permit('Admin'), deleteBook);

export default router;
