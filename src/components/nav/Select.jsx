import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from "react-icons/md";

const Select = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        setLanguage(lang);
        setShowMenu(false);
    };

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'العربية' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div
                onClick={() => setShowMenu(prev => !prev)}
                className="flex items-center gap-1 text-white p-2 rounded-full border-2 border-Myprimary 
                    bg-gradient-to-br from-[#0d0d0d] to-[#1e1e1e] 
                    shadow-[0_0_15px_rgba(214,203,33,0.3)] 
                    md:hover:shadow-[0_0_15px_#d6cb21] 
                    transition duration-300 cursor-pointer"
            >
                <MdLanguage size={20} />
                <span className="capitalize text-sm">
                    {languageOptions.find(opt => opt.value === language)?.label}
                </span>
            </div>

            {showMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-[#212120] rounded-md shadow-lg z-50">
                    <ul className="py-2 text-sm text-white">
                        {languageOptions.map((opt) => (
                            <li
                                key={opt.value}
                                onClick={() => handleLanguageChange(opt.value)}
                                className={`px-4 py-2 hover:text-Myprimary cursor-pointer transition ${opt.value === language ? 'text-Myprimary' : ''
                                    }`}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Select;
