import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from "../../context/AdminContext.jsx";
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorsList = () => {
    const { doctors, getAllDoctors, token, backendUrl } = useContext(AdminContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllDoctors();
    }, []);
    const toggleAvailability = async (doctorId, currentStatus) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${backendUrl}api/admin/toggle-doctor-availability`,
                { doctorId, status: !currentStatus },
                { headers: { Authorization: token } }
            );

            if (data.success) {
                getAllDoctors();
                toast.success("Doctor availability updated!");
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Manage Doctors</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5 gap-y-6">
                {doctors.map((doctor, index) => (
                    <div
                        key={index}
                        className="border border-blue-200 rounded-xl overflow-hidden"
                    >
                        <img
                            className="w-full h-48 object-cover bg-blue-50"
                            src={doctor.image || "/fallback-image.jpg"}
                            alt={doctor.name}
                        />
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <p className={`w-2 h-2 rounded-full ${doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></p>
                                    <p className={doctor.isAvailable ? 'text-green-500' : 'text-red-500'}>
                                        {doctor.isAvailable ? 'Available' : 'Unavailable'}
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={doctor.isAvailable}
                                        onChange={() => toggleAvailability(doctor._id, doctor.isAvailable)}
                                        disabled={loading}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                            <p className="text-gray-600 text-sm mb-2">{doctor.speciality}</p>
                            <div className="text-sm text-gray-500">
                                <p>{doctor.email}</p>
                                <p>{doctor.phone}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;