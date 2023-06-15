import {State} from "../model/state.model.js" 
import {City} from "../model/city.model.js" 
import {Pincode} from "../model/pincode.model.js" 

export const searchCity=async (request,response,next)=>{
    try{
    let find=await State.findOne({
            stateName:request.body.stateName
    })
    if(find){
        let findAll=await City.find({
                stateId:find.id
        })
        return response.status(200).json({result:findAll,status:true});
    }
    return response.status(401).json({message:"bad request",status:false});
}
catch(err){
    return response.status(500).json({err:"internal server error",status:false})
  }
}

export const searchPincode=async (request,response,next)=>{
    try{
    let find=await City.findOne({
            cityName:request.body.cityName
    })
    if(find){
        let findAll=await Pincode.find({
                cityName:find.cityName
        })
        return response.status(200).json({result:findAll,status:true});
    }
    return response.status(401).json({message:"bad request",status:false});
}
catch(err){
    console.log(err);
    return response.status(500).json({err:"internal server error",status:false})
}
}

