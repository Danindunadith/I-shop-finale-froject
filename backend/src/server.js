import Express from "express";
const app = Express();
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import db from "./db.js";
import corsConfig from "./Config/CorsConfig.js";

const PORT = process.env.PORT || 3500;

app.use(cors(corsConfig));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

// import routes
import AuthRoute from "./Routes/AuthRoute.js";
import ProductRoute from "./Routes/ProductRoute.js";
import OrderRoute from "./Routes/OrderRoute.js";
import NotiRoute from "./Routes/NotiRoute.js";
import EmpRoute from "./Routes/EmpRoute.js";
import DeliveryRoute from "./Routes/DeliveryRoute.js";
import StockRoute from "./Routes/StockRoute.js";
import CouponRoute from "./Routes/CouponRoute.js";
import PaymentRoute from "./Routes/PaymentRoute.js";
import FeedbackRoute from "./Routes/FeedbackRoute.js";
import RepairRoute from "./Routes/RepairRoute.js";
import CardRoute from "./Routes/CardRoute.js";

// routes definition starts here
app.get("/", (req, res) => {
  return response(res, 200, "Server Online");
});
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/order", OrderRoute);
app.use("/api/v1/notification", NotiRoute);
app.use("/api/v1/employee", EmpRoute);
app.use("/api/v1/delivery", DeliveryRoute);
app.use("/api/v1/stock", StockRoute);
app.use("/api/v1/coupon", CouponRoute);
app.use("/api/v1/payment", PaymentRoute);
app.use("/api/v1/feedback", FeedbackRoute);
app.use("/api/v1/repair", RepairRoute);
app.use("/api/v1/card",CardRoute);


//db connction
db();

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
