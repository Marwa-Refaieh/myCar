import React from 'react'
import { Link } from 'react-router-dom';
import { useState , useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";
export default function Complaint() {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`${baseUrl}api/my-complaints`);
              setData(response.data.data);
            } catch (error) {
              console.error('Error fetching name:', error);
            } finally {
              setLoading(false);
            }
          };
        
          fetchData();
        }, []); 
      
        if (loading) return <div className="flex justify-center items-center h-40">
        <div className="flex space-x-2">
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
        </div>
      </div>
      
      
      if(data.length == 0) return <div className="bg-[#232321] p-3 rounded-xl text-right w-full md:w-[40%] mx-auto">
           <h2 className="text-center">not found notifications</h2>
      </div>
      console.log(data);
      
      
  return (
    <div className=" text-white rounded-xl p-4 shadow-lg mb-4 w-full md:w-[40%] mx-auto bg-[#232321]">
      <p className="text-sm">Complaints Number : <span className="font-semibold">888</span></p>
      <p className="text-sm mt-2">Last Update : <span className="font-semibold">klok</span></p>
      <div className="flex items-center mt-3">
        <div className={`w-6 h-6 rounded-full border-4 border-gray-500 mr-2 flex items-center justify-center text-sm`}>
          <span>❓</span>
        </div>
        <span className={`text-gray-500 text-sm`}>ioi</span>
      </div>
      <Link to={`/complaint/23423`} className="mt-2 text-yellow-400 w-fit cursor-pointer hover:underline">Details</Link>
    </div>
  )
}
