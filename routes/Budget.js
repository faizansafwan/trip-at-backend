import express from "express"
import { fetchBudgetByEmail, fetchBudgetById, postBudget } from "../controllers/Budget.js";
import { verifyToken } from '../middlewares/auth.js';


const router = express.Router();

router.post("/", verifyToken, postBudget);
router.get("/:email", verifyToken, fetchBudgetByEmail);
router.get("/find/:id", verifyToken, fetchBudgetById);


export default router;