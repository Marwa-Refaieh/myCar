import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function MenuList({ isMobile = false }) {
  const { t } = useTranslation('home');
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full flex gap-3 items-center text-white hover:text-Myprimary transition"
        >
          <span>{t("Pages")}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <div
          className={`
            pl-4 space-y-1 overflow-hidden transition-all 
            ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <Link to="/favorite" className="block text-sm hover:text-Myprimary transition">
            {t("Favorite")}
          </Link>
          <Link to="/create" className="block text-sm hover:text-Myprimary transition">
            Create Car
          </Link>
          <Link to="/profile" className="block text-sm hover:text-Myprimary transition">
            {t("Profile")}
          </Link>
          <Link to="/setting" className="block text-sm hover:text-Myprimary transition">
            {t("Setting")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer hover:text-Myprimary transition inline-flex items-center gap-1">
          {t("Pages")}
          <ChevronDown className="w-4 h-4" />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-5 bg-[#212120] border-none text-white p-2 rounded-sm">
        <DropdownMenuItem asChild>
          <Link to="/favorite" className="w-full">{t("Favorite")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/create" className="w-full">Create Car</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="w-full">{t("Profile")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/setting" className="w-full">{t("Setting")}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
