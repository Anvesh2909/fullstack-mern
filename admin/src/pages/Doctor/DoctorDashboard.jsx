import React, { useContext, useEffect } from 'react'
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { Users, Calendar, CheckCircle } from "lucide-react";
import {assets} from "../../assets/assets.js";

const DoctorDashboard = () => {
    const { dashData, getDashData, dToken } = useContext(DoctorContext);
    useEffect(() => {
        if (dToken) getDashData();
    }, [dToken]);

    if (!dashData) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm">Total Earnings</h3>
                            <p className="text-2xl font-bold">₹{dashData.earnings}</p>
                        </div>
                        <img src={assets.earning_icon} alt=""/>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm">Total Appointments</h3>
                            <p className="text-2xl font-bold">{dashData.appointments}</p>
                        </div>
                        <img src={assets.appointments_icon} alt=""/>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm">Total Patients</h3>
                            <p className="text-2xl font-bold">{dashData.patients}</p>
                        </div>
                        <img src={assets.patients_icon} alt=""/>
                    </div>
                </div>

            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Latest Appointments</h2>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dashData.latestAppointments.map((appointment) => (
                        <tr key={appointment._id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-sm">{appointment.userData?.name || 'Unknown'}</td>
                            <td className="py-3 px-4 text-center text-sm">{appointment.slotDate}</td>
                            <td className="py-3 px-4 text-center text-sm">{appointment.slotTime}</td>
                            <td className="py-3 px-4 text-center">
                                {appointment.isCompleted ? (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                            Completed
                                        </span>
                                ) : appointment.cancelled ? (
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                            Cancelled
                                        </span>
                                ) : (
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                                            Pending
                                        </span>
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

export default DoctorDashboard;