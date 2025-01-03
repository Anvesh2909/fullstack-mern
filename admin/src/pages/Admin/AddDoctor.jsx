import {useContext, useState} from 'react';
import { assets } from "../../assets/assets.js";
import { Mail, Book, Wallet, GraduationCap, MapPin, User, Briefcase, FileText } from 'lucide-react';
import {AdminContext} from "../../context/AdminContext.jsx";
import {toast} from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
    const specialities = [
        "General Physician",
        "Gynecologist",
        "Dermatologist",
        "Pediatricians",
        "Neurologist",
        "Gastroenterologist"
    ];
    const {token, backendUrl} = useContext(AdminContext);
    const experienceYears = Array.from({ length: 10 }, (_, i) => i + 1);

    const [doctorData, setDoctorData] = useState({
        name: "",
        email: "",
        password: "",
        experience: "",
        fees: "",
        speciality: "",
        degree: "",
        about: "",
        address: {
            line1: "",
            line2: ""
        },
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setDoctorData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setDoctorData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDoctorData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!doctorData.image) {
                return toast.error('Image not selected');
            }

            // Format address as a single string
            const formattedAddress = `${doctorData.address.line1}${doctorData.address.line2 ? ', ' + doctorData.address.line2 : ''}`;

            const formData = new FormData();
            formData.append('image', doctorData.image);
            formData.append('name', doctorData.name);
            formData.append('email', doctorData.email);
            formData.append('password', doctorData.password);
            formData.append('speciality', doctorData.speciality);
            formData.append('degree', doctorData.degree);
            formData.append('experience', doctorData.experience);
            formData.append('about', doctorData.about);
            formData.append('fees', doctorData.fees);
            formData.append('address', formattedAddress);

            const response = await axios.post(
                `${backendUrl}/api/admin/add-doctor`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(response);
            if(response.status===200) {
                toast.success(response.data.message);
                setDoctorData({
                    name: "",
                    email: "",
                    password: "",
                    experience: "",
                    fees: "",
                    speciality: "",
                    degree: "",
                    about: "",
                    address: {
                        line1: "",
                        line2: ""
                    },
                    image: null
                });
            }
        } catch (error) {
            if (error.response?.data?.message === "A doctor with this email already exists") {
                toast.error("This email is already registered. Please use a different email.");
            } else {
                toast.error(error.response?.data?.message || 'Something went wrong');
            }
            console.error('Error:', error.response?.data || error.message);
        }
    };

    // Rest of the component remains the same...
    const renderField = (label, name, type = "text", placeholder = "") => {
        if (name === "speciality") {
            return (
                <div className="w-full">
                    <label className="text-sm text-gray-500">{label}</label>
                    <select
                        name={name}
                        value={doctorData[name]}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select speciality</option>
                        {specialities.map((speciality) => (
                            <option key={speciality} value={speciality}>
                                {speciality}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        if (name === "experience") {
            return (
                <div className="w-full">
                    <label className="text-sm text-gray-500">{label}</label>
                    <select
                        name={name}
                        value={doctorData[name]}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select experience</option>
                        {experienceYears.map((year) => (
                            <option key={year} value={year}>
                                {year} {year === 1 ? 'year' : 'years'}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        return (
            <div className="w-full">
                <label className="text-sm text-gray-500">{label}</label>
                <input
                    type={type}
                    name={name}
                    value={name.includes('.') ? doctorData[name.split('.')[0]][name.split('.')[1]] : doctorData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Add Doctor</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-6">
                <div className="flex flex-col items-center mb-6 pb-6 border-b">
                    <div className="relative mb-4">
                        <label htmlFor="doc-img" className="cursor-pointer block">
                            {doctorData.image ? (
                                <img
                                    src={URL.createObjectURL(doctorData.image)}
                                    alt="Doctor preview"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                                    <img src={assets.upload_area} alt="upload" className="w-16 h-16 opacity-50" />
                                </div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="doc-img"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <p className="text-center text-sm text-gray-500 mt-2">Upload doctor picture</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-500" />
                            {renderField("Doctor Name", "name", "text", "Enter doctor's name")}
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-500" />
                            {renderField("Doctor Email", "email", "email", "Enter email address")}
                        </div>

                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-500" />
                            {renderField("Doctor Password", "password", "password", "Enter password")}
                        </div>

                        <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-gray-500" />
                            {renderField("Experience", "experience")}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Wallet className="w-5 h-5 text-gray-500" />
                            {renderField("Fees", "fees", "number", "Enter consultation fees")}
                        </div>

                        <div className="flex items-center gap-3">
                            <Book className="w-5 h-5 text-gray-500" />
                            {renderField("Speciality", "speciality")}
                        </div>

                        <div className="flex items-center gap-3">
                            <GraduationCap className="w-5 h-5 text-gray-500" />
                            {renderField("Education", "degree", "text", "Enter education details")}
                        </div>

                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <div className="space-y-2 w-full">
                                {renderField("Address Line 1", "address.line1", "text", "Enter address line 1")}
                                {renderField("Address Line 2", "address.line2", "text", "Enter address line 2")}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-gray-500 mt-6" />
                        <div className="w-full">
                            <label className="text-sm text-gray-500">About Me</label>
                            <textarea
                                name="about"
                                value={doctorData.about}
                                onChange={handleChange}
                                placeholder="Enter professional summary, experience, and achievements..."
                                rows={4}
                                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add Doctor
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AddDoctor;