import mongoose from "mongoose";
const citySchema = new mongoose.Schema({
    cityName:String,
    stateId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "state"
    }

});
export const City = mongoose.model("city",citySchema);
