import { Router } from "express";
import { ProductRepository } from "../repository/ProductRepository";
import { ProductService } from "../services/productservice";
import { ProductController } from "../controller/product-controller";

const router = Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get("/product/:id", (req, res) =>
  productController.getProductById(req, res)
);
router.get("/products", (req, res) =>
  productController.getAllProduct(req, res)
);

export default router;
