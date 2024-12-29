import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

//add doctor
const addDoctor = async (req, res) => {
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file;
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile){
            return res.status(400).json({message:"All fields are required"});
        }
        //validation
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid email"});
        }
        if(password.length<8){
            return res.status(400).json({message:"Password must be at least 8 characters"});
        }
        //hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //upload
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl = imageUpload.secure_url;
        const doctorData = {
            name,
            email,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            image:imageUrl,
            date:Date.now(),
        }
        const doctor = await doctorModel.create(doctorData);
        return res.status(200).json({message:"Doctor added successfully",doctor});
    }catch (e){
        console.log("Error "+ e);
        res.json({success:false,message:"Something went wrong"});
    }
}

const loginAdmin = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY);
            res.json({success:true,message:"Login successful",token});
        }else{
            res.json({success:false,message:"Invalid credentials"});
        }
    }catch (e){
        console.log("Error "+ e);
        res.json({success:false,message:"Something went wrong"});
    }
}

export {addDoctor,loginAdmin};