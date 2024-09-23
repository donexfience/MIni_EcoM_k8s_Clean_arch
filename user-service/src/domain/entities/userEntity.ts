import { Types } from "mongoose";

export class User {
  constructor(
    public name: string,
    public password: string,
    public isAdmin: boolean,
    public isBlocked: boolean,
    public _id?: Types.ObjectId
  ) {}
}
