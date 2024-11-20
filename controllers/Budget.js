import Budget from "../models/Budget.js";

export const postBudget = async (req, res) => {
    try {
        const { email, budgetName, start, destination, startDate, endDate, unit, contents, cost } = req.body;

        // Validate request body (optional additional validation can be added)
        if (!email || !budgetName || !start || !destination || !startDate || !endDate || !unit || !contents || !cost) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBudget = new Budget({
            email, 
            budgetName, 
            start, 
            destination, 
            startDate, 
            endDate, 
            unit, 
            contents, 
            cost
        });
        
        const savedBudget = await newBudget.save();

        res.status(200).json({ success: true, data: savedBudget });

    }  
    catch (error) {
        res.status(500).json({ message: "Error creating budget.", error: error.message });
    }
}

export const fetchBudget = async (req, res) => {
    try {
        const budgets = await Budget.find(); // Fetch all budgets

        res.status(200).json({
            message: "Budgets fetched successfully.",
            data: budgets,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching budgets.", error: error.message });
    }
}