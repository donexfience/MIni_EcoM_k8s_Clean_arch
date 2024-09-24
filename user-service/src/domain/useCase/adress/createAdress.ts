import { Address } from "../../entities/address/addressEntity";

export interface ICreateAdressuseCase {
  execute(addressData: Address): Promise<Address | null>;
}
