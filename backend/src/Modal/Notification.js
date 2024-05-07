import mongoose from "mongoose";


const notiSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        toEmail: {
            required: true,
            type: String,
        },
        from: {
            type: String,
            required: true,
        },
        seen: {
            type: Boolean,
            default:false
        }
    },
    {
        versionKey: '__v',
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);
const Notification = mongoose.model('Notification', notiSchema);
export default Notification;