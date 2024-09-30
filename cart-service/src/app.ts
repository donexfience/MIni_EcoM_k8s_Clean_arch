import { UserRepository } from "./repository/userRepository";
import express, { Application } from "express";
import { Database } from "./config/MongoDB/connection";
import { errorHandler } from "donexfdz";
import cartRoutes from "./router/cartRoutes";
import { Userservice } from "./services/user-service";
import { ConsumerManager } from "./kafka/consumer/consumer_manager/consumer_manager";
import { ProductRepository } from "./repository/productRepository";
import { Productservice } from "./services/product-service";

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
    this.app.use(errorHandler);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cartRoutes);
    // Error Handling Middleware
    // this.app.use(ErrorMiddleware.handleError);
  }

  private async initializeServices() {
    // Database connection
    await Database.connect();

    // Initialize Kafka consumer
    const brokers = ["localhost:9092"];
    const userRepository = new UserRepository();
    const productRepository = new ProductRepository();
    const productService = new Productservice(productRepository);
    const userService = new Userservice(userRepository);

    this.consumerManager = new ConsumerManager(
      brokers,
      userService,
      productService
    );
    try {
      await this.consumerManager.startConsumers();
      console.log("Kafka consumers started successfully.");
    } catch (error) {
      console.error("Error starting consumers:", error);
    }
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
      console.log(`CART-SERVICE RUNNING ON PORT ${this.port}`);
    });
  }
}
export default App;
