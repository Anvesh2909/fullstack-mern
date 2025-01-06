import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"All fields are required"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"});
        }
        if(password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {name,email,password:hashedPassword};
        const newUser = await userModel.create(userData);
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
        res.json({success:true,token});
    }catch (e) {
        console.log(e);
        res.json({success:false,message:e.message});
    }
}
const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
        res.json({success:true,token});
    }catch (e) {
        console.log(e);
    }
}
export {registerUser,loginUser};