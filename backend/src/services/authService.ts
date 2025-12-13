import {User} from "../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const loginUser=async(data:{
    email:string;password:string
})=>{
    const {email,password}=data;
    const user=await User.findOne({email})
    if(!user || !user.password){
        throw new Error("Invalid Username or password")
    }
    const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error("Invalid credentials");
        }
        const token=jwt.sign(
            {
                userId:user._id,email:user.email
            },
            process.env.JWT_SECRET!,
            {expiresIn:"2hr"}
        );
        return {token}
    }
