
import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shop"
  },
  location: {
    type: String,
    require: true,

  },
  vehicleNo: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  },
  vehicleName: {
    type: String,
    require: true,
  },
  status: String,
  mechanicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mechanic"
  },
  problem: String,
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  latLong: String

});
export const Booking= mongoose.model("booking", bookingSchema);
