import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    cardtype: {
        type: String,
        required: true
    },
    cardno: {
        type: String,
        required: true
    },
    cardmouth: {
        type: String,
        required: true
    },
    cardyear: {
        type: String,
        required: true
    },
    cardcvv: {
        type: String,
        required: true
    }
});

export default mongoose.model("Card", cardSchema);
