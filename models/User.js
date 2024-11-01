import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profiePicture: { type: String},
        lastLogin: {type: Date},
        registeredDate: {type: Date, default: Date.now()},
    }
);

export default mongoose.model("User", userSchema);