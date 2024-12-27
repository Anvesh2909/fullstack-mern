import React from 'react';
import { assets } from "../assets/assets_frontend/assets.js";

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                About Us
            </h1>

            <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2">
                        <img
                            src={assets.about_image}
                            alt="About Prescripto"
                            className="rounded-2xl shadow-lg w-full h-auto object-cover"
                        />
                    </div>

                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
                            </p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                            <h2 className="text-2xl font-semibold text-primary mb-4">
                                Our Vision
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Patient-Centered Care",
                            description: "We put patients first, ensuring every feature and service is designed with your needs in mind."
                        },
                        {
                            title: "Innovation",
                            description: "Continuously improving our platform with the latest healthcare technology advancements."
                        },
                        {
                            title: "Accessibility",
                            description: "Making healthcare services easily accessible to everyone, anywhere, anytime."
                        }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default About;