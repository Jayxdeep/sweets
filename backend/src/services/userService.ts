import bcrypt from "bcrypt";
import {User}from "../models/user.model";
export const registerUser=async(data:any)=>{
    const hashedPassword=await bcrypt.hash(data.password,10)//10 rounds hash
    const newUser=await User.create({
        email:data.email,
        password:hashedPassword
    })
    return newUser
}