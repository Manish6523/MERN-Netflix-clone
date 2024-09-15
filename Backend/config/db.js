import mongoose, { mongo } from "mongoose"
import { ENV_VARS } from "./envVars.js"

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("connected to mongoose successfully : "+ conn.connection.host)
    } catch (err) {
        console.error("error while connecting mongoose");
        process.exit(1);
    }
}