
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import TravelPost from "../models/TravelPost.js";

// Create new user
export const postUser = async (req,res) => {

    try {
        const { firstName, lastName, email, password, profilePicture} = req.body;

        const userExistance = await User.findOne({ email });

        if (userExistance) {
            return res.status(400).json({ success: false, message: "The email is already exist"});
        }

        const saltsRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltsRound);
        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            profilePicture,
        });

        await newUser.save();
        res.status(201).json({ success: true, data: newUser});
    } 
    catch (error) {
        res.status(500).json({ success: false, data: error.message });
    }
} 

export const getProfile = async (req, res) => {
    
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" }); // Return here to prevent further execution
        }

        return res.status(200).json({ success: true, data: user });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// update the user by the email
export const updateUser = async (req,res) => {
    try{
        const { email } = req.query;
        const { firstName, lastName, profilePicture } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ success: false, message: "User not found"});
        }

        let profilePictureChanged = false;

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (profilePicture) {
            profilePictureChanged = profilePicture !== user.profilePicture; // Check if it has changed
            user.profilePicture = profilePicture;
        }
        // if (password) {
        //     const saltsRound = 10;
        //     const hashedPassword = await bcrypt.hash(password, saltsRound);

        //     user.password = hashedPassword;
        // }

        if (profilePicture) user.profilePicture = profilePicture;

        const updateUser = await user.save();

        // Update travel posts if profile picture changes
        if (profilePictureChanged) {
            await TravelPost.updateMany(
                { firstName: updateUser.firstName, lastName: updateUser.lastName },
                { $set: { userProfile: updateUser.profilePicture } }
            );
        }

        res.status(200).json({ success: true, data: updateUser});  
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    
}


// User login
export const loginUser = async (req, res) => {

    const { email, password} = req.body;

    try {

        const findUser = await User.findOne({email});
        if (!findUser) {
            return res.status(400).json({ success: false, message: "User not found"});
        }

        const comparePassword = await bcrypt.compare(password, findUser.password);
        if (!comparePassword) {
            return res.status(400).json({ success: false, message: "Invalid Crediantials"});
        }

        const token = jwt.sign(
            { userId: findUser._id, email: findUser.email},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ success: true, message: "Login Successful", token });


    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
}


// delete user
export const deleteUser = async (req,res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ success: false, message: user});
        }

        res.status(200).json({ success: true, data: "User deleted successfully."});
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
}