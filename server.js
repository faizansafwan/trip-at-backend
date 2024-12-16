
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./routes/User.js";
import TravelPost from "./routes/TravelPost.js";
import Contact from "./routes/Contact.js";
import Budget from "./routes/Budget.js";
import Accomadation from "./routes/Accomadation.js";
dotenv.config();

const app = express();

// const allowedOrigins = ['http://localhost:3000', 'https://trip-at-one.vercel.app/'];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true, // Required to allow cookies/auth headers
//     optionsSuccessStatus: 200, // For legacy browsers (IE11, various SmartTVs) that choke on 204

// }));

app.use(cors({
    origin: '*', // Allow requests from all origins
}));

// Handle preflight requests for all routes
// app.options('*', cors({
//     origin: allowedOrigins,
//     credentials: true
// }));

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


const uri = process.env.ATLAS_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB database connection established successfully"))
.catch((error) => console.error("Error connecting to MongoDB:", error));


const connection = mongoose.connection;
connection.once( "open", () => {
    console.log("MongoDB database connection established successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
