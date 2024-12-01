import Accomadation from "../models/accomadation.js";


export const postAccomadation = async (req, res) => {

    try {
        const {  name, address, phone, email, description, unit, price, rating, images } = req.body;

        if (!name || !address || !phone || !email || !description) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newAccomadation = new Accomadation({
            name, address, phone, email, description, unit, price, rating, images
        });

        const savedAccomadation = await newAccomadation.save();

        res.status(200).json({success: true, data: savedAccomadation});

    }
    catch (error) {
        res.status(500).json({ message: "Error Processing.", error: error.message });
    }
}

export const getAccomadation = async (req, res) => {
    try {
        const accomadation = await Accomadation.find();

        if(accomadation.length === 0) {
            return res.status(400).json({success: true, message: "No Accommadation Found"});
        }

        res.status(200).json({success: true, data: accomadation});
    }
    catch(error) {
        res.status(500).json({success: false, message: error.message });
    }
}