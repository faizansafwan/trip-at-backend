import express from 'express';
import { getAccomadation, postAccomadation } from '../controllers/Accomadation.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', verifyToken, postAccomadation);
router.get('/', getAccomadation);

export default router;