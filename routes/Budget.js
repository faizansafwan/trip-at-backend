import express from "express"
import { deleteBudgetById, fetchBudgetByEmail, fetchBudgetById, postBudget, updateBudgetById } from "../controllers/Budget.js";
import { verifyToken } from '../middlewares/auth.js';


const router = express.Router();

router.post("/", verifyToken, postBudget);
router.get("/:email", verifyToken, fetchBudgetByEmail);
router.get("/find/:id", verifyToken, fetchBudgetById);
router.delete("/:id", verifyToken, deleteBudgetById);
router.put("/update/:id", verifyToken, updateBudgetById);


export default router;