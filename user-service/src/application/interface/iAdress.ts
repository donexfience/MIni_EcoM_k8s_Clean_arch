import { Address } from "../../domain/entities/address/addressEntity";

export interface IAdressRepositroy {
  create(addreeData: Address): Promise<Address | null>;
  delete(adressId: string): Promise<void>;
}
