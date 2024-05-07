import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderedBy: {
            required: true,
            type:String,
        },
        product: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        cardNumber: {
            required: true,
            type: Number
        },
        cardName: {
            required: true,
            type: String
        },
        cvc: {
            required: true,
            type: Number
        },
        homeAddress: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        telephone: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            enum: ['srilanka', 'usa', 'uk', 'india'],
            required: true,
        },
        city: {
            type: String,
            enum: ['kurunegala', 'colombo', 'kandy'],
            required: true,
        },
        shipped: {
            type: String,
            default:false
        },
    },
    {
        versionKey: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
