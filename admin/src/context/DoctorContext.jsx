import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(() => localStorage.getItem("dToken") || "");
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [doctorProfile, setDoctorProfile] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("dToken");
        if (storedToken && storedToken !== dToken) {
            setDToken(storedToken);
        }
    }, []);

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/appointments`, {
                headers: {
                    'Authorization': `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if(data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                console.log(data);
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try{
            const {data} = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, {appointmentId}, {
                headers: {
                    'Authorization': `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if(data.success) {
                await getAppointments();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try{
            const {data} = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, {appointmentId}, {
                headers: {
                    'Authorization': `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if(data.success) {
                await getAppointments();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData);
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (e) {
            toast.error(e.response?.data?.message || e.message);
            return false;
        }
    }

    const getDoctorProfile = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/get-profile`, {
                headers: {
                    'Authorization': `Bearer ${dToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (data.success) {
                setDoctorProfile(data.doctor);
                return data.doctor;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (e) {
            toast.error(e.response?.data?.message || e.message);
            return null;
        }
    }

    const updateDoctorProfile = async (profileData) => {
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/doctor/update-profile`,
                profileData,
                {
                    headers: {
                        'Authorization': `Bearer ${dToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (data.success) {
                setDoctorProfile(data.doctor);
                return data.doctor;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (e) {
            console.error("Error updating doctor profile:", e.response?.data || e.message);
            toast.error(e.response?.data?.message || "Error updating doctor profile");
            return null;
        }
    };

    const value = {
        backendUrl,
        dToken,
        setDToken,
        appointments,
        setAppointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData,
        getDashData,
        setDashData,
        doctorProfile,
        getDoctorProfile,
        updateDoctorProfile
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;