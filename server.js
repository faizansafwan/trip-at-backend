
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./routes/User.js";
import TravelPost from "./routes/TravelPost.js";
import Contact from "./routes/Contact.js";
import Budget from "./routes/Budget.js";
import Accomadation from "./routes/Accomadation.js";


const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://trip-at-frontend-o3es.vercel.app/'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/user', User);
app.use('/api/travel', TravelPost);
app.use('/api/contact', Contact);
app.use('/api/budget', Budget);
app.use('/api/accomadation', Accomadation);

app.get( '/', (req,res) => {
    res.send("Check get request");
});

dotenv.config();
const uri = process.env.ATLAS_URL;
mongoose.connect( uri, {});

const connection = mongoose.connection;
connection.once( "open", () => {
    console.log("MongoDB database connection established successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
