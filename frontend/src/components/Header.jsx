import { assets } from "../assets/assets_frontend/assets.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-primary rounded-xl px-4 sm:px-8 py-8 sm:py-12 md:py-16 gap-6 md:gap-8 shadow-lg">
            {/* Left Content Section */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6 md:pl-4">
                <p className="text-3xl sm:text-4xl font-bold text-white leading-snug px-4 md:px-0">
                    Book Appointment <br className="hidden sm:block"/> With Trusted Doctors
                </p>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-4 md:px-0">
                    <img
                        src={assets.group_profiles}
                        alt="Group Profiles"
                        className="w-24 sm:w-28"
                    />
                    <p className="text-white text-sm font-light leading-relaxed max-w-xs sm:max-w-none sm:pr-4 sm:py-2">
                        Simply browse through our extensive list of trusted doctors,
                        schedule your appointment hassle-free.
                    </p>
                </div>

                <div className="pt-2 md:pt-4">
                    <a
                        href="#"
                        onClick={() => { navigate('/special') }}
                        className="inline-flex items-center bg-white px-6 py-3 text-sm rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all"
                    >
                        Book Appointment
                        <img
                            src={assets.arrow_icon}
                            alt="Arrow Icon"
                            className="ml-3 w-3 h-3"
                        />
                    </a>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="w-full md:w-1/2 flex justify-center px-4 sm:px-6 md:px-0">
                <img
                    src={assets.header_img}
                    alt="Header"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg"
                />
            </div>
        </div>
    );
};

export default Header;