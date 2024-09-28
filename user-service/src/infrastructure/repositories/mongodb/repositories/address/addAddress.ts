import { AddressEntity } from "./../../../../../domain/entities/address/addressEntity";

import addressModel from "../../model/addressModel";

export const addAddress = async (
  data: AddressEntity,
  id: string
): Promise<AddressEntity | null> => {
  try {
    const addressData = {
      ...data,
      userId: id,
    };
    const createdAddress = await addressModel.create(addressData);
    if (!createdAddress) {
      return null;
    }
    return createdAddress as AddressEntity;
  } catch (error: any) {
    throw new Error(`${error} error addd address`);
  }
};
