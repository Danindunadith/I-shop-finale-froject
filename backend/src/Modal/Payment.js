import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    reportName:{
        type: String,
        required: true
    },
    reportType:{
        type: String,
        required: true
    },

    date:{
        type: String,
        required: true
    },

    for:{
        type: String,
        required: true
    },

    amount:{
        type: String,
        required: true
    }
   
    
    
})

export default mongoose.model("Payment",paymentSchema);