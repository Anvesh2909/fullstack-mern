import { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Sidebar = () => {
    const { token } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return (
        <div className="h-full bg-white p-4">
            {token && (
                <ul className="space-y-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 p-2 rounded-lg ${
                                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.home_icon} alt="Dashboard Icon" className="w-6 h-6" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink
                        to="/all-apointments"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 p-2 rounded-lg ${
                                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.appointment_icon} alt="Appointments Icon" className="w-6 h-6" />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink
                        to="/add-doctor"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 p-2 rounded-lg ${
                                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.add_icon} alt="Add Doctor Icon" className="w-6 h-6" />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink
                        to="/doctors-list"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 p-2 rounded-lg ${
                                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.people_icon} alt="Doctors List Icon" className="w-6 h-6" />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            )}
            {dToken && (
                <ul className="space-y-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 p-2 rounded-lg ${
                                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.home_icon} alt="Dashboard Icon" className="w-6 h-6" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink
                        to="/doctor-appointments"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 p-2 rounded-lg ${
                                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.appointment_icon} alt="Appointments Icon" className="w-6 h-6" />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink
                        to="/doctor-profile"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 p-2 rounded-lg ${
                                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <img src={assets.people_icon} alt="Profile Icon" className="w-6 h-6" />
                        <p>Profile</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};
export default Sidebar;