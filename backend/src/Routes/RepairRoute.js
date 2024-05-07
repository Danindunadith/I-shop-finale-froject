import express from "express";
import DeliveryYup from "../Utils/Validation/DeliveryYup.js";
import RepairController from "../Controller/RepairController.js";
import validateSchema from "../Middleware/ValidateSchema.js";
import validateToken from "../Middleware/ValidateToken.js";

const route = express.Router();

route.get("/repairs", RepairController.getRepair);
route.post("/createrepair", RepairController.addRepair);
route.post("/updaterepair/", RepairController.updateRepair);
route.post("/deleterepair/", RepairController.deleteRepair);

export default route;
