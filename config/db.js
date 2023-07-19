const moongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const connectDB= async ()=>{
    try {
        const conn= await moongoose.connect(process.env.MONGO_DB_URI)
        console.log("MongoDB Connected"+conn);
    } catch (error) {
        console.log(error);
        process.exit()
    }
}
module.exports= connectDB