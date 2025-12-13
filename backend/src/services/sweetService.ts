import { Sweet } from "../models/sweet.model";
export const createSweet =async(data:any)=>{
    const sweet=await Sweet.create(data);
    return sweet;
}