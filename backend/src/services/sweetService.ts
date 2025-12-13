import { Sweet } from "../models/sweet.model";
import { CreateSweetDTO } from "../types/sweets";
export const createSweet =async(data:CreateSweetDTO)=>{
    return await Sweet.create(data);
}
export const getAllSweets=async()=>{
    return await Sweet.find();
}
export const searchSweetsByName=async(name:string)=>{
    return await Sweet.find({
        name: new RegExp(name, "i")
    })
}