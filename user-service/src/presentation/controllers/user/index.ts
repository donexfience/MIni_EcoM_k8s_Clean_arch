import currentUserController from "./currentUserController";
import updateUserController from "./updateUserController";

export default (dependencie: any) => {
    return{
        updateUserController:updateUserController(dependencie),
        currentUserController:currentUserController(dependencie)
    }
};
