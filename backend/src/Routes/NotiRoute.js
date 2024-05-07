import express from 'express';
import NotificationController from '../Controller/NotiController.js';
import validateSchema from '../Middleware/ValidateSchema.js';
import NotiYup from '../Utils/Validation/NotiYup.js';
import validateToken from '../Middleware/ValidateToken.js';

const router = express.Router();

// Route to handle getting a notification by ID
router.post('/getNotification', validateToken ,validateSchema(NotiYup.getNotification) , NotificationController.getNotification);

router.post('/getAllNotificationOfUser',validateToken,validateSchema(NotiYup.getAllNotificationOfUser),NotificationController.getAllNotificationOfUser)

router.post('/addNotification',validateToken ,validateSchema(NotiYup.createNotificationSchema) ,NotificationController.getNotification);

// Route to handle getting all notifications
router.get('/getNotifications', NotificationController.getAllNotifications);

// Route to handle updating a notification by ID
router.put('/update', validateToken ,validateSchema(NotiYup.updateNotificationSchema) ,NotificationController.updateNotification);

// Route to handle deleting a notification by ID
router.delete('/delete', validateToken ,validateSchema(NotiYup.dltNotification) ,NotificationController.deleteNotification);

export default router;