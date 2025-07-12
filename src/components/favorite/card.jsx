import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Gauge, BadgeX } from 'lucide-react';
import { GiRapidshareArrow } from "react-icons/gi";
import ConfirmDeleteCard from '../../components/favorite/confirmDelete';
import { baseUrl } from '@/baseUrl';
import axios from 'axios';
import {useNavigate , Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
const CarCard = ({ image, title, price, km, year, type, location , id}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('fav'); 
  return (
    <div className="border-[1px] mb-3 border-Myprimary rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl relative w-fit  bg-black text-white">
      {/* صورة السيارة */}
      <div className="relative rounded-3xl overflow-hidden">
      <Link to={`/details/${id}`} className='w-auto'>
      <img
      src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-3xl"
          style={{ aspectRatio: "600/400", objectFit: "cover" }}
        />
      </Link>
        


        {/* زر الإعجاب */}
        <div className="absolute top-5 right-6 z-10 bg-black/60 rounded-full w-8 h-8 flex justify-center items-center">
          <svg fill="yellow" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 
              19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* مشاركة 360 */}
        <div className="absolute bottom-2 left-2 z-10 bg-black/60 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
          <GiRapidshareArrow className="inline" /> 360
        </div>
      </div>

      {/* العنوان والسعر */}
      <div className="mt-4 flex justify-between items-center border-b border-white/30 pb-4">
        <h3 className="text-2xl font-semibold text-Myprimary">{title}</h3>
        <p className="text-xl font-bold">${price}</p>
      </div>

      {/* التفاصيل */}
      <div className="flex flex-wrap pt-4 gap-y-2 text-sm text-gray-300 justify-between">
        <div className="flex items-center gap-1">
          <Gauge className="text-Myprimary w-4 h-4" />
          <span>{km}</span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar className="text-Myprimary w-4 h-4" />
          <span>{year}</span>
        </div>

        <div className="flex items-center gap-1">
          <MapPin className="text-Myprimary w-4 h-4" />
          <span>{location}</span>
        </div>

        {/* زر الحذف */}
        <div
          className="flex items-center gap-1 bg-red-600 cursor-pointer rounded-md py-1 px-3 text-white"
          onClick={() => setShowConfirm(true)}
        >
          {/* <BadgeX className="w-4 h-4" /> */}
          <span>{t('Delete')}</span>
        </div>
      </div>

      {/* تأكيد الحذف */}
      {showConfirm && (
        <ConfirmDeleteCard
          carTitle={title}
          carImage={image}
          carPrice={price}
          carKm={km}
          carLocation={location}
          carYear={year} 
          carType={type}
          onConfirm={() => {
            try {
              const response =  axios.post(
                `${baseUrl}api/favorites/remove`,
                { car_id: id },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
          
              console.log('Removed successfully:', response.data);
              setShowConfirm(false);
              
                navigate('/')
             
              
            } catch (error) {
              console.error('Error removing favorite:', error);
            }
            
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default CarCard;
 