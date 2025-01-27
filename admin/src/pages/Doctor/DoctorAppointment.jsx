import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { Calendar, DollarSign, Check, X } from "lucide-react";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import { toast } from 'react-toastify';

const DoctorAppointment = () => {
    const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
    const { calculateAge } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getAppointments();
            calculateAge();
        }
    }, [dToken]);

    const renderAppointmentStatus = (appointment) => {
        if (appointment.cancelled) {
            return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Cancelled</span>;
        }
        if (appointment.isCompleted) {
            return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>;
        }
        return (
            <span className={`px-2 py-1 rounded-full text-xs ${appointment.payload ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {appointment.payload ? 'Paid' : 'Pending'}
            </span>
        );
    };

    if (!appointments || appointments.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-6 flex items-center justify-center">
                    <Calendar className="mr-2 h-6 w-6" /> Appointments
                </h1>
                <p className="text-gray-500">No appointments found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="mr-2 h-6 w-6" /> Appointments
            </h1>

            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">SNO</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Patient</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Payment Status</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Appointment Status</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Age</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date and Time</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Fees</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={appointment._id} className="border-t hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{index + 1}</td>
                            <td className="py-3 px-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={appointment.userData?.image || "/placeholder-user.jpg"}
                                        alt={appointment.userData?.name || "Patient"}
                                        className="w-10 h-10 rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "/placeholder-user.jpg";
                                            e.target.onerror = null;
                                        }}
                                    />
                                    <span className="text-sm">{appointment.userData?.name || "Unknown"}</span>
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${appointment.payload ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {appointment.payload ? 'Paid' : 'Pending'}
                                </span>
                            </td>
                            <td className="py-3 px-4">{renderAppointmentStatus(appointment)}</td>
                            <td className="py-3 px-4 text-sm">
                                {calculateAge(appointment.userData?.dob)}
                            </td>
                            <td className="py-3 px-4 text-sm">
                                {appointment.slotDate?.replace(/_/g, '-') || 'N/A'}
                                {' '}
                                {appointment.slotTime || 'N/A'}
                            </td>
                            <td className="py-3 px-4 text-sm">
                                <div className="flex items-center">
                                    <DollarSign className="mr-1 text-green-500" size={16} />
                                    {appointment.amount || 'N/A'}
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                {appointment.cancelled || appointment.isCompleted ? (
                                    <span className="text-gray-500">No Actions</span>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => completeAppointment(appointment._id)}
                                            className="text-green-500 hover:bg-green-100 p-1 rounded"
                                            title="Complete Appointment"
                                        >
                                            <Check size={20} />
                                        </button>
                                        <button
                                            onClick={() => cancelAppointment(appointment._id)}
                                            className="text-red-500 hover:bg-red-100 p-1 rounded"
                                            title="Cancel Appointment"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default DoctorAppointment;