import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config()
const DB_URL = process.env.MONGO_DB_URI
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
        
        mongoose.connection.on('disconnecting', () => {
            console.log('Database is now disconnecting!');
        });

        mongoose.connection.on('disconnected', async () => {
            console.log('Database is now disconnecting!');
            try {
                await mongoose.connect(DB_URL);
                console.log("Reconnected to MongoDB");
            } catch (error) {
                console.log("Error reconnecting to MongoDB", error.message);
            }
        });

    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

export default connectToMongoDB;
