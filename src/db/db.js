import mongoose from "mongoose";

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=> console.log("database connection established")
    ).catch((err)=> console.log(err)
    )
}

export default connectDB;