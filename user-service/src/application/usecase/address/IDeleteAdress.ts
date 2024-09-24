import { inject } from "inversify";
import { IDeleteAdressUsecase } from "../../../domain/useCase/adress/DeleteAdress";
import { IAdressRepositroy } from "../../interface/iAdress";

export class DeleteAdressUseCase implements IDeleteAdressUsecase {
  private addressRepository: IAdressRepositroy;
  constructor(
    @inject("IAdressRepository") addressRepository: IAdressRepositroy
  ) {
    this.addressRepository = addressRepository;
  }
  async execute(addressId: string): Promise<void> {
    await this.addressRepository.delete(addressId);
  }
}
