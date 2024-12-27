import React from "react";
import { assets } from "../assets/assets_frontend/assets.js";

const Banner = () => {
    return (
        <div className="bg-primary text-white flex flex-col md:flex-row items-center gap-8 px-4 sm:px-6 md:px-10 lg:px-12 py-10 md:py-16 my-8 md:my-20 rounded-lg mx-4 sm:mx-6 md:mx-8">
            <div className="space-y-4 md:space-y-6 text-center md:text-left w-full md:w-1/2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
                    Book Appointment <br className="hidden md:block" />
                    With 100+ Trusted Doctors
                </h1>
                <button className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md hover:bg-gray-100 transition-colors text-sm sm:text-base">
                    Create Account
                </button>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <img
                    src={assets.appointment_img}
                    alt="Doctor"
                    className="w-3/4 md:w-4/5 lg:w-2/3 h-auto object-cover rounded-lg"
                />
            </div>
        </div>
    );
};

export default Banner;