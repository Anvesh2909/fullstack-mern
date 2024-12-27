import React, { useState } from 'react';
import { assets } from "../assets/assets_frontend/assets.js";
import { Camera, Mail, Phone, MapPin, User, Calendar } from 'lucide-react';

const MyProfile = () => {
    const [userdata, setUserdata] = useState({
        name: "Edward Vincent",
        image: assets.profile_pic,
        email: "edward@gmail.com",
        phone: "+916875498745",
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        gender: "Male",
        dob: "2000-01-01",
    });
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setUserdata(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setUserdata(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const renderField = (label, value, name, type = "text") => {
        return (
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                {isEdit ? (
                    <input
                        type={type}
                        name={name}
                        value={value || ''}
                        onChange={handleChange}
                        className="font-medium w-full border rounded-md px-2 py-1 mt-1"
                    />
                ) : (
                    <p className="font-medium min-h-[1.5rem]">
                        {value || '-'}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-6">
                <div className="relative pb-6 border-b">
                    <div className="flex flex-col md:flex-row items-center gap-6 pb-6">
                        <div className="relative">
                            <img
                                src={userdata.image}
                                alt={userdata.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="text-center md:text-left">
                            {isEdit ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={userdata.name || ''}
                                    onChange={handleChange}
                                    className="text-2xl font-bold w-full border rounded-md px-2 py-1"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold">{userdata.name || '-'}</h2>
                            )}
                            <p className="text-gray-500">Personal Profile</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                {renderField("Email", userdata.email, "email", "email")}
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-500" />
                                {renderField("Phone", userdata.phone, "phone", "tel")}
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                <div>
                                    {renderField("Address Line 1", userdata.address.line1, "address.line1")}
                                    {renderField("Address Line 2", userdata.address.line2, "address.line2")}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-500" />
                                {renderField("Gender", userdata.gender, "gender")}
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                {renderField("Date of Birth", userdata.dob, "dob", "date")}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        {isEdit ? (
                            <>
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;