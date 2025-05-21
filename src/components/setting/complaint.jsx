import React from 'react'
import { Link } from 'react-router-dom';
export default function Complaint({id , date , status}) {
    const statusStyles = {
        "Under Study": {
          color: "text-blue-500",
          border: "border-blue-500",
          icon: "🌀",
        },
        "Completed": {
          color: "text-green-500",
          border: "border-green-500",
          icon: "✅",
        },
        "Not clarification": {
          color: "text-red-500",
          border: "border-red-500",
          icon: "❌",
        },
      };
      
   
        const style = statusStyles[status] || {
          color: "text-gray-500",
          border: "border-gray-500",
          icon: "❓",
        };
      
  return (
    <div className=" text-white rounded-xl p-4 shadow-lg mb-4 w-full md:w-[40%] mx-auto bg-[#232321]">
      <p className="text-sm">Complaints Number : <span className="font-semibold">#{id}</span></p>
      <p className="text-sm mt-2">Last Update : <span className="font-semibold">{date}</span></p>
      <div className="flex items-center mt-3">
        <div className={`w-6 h-6 rounded-full border-4 ${style.border} mr-2 flex items-center justify-center text-sm`}>
          <span>{style.icon}</span>
        </div>
        <span className={`${style.color} text-sm`}>{status}</span>
      </div>
      <Link to={`/complaint/${id}`} className="mt-2 text-yellow-400 w-fit cursor-pointer hover:underline">Details</Link>
    </div>
  )
}
