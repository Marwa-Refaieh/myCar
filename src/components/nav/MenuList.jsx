import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function MenuList() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer hover:text-Myprimary transition inline-flex items-center gap-1">
          Pages
          <ChevronDown className="w-4 h-4" />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-5 bg-[#212120] border-none text-white p-2 rounded-sm">
        <DropdownMenuItem asChild>
          <Link to="/favorite" className="w-full">Favorite</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/create" className="w-full">Create Car</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="w-full">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/setting" className="w-full">Setting</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
