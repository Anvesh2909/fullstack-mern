import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from "../../context/DoctorContext.jsx";
import {Calendar, DollarSign, Check, X, Clock, User, AlertTriangle, IndianRupee} from "lucide-react";
import { AppContext } from "../../context/AppContext.jsx";
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
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Cancelled
                </span>
            );
        }
        if (appointment.isCompleted) {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                    <Check className="w-4 h-4 mr-1" />
                    Completed
                </span>
            );
        }
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm 
                ${appointment.payload ? 'bg-green-100 text-green-800' : 'bg-[#5f6FFF]/10 text-[#5f6FFF]'}`}>
                <Clock className="w-4 h-4 mr-1" />
                {appointment.payload ? 'Paid' : 'Pending'}
            </span>
        );
    };

    if (!appointments || appointments.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <Calendar className="w-12 h-12 text-[#5f6FFF]" />
                        <h1 className="text-2xl font-bold text-gray-800">No Appointments Found</h1>
                        <p className="text-gray-500">You don't have any upcoming appointments yet</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Calendar className="mr-2 h-6 w-6 text-[#5f6FFF]" /> Appointments
                </h1>
                <p className="text-gray-500 mt-1">Manage your upcoming patient appointments</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-[#5f6FFF]/5 to-[#5f6FFF]/10">
                        <tr>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-[#5f6FFF]">#</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-[#5f6FFF]">Patient</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-[#5f6FFF]">Payment</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-[#5f6FFF]">Status</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-[#5f6FFF]">Age</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-[#5f6FFF]">Date & Time</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-[#5f6FFF]">Fees</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-[#5f6FFF]">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {appointments.map((appointment, index) => (
                            <tr key={appointment._id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <img
                                                src={appointment.userData?.image || "/placeholder-user.jpg"}
                                                alt={appointment.userData?.name || "Patient"}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-[#5f6FFF]/20"
                                                onError={(e) => {
                                                    e.target.src = "/placeholder-user.jpg";
                                                    e.target.onerror = null;
                                                }}
                                            />
                                            {!appointment.cancelled && !appointment.isCompleted && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#5f6FFF] rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {appointment.userData?.name || "Unknown"}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {appointment.userData?.gender || 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm 
                                            ${appointment.payload ? 'bg-green-100 text-green-800' : 'bg-[#5f6FFF]/10 text-[#5f6FFF]'}`}>
                                            {appointment.payload ? 'Paid' : 'Pending'}
                                        </span>
                                </td>
                                <td className="py-4 px-6">
                                    {renderAppointmentStatus(appointment)}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">
                                    {calculateAge(appointment.userData?.dob)} yrs
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{appointment.slotDate?.replace(/_/g, '-') || 'N/A'}</span>
                                        <span className="text-gray-500">{appointment.slotTime || 'N/A'}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <IndianRupee className="w-5 h-5 text-[#5f6FFF]" />
                                        {appointment.amount || 'N/A'}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {appointment.cancelled || appointment.isCompleted ? (
                                        <span className="text-gray-400 text-sm">No actions available</span>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => completeAppointment(appointment._id)}
                                                className="bg-[#5f6FFF]/10 hover:bg-[#5f6FFF]/20 text-[#5f6FFF] p-2 rounded-lg transition-colors"
                                                title="Complete Appointment"
                                            >
                                                <Check className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => cancelAppointment(appointment._id)}
                                                className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
                                                title="Cancel Appointment"
                                            >
                                                <X className="w-5 h-5" />
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
        </div>
    )
}
export default DoctorAppointment;