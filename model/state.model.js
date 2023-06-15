import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
    stateName:String
});
export const State = mongoose.model("state",stateSchema);