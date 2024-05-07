import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ccategory: {
    type: String,
    required: true,
  },
  cbrand: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  
});

export default mongoose.model("Coupon", couponSchema);
