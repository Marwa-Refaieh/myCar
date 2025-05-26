import { useSidebar } from '../context/SidebarContext';
import logo from '../assets/logo.png';
// import image from '../assets/image.webp';
import { FiAlignJustify } from "react-icons/fi";
import { SlidersHorizontal } from "lucide-react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavbarSearch from './nav/Search';
import MenuList from './nav/MenuList';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { toggleSidebar } = useSidebar();
    const { t, i18n } = useTranslation('home');
    const [isOpen, setIsOpen] = useState(false);

    const handleLangChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };
    return (

        <nav className="bg-Mybackground shadow-lg fixed top-0 z-40 shadow-white/10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <img src={logo} alt="logo" className="md:w-28 w-32" />
                        <div className="hidden lg:flex lg:text-3xl font-bold text-Myprimary uppercase">
                            My Car
                        </div>
                    </div>

                    {/* Search */}
                    <div className="w-full sm:w-80 md:w-[20rem] px-3 mr-2 sm:px-5 flex items-center border rounded-full gap-3">
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

                                <MenuList />
                                {/* زر اللغة */}
                                <select
                                    onChange={(e) => handleLangChange(e.target.value)}
                                    value={i18n.language}
                                    className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-white hover:border-Myprimary focus:outline-none"
                                >
                                    <option value="en" className='text-black'>English</option>
                                    <option value="ar" className='text-black'>العربية</option>
                                </select>

                                <Link
                                    to={'/signin'}
                                    className="w-fit px-2 border border-white rounded-md py-1 text-center hover:shadow-[0_0_10px_#d6cb21] hover:border-Myprimary outline-none transition hover:text-Myprimary"
                                >
                                    {t('Sign In')}
                                </Link>
                            </div>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 text-gray-700 hover:text-Myprimary transition text-2xl"
                        >
                            <SlidersHorizontal size={20} />

                        </button>
                    </div>


                    {/* <img
                        src={image}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover cursor-pointer border-2  border-Myprimary"
                    /> */}


                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <FiAlignJustify size={24} />}
                        </button>
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

                       <MenuList isMobile={true} />

                    <Link
                        to={'/signin'}
                        className="w-20 border border-white rounded-md py-1 text-center hover:shadow-[0_0_10px_#d6cb21] hover:border-Myprimary outline-none transition hover:text-Myprimary"
                    >
                        {t('Sign In')}
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
