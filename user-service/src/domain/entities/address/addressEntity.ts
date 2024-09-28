import { Types } from "mongoose";

export interface AddressEntity{
    _id?: Types.ObjectId;
    userId: Types.ObjectId,
    fullname: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
}