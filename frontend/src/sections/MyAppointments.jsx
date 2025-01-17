import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import { MapPin, Phone, Calendar, Clock } from 'lucide-react';
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAppointments = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
                headers: {
                    'Content-Type': 'application/json',
                    utoken: token
                }
            });

            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message || 'Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error(error.response?.data?.message || 'Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getAppointments();
        }
    }, [token, backendUrl]); // Added backendUrl to dependencies

    const formatDate = (dateString) => {
        return dateString.split("_").join("-");
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading appointments...</p>
                </div>
            </div>
        );
    }

    if (!appointments.length) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">No appointments found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

            <div className="space-y-4">
                {appointments.map((appointment, index) => (
                    <div
                        key={appointment._id || index}
                        className="bg-white rounded-lg shadow-lg p-4 md:p-6"
                    >
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="w-full md:w-1/4">
                                <img
                                    src={appointment.docData?.image || '/placeholder-doctor.jpg'}
                                    alt={appointment.docData?.name || 'Doctor'}
                                    className="w-full h-auto rounded-lg object-cover"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-doctor.jpg';
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {appointment.docData?.name || 'Doctor Name Not Available'}
                                </h3>
                                <p className="text-primary font-medium">
                                    {appointment.docData?.specialization || 'Specialization Not Available'}
                                </p>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Date: {formatDate(appointment.slotDate)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>Time: {appointment.slotTime}</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span className="font-medium">Address</span>
                                    </div>
                                    <p className="text-gray-600 pl-6">
                                        {appointment.docData?.address?.line1 || 'Address Not Available'}
                                    </p>
                                    <p className="text-gray-600 pl-6">
                                        {appointment.docData?.address?.line2}
                                    </p>
                                </div>
                                {appointment.status && (
                                    <p className={`font-medium ${
                                        appointment.status === 'confirmed' ? 'text-green-600' :
                                            appointment.status === 'cancelled' ? 'text-red-600' :
                                                'text-yellow-600'
                                    }`}>
                                        Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </p>
                                )}
                            </div>

                            <div className="w-full md:w-auto flex flex-col gap-3 mt-4 md:mt-0">
                                {appointment.status !== 'cancelled' && (
                                    <>
                                        {!appointment.paid && (
                                            <button
                                                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                                onClick={() => {
                                                    // Add payment handler here
                                                    console.log('Payment clicked for appointment:', appointment._id);
                                                }}
                                            >
                                                Pay ₹{appointment.amount}
                                            </button>
                                        )}
                                        <button
                                            className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
                                            onClick={() => {
                                                // Add cancel handler here
                                                console.log('Cancel clicked for appointment:', appointment._id);
                                            }}
                                        >
                                            Cancel appointment
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;