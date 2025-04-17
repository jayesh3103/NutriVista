import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://madhavmenon2022:eTA4uQAqC9670nsA@cluster0.1fcpxq6.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}