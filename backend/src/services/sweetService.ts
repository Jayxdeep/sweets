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
export const updateSweetById=async(id:string,updates:Partial<CreateSweetDTO>)=>{
    return await Sweet.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true }
    )
}
export const deleteSweetById=async(id:String)=>{
    return await Sweet.findByIdAndDelete(id);
}
export const purchaseSweetById =async(id:string)=>{
    const sweet=await Sweet.findById(id);
    if(!sweet){
        return null;
    }
    if(sweet.quantity<0){
        throw new Error("Out of stock");
    }
    sweet.quantity-=1;
    await sweet.save();
    return sweet;
}