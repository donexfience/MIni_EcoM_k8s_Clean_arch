import mongoose, { Schema, Document } from "mongoose";
interface Iuser extends Document {
  name: String;
  email: String;
  password: String;
  isAdmin: boolean;
  isBlocked: boolean;
}
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<Iuser>("User", userSchema);
export default userModel;
