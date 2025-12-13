import { Request,Response } from "express";
import { createSweet } from "../services/sweetService";
import { getAllSweets } from "../services/sweetService";
import { Sweet } from "../models/sweet.model";
export const createSweetController =async(req:Request,res:Response)=>{
try{
    const {name,category,price,quantity}=req.body;
    if(!name||!category||!price||!quantity){
        return res.status(400).json({message:"All fields are required"})
    }
    if(price<=0||quantity<0){
        return res.status(400).json({message:"Invalid price or quantity"})
    }
    const sweet=await createSweet({
        name,
        category,
        price ,
        quantity
    })
     return res.status(201).json(sweet);
}catch(error:any){
    return res.status(400).json({message:error.message})
}
}
export const getAllSweetsController=async(req:Request,res:Response)=>{
    try{
        const sweets=await getAllSweets();
        return res.status(200).json(sweets);
    }catch(error){
        return res.status(500).json({message:"Failed to fetch sweets"})
    }
}