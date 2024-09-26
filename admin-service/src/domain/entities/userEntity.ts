import { ObjectId } from "mongoose";

export interface UserEntity{
    _id?: ObjectId;
    name: String;
    email: String,
    password: String;
    isAdmin: boolean;
    isBlocked: boolean;
}