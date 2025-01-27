import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { AdminContext } from "./context/AdminContext.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import Apointments from "./pages/Admin/Apointments.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";

const App = () => {
    const { token } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Admin token:", token);
        console.log("Doctor token:", dToken);
    }, [token, dToken]);


    return token || dToken ? (
        <div className="bg-[#F8F9FD] min-h-screen">
            <ToastContainer />
            <Navbar />
            <div className="flex pt-16">
                <div className="w-64 h-[calc(100vh-4rem)]">
                    <Sidebar />
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                    <Routes>
                        {/* Admin Routes */}
                        {token && (
                            <>
                                <Route path="/add-doctor" element={<AddDoctor />} />
                                <Route path="/all-apointments" element={<Apointments />} />
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/doctors-list" element={<DoctorsList />} />
                            </>
                        )}
                        {/* Doctor Routes */}
                        {dToken && (
                            <>
                                <Route path="/" element={<DoctorDashboard/>}/>
                                <Route path="/doctor-appointments" element={<DoctorAppointment/>}/>
                                <Route path="/doctor-profile" element={<DoctorProfile/>}/>
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </div>
    ) : (
        <>
            <Login />
            <ToastContainer />
        </>
    );
};

export default App;
