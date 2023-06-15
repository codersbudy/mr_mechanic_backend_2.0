import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
    id:{
      type:String,
      require:true,
    },
    customerName:{
      type:  String,
      require:true,
    },
    email:{        
       type: String,
    },
    contact:{
       type: Number,
       require:true,
    },
    password:{
        type:String,
        require:true,
    },  
    photo:{
        type:String,
    },
    tempraryPassword:{
        type:Number,
    },
});
export const Customer = mongoose.model("customer",customerSchema);