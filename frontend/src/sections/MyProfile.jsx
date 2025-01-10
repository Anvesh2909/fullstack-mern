import {useContext, useState, useEffect} from 'react';
import { Camera, Mail, Phone, MapPin, User, Calendar } from 'lucide-react';
import {AppContext} from "../context/AppContext.jsx";
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const {userData, setUserData, token, backendUrl, loadUserData} = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    useEffect(() => {
        loadUserData();
    }, [token]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setUserData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setUserData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserData(prev => ({
                    ...prev,
                    image: e.target.result
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('dob', userData.dob);
            formData.append('gender', userData.gender);

            // Handle nested address
            if (userData.address) {
                formData.append('address[line1]', userData.address.line1 || '');
                formData.append('address[line2]', userData.address.line2 || '');
            }

            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await axios.post(
                `${backendUrl}/api/user/update-profile`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        utoken: token
                    }
                }
            );

            if (response.data.success) {
                toast.success('Profile updated successfully');
                setIsEdit(false);
                loadUserData();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Error updating profile');
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

    return userData && (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-6">
                <div className="relative pb-6 border-b">
                    <div className="flex flex-col md:flex-row items-center gap-6 pb-6">
                        <div className="relative">
                            <img
                                src={userData.image || '/default-avatar.png'}
                                alt={userData.name}
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
                                    value={userData.name || ''}
                                    onChange={handleChange}
                                    className="text-2xl font-bold w-full border rounded-md px-2 py-1"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold">{userData.name || '-'}</h2>
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
                                {renderField("Email", userData.email, "email", "email")}
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-500" />
                                {renderField("Phone", userData.phone, "phone", "tel")}
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                <div>
                                    {renderField("Address Line 1", userData.address?.line1, "address.line1")}
                                    {renderField("Address Line 2", userData.address?.line2, "address.line2")}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-500" />
                                {renderField("Gender", userData.gender, "gender")}
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                {renderField("Date of Birth", userData.dob, "dob", "date")}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        {isEdit ? (
                            <>
                                <button
                                    onClick={() => {
                                        setIsEdit(false);
                                        loadUserData(); // Reset to original data
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
export default MyProfile;