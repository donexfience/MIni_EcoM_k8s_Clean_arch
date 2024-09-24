import { Types } from "mongoose";

export class Address {
  constructor(
    public fullname: string,
    public phone: string,
    public address: string,
    public city: string,
    public pincode: string,
    public _id: Types.ObjectId,
    public userId: Types.ObjectId
  ) {}
  public static fromJson(obj: Record<string, unknown>): Address {
    const { fullname, phone, address, city, pincode, _id, userId } = obj;
    return new Address(
      fullname as string,
      phone as string,
      address as string,
      city as string,
      pincode as string,
      _id as Types.ObjectId,
      userId as Types.ObjectId
    );
  }
}
