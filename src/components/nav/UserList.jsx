import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


const UserList = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { t } = useTranslation('home');

    return (
        <div className="relative inline-block text-left">

            <div
                onClick={() => setShowMenu(prev => !prev)}
                className="text-white p-[8px] rounded-full border-2 border-Myprimary bg-gradient-to-br from-[#0d0d0d] to-[#1e1e1e] 
                                shadow-[0_0_15px_rgba(214,203,33,0.3)] 
                                md:hover:shadow-[0_0_15px_#d6cb21] transition duration-300 cursor-pointer"
            >
                <FaUserAlt size={18} className="text-gray-700" />
            </div>

            {showMenu && (
                <div className="absolute right-0 mt-5 w-40 bg-[#212120] rounded-md shadow-lg z-50">
                    <ul className="flex flex-col py-2 text-sm text-gray-700">
                        <Link to="/profile" className="w-full px-4 py-2 hover:text-Myprimary cursor-pointer transition">
                            {t("Profile")}
                        </Link>

                        <Link to="/favorite" className="w-full px-4 py-2 hover:text-Myprimary cursor-pointer transition">{t("Favorite")}</Link>

                        <Link to="/setting" className="w-full px-4 py-2 hover:text-Myprimary 
                        cursor-pointer transition">
                            {t("Setting")}
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserList;
