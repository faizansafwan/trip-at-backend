// routes/contactRoutes.js
import express from "express";
import { createContact } from "../controllers/Contact.js";


const router = express.Router();

// POST route for creating a new contact
router.post("/", createContact);

export default router;
