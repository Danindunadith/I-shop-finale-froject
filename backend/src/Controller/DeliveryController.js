import mongoose from "mongoose";
import Delivery from "../Modal/Delivery.js";
import Order from "../Modal/Order.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import Notification from "../Modal/Notification.js";

class DeliveryController {
    // Method to add a new delivery
    addDelivery = async (req, res) => {
        let session = null;
        try {
            const { oid, approvedBy } = req.body;

            // Start a MongoDB session
            session = await mongoose.startSession();
            session.startTransaction();

            // Check if the order exists
            const orderExist = await Order.findById(oid).session(session);
            if (!orderExist) {
                await session.abortTransaction();
                session.endSession();
                return response(res, 404, { message: "no order exists" });
            }

            // Update the order to mark it as shipped
            orderExist.shipped = true;
            await orderExist.save();

            // Create a new delivery object
            const newDelivery = new Delivery({ order: orderExist._id, approvedBy,trackingNumber:`TK${orderExist._id}` });

            // Save the new delivery to the database
            const savedDelivery = await newDelivery.save({ session: session });
            if (!savedDelivery) {
                await session.abortTransaction();
                session.endSession();
                return response(res, 403, { message: "error adding delivery" });
            }
            // Create a new notification object
            const noti = new Notification({
                description: `Your Order Placed For Delivery`,
                toEmail: orderExist.orderedBy,
                from: 'Delivery Manager'
            });
            // Save the new notification to the database
            const sendNoti = await noti.save({ session });
            if (!sendNoti) {
                throw new Error('Failed to save the notification');
            }
            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            return response(res, 200, { message: "delivery recorded" });
        } catch (error) {
            console.log(error);
            // Rollback the transaction if an error occurs
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            return response(res, 500, error);
        }
    }

    // Method to update a delivery by ID
    updateDelivery = async (req, res) => {
        const { oid, deliveryType } = req.body;
        try {
            const updatedDelivery = await Delivery.updateOne(
                { order: oid }, 
                { $set: { deliveryType: deliveryType } }
            );
            if (updatedDelivery.modifiedCount===0) return response(res, 404, {message:"delivery update error"});
            return response(res, 200, {message:"delivery updated success"});
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }
}

export default DeliveryController = new DeliveryController;
