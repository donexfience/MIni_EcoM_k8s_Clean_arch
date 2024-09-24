import mongoose, { Schema, Document, Types } from "mongoose";
interface IAddress extends Document {
  userId: Types.ObjectId;
  fullname: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}
const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const addressModel = mongoose.model<IAddress>("Address", addressSchema);
export default addressModel;
