import React from 'react';
import { assets } from "../assets/assets_frontend/assets.js";
import { Mail, Phone, MapPin, Clock, Building2 } from 'lucide-react';

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Contact Us
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-primary hover:shadow-md transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
                        <div className="space-y-4">
                            <a href="mailto:anveshyadavmokam@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors group">
                                <Mail className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                                <p className="text-gray-600 group-hover:text-primary">anveshyadavmokam@gmail.com</p>
                            </a>
                            <a href="tel:+919063967297" className="flex items-center gap-3 hover:text-primary transition-colors group">
                                <Phone className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                                <p className="text-gray-600 group-hover:text-primary">+919063967297</p>
                            </a>
                            <div className="flex items-center gap-3 group">
                                <Clock className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                                <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-primary hover:shadow-md transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Office</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group">
                                <MapPin className="text-primary w-5 h-5 mt-1 group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="text-gray-600">Kondapur</p>
                                    <p className="text-gray-600">Hitech City</p>
                                    <p className="text-gray-600">Hyderabad</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <Building2 className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                                <p className="text-gray-600">Main Headquarters</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="group">
                    <img
                        src={assets.contact_image}
                        alt="contact"
                        className="w-full h-auto rounded-2xl shadow-lg mb-6 transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                </div>
            </div>

            <div className="bg-primary-50 rounded-xl p-8 border border-primary">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Careers at Prescripto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            position: "Software Engineer",
                            department: "Technology",
                            type: "Full-time"
                        },
                        {
                            position: "Healthcare Coordinator",
                            department: "Operations",
                            type: "Full-time"
                        },
                        {
                            position: "UX Designer",
                            department: "Design",
                            type: "Full-time"
                        },
                        {
                            position: "Customer Support Specialist",
                            department: "Support",
                            type: "Full-time"
                        }
                    ].map((job, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-sm border border-primary hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                        >
                            <h3 className="font-semibold text-gray-900">{job.position}</h3>
                            <p className="text-gray-600 text-sm mt-1">{job.department} · {job.type}</p>
                            <button className="mt-3 text-primary text-sm font-medium group inline-flex items-center">
                                Learn More
                                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button className="bg-white text-black hover:bg-primary hover:text-white border border-primary px-6 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                        View All Positions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;