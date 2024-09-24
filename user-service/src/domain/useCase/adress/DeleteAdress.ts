export interface IDeleteAdressUsecase {
  execute(addressId: string): Promise<void>;
}
