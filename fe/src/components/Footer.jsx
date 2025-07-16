import React from 'react';
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhoneAlt,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
} from 'react-icons/fa';
import logo from '../assets/images/logo-servicemarket.png';

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#2A2529] text-white py-10 px-6 mt-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <img
                            src={logo}
                            alt="ServiceMarket-logo"
                            className="h-10 object-contain"
                        />
                        <span className="text-lg font-semibold">ServiceMarket</span>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="hover:text-pink-400"><FaFacebookF /></a>
                        <a href="#" className="hover:text-pink-400"><FaTwitter /></a>
                        <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-700 pt-4">
                    <div>
                        <h4 className="font-bold mb-3">Explore</h4>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Services</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3">Utility Pages</h4>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms of Use</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3">Keep in Touch</h4>
                        <p className="text-sm flex items-center gap-2">
                            <FaMapMarkerAlt className="text-pink-400" /> Mariendalsvej 500 22000 Frederiksberg
                        </p>
                        <p className="text-sm flex items-center gap-2 mt-2">
                            <FaEnvelope className="text-pink-400" /> support@servicemarket.com
                        </p>
                        <p className="text-sm flex items-center gap-2 mt-2">
                            <FaPhoneAlt className="text-pink-400" /> (+22) 123 - 4567 - 900
                        </p>
                    </div>
                </div>
            </footer>
            <div className="bg-[#140610] text-white py-4 text-center text-sm">
                © 2023, ServiceMarket.dk | All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
