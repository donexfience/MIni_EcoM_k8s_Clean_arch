import createProductController from "./createProductController"
import getAllProductController from "./getAllProductController"
import getProductController from "./getProductController"
import updateProductController from "./updateProductController"

export default (dependencie: any) => {
    return {
        createProductController: createProductController(dependencie),
        updateProductController: updateProductController(dependencie),
        getAllProductController: getAllProductController(dependencie),
        getProductController: getProductController(dependencie)
    }
}