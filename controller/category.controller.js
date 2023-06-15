import { request, response } from "express";
import { Category } from "../model/category.model.js";

export const saveCategory=async (request,response,next)=>{
    try{
     console.log("inner save function")
     let status=await Category.findOne({categoryName:request.body.categoryName})
     console.log(status)
    if(!status){
       let category= await Category.create({categoryName:request.body.categoryName})
        return response.status(200).json({category:category,status:true});
    }
    else 
       return response.status(401).json({message:"category already register"})
     
    }
    catch(err){
        return response.status(500).json({err:"internal server error",status:false})
    }
}

export const removeCategory= async (request,response,next)=>{
    Category.findByIdAndRemove({_id:request.body.id})
    .then(result=>{
        return response.status(200).json({result:result,status:true});
    })
    .catch(err=>{
        return response.status(500).json({message:"internal server error",status:false});
    })
}

export const categoryList=(request,response,next)=>{
    Category.find()
    .then(result=>{
        return response.status(200).json({result:result,status:true})
    })
    .catch(err=>{
         return response.status(500).json({message:"internal server error",status:false});
    })
}