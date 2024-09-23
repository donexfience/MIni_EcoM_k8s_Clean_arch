import mongoose, { Schema, Document } from "mongoose";
interface Iuser extends Document {
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  gender: string;
  Username: string;
  refreshToken?:string
}
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },  // Add this if not already defined
  username: { type: String, required: false },
  refreshToken: { type: String, default: null }
});


const userModel = mongoose.model<Iuser>("User", userSchema);
export default userModel;
