import {
    Bell,
  } from "lucide-react";
export default function NotificationItem({ title, text }) {
    return (
      <div className="w-full md:w-[40%] mx-auto bg-[#232321] p-3 rounded-xl text-right">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="text-yellow-400 w-4 h-4" />
          <span className="font-bold text-white text-sm">{title}</span>
        </div>
        <p className="text-gray-300 text-xs pr-6">{text}</p>
      </div>
    );
  }