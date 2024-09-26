import mongoose, { Document, mongo } from "mongoose";

export interface IProductSchema extends Document {
  title: string;
  stock: number;
  description: string;
  image: string;
  price: number;
  isBlocked: boolean;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
export const ProductModel = mongoose.model<IProductSchema>(
  "products",
  productSchema
);
