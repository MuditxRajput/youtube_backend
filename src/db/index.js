import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

// database is located in another country it take time so we have to use async operation.... and also use try and catch to 
// find the error in connection in database ... 
// await Mongoose.connect(`processs.env.url / `)
const connectDB =async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error ",error);
    }
    
}


export default connectDB;