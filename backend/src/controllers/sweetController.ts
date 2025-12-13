import { Request,Response } from "express";
import { createSweet } from "../services/sweetService";
export const createSweetController =async(req:Request,res:Response)=>{
try{
    const sweet=await createSweet(req.body);
    return res.status(201).json(sweet);
}catch(error:any){
    return res.status(400).json({message:error.message})
}
}