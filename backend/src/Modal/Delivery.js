import mongoose from "mongoose";
import Order from "./Order.js";
import { v4 as uuid } from "uuid";

const deliveryType = ['standard', 'express']
const deliverySchema = new mongoose.Schema(
    {
        order: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref:Order
        },
        trackingNumber: {
            type:String,
            default: uuid()
        },
        approvedBy: {
            type: String,
            reuired:true
        },
        shipped: {
            type: String,
            default:true
        },
        deliveryType: {
            type: String,
            lowercase: true,
            enum: deliveryType,
            default: 'standard'
        }
    },
    {
        versionKey: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;
