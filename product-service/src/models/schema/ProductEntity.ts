import { Types } from "mongoose";

export class Product {
  constructor(
    public title: string,
    public stock: number,
    public description: string,
    public image: string,
    public price: number,
    public isBlocked: boolean,
    public userId: string,
    _id: Types.ObjectId
  ) {}
  public static fromJson(obj: Record<string, unknown>): Product {
    const { title, stock, image, price, userId, description, _id, isBlocked } =
      obj;
    return new Product(
      title as string,
      stock as number,
      description as string,
      image as string,
      price as number,
      isBlocked as boolean,
      userId as string,
      _id as Types.ObjectId
    );
  }
}
