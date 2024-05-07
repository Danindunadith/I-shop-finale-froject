import yup from 'yup';

class NotificationYup {
    createNotificationSchema = yup.object({
        description: yup.string().required(),
        to: yup.string().required(),
        from: yup.string().required(),
        seen: yup.boolean().required(),
    });

    updateNotificationSchema = yup.object({
        description: yup.string(),
        to: yup.string(),
        from: yup.string(),
        seen: yup.boolean(),
    });
    getNotification = yup.object({
        id: yup.string().required(),
    })
    getAllNotificationOfUser = yup.object({
        email: yup.string().email().required(),
    })
    dltNotification = yup.object({
        nid: yup.string(),
    })
}

export default NotificationYup = new NotificationYup();
