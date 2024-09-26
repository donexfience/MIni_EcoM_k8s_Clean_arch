import getaAllusercontroller from "./getaAllusercontroller";
import getUserController from "./getUserController";
import unblockUserController from "./unblockUserController";
import blockUserController from "./blockUserController";
export default (dependencie: any) => {
  return {
    getAllusrController: getaAllusercontroller(dependencie),
    getUserController: getUserController(dependencie),
    unblockUserController: unblockUserController(dependencie),
    blockUserController: blockUserController(dependencie),
  };
};
