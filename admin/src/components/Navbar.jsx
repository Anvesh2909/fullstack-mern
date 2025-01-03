import { useContext } from 'react';
import { AdminContext } from "../context/AdminContext.jsx";
import { assets } from "../assets/assets.js";
import { LogOut, Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { token, setToken } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
    };

    const handleMenuClick = () => {

    };

    return (
        <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
            <div className="flex h-16">
                <div className="w-64 flex items-center justify-between px-4 border-r border-gray-200">
                    <div className="flex items-center space-x-3">
                        <img
                            src={assets.admin_logo}
                            alt="Admin Logo"
                            className="h-8 w-auto"
                        />
                        <p className="text-sm font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-0.5">
                            {token ? 'Admin' : 'Doctor'}
                        </p>
                    </div>
                    <button
                        onClick={handleMenuClick}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Menu className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
                <div className="flex-1 flex items-center justify-end px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;