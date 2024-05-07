import express from "express";
import CouponController from "../Controller/CouponController.js";

const route = express.Router();


route.post("/ccreate", CouponController.ccreate);
route.get("/cgetAll", CouponController.cgetAll);
route.post("/cget", CouponController .cgetOne);
route.post("/cupdate", CouponController.cupdate);
route.post("/cdelete", CouponController.cdelete);





export default route;