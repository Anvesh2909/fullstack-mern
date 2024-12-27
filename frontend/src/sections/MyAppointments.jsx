import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import { MapPin, Phone } from 'lucide-react';

const MyAppointments = () => {
    const { doctors } = useContext(AppContext);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

            <div className="space-y-4">
                {doctors.slice(0, 2).map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-4 md:p-6"
                    >
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="w-full md:w-1/4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="flex-1 space-y-2 mt-10">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {item.name}
                                </h3>
                                <p className="text-primary font-medium">
                                    {item.speciality}
                                </p>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span className="font-medium">Address</span>
                                    </div>
                                    <p className="text-gray-600 pl-6">
                                        {item.address.line1}
                                    </p>
                                    <p className="text-gray-600 pl-6">
                                        {item.address.line2}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex flex-col gap-3 mt-4 md:mt-10">
                                <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Pay Online
                                </button>
                                <button className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors">
                                    Cancel appointment
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;