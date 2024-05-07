import Delivery from "../Modal/Delivery.js";
import Notification from "../Modal/Notification.js";
import Order from "../Modal/Order.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../Utils/ResponseHandler/ResTypes.js";
import mongoose from "mongoose";

class OrderController {
    // Method to add a new order
    addOrder = async (req, res) => {
        let session = null;
        try {
            // Start a MongoDB session
            session = await mongoose.startSession();
            session.startTransaction();
            const { orderedBy, product, cardNumber, cardName, cvc, homeAddress, postalCode, street, telephone, country, city, } = req.body;
            // Create a new order object
            const newOrder = new Order({
                orderedBy,
                product,
                cardNumber,
                cardName,
                cvc,
                homeAddress,
                postalCode,
                street,
                telephone,
                country,
                city,
            })
            // Save the new order to the database
            const savedOrder = await newOrder.save({ session });
            if (!savedOrder) {
                throw new Error('Failed to save the order');
            }
            // Create a new notification object
            const noti = new Notification({
                description: `Your Order Have Being Placed Successfully`,
                toEmail: orderedBy,
                from: 'Admin'
            });
            // Save the new notification to the database
            const sendNoti = await noti.save({ session });
            if (!sendNoti) {
                throw new Error('Failed to save the notification');
            }
            // Commit the transaction
            await session.commitTransaction();
            session.endSession();
            return response(res, 200, ResTypes.successMessages.order_placed);
        } catch (error) {
            // Rollback the transaction if an error occurs
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            console.error('Error adding order:', error);
            return response(res, 500, error.message || 'Internal Server Error');
        }
    }

    // Get order by ID
    getOrder = async (req, res) => {
        const { id } = req.body;
        try {
            const order = await Order.findById(id).populate();
            if (!order) return response(res, 404, ResTypes.errors.no_order);
            return response(res, 200, { ...ResTypes.successMessages.success, order });
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }

    // Get all orders
    getAllOrders = async (req, res) => {
        try {
            const orders = await Order.find({}).populate(["orderedBy", "product"]);
            if (orders)
                return response(res, 200, { orders });
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }

    // Delete order by ID
    deleteOrder = async (req, res) => {
        let session = null;
        const { oid } = req.body;
        try {
            session = await mongoose.startSession();
            session.startTransaction();
            const deletedOrder = await Order.findByIdAndDelete(oid).session(session);
            if (!deletedOrder) {
                await session.abortTransaction();
                session.endSession();
                return response(res, 404, ResTypes.errors.not_found);
            }

            // Delete the corresponding delivery
            // const deletedDelivery = await Delivery.findOneAndDelete({ order: oid }).session(session);
            // if (!deletedDelivery) {
            //     await session.abortTransaction();
            //     session.endSession();
            //     return response(res, 404, ResTypes.errors.not_found);
            // }

            // Create and save a notification about the order deletion
            const notification = new Notification({
                description: `Your order with TK${deletedOrder._id} has been rejected Delivery Manager`,
                toEmail: deletedOrder.orderedBy,
                from: 'Dilivery Manager'
            });
            await notification.save({ session });
            await session.commitTransaction();
            session.endSession();
            return response(res, 200, ResTypes.successMessages.success);
        } catch (error) {
            console.log(error);
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            return response(res, 500, error);
        }
    }
}

export default OrderController = new OrderController();