import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://mrjayeshmuley:dGnipD9qVye018Bi@cluster0.swi4qrf.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}
