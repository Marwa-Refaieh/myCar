import {

    HelpCircle,

  } from "lucide-react";
export default function FaqItem({ question, answer }) {
  return (
    <div className="bg-[#232321] p-3 rounded-xl text-right w-full md:w-[40%] mx-auto">
      <div className="flex items-center gap-2 mb-1">
        <HelpCircle className="text-green-500 w-4 h-4" />
        <span className="font-bold text-white text-sm">{question}</span>
      </div>
      <p className="text-gray-300 text-xs pr-6">{answer}</p>
    </div>
  );
}