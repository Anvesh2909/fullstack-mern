import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets_frontend/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";
const Appointment = () => {
    const { docId } = useParams();
    const { doctors } = useContext(AppContext);
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const fetchDoctor = () => {
        const doc = doctors.find((doctor) => doctor._id === docId);
        setDocInfo(doc || null);
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

    useEffect(() => {
        fetchDoctor();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

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
                            Appointment Fee: <span className="text-primary">${docInfo.fees}</span>
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

                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                className={`flex flex-col items-center min-w-[80px] p-4 rounded-full transition-colors ${
                                    isSelected
                                        ? "bg-primary text-white"
                                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                <span className="text-sm font-medium">{day}</span>
                                <span className="text-lg font-bold">{dateNum}</span>
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
                <button className="bg-primary text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
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