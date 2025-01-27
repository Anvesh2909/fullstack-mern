import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import appointmentModel from "../models/appointmentModel.js";
import cloudinary from "../config/cloudinary.js";

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        const docData = await doctorModel.findByIdAndUpdate(
            docId,
            { available: !doctor.available },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Availability changed successfully",
            available: docData.available
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error changing availability",
            error: e.message
        });
    }
}
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({success: true, doctors});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: e.message});
    }
}
const loginDoctor = async (req, res) => {
    try{
        const {email,password} = req.body;
        console.log('Login attempt:');
        const doctor = await doctorModel.findOne({email});
        if(!doctor){
            return res.json({success: false, message: "Doctor not found"});
        }
        const isMatch = await bcrypt.compare(password,doctor.password);
        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
        res.json({success: true, token});
    }catch (e) {
        console.log(e);
        res.json({success: false, message: e.message});
    }
}
const appointmentsDoctor = async (req, res) => {
    try{
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId});
        res.json({success: true, appointments});
    }catch (e) {
        console.log(e);
        res.json({success: false, message: e.message});
    }
}
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);
        console.log(appointment)
        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }
        if (String(appointment.docId) === String(docId)) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            res.json({ success: true, message: "Appointment completed successfully" });
        } else {
            res.json({ success: false, message: "Invalid appointment" });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: e.message });
    }
}

const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);
        console.log(appointment)
        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        if (String(appointment.docId) === String(docId)) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            res.json({ success: true, message: "Appointment Cancelled successfully" });
        } else {
            res.json({ success: false, message: "Invalid appointment" });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: e.message });
    }
}
const doctorDashboard = async (req, res) => {
    try{
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId});
        let earnings = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payload){
                earnings += item.amount;
            }
        })
        let patients = [];
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })
        const dashData = {
            earnings: earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        return res.json({success: true, dashData});
    }catch (e) {
        console.log(e);
        res.json({success: false, message: e.message});
    }
}
const getDoctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const doctor = await doctorModel.findById(docId).select('-password');
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        res.status(200).json({
            success: true,
            doctor
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error fetching doctor profile",
            error: e.message
        });
    }
}

const updateDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.body.docId;
        const updateData = { ...req.body };
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'doctor_profiles',
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            });
            updateData.image = result.secure_url;
        }

        const doctor = await doctorModel.findByIdAndUpdate(
            doctorId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            doctor
        });
    } catch (error) {
        console.error("Backend error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating doctor profile",
            error: error.message
        });
    }
};
export { changeAvailability,doctorList,loginDoctor,appointmentsDoctor, appointmentCancel, appointmentComplete,doctorDashboard,getDoctorProfile,updateDoctorProfile};