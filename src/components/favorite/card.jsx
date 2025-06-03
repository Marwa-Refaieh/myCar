import React from 'react';
import { MapPin, Calendar, Gauge, Settings  , BadgeX} from 'lucide-react';
import { GiRapidshareArrow } from "react-icons/gi";
import { useState } from 'react';
import ConfirmDeleteCard from '../../components/favorite/confirmDelete';
const CarCard = ({ image, title, price, km, year, type, location  }) => {
    const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-[#212120] text-white  rounded-2xl p-4 mb-5 shadow-lg w-full max-w-md">
      <div className="relative rounded-xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-black rounded-full p-1">
          <svg fill="yellow" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 
              19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="absolute bg-[#212120] cursor-pointer bottom-2 left-2 w-fit bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded text-sm">
         <GiRapidshareArrow className='inline'/> 360
        </div>
      </div>
      <div className="mt-4 relative flex justify-between items-center ">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-xl font-bold">{price} $</p>
      </div>
      <div className="flex flex-wrap mt-3 gap-3 text-sm text-gray-300">
        <div className="flex items-center relative gap-1 before:absolute before:right-0 before:top-0 before:w-1 before:h-full before:bg-white before:content-none">
          <Gauge className="w-4 h-4" />
          <span>{km}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{year}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1 bg-red-600 cursor-pointer rounded-sm py-2 px-4" onClick={() => setShowConfirm(true)}>
  <BadgeX className="w-4 h-4" />
  <span>Remove</span>
</div>

      </div>
      {showConfirm && (
  <ConfirmDeleteCard
    carTitle={title}
    carImage = {image}
    carPrice = {price}
    carKm = {km}
    carLocation = {location}
    carYear = {year}
    carType = {type}
    onConfirm={() => {
      console.log('Item removed:', title);
      setShowConfirm(false);
    }}
    onCancel={() => setShowConfirm(false)}
  />
)}

    </div>
  );
};

export default CarCard;
