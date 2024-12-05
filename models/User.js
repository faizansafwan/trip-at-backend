import mongoose from "mongoose";
import TravelPost from "./TravelPost.js";

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profilePicture: { type: String},
        lastLogin: {type: Date},
        registeredDate: {type: Date, default: Date.now()},
    }
);

userSchema.post("save", async function (doc, next) {

    try {
        // Check if profilePicture has changed
        if (this.isModified("profilePicture")) {
            // Update all travel posts where firstName and lastName match
            await TravelPost.updateMany(
                { firstName: doc.firstName, lastName: doc.lastName },
                { $set: { userProfile: doc.profilePicture } }
            );
        }
        next();
    }
    catch (error) {
        console.error("Error updating travel posts:", error.message);
        next(error);
    }
    
})

export default mongoose.model("User", userSchema);