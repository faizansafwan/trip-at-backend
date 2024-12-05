import mongoose from "mongoose";

const accomadationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    unit: {type: String},
    price: {type: Number},
    images: [ {type: String, required: true} ],
    datePosted: { type: Date, default: Date.now() },  
});

export default mongoose.model("Accomadation", accomadationSchema);