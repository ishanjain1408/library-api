import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { permit } from '../middleware/role.js';
import { memberReport, adminReport } from '../controllers/report.controller.js';

const router = Router();

router.get('/me', auth, permit('Member', 'Admin'), memberReport);
router.get('/admin', auth, permit('Admin'), adminReport);

export default router;
