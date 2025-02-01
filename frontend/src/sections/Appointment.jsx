import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets_frontend/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";
import {toast} from "react-toastify";
import axios from "axios";

const Appointment = () => {
    const { docId } = useParams();
    const { doctors,token,backendUrl,getDoctorData } = useContext(AppContext);
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const navigate = useNavigate();
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const fetchDoctor = () => {
        const doc = doctors.find((doctor) => doctor._id === docId);
        setDocInfo(doc || null);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book an appointment');
            return navigate('/login');
        }

        if (!selectedSlot) {
            toast.warn('Please select a time slot');
            return;
        }

        try {
            const selectedSlotData = docSlots.find(slot =>
                slot.date === selectedDate.toISOString().split("T")[0] &&
                slot.time === selectedSlot
            );

            if (!selectedSlotData) {
                toast.error('Invalid slot selection');
                return;
            }

            const date = new Date(selectedDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const slotDate = `${day}_${month}_${year}`;
            const slotTime = selectedSlot;

            const response = await axios.post(backendUrl + '/api/user/book-appointment',
                {
                    userId: token,
                    docId,
                    date: slotDate,
                    time: slotTime
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        utoken: token
                    }
                }
            );

            if (response.data.success) {
                toast.success('Appointment booked successfully');
                await getDoctorData();
                navigate('/myappointments');
            } else {
                toast.error(response.data.message || 'Failed to book appointment');
            }

        } catch (error) {
            console.error('Error booking appointment:', error);
            if (error.response?.status === 400) {
                toast.error(error.response.data.message || 'Invalid appointment request');
            } else if (error.response?.status === 404) {
                toast.error(error.response.data.message || 'Doctor or user not found');
            } else {
                toast.error('Failed to book appointment. Please try again.');
            }
        }
    };

    const getAvailableSlots = () => {
        if (!docInfo) return;
        setLoadingSlots(true);

        const today = new Date();
        const slots = [];
        const workingHoursStart = 10;
        const workingHoursEnd = 21;
        const slotsPerDay = 7;

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            const startTime = new Date(currentDate);
            if (i === 0) {
                const currentHour = today.getHours();
                const nextAvailableHour = Math.max(currentHour + 1, workingHoursStart);
                startTime.setHours(nextAvailableHour, 0, 0);
            } else {
                startTime.setHours(workingHoursStart, 0, 0);
            }

            const endTime = new Date(currentDate);
            endTime.setHours(workingHoursEnd, 0, 0);

            let count = 0;
            while (startTime < endTime && count < slotsPerDay) {
                slots.push({
                    date: currentDate.toISOString().split("T")[0],
                    time: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                });
                startTime.setMinutes(startTime.getMinutes() + 30);
                count++;
            }
        }

        setDocSlots(slots);
        setLoadingSlots(false);
    };

    const generateDateSlots = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    const formatDate = (date) => ({
        day: days[date.getDay()],
        date: date.getDate(),
    });

    // Function to find next available date with slots
    const findNextAvailableDate = (currentDate) => {
        const dateSlots = generateDateSlots();
        for (const date of dateSlots) {
            const slotsForDate = docSlots.filter(
                slot => slot.date === date.toISOString().split("T")[0]
            );
            if (slotsForDate.length > 0) {
                return date;
            }
        }
        return null; // No available slots in the next 7 days
    };

    useEffect(() => {
        fetchDoctor();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    // Effect to handle no slots on selected date
    useEffect(() => {
        if (!loadingSlots && selectedDate) {
            const slotsForSelectedDate = docSlots.filter(
                slot => slot.date === selectedDate.toISOString().split("T")[0]
            );

            if (slotsForSelectedDate.length === 0) {
                const nextAvailableDate = findNextAvailableDate(selectedDate);
                if (nextAvailableDate) {
                    toast.info('No slots available on selected date. Showing next available date.');
                    setSelectedDate(nextAvailableDate);
                } else {
                    toast.warn('No slots available in the next 7 days.');
                }
            }
        }
    }, [selectedDate, docSlots, loadingSlots]);

    if (!docInfo) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Loading doctor details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <div className="flex-shrink-0">
                    <img
                        src={docInfo.image || "/fallback-image.jpg"}
                        alt={docInfo.name}
                        className="w-full h-full sm:w-64 sm:h-64 object-cover"
                    />
                </div>
                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        {docInfo.name}
                        <img src={assets.verified_icon} alt="Verified" className="w-4 h-4 ml-2" />
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">MBBS - {docInfo.speciality}</p>
                    <div className="mt-2 text-sm text-gray-500">{docInfo.experience || 0} years experience</div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                            <img src={assets.info_icon} alt="Info" className="w-4 h-4 mr-2" />
                            About
                        </h2>
                        <p className="text-gray-600 mt-1">{docInfo.about || "No information available."}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-800">
                            Appointment Fee: <span className="text-primary">₹{docInfo.fees}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Slots</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {generateDateSlots().map((date, index) => {
                        const { day, date: dateNum } = formatDate(date);
                        const isSelected = selectedDate.toDateString() === date.toDateString();
                        const hasSlots = docSlots.some(
                            slot => slot.date === date.toISOString().split("T")[0]
                        );

                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                className={`flex flex-col items-center min-w-[80px] p-4 rounded-full transition-colors ${
                                    isSelected
                                        ? "bg-primary text-white"
                                        : hasSlots
                                            ? "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!hasSlots}
                            >
                                <span className="text-sm font-medium">{day}</span>
                                <span className="text-lg font-bold">{dateNum}</span>
                                {!hasSlots && (
                                    <span className="text-xs mt-1">No slots</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {loadingSlots ? (
                    <p className="text-gray-500 mt-4">Loading available slots...</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-6">
                        {docSlots
                            .filter((slot) => slot.date === selectedDate.toISOString().split("T")[0])
                            .map((slot, index) => {
                                const isSelected = selectedSlot === slot.time;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSlot(slot.time)}
                                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                                            isSelected
                                                ? "bg-primary text-white"
                                                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {slot.time}
                                    </button>
                                );
                            })}
                    </div>
                )}
            </div>

            <div className="flex mt-8">
                <button
                    onClick={bookAppointment}
                    disabled={!selectedSlot}
                    className={`px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 ${
                        selectedSlot
                            ? "bg-primary text-white hover:shadow-lg"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Book Appointment
                </button>
            </div>

            <div className="flex flex-col mt-8">
                <p className="text-xl text-center font-bold text-gray-800 mb-4 justify-center">Related Doctors</p>
                <p className="text-center">Simply Browse through our extensive list of trusted doctors.</p>
                <RelatedDoctors speciality={docInfo.speciality} id={docInfo._id} />
            </div>
        </div>
    );
};
export default Appointment;