import bcrypt from 'bcrypt';
import User from "../models/User.js";

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

// update the user by the email
export const updateUser = async (req,res) => {
    try{
        const { email } = req.query;
        const { firstName, lastName, password, profilePicture } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ success: false, message: "User not found"});
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (password) {
            const saltsRound = 10;
            const hashedPassword = await bcrypt.hash(password, saltsRound);

            user.password = hashedPassword;
        }

        if (profilePicture) user.profiePicture = profilePicture;

        const updateUser = await user.save();

        res.status(200).json({ success: true, data: updateUser});  
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message});
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

        res.status(200).json({ success: true, message: "Login Successful" });


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