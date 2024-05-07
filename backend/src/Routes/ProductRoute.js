import express from 'express';
import validateSchema from '../Middleware/ValidateSchema.js';
import ProductYup from '../Utils/Validation/ProductYup.js';
import ProductController from '../Controller/ProductController.js';

const router = express.Router();

// Route to handle getting a product by ID
router.post('/getProduct', validateSchema(ProductYup.getProductSchema), ProductController.getProduct);
// Route to handle getting all products
router.get('/getAllProducts', ProductController.getAllProducts);
// Route to handle adding a new product
router.post('/addProduct', validateSchema(ProductYup.createProductSchema), ProductController.addProduct);


export default router;
