import { injectable } from "inversify";
import { IAdressRepositroy } from "../../../../../application/interface/iAdress";
import { Address } from "../../../../../domain/entities/address/addressEntity";
import addressModel from "../../model/addressModel";
import userModel from "../../model/userModel";
@injectable()
export class AdressRepository implements IAdressRepositroy {
  private mapToAdressEntity(addressDoc: any): Address {
    return new Address(
      addressDoc.fullname,
      addressDoc.phone,
      addressDoc.address,
      addressDoc.city,
      addressDoc.pincode,
      addressDoc._id,
      addressDoc.userId
    );
  }
  async create(addreeData: Address): Promise<Address | null> {
    const address = new addressModel(addreeData);
    await address.save();
    const addressObject = address.toObject();
    return this.mapToAdressEntity(addressObject);
  }
  async delete(adressId: string): Promise<void> {
    await addressModel.findByIdAndDelete(adressId);
  }
}
