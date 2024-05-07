import express from "express";
import FeedbackController from "../Controller/FeedbackController.js";

const route = express.Router();

route.post("/fcreate", FeedbackController.fcreate);
route.get("/fgetAll", FeedbackController.fgetAll);
route.post("/fdelete", FeedbackController.fdelete);
route.get("/fgetOne/:id", FeedbackController.fgetOne);
route.put("/fupdate/:id", FeedbackController.fupdate);
export default route;