import express from 'express';
import DeliveryController from '../Controller/DeliveryController.js';
import validateSchema from '../Middleware/ValidateSchema.js';
import DeliveryYup from '../Utils/Validation/DeliveryYup.js';
import validateToken from '../Middleware/ValidateToken.js';

const router = express.Router();

// Route to handle adding a new delivery
router.post('/addDelivery', validateToken, validateSchema(DeliveryYup.addDelivery), DeliveryController.addDelivery);

// Route to handle updating a delivery by ID
router.put('/updateDelivery', validateToken, validateSchema(DeliveryYup.updateDelivery), DeliveryController.updateDelivery);

export default router;
