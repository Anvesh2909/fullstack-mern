import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);
    const navigate = useNavigate();

    const navItems = [
        { label: "Home", path: "/" },
        { label: "All Doctors", path: "/doctors" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    const handleNavClick = (index) => {
        setActiveIdx(index);
        setShowMenu(false);
    };

    return (
        <div className="relative">
            <nav className="flex items-center justify-between text-md py-4 mb-5 border-b border-b-gray-400 px-4 md:px-8">
                <img
                    src={assets.logo}
                    alt="logo"
                    className="w-32 md:w-44 cursor-pointer"
                    onClick={() => {navigate('/')}}
                />

                {/* Desktop Navigation */}
                <ul className="gap-5 items-start font-medium hidden md:flex">
                    {navItems.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            onClick={() => handleNavClick(index)}
                            className={({ isActive }) =>
                                `flex flex-col items-center transition-colors ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`
                            }
                        >
                            <li className='py-1'>
                                {item.label}
                            </li>
                            <hr
                                className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${
                                    activeIdx === index ? "block" : "hidden"
                                }`}
                            />
                        </NavLink>
                    ))}
                </ul>

                <div className='flex items-center gap-4'>
                    {token ? (
                        <div className="flex items-center gap-2 cursor-pointer group relative">
                            <img src={assets.profile_pic} alt="" className="w-8 h-8 rounded-full object-cover"/>
                            <img className="w-2.5" src={assets.dropdown_icon} alt=""/>
                            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block z-50">
                                <div className='min-w-48 bg-white shadow-lg rounded-lg flex flex-col gap-2 p-4'>
                                    <p
                                        onClick={() => {navigate('/myprofile')}}
                                        className='hover:text-primary cursor-pointer p-2 rounded-md hover:bg-gray-50'
                                    >
                                        My Profile
                                    </p>
                                    <p
                                        onClick={() => {navigate('/myappointments')}}
                                        className='hover:text-primary cursor-pointer p-2 rounded-md hover:bg-gray-50'
                                    >
                                        My Appointments
                                    </p>
                                    <hr className="my-1"/>
                                    <p
                                        onClick={() => {setToken(false)}}
                                        className='text-red-500 hover:text-red-600 cursor-pointer p-2 rounded-md hover:bg-gray-50'
                                    >
                                        Logout
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="bg-primary text-white px-6 py-2 rounded-full hidden md:block hover:bg-blue-700 transition-colors"
                            onClick={() => {navigate('/login')}}
                        >
                            Create Account
                        </button>
                    )}
                    <button
                        className="md:hidden"
                        onClick={() => setShowMenu(!showMenu)}
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

            {/* Mobile Navigation Menu */}
            {showMenu && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 md:hidden">
                    <div className="flex flex-col p-4">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                onClick={() => handleNavClick(index)}
                                className={({ isActive }) =>
                                    `py-3 px-4 rounded-md ${isActive ? 'text-primary bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        {!token && (
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