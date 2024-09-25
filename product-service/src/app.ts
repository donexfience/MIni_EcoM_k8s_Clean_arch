import express, { Application } from "express";
import { Database } from "./config/MongoDB/connection";
import { errorHandler } from "donexfdz";
import productRoutes from "./router/productRouter";

class App {
  public app: Application;
  private port: number;
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddleware();
    this.initializeServices();
  }
  private initializeMiddleware() {
    
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api", productRoutes);
    this.app.use(errorHandler);
  }
  private async initializeServices() {
    //db connection
    await Database.connect();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`PRODUCT-SERVICE RUNNING ON PORT ${this.port}`);
    });
  }
}
export default App;
