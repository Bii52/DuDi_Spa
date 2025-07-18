import React from 'react';
import logo from '../../assets/images/logo-stylicle.png';
const Header = () => {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="ServiceMarket-logo"
                    className="h-10 object-contain"
                />
                <span className="text-2xl font-bold text-purple-800">STYLICLE</span>
            </div>

            <nav className="space-x-4 hidden md:flex items-center text-sm">
                <a href="#" className="hover:underline text-black">Home</a>
                <a href="#" className="hover:underline text-black">About Us</a>
                <a href="#" className="hover:underline text-black">Contact Us</a>
                <a href="#" className="hover:underline text-black">EN ▾</a>
                <button className="px-4 py-1 border border-black rounded">Login</button>
                <button className="px-4 py-1 bg-black text-white rounded">Signup</button>
            </nav>
        </header>
    );
};

export default Header;
