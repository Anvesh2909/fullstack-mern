import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from "../../context/AdminContext.jsx";
import { toast } from 'react-toastify';

const DoctorsList = () => {
    const { doctors, getAllDoctors, token, changeAvailability } = useContext(AdminContext);
    const [loading, setLoading] = useState(false);
    const [updatingDoctorId, setUpdatingDoctorId] = useState(null);

    useEffect(() => {
        if(token) {
            getAllDoctors();
        }
    }, [token]);
    const handleAvailabilityChange = async (doctorId) => {
        setLoading(true);
        setUpdatingDoctorId(doctorId);
        try {
            await changeAvailability(doctorId);
        } catch (error) {
            toast.error('Failed to update availability');
        } finally {
            setLoading(false);
            setUpdatingDoctorId(null);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Manage Doctors</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                    <div
                        key={doctor._id}
                        className="border border-blue-200 rounded-lg bg-white overflow-hidden"
                    >
                        <img
                            className="w-full aspect-square object-cover bg-blue-50"
                            src={doctor.image}
                            alt={doctor.name}
                        />
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={Boolean(doctor.available)}
                                        onChange={() => handleAvailabilityChange(doctor._id)}
                                        disabled={loading && updatingDoctorId === doctor._id}
                                    />
                                    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary ${loading && updatingDoctorId === doctor._id ? 'opacity-50' : ''}`}></div>
                                </label>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className='text-primary'>Speciality</span>: {doctor.speciality}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;