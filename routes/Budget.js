import express from "express"
import {  fetchBudget, fetchBudgetByEmail, postBudget } from "../controllers/Budget.js";
import { verifyToken } from '../middlewares/auth.js';


const router = express.Router();

router.post("/", verifyToken, postBudget);
router.get("/:email", verifyToken, fetchBudgetByEmail);
router.get("/", verifyToken, fetchBudget);


export default router;