import HeroSection from '@/components/comForPage/Hero';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebook,
    FaTwitter,
    FaInstagram,
} from 'react-icons/fa';

const ContactUs = () => {
    const { t, i18n } = useTranslation('home');
    const isArabic = i18n.language === 'ar'
    return (
        <div className="max-w-7xl mx-auto px-4 flex flex-col min-h-screen">
            <HeroSection title={t('Contact Us')} page1={t('Home')} page2={t('Contact Us')} />

            <div className="flex-grow text-[#F1EA28] p-4 md:p-8 font-sans flex flex-col justify-center">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-stretch">
                    <div
                        className="
                            flex-1 min-w-[280px] p-6 rounded-2xl
                            bg-gradient-to-br from-Myprimary/5 to-black
                            backdrop-blur-3xl
                            shadow-[0_0_1px_#f1ea28]">
                        <h2 className="text-3xl mb-6 font-bold text-white border-b pb-3 border-white/30">{t("We’re Here to Help")}</h2>
                        <p className="mb-4 text-lg flex items-center text-white">
                            <FaMapMarkerAlt className=
                                {`w-5 h-5 text-[#F1EA28] ${isArabic ? 'ml-3' : 'mr-3'}`} />
                            <span className={`font-semibold ${isArabic ? 'ml-1' : 'mr-1'}`}>{t("Address")}:</span> {t("Damascus, Syria")}
                        </p>
                        <p className="mb-4 text-lg flex items-center text-white">
                            <FaPhoneAlt className={`w-5 h-5 text-[#F1EA28] ${isArabic ? 'ml-3' : 'mr-3'}`} />
                            <span className={`font-semibold ${isArabic ? 'ml-1' : 'mr-1'}`}>{t("Phone")}:</span> +963 11 1234567
                        </p>
                        <p className="mb-6 text-lg flex items-center text-white">
                            <FaEnvelope className={`w-5 h-5 text-[#F1EA28] ${isArabic ? 'ml-3' : 'mr-3'}`} />
                            <span className={`font-semibold ${isArabic ? 'ml-1' : 'mr-1'}`}>{t("Email")}:</span> info@example.com
                        </p>

                        <h3 className="text-2xl mb-5 font-bold text-white border-b pb-3 border-white/30">{t("Connect With Us")}</h3>
                        <ul className="space-y-4 text-lg">
                            <li>
                                <a
                                    href="https://facebook.com/yourpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-white hover:text-[#F1EA28] transition-transform duration-300">
                                    <FaFacebook className={`w-5 h-5 transition text-[#F1EA28] ${isArabic ? 'ml-3' : 'mr-3'}`} />
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/yourprofile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-white hover:text-[#F1EA28] transition-transform duration-300">
                                    <FaTwitter className={`w-5 h-5 transition text-[#F1EA28] ${isArabic ? 'ml-3' : 'mr-3'}`}/>
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com/yourprofile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-white hover:text-[#F1EA28] transition-transform duration-300">
                                    <FaInstagram className={`w-5 h-5 transition text-[#F1EA28] ${isArabic ? 'ml-3' : 'mr-3'}`}/>
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 🗺️ Damascus Map */}
                    <div className="flex-1 min-w-[280px] rounded-2xl overflow-hidden shadow-xl border border-[#F1EA28]/20">
                        <div className="h-[450px] w-full">
                            <iframe
                                title="Damascus Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108259.98066512726!2d36.216399431872115!3d33.51041364024508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6dc41300001%3A0x1945115599990!2sDamascus%2C%20Syria!5e0!3m2!1sen!2snl!4v1700000000000!5m2!1sen!2snl"
                                width="100%"
                                height="100%"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
