import { inject, injectable } from "inversify";
import { ICreateAdressuseCase } from "../../../domain/useCase/adress/createAdress";
import { IAdressRepositroy } from "../../interface/iAdress";
import { Address } from "../../../domain/entities/address/addressEntity";
@injectable()
export class createAddressCase implements ICreateAdressuseCase {
  private addressRepository: IAdressRepositroy;
  constructor(
    @inject("IAdressRepository") addressRepository: IAdressRepositroy
  ) {
    this.addressRepository = addressRepository;
  }
  async execute(addressData: Address): Promise<Address | null> {
    return await this.addressRepository.create(addressData);
  }
}
