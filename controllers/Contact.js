// controllers/contactController.js
import Contact from "../models/contact.js";

// Controller to handle POST request for creating a new contact
export const createContact = async (req, res) => {
    try {
        // Get data from the request body
        const { name, email, message } = req.body;

        // Create a new contact
        const newContact = new Contact({
            name,
            email,
            message
        });

        // Save the contact to the database
        await newContact.save();

        // Respond with a success message
        res.status(201).json({ message: "Contact created successfully", contact: newContact });
    } catch (error) {
        // Respond with an error message if something goes wrong
        res.status(500).json({ message: "Failed to create contact", error: error.message });
    }
};
