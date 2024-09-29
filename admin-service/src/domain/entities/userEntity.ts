import { ObjectId } from "mongoose";

export interface UserEntity{
    userId?: string;
    name: String;
    email: String,
    password: String;
    isAdmin: boolean;
    isBlocked: boolean;
}