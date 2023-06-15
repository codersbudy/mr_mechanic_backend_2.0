import mongoose from "mongoose";
const pincodeSchema = new mongoose.Schema({
    pincode :Number,
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city"
    }
});
export const Pincode = mongoose.model("pincode",pincodeSchema);