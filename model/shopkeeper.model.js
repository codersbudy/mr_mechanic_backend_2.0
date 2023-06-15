import mongoose from "mongoose";

const shopkeeperSchema = new mongoose.Schema({
    shopkeeperName: String,
    email: String,
    contact: Number,
    password: String,
    photo: String,
    tempraryPassword: Number,
});
export const Shopkeeper = mongoose.model("shopkeeper", shopkeeperSchema);