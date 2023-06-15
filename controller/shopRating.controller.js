import { ShopRating } from "../model/shopRating.model.js";

export const ratinglist = (request, response, next) => {
    ShopRating.find()
        .then(result => {
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error" });
        })
}

export const ratingsave = (request, response, next) => {
    ShopRating.create()
        .then(result => {
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error" });
        })
}

export const bulkSaveRating=(request,response,next)=>{
    ShopRating.insertMany(request.body.shopRating)
     .then((result)=>{
        return response.status(200).json({result:result,status:true})
     })
     .catch((err)=>{
        return response.status(500).json({error:"internal server error",status:false})
     })
}

export const getMechanicRating=(request,response,next)=>{
    ShopRating.find({mechanicId:request.body.mechanicId},"rating")

    .then((result)=>{
        console.log(result);
        return response.status(200).json({rating:result,status:false})
    })
    .catch((err)=>{
        return response.status(500).json({err:"internal server ",status:false})
    })
}