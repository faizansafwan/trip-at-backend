import express from "express"
import { fetchBudget, postBudget } from "../controllers/Budget.js"

const router = express.Router();

router.post("/", postBudget);
router.get("/", fetchBudget);

export default router;