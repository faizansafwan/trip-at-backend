
import express from 'express';
import { deleteUser, loginUser, postUser, updateUser } from '../controllers/User.js';

const router = express.Router();

router.post( '/', postUser);
router.post( '/login', loginUser);
router.put('/update', updateUser);
router.delete('/:id', deleteUser);

export default router;