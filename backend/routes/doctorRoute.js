import express from "express";
import {
    appointmentCancel,
    appointmentComplete,
    appointmentsDoctor, doctorDashboard,
    doctorList, getDoctorProfile,
    loginDoctor, updateDoctorProfile
} from "../controllers/doctorController.js";
import {authDoctor} from "../middlewares/authDoctor.js";
import upload from "../middlewares/multer.js";
const doctorRouter = express.Router();
doctorRouter.get('/list',doctorList);
doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor);
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete);
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel);
doctorRouter.get('/dashboard',authDoctor,doctorDashboard);
doctorRouter.get('/get-profile',authDoctor,getDoctorProfile);
doctorRouter.put('/update-profile',authDoctor,upload.single('image'),updateDoctorProfile);
export default doctorRouter;