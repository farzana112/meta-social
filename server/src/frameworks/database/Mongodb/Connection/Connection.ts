import mongoose from 'mongoose';
import configKeys from "../../../../config"

    const connectDB = async () => {
    try {
        console.log(configKeys.PORT)
        if (!configKeys.MONGO_URI) {
        throw new Error('MongoDB connection URI not found in environment variables.');
        }

        const conn = await mongoose.connect(configKeys.MONGO_URI);
    

        console.log('\x1b[42m%s\x1b[0m',`MongoDB Connected: ${conn.connection.host}`);
    } catch (error:any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    };

export default connectDB;
