import mongoose from "mongoose";


const budgetSchema = new mongoose.Schema(
    {
        email: { type: String, required: true},
        budgetName: { type: String, required: true },
        start: { type: String, required: true },
        destination: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        unit: { type: String, required: true },
        contents: [{type: String, required: true}],
        cost: [{ type: Number, required: true }]
    }
);

export default mongoose.model( "budget", budgetSchema);