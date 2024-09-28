import addAdressController from "./addAdressController";
import deleteAdressController from "./deleteAdressController";
export default (dependencies: any) => {
  try {
    return {
      addAddressController: addAdressController(dependencies), 
      deleteAddressController: deleteAdressController(dependencies), 
    };
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
