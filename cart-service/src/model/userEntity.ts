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
  public static fromJson(obj: Record<string, unknown>): User {
    const { name, email, password, isAdmin, isBlocked, _id } = obj;
    return new User(
      name as string,
      email as string,
      password as string,
      isAdmin as boolean,
      isBlocked as boolean,
      _id as Types.ObjectId
    );
  }
}
