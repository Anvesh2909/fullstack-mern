import React, { useContext, useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, User, BookOpen, Stethoscope, DollarSign } from 'lucide-react';
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { toast } from 'react-toastify';

const DoctorProfile = () => {
    const { doctorProfile, getDoctorProfile, updateDoctorProfile } = useContext(DoctorContext);
    const [isEdit, setIsEdit] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            await getDoctorProfile();
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        if (doctorProfile) {
            setProfileData({...doctorProfile});
        }
    }, [doctorProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileData(prev => ({
                    ...prev,
                    image: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            formData.append('_id', profileData._id);
            Object.keys(profileData).forEach(key => {
                if (key !== 'image' && key !== '_id') {
                    formData.append(key, profileData[key]);
                }
            });

            if (imageFile) {
                formData.append('image', imageFile);
            }

            const updatedProfile = await updateDoctorProfile(formData);
            if (updatedProfile) {
                setIsEdit(false);
                toast.success('Profile updated successfully');
            }
        } catch (error) {
            toast.error('Error updating profile');
        }
    };

    const renderField = (label, value, name, type = "text", icon = null) => {
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

    return profileData && (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Doctor Profile</h1>

            <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-6">
                <div className="relative pb-6 border-b">
                    <div className="flex flex-col md:flex-row items-center gap-6 pb-6">
                        <div className="relative">
                            <img
                                src={profileData.image || '/default-avatar.png'}
                                alt={profileData.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            {isEdit && (
                                <label className="absolute bottom-0 right-0 cursor-pointer">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <div className="bg-primary text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                </label>
                            )}
                        </div>

                        <div className="text-center md:text-left">
                            {isEdit ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name || ''}
                                    onChange={handleChange}
                                    className="text-2xl font-bold w-full border rounded-md px-2 py-1"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold">{profileData.name || '-'}</h2>
                            )}
                            <p className="text-gray-500">{profileData.speciality || 'Medical Professional'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                {renderField("Email", profileData.email, "email", "email")}
                            </div>

                            <div className="flex items-center gap-3">
                                <Stethoscope className="w-5 h-5 text-gray-500" />
                                {renderField("Speciality", profileData.speciality, "speciality")}
                            </div>

                            <div className="flex items-center gap-3">
                                <BookOpen className="w-5 h-5 text-gray-500" />
                                {renderField("Degree", profileData.degree, "degree")}
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                {renderField("Address", profileData.address, "address")}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-500" />
                                {renderField("Experience", profileData.experience, "experience")}
                            </div>

                            <div className="flex items-center gap-3">
                                <DollarSign className="w-5 h-5 text-gray-500" />
                                {renderField("Consultation Fees", profileData.fees, "fees", "number")}
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">About</p>
                                {isEdit ? (
                                    <textarea
                                        name="about"
                                        value={profileData.about || ''}
                                        onChange={handleChange}
                                        className="font-medium w-full border rounded-md px-2 py-1 mt-1"
                                        rows="4"
                                    />
                                ) : (
                                    <p className="font-medium min-h-[1.5rem]">
                                        {profileData.about || '-'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        {isEdit ? (
                            <>
                                <button
                                    onClick={() => {
                                        setIsEdit(false);
                                        getDoctorProfile();
                                    }}
                                    className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
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
export default DoctorProfile;