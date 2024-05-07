import Notification from "../Modal/Notification.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../Utils/ResponseHandler/ResTypes.js";


class NotificationController {
    // Method to add a new notification
    addNotification = async (req, res) => {
        try {
            const { description, to, from, seen } = req.body;

            // Create a new notification object
            const newNotification = new Notification({
                description,
                to,
                from,
            });

            // Save the new notification to the database
            const savedNotification = await newNotification.save();
            if (savedNotification)
                return response(res, 200, ResTypes.successMessages.success);
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }
    //get notification
    getNotification = async (req, res) => {
        const { id } = req.body;
        try {
            const notification = await Notification.findOne({ id })
            if (!notification) return response(res, 404, ResTypes.errors.no_notification)
            return response(res, 200, { ...ResTypes.successMessages.success, notification });
        } catch (error) {
            console.log(error)
            return response(res, 500, error)
        }
    }
    //get notification for user
    getAllNotificationOfUser = async (req, res) => {
        const { id,email } = req.body;
        try {
            const notification = await Notification.find({ toEmail:email })
            if (!notification) return response(res, 404, ResTypes.errors.no_notification)
            return response(res, 200, { ...ResTypes.successMessages.success, notification });
        } catch (error) {
            console.log(error)
            return response(res, 500, error)
        }
    }
    // Get all notifications
    getAllNotifications = async (req, res) => {
        try {
            const notifications = await Notification.find({});
            return response(res, 200, { ...ResTypes.successMessages.success, notifications });
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }
    // Delete notification by ID
    deleteNotification = async (req, res) => {
        const { nid } = req.body;
        try {
            const deletedNotification = await Notification.findOneAndDelete({ _id:nid });
            if (!deletedNotification) return response(res, 404, ResTypes.errors.not_found);
            return response(res, 200, ResTypes.successMessages.success);
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }
    // Update notification by ID
    updateNotification = async (req, res) => {
        const { id, seen } = req.body;
        try {
            const notificationExist = await Notification.findOne({ _id:id });
            if (!notificationExist) return response(res, 404, ResTypes.errors.not_found);

            const result = await Notification.updateOne(
                { _id: id },
                { $set: { seen } }
            );
            if (result.modifiedCount === 0) return response(res, 403, ResTypes.errors.upadate_error);
            return response(res, 200, ResTypes.successMessages.upadted_success);
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }

}

export default NotificationController = new NotificationController()