import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    if (!MONGO_URI) {
        console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Atlas connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};