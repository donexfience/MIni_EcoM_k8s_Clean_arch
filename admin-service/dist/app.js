"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./presentation/routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./presentation/routes/productRoutes"));
const consumer_1 = require("./infrastructure/kafka/consumer/consumer");
const userUpdateConsumer_1 = require("./infrastructure/kafka/consumer/consumers/userUpdateConsumer");
const userCreatedConsumer_1 = require("./infrastructure/kafka/consumer/consumers/userCreatedConsumer");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.status(200).json({
        message: "working",
    });
});
//image uploads
app.use("/api/images", express_1.default.static(path_1.default.join(__dirname, "..", "public", "uploads")));
app.use(userRoutes_1.default);
app.use(productRoutes_1.default);
app.all("*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}));
// app.use(errorHandler);
const topics = [
    "user-updated",
    "user-created",
];
(0, consumer_1.startConsumer)(topics, {
    "user-updated": userUpdateConsumer_1.userUpdateConsumer,
    "user-created": userCreatedConsumer_1.userCreateConsumer,
})
    .then(() => console.log("Kafka consumer started successfully"))
    .catch((error) => console.error("Error starting Kafka consumer:", error));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, consumer_1.stopConsumer)();
    process.exit(0);
}));
const port = Number(process.env.PORT) || 3005;
app.listen(port, () => {
    console.log(`Admin Service listening at ${port}`);
});
exports.default = app;
