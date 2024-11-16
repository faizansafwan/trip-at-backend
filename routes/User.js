
import express from 'express';
import { deleteUser, getProfile, loginUser, postUser, updateUser } from '../controllers/User.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post( '/', postUser);
router.post( '/login', loginUser);
router.get('/profile', verifyToken, getProfile);
router.put('/update', verifyToken,updateUser);
router.delete('/:id', verifyToken,deleteUser);

export default router;