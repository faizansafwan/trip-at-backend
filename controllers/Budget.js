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

export const fetchBudgetByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        // Validate email presence
        if (!email) {
            return res.status(400).json({ error: 'Email parameter is required.' });
        }

        const budgets = await Budget.find({email}); // Fetch all budgets

        if (budgets.length === 0) {
            return res.status(404).json({ message: 'No budgets found for the provided email.' });
        }

        res.status(200).json({ success: true, data: budgets });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching budgets.", error: error.message });
    }
}

export const fetchBudgetById = async (req, res) => {
    try {

        const { id } = req.params;

        // Validate email presence
        if (!id) {
            return res.status(400).json({ error: 'Id parameter is required.' });
        }
        
        const budgets = await Budget.findById(id); // Fetch all budgets
        if (!budgets) {
            return res.status(404).json({ message: 'Budget not found.' });
        }

        res.status(200).json({ success: true, data: budgets });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching budgets.", error: error.message });
    }
}

export const deleteBudgetById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID presence
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required.' });
        }

        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return res.status(404).json({ message: 'Budget not found.' });
        }

        res.status(200).json({ success: true, message: 'Budget successfully deleted.', data: deletedBudget });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting budget.', error: error.message });
    }
};

export const updateBudgetById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID presence
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required.' });
        }

        // Validate request body
        const { budgetName, start, destination, startDate, endDate, unit, contents, cost } = req.body;

        if ( !budgetName || !start || !destination || !startDate || !endDate || !unit || !contents || !cost) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Find and update the budget
        const updatedBudget = await Budget.findByIdAndUpdate(
            id,
            { budgetName, start, destination, startDate, endDate, unit, contents, cost },
            { new: true, runValidators: true } // Return the updated document and validate the data
        );

        if (!updatedBudget) {
            return res.status(404).json({ message: 'Budget not found.' });
        }

        res.status(200).json({ success: true, message: 'Budget successfully updated.', data: updatedBudget });
    } catch (error) {
        res.status(500).json({ message: 'Error updating budget.', error: error.message });
    }
};




