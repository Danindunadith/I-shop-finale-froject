import express from 'express';
import validateSchema from '../Middleware/ValidateSchema.js';
import validateToken from '../Middleware/ValidateToken.js';
import OrderController from '../Controller/OrderController.js';
import OrderYup from '../Utils/Validation/OrderYup.js';

const router = express.Router();

// Route to handle getting an order by ID
router.post('/getOrder', validateToken, validateSchema(OrderYup.getOrderSchema), OrderController.getOrder);

// Route to handle adding a new order
router.post('/addOrder', validateToken, validateSchema(OrderYup.createOrderSchema), OrderController.addOrder);

// Route to handle getting all orders
router.get('/getOrders', OrderController.getAllOrders);

// Route to handle deleting an order by ID
router.delete('/deleteOrder', validateToken, validateSchema(OrderYup.deleteOrder), OrderController.deleteOrder);

export default router;
