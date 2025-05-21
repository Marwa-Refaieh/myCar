import { useState } from "react";
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
import {Privecy} from '@/components/setting/privicy' 
export default function Setting() {
  const items = [
    { title: "العنوان الأول", description: "الوصف الأول" },
    { title: "العنوان الثاني", description: "الوصف الثاني" },
    { title: "العنوان الثالث", description: "الوصف الثالث" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);


  const handleLogout = () => setIsLoggedIn(false);

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-black w-[100%] md:w-[70%] mx-auto text-white font-sans text-right relative">
      <header className="text-center py-4 text-2xl font-bold">الإعدادات</header>

      {!isLoggedIn && (
        <div className="flex justify-between items-center bg-gray-900 px-4 py-3 m-2 rounded-xl">
          <span className="text-sm text-gray-300">سجل الدخول من أجل جميع الخدمات</span>
          <Link to={'/signin2'}
            className="bg-yellow-400 text-black font-bold px-2 md:px-4 py-1 rounded-full"
          >
            تسجيل الدخول
          </Link>
        </div>
      )}

      <div className="divide-y divide-gray-800 mx-2">
        <SettingItem title="الإشعارات" icon={<Bell className="text-yellow-400" />} onClick={() => toggleDropdown("notifications")} />
        {openDropdown === "notifications" && (
          <Dropdown>
            <NotificationItem title="تنبيه جديد" text="تمت إضافة سيارة جديدة إلى المفضلة" />
            <NotificationItem title="صيانة دورية" text="اقترب موعد صيانة سيارتك" />
          </Dropdown>
        )}

        <SettingItem title="اللغة" icon={<Languages className="text-yellow-400" />} onClick={() => toggleDropdown("language")} />
        {openDropdown === "language" && (
          <Dropdown>
            <div className="flex items-center gap-1 justify-center"><label className="  text-right inline py-2" for='ar'>العربية</label> <input className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-yellow-500 checked:bg-yellow-500" type="radio" name="lang" id="ar" /></div>
            <div className="flex items-center gap-1 justify-center"><label className="  text-right inline py-2" for='en'>English</label> <input className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-yellow-500 checked:bg-yellow-500" type="radio" name="lang" id="en" /></div>
          </Dropdown>
        )}

        <SettingItem title="سياسة الخصوصية" icon={<Lock className="text-red-500" />} onClick={() => toggleDropdown("privecy")} />
        {openDropdown === "privecy" && (
          <Dropdown>
                  {items.map((item, index) => (
        <Privecy
          key={index}
          number={index + 1} // <== هذا هو الرقم التلقائي
          title={item.title}
          description={item.description}
        />
      ))}
          </Dropdown>
        )}
        <SettingItem title="الأسئلة الشائعة" icon={<HelpCircle className="text-green-500" />} onClick={() => toggleDropdown("faq")} />
        {openDropdown === "faq" && (
          <Dropdown>
            <FaqItem question="كيف أضيف سيارة؟" answer="يمكنك إضافة سيارة من خلال الضغط على الزر الأصفر في منتصف الشاشة." />
            <FaqItem question="هل التطبيق مجاني؟" answer="نعم، جميع الخدمات الأساسية مجانية." />
          </Dropdown>
        )}

        {isLoggedIn && (
          <>
            <SettingItem title="حسابي" icon={<User className="text-blue-400" />} onClick={() => toggleDropdown("profile")} />
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
            <SettingItem title="الشكاوي" icon={<Combine className="text-blue-400" />} onClick={() => toggleDropdown("complaints")} />
            {openDropdown === "complaints" && (
              <Dropdown>
                <Complaint id="123456" date="10 April , 2022" status="Under Study" />
                <Complaint id="12345655" date="10 April , 2022" status="Completed" />
                <Complaint id="123456" date="10 April , 2022" status="Not clarification" />

              </Dropdown>
            )}
            <button
              className="bg-red-700 mx-auto border-none w-fit mt-16 block text-white font-bold px-2 md:px-4 py-1 rounded-full"
            >
              تسجيل الخروج
            </button>
          </>
        )}
      </div>
    </div>
  );
}





