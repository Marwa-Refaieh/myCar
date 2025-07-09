import { useSidebar } from '../context/SidebarContext';
import logo from '../assets/logo.png';
import { AlignJustify, SlidersHorizontal, User2 } from "lucide-react";
import { FaSearch } from 'react-icons/fa';
import { Link, Links } from 'react-router-dom';
import { useState } from "react";
import { X } from "lucide-react";
import NavbarSearch from './nav/Search';
import { useTranslation } from 'react-i18next';
import UserList from './nav/UserList';
import Select from './nav/Select';
import MenuList from './nav/MenuList';


const Navbar = () => {
    const { toggleSidebar } = useSidebar();
    const { t, i18n } = useTranslation('home');
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem("token") && !!localStorage.getItem("user_id");

    return (

        <nav dir={i18n.language === 'ar' ? 'ltr' : 'ltr'} className="bg-Mybackground shadow-lg fixed top-0 z-40 shadow-white/10 w-full">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to={'/'}>
                        <div className="flex items-center space-x-4">
                            <img src={logo} alt="logo" className="md:w-28 w-32" />
                            <div className="hidden xl:flex text-3xl font-bold text-Myprimary uppercase">
                                My Car
                            </div>
                        </div>
                    </Link>

                    {/* Search */}
                    <div className={`md:flex hidden md:w-[16rem]  sm:px-5 items-center border rounded-full gap-3 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}>
                        <NavbarSearch />
                    </div>

                    {/* Desktop Menu */}
                    <div className='flex items-center gap-4'>
                        <div className="hidden xl:flex space-x-6">
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center gap-3
                                ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <Link to={'/'} className='cursor-pointer hover:text-Myprimary transition'>
                                        {t('Home')}
                                    </Link>

                                    <Link to={'/cars'} className='cursor-pointer hover:text-Myprimary transition'>
                                        {t("Cars")}
                                    </Link>

                                    <Link to={'/services'} className='cursor-pointer hover:text-Myprimary transition'>
                                        {t("Services")}
                                    </Link>

                                    <Link to={'/blogs'} className='cursor-pointer hover:text-Myprimary transition'>
                                        {t("Blogs")}
                                    </Link>

                                    <Link to={'/aboutUs'} className='cursor-pointer hover:text-Myprimary transition'>
                                        {t("About Us")}
                                    </Link>

                                    <Link to={'/contactUs'} className='cursor-pointer hover:text-Myprimary transition'>
                                        {t("Contact Us")}
                                    </Link>
                                </div>

                                {/* زر اللغة */}
                                <Select />

                                {isLoggedIn ? (
                                    <UserList />
                                ) : (
                                    <Link
                                        to="/signin"
                                        className="w-fit px-2 border border-white rounded-md py-1 text-center hover:shadow-[0_0_10px_#d6cb21] hover:border-Myprimary outline-none transition hover:text-Myprimary text-nowrap "
                                    >
                                        {t('Sign In')}
                                    </Link>
                                )}

                            </div>
                        </div>

                        <div className='md:flex xl:hidden hidden items-center gap-3'>
                            <button
                                onClick={toggleSidebar}
                                className="flex items-center justify-center gap-1 px-6 h-[36px] text-sm rounded-full text-black font-medium  bg-Myprimary transition hover:bgprimaryHover">
                                {t('Filters')}
                            </button>
                            {/* زر اللغة */}
                            <Select />

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

                        <button
                            onClick={toggleSidebar}
                            className="hidden xl:flex p-2 text-gray-700 hover:text-Myprimary transition text-2xl"
                        >
                            <SlidersHorizontal size={20} />

                        </button>
                     
                        <div className="lg:hidden flex items-center gap-2">
                            <button
                                onClick={toggleSidebar}
                                className="flex md:hidden items-center justify-center gap-1 px-6 h-[36px] text-sm rounded-full text-black font-medium  bg-Myprimary transition hover:bgprimaryHover">
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
                        <div className="xl:hidden flex items-center">

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
                <div className="lg:hidden bg-[#121212] px-4 py-4 space-y-2 shadow-md flex flex-col">
                    <Link to={'/'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Home")}
                    </Link>

                    <Link to={'/cars'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Cars")}
                    </Link>

                    <Link to={'/services'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Services")}
                    </Link>

                    <Link to={'/blogs'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Blogs")}
                    </Link>

                    <Link to={'/aboutUs'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("About Us")}
                    </Link>

                    <Link to={'/contactUs'} className='cursor-pointer hover:text-Myprimary transition'>
                        {t("Contact Us")}
                    </Link>

                    <div className='md:hidden flex'>
                        <MenuList isMobile={true} />
                    </div>

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
