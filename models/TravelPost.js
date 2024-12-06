import mongoose from "mongoose";

const travelSchema = new mongoose.Schema(
    {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userProfile: {type: String, required: true},
    location: {type: String, required: true},
    dateVisited: {type: Date, required: true},
    ratePlace: {type: Number},
    positiveDesc: {type: String},
    negativeDesc: {type: String},
    images: [ {type: String} ],
    additionalInfo: {type: String, required: true},
    registeredDate: {type: Date, default: Date.now()},
    }
);

export default mongoose.model("Travel", travelSchema);