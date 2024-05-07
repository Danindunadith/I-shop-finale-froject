import express from "express";
import StockController from "../Controller/StockController.js";

const route = express.Router();

route.post("/create", StockController.create);
route.get("/getAll", StockController.getAll);
route.post("/get", StockController.getOne);
route.post("/delete", StockController.delete);
route.post("/update", StockController.update);

export default route;











