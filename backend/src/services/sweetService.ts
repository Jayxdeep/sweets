import { Sweet } from "../models/sweet.model";
import { CreateSweetDTO } from "../types/sweets";
export const createSweet =async(data:CreateSweetDTO)=>{
    return await Sweet.create(data);
}