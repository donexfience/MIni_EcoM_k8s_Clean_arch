import { Types } from "mongoose";

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public isAdmin: boolean = false,
    public isBlocked: boolean = false,
    public _id?: Types.ObjectId
  ) {}
}
