import React, { useContext, useEffect } from 'react'
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { Users, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";

const DoctorDashboard = () => {
    const { dashData, getDashData, dToken } = useContext(DoctorContext);
    useEffect(() => {
        if (dToken) getDashData();
    }, [dToken]);

    if (!dashData) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's your overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Earnings Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-600 font-medium mb-1">Total Earnings</p>
                            <p className="text-3xl font-bold text-gray-800">₹{dashData.earnings}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <CheckCircle className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-medium mb-1">Total Appointments</p>
                            <p className="text-3xl font-bold text-gray-800">{dashData.appointments}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Calendar className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Patients Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-purple-600 font-medium mb-1">Total Patients</p>
                            <p className="text-3xl font-bold text-gray-800">{dashData.patients}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Recent Appointments</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {dashData.latestAppointments.map((appointment) => (
                            <tr key={appointment._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {appointment.userData?.name || 'Unknown'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {appointment.slotDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {appointment.slotTime}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {appointment.isCompleted ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Completed
                                            </span>
                                    ) : appointment.cancelled ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                Cancelled
                                            </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                                                <Clock className="w-4 h-4 mr-1" />
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
        </div>
    )
}
export default DoctorDashboard