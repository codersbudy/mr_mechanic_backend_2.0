import mongoose from "mongoose";
const mechanicSchema = new mongoose.Schema({
    mechanicName: String,
    contact: Number,
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop"
    },
    status: String,
});
export const Mechanic = mongoose.model("mechanic", mechanicSchema);