import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    email:{
        type:String,require:true, unique:true
    },
    password:{
        type:String,require:true
    },
    role:{
        type:String,
        enums:["ADMIN","USER"],
        default:"USER",
    }
})
export const User=mongoose.model("User",userSchema);