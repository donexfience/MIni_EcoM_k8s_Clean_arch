import express, { Application } from "express";
import { Database } from "./config/MongoDB/connection";
import { errorHandler } from "donexfdz";
import productRoutes from "./router/productRouter";
import { ProductRepository } from "./repository/ProductRepository";
import { ProductService } from "./services/productservice";
import { ConsumerManager } from "./kafka/consumer/consumer_manager/consumer_manager";

class App {
  public app: Application;
  private port: number;
  private consumerManager!: ConsumerManager;
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddleware();
    this.initializeServices();
  }

  private initializeMiddleware() {
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(productRoutes);
    this.app.use(errorHandler);
  }
  private async initializeServices() {
    const brokers = ["localhost:9092"];
    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);
    this.consumerManager = new ConsumerManager(brokers, productService);
    try {
      await this.consumerManager.startConsumers();
      console.log("kakfa consumers started successfully");
    } catch (error) {
      console.log(error, "error starting consumer");
    }

    //db connection
    await Database.connect();
  }
  public async stopConsumers() {
    try {
      await this.consumerManager.stopConsumers();
      console.log("Kafka consumers stopped successfully.");
    } catch (error) {
      console.error("Error stopping consumers:", error);
    }
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`PRODUCT-SERVICE RUNNING ON PORT ${this.port}`);
    });
  }
}
export default App;
