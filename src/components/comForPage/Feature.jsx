import React from 'react';
import {Globe, Clock, Rocket, LineChart,Handshake , Shield} from 'lucide-react';

const features = [
  { icon: <Shield />, title: 'Trust & Transparency' , content : "We believe in honest communication and verified listings. No hidden details. No fake offers. What you see is what you get." },
  { icon: <Rocket />, title: 'Innovation & Simplicity' , content : "We use smart tools and a clean interface to make your car journey smooth—whether you’re buying, selling, or renting" },
  { icon: <Handshake />, title: ' Customer First' , content :"Your satisfaction is our top priority. We listen, we care, and we’re always ready to help" },
  { icon: <Clock />, title: ' Speed & Efficiency' ,content : "Time matters. We help you get results faster—whether you're finding a car or closing a deal." },
  { icon: <Globe />, title: 'Community & Local Support' , content : "We are proudly based in Syria and committed to supporting local users, businesses, and dealers with reliable, localized service." },
  { icon: <LineChart />, title: 'Growth & Responsibility' , content  : "We’re here for the long run. We grow with our users and take responsibility for building a safe, fair, and valuable marketplace for everyone" },
];

const Feature = () => {
  return (
    <section className="bg-black text-white py-12 px-4">
      <h2 className='w-fit mx-auto text-3xl md:text-7xl text-center mb-8'>
       Our core values
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="border bg-[#111] border-[#f8f8f820] hover:border-[#f1ea28]  rounded-md p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            <div className="bg-[#f1ea28]  w-10 h-10 flex items-center justify-center rounded">
              {React.cloneElement(item.icon, { className: 'text-black w-5 h-5' })}
            </div>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm text-gray-300">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section> 
  );
};

export default Feature;
