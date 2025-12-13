import bcrypt from "bcrypt";
import {User}from "../models/user.model";
import { RegisterUserDTO } from "../types/user";
export const registerUser=async(data:RegisterUserDTO)=>{
    const {email,password}=data;
    if(!email ||!password){
        throw new Error("Email and password required");
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        throw new Error("User alreday exists");
    }
    const hashedPassword=await bcrypt.hash(data.password,10)//10 rounds hash
    const newUser=await User.create({
        email:data.email,
        password:hashedPassword
    })
    return newUser
}