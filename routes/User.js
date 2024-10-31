
import express from 'express';
import { loginUser, postUser } from '../controllers/User.js';

const router = express.Router();

router.post( '/', postUser);
router.post( '/login', loginUser);

export default router;