import React, { useContext, useState, useEffect } from 'react';
import { Camera, Mail, MapPin, User, BookOpen, Stethoscope, IndianRupee } from 'lucide-react';
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

    const renderField = (label, value, name, type = "text", Icon = null) => {
        return (
            <div className="space-y-1 w-full">
                <label className="text-xs font-medium text-[#5f6FFF] uppercase tracking-wide">{label}</label>
                {isEdit ? (
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-5 h-5 text-[#5f6FFF]" />}
                        <input
                            type={type}
                            name={name}
                            value={value || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-[#5f6FFF]/20 rounded-lg focus:ring-2 focus:ring-[#5f6FFF]/50 focus:border-[#5f6FFF] transition-all"
                        />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-5 h-5 text-[#5f6FFF]" />}
                        <p className="text-gray-700 font-medium">
                            {value || '-'}
                        </p>
                    </div>
                )}
            </div>
        );
    };

    return profileData && (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <User className="w-6 h-6 text-[#5f6FFF]" />
                        Doctor Profile
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your professional information</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="pb-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative group">
                                <img
                                    src={profileData.image || '/default-avatar.png'}
                                    alt={profileData.name}
                                    className="w-32 h-32 rounded-2xl object-cover border-4 border-[#5f6FFF]/10 shadow-sm"
                                />
                                {isEdit && (
                                    <label className="absolute bottom-0 right-0 cursor-pointer transform translate-x-2 translate-y-2">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <div className="bg-[#5f6FFF] text-white p-2 rounded-full hover:bg-[#4a58cc] transition-colors shadow-lg">
                                            <Camera className="w-5 h-5" />
                                        </div>
                                    </label>
                                )}
                            </div>

                            <div className="flex-1 space-y-2">
                                {isEdit ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name || ''}
                                        onChange={handleChange}
                                        className="text-2xl font-bold w-full px-3 py-2 border border-[#5f6FFF]/20 rounded-lg"
                                    />
                                ) : (
                                    <h2 className="text-2xl font-bold text-gray-800">{profileData.name || '-'}</h2>
                                )}
                                <div className="flex items-center gap-2 text-[#5f6FFF]">
                                    <Stethoscope className="w-5 h-5" />
                                    <p className="font-medium">{profileData.speciality || 'Medical Professional'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {renderField("Email", profileData.email, "email", "email", Mail)}
                                {renderField("Speciality", profileData.speciality, "speciality", "text", Stethoscope)}
                                {renderField("Address", profileData.address, "address", "text", MapPin)}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {renderField("Degree", profileData.degree, "degree", "text", BookOpen)}
                                {renderField("Experience", `${profileData.experience} years`, "experience", "text", User)}
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-[#5f6FFF] uppercase tracking-wide">Consultation Fees</label>
                                    <div className="flex items-center gap-2">
                                        <IndianRupee className="w-5 h-5 text-[#5f6FFF]" />
                                        {isEdit ? (
                                            <input
                                                type="number"
                                                name="fees"
                                                value={profileData.fees || ''}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-[#5f6FFF]/20 rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-gray-700 font-medium">
                                                {profileData.fees || '-'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mt-6 space-y-1">
                            <label className="text-xs font-medium text-[#5f6FFF] uppercase tracking-wide">About</label>
                            {isEdit ? (
                                <textarea
                                    name="about"
                                    value={profileData.about || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-[#5f6FFF]/20 rounded-lg focus:ring-2 focus:ring-[#5f6FFF]/50 focus:border-[#5f6FFF] h-32"
                                />
                            ) : (
                                <p className="text-gray-700 font-medium">
                                    {profileData.about || '-'}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex justify-end gap-3">
                            {isEdit ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEdit(false);
                                            getDoctorProfile();
                                        }}
                                        className="px-5 py-2 rounded-lg border border-[#5f6FFF] text-[#5f6FFF] hover:bg-[#5f6FFF]/10 transition-colors"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-[#5f6FFF] text-white px-5 py-2 rounded-lg hover:bg-[#4a58cc] transition-colors shadow-sm"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className="bg-[#5f6FFF] text-white px-5 py-2 rounded-lg hover:bg-[#4a58cc] transition-colors shadow-sm"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DoctorProfile;