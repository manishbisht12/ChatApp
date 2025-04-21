import jwt from 'jsonwebtoken'
import User from '../Models/userModels.js'

const isLogin = (req,res,next) =>{
    try{
         const token = req.cookies.jwt;

         if(!token) return res.status(500).send({ sucess: false, message: "User Unauthorize"})
         const decode= jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return res.status(500).send({sucess:false, message:"User Unauthorize - Invalid Token"})
        const user = User.findById(decode.userId).select("-password");
        req.user = user,
        next()
        
    }catch(error){
        console.log(`error in isLogin middleware ${error.message}`);
        res.status(500).send({
            sucess: false,
            message:error
        })
    }
}

export default isLogin; 