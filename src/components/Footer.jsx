import React from 'react';
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-6 px-4 ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 items-center justify-center">
                {/* Logo and Dots */}
                <div className="flex flex-col items-center justify-center lg:items-start col-span-1 lg:col-span-1">
                    <img src={logo} alt="Logo" className="w-full" />
                    <div className="flex gap-3 w-full justify-center">
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="w-5 h-5 bg-yellow-400 rounded-full"></span>
                        ))}
                    </div>
                </div>

                {/* LINKS */}
                <div className="text-center md:text-left">
                    <h3 className="text-yellow-400 font-bold mb-4 text-[1.3rem]">LINKS</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className='hover:text-primaryHover transition'>About Us</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>My Account</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>Campaigns</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>Privacy Policy</a></li>
                    </ul>
                </div>

                {/* CARS TYPE */}
                <div className="text-center md:text-left">
                    <h3 className="text-yellow-400 font-bold mb-4 text-[1.3rem]">CARS TYPE</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className='hover:text-primaryHover transition'>All Cars</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>Crossovers</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>Pickup Truck</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>Hatchback</a></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div className="text-center md:text-left col-span-1 md:col-span-1 lg:col-span-1">
                    <h3 className="text-Myprimary font-bold mb-4 text-[1.3rem]">CONTACT</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 bg-Myprimary rounded-full"></span>
                            +963 946 142 181
                        </li>
                        <li className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 bg-Myprimary rounded-full"></span>
                            +963 958 122 192
                        </li>
                        <li className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 bg-Myprimary rounded-full"></span>
                            info@mycar.sy
                        </li>
                        <li className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 bg-Myprimary rounded-full"></span>
                            Damascus
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom line */}
            <div className="border-t border-Myprimary mt-10 pt-4 text-center text-yellow-400/40 text-md">
                COPYRIGHT © 2025 MY CAR
            </div>
        </footer>
    );
}

export default Footer;
