import { useSidebar } from '../context/SidebarContext';
import logo from '../assets/logo.png';
import { AlignJustify, SlidersHorizontal, User2 } from "lucide-react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { X } from "lucide-react";
import NavbarSearch from './nav/Search';
import MenuList from './nav/MenuList';
import { useTranslation } from 'react-i18next';
import UserList from './nav/UserList';

const Navbar = () => {
    const { toggleSidebar } = useSidebar();
    const { t, i18n } = useTranslation('home');
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem("token") && !!localStorage.getItem("user_id");


    // const handleLangChange = (lang) => {
    //     i18n.changeLanguage(lang);
    //     localStorage.setItem('i18nextLng', lang);
    //     document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // };
    return (

        <nav dir={i18n.language === 'ar' ? 'ltr' : 'ltr'} className="bg-Mybackground shadow-lg fixed top-0 z-40 shadow-white/10 w-full">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <img src={logo} alt="logo" className="md:w-28 w-32" />
                        <div className="hidden lg:flex lg:text-3xl font-bold text-Myprimary uppercase">
                            My Car
                        </div>
                    </div>

                    {/* Search */}
                    <div className="md:flex hidden md:w-[20rem] mr-2 sm:px-5 items-center border rounded-full gap-3">
                        <NavbarSearch />
                    </div>

                    {/* Desktop Menu */}
                    <div className='flex items-center gap-4'>
                        <div className="hidden md:flex space-x-6">
                            <div className="flex items-center gap-4">
                                <Link to={'/'} className='cursor-pointer hover:text-Myprimary transition'>
                                    {t('Home')}
                                </Link>

                                <Link to={'/cars'} className='cursor-pointer hover:text-Myprimary transition'>
                                    {t("Cars")}
                                </Link>

                                <Link to={'/aboutUs'} className='cursor-pointer hover:text-Myprimary transition'>
                                    {t("About Us")}
                                </Link>

                                <Link to={'/services'} className='cursor-pointer hover:text-Myprimary transition'>
                                    {t("Services")}
                                </Link>

                                <Link to={'/blogs'} className='cursor-pointer hover:text-Myprimary transition'>
                                    {t("Blogs")}
                                </Link>

                                <Link to={'/contact Us'} className='cursor-pointer hover:text-Myprimary transition'>
                                    {t("Contact Us")}
                                </Link>

                                {/* <MenuList /> */}
                                {/* زر اللغة */}
                                {/* <select
                                    onChange={(e) => handleLangChange(e.target.value)}
                                    value={i18n.language}
                                    className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-white hover:border-Myprimary focus:outline-none"
                                >
                                    <option value="en" className='text-black'>English</option>
                                    <option value="ar" className='text-black'>العربية</option>
                                </select> */}

                                {isLoggedIn ? (
                                    <UserList />
                                ) : (
                                    <Link
                                        to="/signin"
                                        className="w-fit px-2 border border-white rounded-md py-1 text-center hover:shadow-[0_0_10px_#d6cb21] hover:border-Myprimary outline-none transition hover:text-Myprimary"
                                    >
                                        {t('Sign In')}
                                    </Link>
                                )}

                            </div>
                        </div>

                        <button
                            onClick={toggleSidebar}
                            className="hidden md:flex p-2 text-gray-700 hover:text-Myprimary transition text-2xl"
                        >
                            <SlidersHorizontal size={20} />

                        </button>

                        {/* زر الفلاتر */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={toggleSidebar}
                                className="flex items-center justify-center gap-1 px-6 h-[36px] text-sm rounded-full text-black font-medium  bg-Myprimary transition hover:bgprimaryHover">
                                {t('Filters')}
                            </button>

                            {isLoggedIn ? (
                                <div className='md:hidden flex'>
                                    <UserList />
                                </div>
                            ) : (
                                <Link
                                    to="/signin"
                                    className="w-fit px-2 border border-white rounded-md py-1 text-center hover:shadow-[0_0_10px_#d6cb21] hover:border-Myprimary outline-none transition hover:text-Myprimary"
                                >
                                    {t('Sign In')}
                                </Link>
                            )}
                        </div>


                        {/* Mobile Button */}
                        <div className="md:hidden flex items-center">

                            <button className='relative w-6 h-6 overflow-hidden' onClick={() => setIsOpen(!isOpen)}>
                                <span
                                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <X size={24} />
                                </span>
                                <span
                                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                                >
                                    <AlignJustify size={24} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#121212] px-4 py-4 space-y-2 shadow-md flex flex-col">
                    <Link to={'/'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Home")}
                    </Link>

                    <Link to={'/cars'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Cars")}
                    </Link>

                    <Link to={'/aboutUs'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("About Us")}
                    </Link>

                    <Link to={'/services'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Services")}
                    </Link>

                    <Link to={'/blogs'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Blogs")}
                    </Link>

                    <Link to={'/contact Us'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Contact Us")}
                    </Link>

                    {/* <MenuList isMobile={true} /> */}

                    {/* Search */}
                    <div className="w- sm:w-80  md:w-[20rem] mr-2 sm:px-5 flex items-center border rounded-full gap-3">
                        <NavbarSearch />
                    </div>

                </div>
            )}
        </nav>
    );
};

export default Navbar;
