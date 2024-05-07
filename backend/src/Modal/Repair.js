import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
  rid: String,
  cid: String,
  status: String,
  estDate: String,
  deviceType: String,
  model: String,
  cDscrptn: String,
  tDscrptn: String,
  invoice: String,
  sDate: Date,
});

const Repair = mongoose.model("Repair", repairSchema);
export default Repair;
