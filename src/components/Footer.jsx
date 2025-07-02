import React from 'react';
import logo from '../assets/logo.png'
import footer from '../assets/footer.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation('home');

    return (
        <footer
            className="relative text-white pt-10 pb-6 px-4 overflow-hidden">
            <div
                className={`absolute  top-0 bottom-0 w-full bg-no-repeat bg-right bg-contain md:opacity-40 opacity-0 z-0 ${i18n.language === 'ar' ?'left-0':'right-0'}`}
                style={{ backgroundImage: `url(${footer})` }}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 items-center justify-center">
                {/* Logo and Dots */}
                <div className="flex flex-col items-center justify-center lg:items-start col-span-1 lg:col-span-1">
                    <div className="relative w-full z-10">
                        <img src={logo} alt="Logo" className="w-full" />

                        <div className="flex gap-3 w-full justify-center absolute bottom-5 md:bottom-0 left-1/2 -translate-x-1/2 z-20">
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="w-4 h-4 bg-Myprimary rounded-full"></span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* LINKS */}
                <div className={`text-center ${i18n.language == 'en' ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-Myprimary font-bold mb-4 text-[1.3rem]">{t("LINKS")}</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className='hover:text-primaryHover transition'>{t("About Us")}</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>{t("My Account")}</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>{t("Campaigns")}</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>{t("Privacy Policy")}</a></li>
                    </ul>
                </div>

                {/* CARS TYPE */}
                <div className={`text-center ${i18n.language == 'en' ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-Myprimary font-bold mb-4 text-[1.3rem]">{t("CARS TYPE")}</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className='hover:text-primaryHover transition'>{t("All Cars")}</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>{t("Crossovers")}</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>{t("Pickup Truck")}</a></li>
                        <li><a href="#" className='hover:text-primaryHover transition'>{t("Hatchback")}</a></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div className={`text-center col-span-1 md:col-span-1 lg:col-span-1 
                ${i18n.language == 'en' ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-Myprimary font-bold mb-4 text-[1.3rem]">{t("CONTACT")}</h3>
                    <ul className="space-y-2" >
                        <li className={`flex items-center gap-2 justify-center ${i18n.language == 'en' ? 'md:justify-start' : 'md:justify-start '}`}>
                            <span className="w-2 h-2 bg-Myprimary rounded-full"></span>
                            +963 946 142 181
                        </li>
                        <li className={`flex items-center gap-2 justify-center ${i18n.language == 'en' ? 'md:justify-start' : 'md:justify-start'}`}>
                            <span className="w-2 h-2 bg-Myprimary rounded-full"></span>
                            +963 958 122 192
                        </li>
                        <li className={`flex items-center gap-2 justify-center ${i18n.language == 'en' ? 'md:justify-start' : 'md:justify-start'}`}>
                            <span className="w-2 h-2 bg-Myprimary rounded-full"></span>
                            info@mycar.sy
                        </li>
                        <li className={`flex items-center gap-2 justify-center ${i18n.language == 'en' ? 'md:justify-start' : 'md:justify-start'}`}>
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
