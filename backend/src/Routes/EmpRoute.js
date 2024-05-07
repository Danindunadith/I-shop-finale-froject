import express from 'express';
import EmpController from '../Controller/EmpController.js';
import validateSchema from '../Middleware/ValidateSchema.js';
import EmpYup from '../Utils/Validation/EmpYup.js';
import validateToken from '../Middleware/ValidateToken.js';

const router = express.Router();

// Route to handle adding a new employee
router.post('/addEmployee', validateToken, validateSchema(EmpYup.addEmployee), EmpController.addEmployee);

// Route to handle getting an employee by ID
router.post('/getEmployee', validateToken, validateSchema(EmpYup.getEmp), EmpController.getEmployee);

// Route to handle getting all employees
router.get('/getAllEmployees', validateToken, EmpController.getAllEmployees);

// Route to handle deleting an employee by ID
router.delete('/deleteEmployee', validateToken, validateSchema(EmpYup.dltEmp), EmpController.deleteEmployee);

// Route to handle updating an employee by ID
router.put('/updateEmployee', validateToken, validateSchema(EmpYup.updateEmployee), EmpController.updateEmployee);

export default router;
