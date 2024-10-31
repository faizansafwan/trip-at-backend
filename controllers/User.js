import bcrypt from 'bcrypt';
import User from "../models/User.js";

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