import User from "../Models/userModels.js"; 
import bcrypt from 'bcryptjs';
import jwtwebToken from '../utils/jwtwebToken.js'

export const userRegister = async(req,res)=>{
    try{
        const {fullname,username,email,gender,password,profilepic}= req.body;
        
        const user = await User.findOne({username,email});
        if(user) return res.status(500).send({sucess:false, message:"UserName or Email Already Exist "});
        const hashPassword = bcrypt.hashSync(password,10);
        const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            email,
            password:hashPassword,
            gender,
            profilepic: gender==="male" ? profileBoy : profileGirl
        })


        if(newUser){
            await newUser.save();
            jwtwebToken(newUser._id,res)
        }else{
            res.status(500).send({sucess: false,  message:"Invalid  User Data"});
        }
        res.status(201).send({
            _id: newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilepic:newUser.profilepic,
            email:username.email,
        })
    }
    catch(error){
           res.status(500).send({
              sucess:false,
              message:error
           })
           console.log(error);
    }
}

export const userLogin= async (req,res)=>{
    try{
         const {email , password} = req.body;
         const user = await User.findOne({email})
         if (!user) return res.status(500).send({ success: false, message: "Email Dosen't Exist Register" })
         const comparePasss = bcrypt.compareSync(password, user.password || "");
         if (!comparePasss) return res.status(500).send({ success: false, message: "Email Or Password dosen't Matching" })

            jwtwebToken(user._id, res);

            res.status(200).send({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                profilepic: user.profilepic,
                email:user.email,
                message: "Succesfully LogIn"
            })
    }  catch (error){
        res.status(500).send({
            sucess:false,
            message:error
         })
         console.log(error);
    }
}


export const userLogOut = async(req,res)=>{

    try{
       res.cookie("jwt", '',{
        maxAge:0
       })
       res.status(200).send({message:"user LogOut"})

    }catch(error){
        res.status(500).send({
            sucess:false,
            message:error
         })
         console.log(error);
    }
}