import { Request,Response } from "express";
import { createSweet } from "../services/sweetService";
import { getAllSweets } from "../services/sweetService";
import { searchSweetsByName } from "../services/sweetService";
import { deleteSweetById } from "../services/sweetService";
import { updateSweetById } from "../services/sweetService";
import { purchaseSweetById } from "../services/sweetService";
import mongoose, { mongo } from "mongoose";
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
export const searchSweetsController=async(req:Request,res:Response)=>{
    try{
        const {name}=req.query
        if(!name){
            return res.status(400).json({meassage:"Search name is required"});
        }
        const sweets=await searchSweetsByName(name as string)
        return res.status(200).json(sweets)
    }catch(error){
        return res.status(500).json({message:"Search failed"})
    }
}
export const updateSweetController=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const updatedSweet=await updateSweetById(id,req.body)
        if(!updatedSweet){
            return res.status(400).json({message:"Search not found"})
        }
        return res.status(200).json(updatedSweet);
    }catch(error){
        return res.status(400).json({message:"Failed to update sweet"})
    }
}
export const deleteSweetController=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid sweet id"})
        }
        const deletedSweet=await deleteSweetById(id);
        if(!deletedSweet){
            return res.status(404).json({message:"Sweet not found"});
        }
        return res.status(200).json({message:"Sweet Deleted"})
    }catch(error){
        return res.status(400).json({message:"Failed to delete sweet"})
    }
}
export const purchaseSweetController=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid sweet id"});
        }
        const updatedSweet=await purchaseSweetById(id);
        if(!updatedSweet){
            return res.status(400).json({message:"Sweet is out of stock or not found"})
        }
        return res.status(200).json(updatedSweet);
    }catch{
        return res.status(500).json({message:"Failed to purchase sweet"})
    }
}