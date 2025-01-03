import Login from "./pages/Login.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useContext} from "react";
import {AdminContext} from "./context/AdminContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {Routes, Route} from "react-router-dom";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import Apointments from "./pages/Admin/Apointments.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";

const App = () => {
    const { token } = useContext(AdminContext);

    return (
        <div>
            <ToastContainer />
            {token ? (
                <div className="bg-[#F8F9FD] min-h-screen">
                    <Navbar />
                    <div className="flex pt-16">
                        <div className="w-64 h-[calc(100vh-4rem)] ">
                            <Sidebar />
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <Routes>
                                <Route path="/add-doctor" element={<AddDoctor />} />
                                <Route path="/all-apointments" element={<Apointments />} />
                                <Route path="/admin-dashboard" element={<Dashboard />} />
                                <Route path="/doctors-list" element={<DoctorsList />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Login />
                </div>
            )}
        </div>
    );
};
export default App;