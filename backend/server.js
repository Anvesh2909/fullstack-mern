import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
const app = express();
connectDB();
connectCloudinary();
app.use(cors());
app.use(express.json());
//api endpoints
app.use('/api/admin', adminRouter);
app.listen(5000, () => {
    console.log("Server is running" + ` http://localhost:5000`);
})