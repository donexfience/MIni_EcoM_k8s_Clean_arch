import addressModel from "../../model/addressModel";

export const deleteAddres = async (id: string): Promise<void> => {
  try {
    await addressModel.findByIdAndDelete(id);
    return;
  } catch (error: any) {
    throw new Error("failed in address delete");
  }
};
