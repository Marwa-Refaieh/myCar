import {

    HelpCircle,

  } from "lucide-react";
  import { useState , useEffect } from "react";
  import axios from "axios";
  import { baseUrl } from "@/baseUrl";
export default function FaqItem() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/getFAQs`);
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
  <div className="flex gap-2">
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
  </div>
</div>


if(data.length == 0) return <div className="bg-[#232321] p-3 rounded-xl text-right w-full md:w-[40%] mx-auto">
     <h2 className="text-center">not found quastion</h2>
</div>
console.log(data);
  return (
<div>
  {data.amp((item) =>{
    return     <div key={item.id} className="bg-[#232321] p-3 rounded-xl text-right w-full md:w-[40%] mx-auto">
    <div className="flex items-center gap-2 mb-1">
      <HelpCircle className="text-green-500 w-4 h-4" />
      <span className="font-bold text-white text-sm">{item.title}</span>
    </div>
    <p className="text-gray-300 text-xs pr-6">{item.body}</p>
  </div>
  })}
</div>
  );
}