import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData, loadUserData } = useContext(AppContext);
    const navigate = useNavigate();
    const navItems = [
        { label: "Home", path: "/" },
        { label: "All Doctors", path: "/doctors" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];
    useEffect(() => {
        if (token && !userData) {
            loadUserData();
        }
    }, [loadUserData, token, userData]);

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    };

    const handleNavClick = (index) => {
        setActiveIdx(index);
        setShowMenu(false);
    };

    const handleProfileClick = (path) => {
        navigate(path);
        setShowMenu(false);
    };
    const profileMenuItems = [
        { label: 'My Profile', path: '/myprofile', className: 'hover:text-primary' },
        { label: 'My Appointments', path: '/myappointments', className: 'hover:text-primary' },
        { label: 'Logout', path: null, className: 'text-red-500 hover:text-red-600' }
    ];

    return (
        <div className="relative">
            <nav className="flex items-center justify-between text-md py-4 mb-5 border-b border-b-gray-400 px-4 md:px-8">
                <img
                    src={assets.logo}
                    alt="logo"
                    className="w-32 md:w-12 cursor-pointer"
                    onClick={() => navigate('/')}
                />
                <ul className="gap-5 items-start font-medium hidden md:flex">
                    {navItems.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            onClick={() => handleNavClick(index)}
                            className={({ isActive }) =>
                                `flex flex-col items-center transition-colors ${
                                    isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                                }`
                            }
                        >
                            <li className="py-1">{item.label}</li>
                        </NavLink>
                    ))}
                </ul>
                <div className="flex items-center gap-4">
                    {token ? (
                        <div className="flex items-center gap-2 cursor-pointer group relative">
                            <img
                                src={userData?.image || '/default-avatar.png'}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                onError={(e) => {
                                    e.target.src = '/default-avatar.png';
                                }}
                            />
                            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
                            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block z-50">
                                <div className="min-w-48 bg-white shadow-lg rounded-lg flex flex-col gap-2 p-4">
                                    {profileMenuItems.map((item, index) => (
                                        <div key={index}>
                                            {index === profileMenuItems.length - 1 && <hr className="my-1" />}
                                            <p
                                                onClick={() => item.path ? handleProfileClick(item.path) : logout()}
                                                className={`cursor-pointer p-2 rounded-md hover:bg-gray-50 ${item.className}`}
                                            >
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="bg-primary text-white px-6 py-2 rounded-full hidden md:block hover:bg-blue-700 transition-colors"
                            onClick={() => navigate('/login')}
                        >
                            Create Account
                        </button>
                    )}
                    <button
                        className="md:hidden"
                        onClick={() => setShowMenu(!showMenu)}
                        aria-label="Toggle menu"
                    >
                        {showMenu ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>
            {showMenu && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 md:hidden">
                    <div className="flex flex-col p-4">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                onClick={() => handleNavClick(index)}
                                className={({ isActive }) =>
                                    `py-3 px-4 rounded-md ${
                                        isActive ? 'text-primary bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        {token ? (
                            profileMenuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => item.path ? handleProfileClick(item.path) : logout()}
                                    className={`text-left py-3 px-4 rounded-md hover:bg-gray-50 ${item.className}`}
                                >
                                    {item.label}
                                </button>
                            ))
                        ) : (
                            <button
                                className="mt-3 bg-primary text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                onClick={() => {
                                    navigate('/login');
                                    setShowMenu(false);
                                }}
                            >
                                Create Account
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Navbar;