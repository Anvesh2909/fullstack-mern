import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import { Calendar, Clock } from 'lucide-react';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

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
                setAppointments([...data.appointments].reverse());
            } else {
                toast.error(data.message || 'Failed to fetch appointments');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        setIsProcessing(true);
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`,
                { appointmentId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        utoken: token
                    }
                }
            );

            if (data.success) {
                toast.success(data.message || 'Appointment cancelled successfully');
                await getAppointments();
            } else {
                toast.error(data.message || 'Failed to cancel appointment');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to cancel appointment');
        } finally {
            setIsProcessing(false);
        }
    };

    const rK = import.meta.env.VITE_RAZORPAY_KEY_ID;

    const initPayment = (order) => {
        if (!window.Razorpay) {
            toast.error("Razorpay SDK is not loaded. Please try again later.");
            return;
        }

        const options = {
            key: rK,
            amount: order.amount,
            currency: order.currency,
            name: "Prescripto",
            description: "Doctor Consultation Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    setIsProcessing(true);
                    const { data } = await axios.post(
                        `${backendUrl}/api/user/verifyPayment`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            receipt: order.receipt
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                utoken: token
                            }
                        }
                    );

                    if (data.success) {
                        toast.success('Payment successful!');
                        await getAppointments();
                    } else {
                        toast.error(data.message || 'Payment verification failed');
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    toast.error(error.response?.data?.message || 'Payment verification failed');
                } finally {
                    setIsProcessing(false);
                }
            },
            prefill: {
                name: "Patient",
                email: "patient@example.com"
            },
            theme: {
                color: "#3B82F6"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const appointmentRazorPay = async (appointmentId) => {
        try {
            setIsProcessing(true);
            const { data } = await axios.post(
                `${backendUrl}/api/user/payment-razorpay`,
                { appointmentId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        utoken: token
                    }
                }
            );
            if (data.success) {
                initPayment(data.order);
            } else {
                toast.error(data.message || 'Failed to initiate payment');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to initiate payment');
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (token) {
            getAppointments();
        }
    }, [token, backendUrl]);

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
                                    <Calendar className="w-4 h-4"/>
                                    <span>Date: {formatDate(appointment.slotDate)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4"/>
                                    <span>Time: {appointment.slotTime}</span>
                                </div>
                                {appointment.isCompleted ? (
                                    <p className="font-medium text-green-600">
                                        Status: Completed
                                    </p>
                                ) : (
                                    <p className={`font-medium ${appointment.cancelled ? 'text-red-600' : 'text-green-600'}`}>
                                        Status: {appointment.cancelled ? 'Cancelled' : 'Confirmed'}
                                    </p>
                                )}
                                <p className="font-medium text-gray-600">
                                    Payment Status: {appointment.payload ? 'Paid' : 'Pending'}
                                </p>
                            </div>
                            <div className="w-full md:w-auto flex flex-col gap-3 mt-4 md:mt-0">
                                {!appointment.isCompleted && !appointment.cancelled && (
                                    <>
                                        {!appointment.payload && (
                                            <button
                                                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                                onClick={() => appointmentRazorPay(appointment._id)}
                                                disabled={isProcessing}
                                            >
                                                Pay ₹{appointment.amount}
                                            </button>
                                        )}
                                        <button
                                            className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
                                            onClick={() => cancelAppointment(appointment._id)}
                                            disabled={isProcessing}
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