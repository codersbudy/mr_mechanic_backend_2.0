import Jwt from "jsonwebtoken"

export const verifyToken=(request,response,next)=>{
    let token=request.headers.authorization;
    try{
         if(!token)
             throw new Error();
             
         Jwt.verify(token,"ccooddeerrHHuubb");
         next();
    }
    catch(err){
        return response.status(401).json({err:"Unauthorized request...",status:false});
    }
}

export default Jwt;
