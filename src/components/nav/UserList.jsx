import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { t, i18n } = useTranslation('home');
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const [user, setUser] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        if (!token) {
            setUser(null)
            return;
        }

        axios.get(`https://mycarapplication.com/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error("Error fetching seller data", err);
                if (err.response?.status === 401) {
                    setUser(null);
                    localStorage.clear();
                    navigate('/signin');
                }
            });
    }, [token, navigate]);


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

    const handleLinkClick = () => {
        setShowMenu(false);
    };


    const handleLogout = async () => {
        try {
            if (!token) throw new Error("No token found");

            await axios.post(
                "https://mycarapplication.com/api/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Logout successful!");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.clear();
            window.location.reload();
        }
    };




    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div
                onClick={() => setShowMenu(prev => !prev)}
                className="text-white p-1 rounded-full border-2 border-Myprimary bg-gradient-to-br from-[#0d0d0d] to-[#1e1e1e] 
                                shadow-[0_0_15px_rgba(214,203,33,0.3)] 
                                md:hover:shadow-[0_0_15px_#d6cb21] transition duration-300 cursor-pointer"
            >
                <div className="w-[30px] h-[30px] relative">
                    {(!user?.image_url || !isImageLoaded) && (
                        <FaUserAlt className="text-gray-500 absolute inset-0 m-auto" size={20} />
                    )}

                    {user?.image_url && (
                        <img
                            src={user.image_url}
                            alt={user.full_name}
                            onLoad={() => setIsImageLoaded(true)}
                            className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                    )}
                </div>
            </div>

            {showMenu && (
                <div className="absolute right-0 mt-5 w-40 bg-[#212120] rounded-md shadow-lg z-50">
                    <ul className={`flex flex-col py-2 text-sm text-gray-700 ${i18n.language === 'ar' ? 'text-end':'text-start'}`} >
                        <Link
                            to="/profile"
                            className="w-full px-4 py-2 hover:text-Myprimary cursor-pointer transition"
                            onClick={handleLinkClick}
                        >
                            {t("Profile")}
                        </Link>

                        <Link
                            to="/favorite"
                            className="w-full px-4 py-2 hover:text-Myprimary cursor-pointer transition"
                            onClick={handleLinkClick}
                        >
                            {t("Favorite")}
                        </Link>

                        <Link
                            to="/setting"
                            className="w-full px-4 py-2 hover:text-Myprimary cursor-pointer transition"
                            onClick={handleLinkClick}
                        >
                            {t("Setting")}
                        </Link>

                        <Link
                            to="/"
                            className="w-full px-4 py-2 hover:text-Myprimary cursor-pointer transition"
                            onClick={handleLogout}
                        >
                            {t("Logout")}
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserList;
