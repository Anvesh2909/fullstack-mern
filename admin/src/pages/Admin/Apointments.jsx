import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { Calendar, Trash2 } from "lucide-react";

const Appointments = () => {
    const {
        token,
        appointments,
        getAllAppointments,
        cancelAppointment
    } = useContext(AdminContext);
    const { calculateAge } = useContext(AppContext);

    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    useEffect(() => {
        if (token) {
            getAllAppointments();
        }
    }, [token]);

    const handleCancelAppointment = async () => {
        try {
            await cancelAppointment(selectedAppointment._id);
            setConfirmAction(null);
            setSelectedAppointment(null);
        } catch (error) {
            console.error('Appointment cancellation failed:', error);
        }
    };

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

    const renderAppointmentActions = (appointment) => {
        if (appointment.isCompleted || appointment.cancelled) {
            return renderAppointmentStatus(appointment);
        }

        return (
            <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm flex items-center hover:bg-red-600"
                onClick={() => {
                    setSelectedAppointment(appointment);
                    setConfirmAction('cancel');
                }}
            >
                <Trash2 className="mr-2 h-4 w-4" /> Cancel
            </button>
        );
    };

    if (!appointments || appointments.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-6">All Appointments</h1>
                <p className="text-gray-500">No appointments found</p>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 flex items-center">
                    <Calendar className="mr-2 h-6 w-6" /> All Appointments
                </h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">#</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Patient</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Age</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Doctor</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Time</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Fees</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment._id || index} className="border-t">
                                <td className="py-3 px-4">{index + 1}</td>
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
                                        <span>{appointment.userData?.name || "Unknown"}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    {appointment.userData?.dob
                                        ? calculateAge(appointment.userData.dob)
                                        : "N/A"}
                                </td>
                                <td className="py-3 px-4">
                                    {appointment.docData?.name || "N/A"}
                                </td>
                                <td className="py-3 px-4">{appointment.slotDate.split("_").join("-")}</td>
                                <td className="py-3 px-4">{appointment.slotTime}</td>
                                <td className="py-3 px-4">₹{appointment.amount || 0}</td>
                                <td className="py-3 px-4">{renderAppointmentStatus(appointment)}</td>
                                <td className="py-3 px-4">{renderAppointmentActions(appointment)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {confirmAction === 'cancel' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
                        <p className="mb-4">Are you sure you want to cancel this appointment?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                onClick={() => setConfirmAction(null)}
                            >
                                Close
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={handleCancelAppointment}
                            >
                                Confirm Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Appointments;