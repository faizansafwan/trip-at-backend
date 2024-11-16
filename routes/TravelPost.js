import express from "express"
import { fetchPosts, postTravel } from "../controllers/TravelPost.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post('/', verifyToken, postTravel);
router.get('/', fetchPosts);

export default router;