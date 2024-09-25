import mongoose, { Schema, Types } from "mongoose";

export interface ICartSchema extends Document {
  userId: Types.ObjectId;
  items: {
    productId: Types.ObjectId;
    quantity: Number;
  }[];
}
const cartSchema: Schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
export const cartModel = mongoose.model<ICartSchema>("carts", cartSchema);
