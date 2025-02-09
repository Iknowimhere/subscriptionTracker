import {DB_URI, NODE_ENV} from '../config/env.js';
import mongoose from 'mongoose';


if(!DB_URI){
    throw new Error('Mongo URI is missing');
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB connected on ${NODE_ENV} mode`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;