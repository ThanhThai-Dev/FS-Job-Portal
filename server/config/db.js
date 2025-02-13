import mongoose from "mongoose";

// Function to connect MongoDb database
const connectDB = async() => {
    mongoose.connection.on('connected', () => console.log('Database Connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/job-b2t`)
}

export default connectDB;