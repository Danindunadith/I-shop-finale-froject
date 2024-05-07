import express from "express";
import PaymentController from "../Controller/PaymentController.js";

const route = express.Router();

route.post("/pcreate", PaymentController.pcreate);
route.get("/pgetAll", PaymentController.pgetAll);
route.post("/pdelete", PaymentController.pdelete);
route.get("/pget/:id", PaymentController.pgetOne);
route.post("/pupdate/:id", PaymentController.pupdate);
export default route;