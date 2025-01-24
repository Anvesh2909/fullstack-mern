import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from "../../context/AdminContext.jsx";
import {
    Users,
    Calendar,
    Stethoscope,
    ClipboardList,
    Check,
    X
} from 'lucide-react';

const Dashboard = () => {
    const { token, getDashData, dashData, cancelAppointment } = useContext(AdminContext);
    const [latestAppointments, setLatestAppointments] = useState([]);

    useEffect(() => {
        if (token) {
            getDashData();
        }
    }, [token]);

    useEffect(() => {
        if (dashData) {
            setLatestAppointments(dashData.latestAppointments);
        }
    }, [dashData]);

    if (!dashData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    const handleCancelAppointment = async (appointmentId) => {
        await cancelAppointment(appointmentId);
        setLatestAppointments(latestAppointments.map(appointment =>
            appointment._id === appointmentId ? { ...appointment, cancelled: true, isCompleted: true } : appointment
        ));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<Users className="text-blue-500" size={36} />}
                    title="Total Users"
                    value={dashData.users}
                    color="bg-blue-100"
                />

                <StatCard
                    icon={<Stethoscope className="text-green-500" size={36} />}
                    title="Total Doctors"
                    value={dashData.doctors}
                    color="bg-green-100"
                />

                <StatCard
                    icon={<Calendar className="text-purple-500" size={36} />}
                    title="Total Appointments"
                    value={dashData.appointments}
                    color="bg-purple-100"
                />

                <StatCard
                    icon={<ClipboardList className="text-red-500" size={36} />}
                    title="Latest Appointments"
                    value={latestAppointments.length}
                    color="bg-red-100"
                />
            </div>

            <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-200 border-b border-gray-300">
                    <h2 className="text-xl font-semibold text-gray-800">Latest Appointments</h2>
                </div>
                <table className="w-full">
                    <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Doctor</th>
                        <th className="py-3 px-6 text-left">Patient</th>
                        <th className="py-3 px-6 text-center">Date</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {latestAppointments.map((appointment, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                <div className="flex items-center">
                                    <img src={appointment.docData.image} alt={appointment.docData.name} className="w-8 h-8 rounded-full mr-2" />
                                    <span>{appointment.docData.name}</span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                    <span>{appointment.userData.name}</span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span>{new Date(appointment.date).toLocaleDateString() || 'N/A'}</span>
                            </td>
                            <td className="py-3 px-6 text-center">
                  <span className={`
                    px-3 py-1 rounded-full text-xs
                    ${appointment.cancelled || appointment.isCompleted ? 'bg-red-200 text-red-800' :
                      appointment.status === 'Confirmed' ? 'bg-green-200 text-green-800' :
                          'bg-yellow-200 text-yellow-800'}
                  `}>
                    {appointment.cancelled || appointment.isCompleted ? 'Cancelled' : appointment.status || 'Pending'}
                  </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                                {!appointment.cancelled && !appointment.isCompleted && (
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                                        onClick={() => handleCancelAppointment(appointment._id)}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                {(appointment.cancelled || appointment.isCompleted) && (
                                    <span className="text-red-500 font-medium">
                      <Check className="w-4 h-4 inline-block mr-2" />
                      Cancelled
                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
    <div className={`${color} rounded-lg shadow-md p-6 flex items-center space-x-4`}>
        <div className="bg-white p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default Dashboard;