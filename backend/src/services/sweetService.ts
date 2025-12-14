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
export const purchaseSweetById = async (id: string) => { //to prevent the negative stock when 2 users are clicked on same time 
  return await Sweet.findOneAndUpdate(
    { _id: id, quantity: { $gt: 0 } },
    { $inc: { quantity: -1 } },
    { new: true }
  );
};
