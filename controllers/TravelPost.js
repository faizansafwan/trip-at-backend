import TravelPost from "../models/TravelPost.js";

export const postTravel = async (req, res) => {

    try {
        const travelDataArray = req.body;

        if (!Array.isArray(travelDataArray)) {
            return res.status(400).json({ success: false, message: "Input should be an array of travel posts" });
        }
        
        // Insert multiple travel posts at once
        const newPosts = await TravelPost.insertMany(travelDataArray);

        res.status(200).json({ success: true, data: newPosts });
          
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const fetchPosts = async (req, res) => {
    try {
        const travels = await TravelPost.find();

        res.status(200).json({success: true, data: travels });
    }
    catch(error) {
        res.status(500).json({success: false, message: error.message});
    }
}