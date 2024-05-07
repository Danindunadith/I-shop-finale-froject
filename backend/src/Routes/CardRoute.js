import express from "express";
import CardController from "../Controller/CardController.js";

const route = express.Router();

route.post("/cardcreate", CardController.cardcreate);

export default route;
