import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    fdate:{
        type: String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    
    frating:{
        type: String,
        required: true
    },
    
    ffeedback:{
        type: String,
        required: true
    },
    
})


export default mongoose.model("New_feedback", feedbackSchema);
