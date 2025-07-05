import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { MdLanguage } from "react-icons/md";


export default function MenuList({ isMobile = false }) {
  const { t, i18n } = useTranslation('home');
  const [isOpen, setIsOpen] = useState(false);

  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    setLanguage(lang);
    setIsOpen(false);
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ];

  if (isMobile) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="flex items-center rounded-full text-black font-medium  bg-Myprimary transition hover:bgprimaryHover px-3 gap-1 h-[36px] text-sm "
        >
          <MdLanguage size={20} />
          <span className="capitalize text-sm">
            {languageOptions.find(opt => opt.value === language)?.label}
          </span>
        </button>

        <div
          className={`
            pl-4 space-y-1 overflow-hidden transition-all 
            ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          {languageOptions.map((opt) => (
            <p
              key={opt.value}
              onClick={() => handleLanguageChange(opt.value)}
              className={`flex flex-col hover:text-Myprimary cursor-pointer transition ${opt.value === language ? 'text-Myprimary' : ''
                }`}
            >
              {opt.label}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // return (
  //   <DropdownMenu modal={false}>
  //     <DropdownMenuTrigger asChild>
  //       <span className="cursor-pointer hover:text-Myprimary transition inline-flex items-center gap-1">
  //         {t("Pages")}
  //         <ChevronDown className="w-4 h-4" />
  //       </span>
  //     </DropdownMenuTrigger>

  //     <DropdownMenuContent className="w-48 mt-5 bg-[#212120] border-none text-white p-2 rounded-sm">
  //       <DropdownMenuItem asChild>
  //         <Link to="/favorite" className="w-full">{t("Favorite")}</Link>
  //       </DropdownMenuItem>
  //       <DropdownMenuItem asChild>
  //         <Link to="/create" className="w-full">Create Car</Link>
  //       </DropdownMenuItem>
  //       <DropdownMenuItem asChild>
  //         <Link to="/profile" className="w-full">{t("Profile")}</Link>
  //       </DropdownMenuItem>
  //       <DropdownMenuItem asChild>
  //         <Link to="/setting" className="w-full">{t("Setting")}</Link>
  //       </DropdownMenuItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
}
