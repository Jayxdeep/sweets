import mongoose, { Schema, Document } from "mongoose";
export interface SweetDocument extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
}
const SweetSchema = new Schema<SweetDocument>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);
export const Sweet = mongoose.model<SweetDocument>("Sweet", SweetSchema);