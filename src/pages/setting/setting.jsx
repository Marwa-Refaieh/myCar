import { useState , useEffect } from "react";
import {
  Bell,
  Languages,
  Lock,
  HelpCircle,
  Combine,
  User,
} from "lucide-react";
import SettingItem from "@/components/setting/SettingItem";
import Dropdown from "@/components/setting/Dropdown";
import NotificationItem from "@/components/setting/NotificationItem";
import FaqItem from "@/components/setting/FaqItem";
import { Link } from "react-router-dom";
import Complaint from "@/components/setting/complaint";
import ProfileCard from "@/components/setting/profile";
import Privecy from '@/components/setting/privicy' 
import { useTranslation } from 'react-i18next';


export default function Setting() {
  const {  t , i18n} = useTranslation('settingpage');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // ✅ اختصار للشرط
  }, []); // ✅ فقط مرة واحدة عند mount


  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };



  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

  return (
    <div className="min-h-screen bg-black w-[100%] md:w-[70%] mx-auto font-bold text-white font-sans text-right relative">
      <header className="text-center py-4 text-2xl font-bold">{t('setting')}</header>

      {!isLoggedIn && (
        <div className="flex justify-between items-center bg-gray-900 px-4 py-3 m-2 rounded-xl">
          <span className="text-sm text-gray-300">{t('shouldsignin')}</span>
          <Link to={'/signin2'}
            className="bg-yellow-400 text-black font-bold px-2 md:px-4 py-1 rounded-full"
          >
            {t('signin')}
          </Link>
        </div>
      )}

      <div className="divide-y divide-gray-800 mx-2">
        <SettingItem title={t('noti')} icon={<Bell className="text-yellow-400" />} onClick={() => toggleDropdown("notifications")} />
        {openDropdown === "notifications" && (
          <Dropdown>
            <NotificationItem  />
          </Dropdown>
        )}

        <SettingItem title={t('lang')} icon={<Languages className="text-yellow-400" />} onClick={() => toggleDropdown("language")} />
        {openDropdown === "language" && (
          <Dropdown>
            <div className="flex items-center gap-1 justify-center" onClick={() => handleLangChange('ar')}><label className="  text-right inline py-2" for='ar'>{t('ar')}</label> <input className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-yellow-500 checked:bg-yellow-500" type="radio" name="lang" id="ar" /></div>
            <div className="flex items-center gap-1 justify-center" onClick={() => handleLangChange('en')}><label className="  text-right inline py-2" for='en'>{t('en')}</label> <input className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-yellow-500 checked:bg-yellow-500" type="radio" name="lang" id="en" /></div>

          </Dropdown>
        )}

        <SettingItem title={t('privecy')} icon={<Lock className="text-red-500" />} onClick={() => toggleDropdown("privecy")} />
        {openDropdown === "privecy" && (
          <Dropdown>
                  
                <Privecy/>
     
          </Dropdown>
        )}
        <SettingItem title={t("faq")} icon={<HelpCircle className="text-green-500" />} onClick={() => toggleDropdown("faq")} />
        {openDropdown === "faq" && (
          <Dropdown>
            <FaqItem/>
          </Dropdown>
        )}

        {isLoggedIn && (
          <>
            <SettingItem title={t('profile')} icon={<User className="text-blue-400" />} onClick={() => toggleDropdown("profile")} />
            {openDropdown === "profile" && (
              <Dropdown>
                <ProfileCard
                  image="https://i.pravatar.cc/150?img=3"
                  username="name_y"
                  following={14}
                  followers="1.9K"
                  rating={3.5}
                  reviews={230}
                />
              </Dropdown>
            )}
            <SettingItem title={t('complaints')} icon={<Combine className="text-blue-400" />} onClick={() => toggleDropdown("complaints")} />
            {openDropdown === "complaints" && (
              <Dropdown>
                <Complaint id="123456" date="10 April , 2022" status="Under Study" />
              </Dropdown>
            )}
          </>
        )}
      </div>
    </div>
  );
}





