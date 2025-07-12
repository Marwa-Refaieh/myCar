import React from 'react';
import { Star, Calendar, MapPin, Settings, Gauge } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ConfirmDeleteCard({ carTitle , carImage,  carPrice,  carKm , carLocation , carYear, carType ,  onConfirm, onCancel }) {
  const { t, i18n } = useTranslation('fav'); 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1C] text-white rounded-2xl p-6 w-[500px]">
        {/* صورة السيارة + معلومات */}
        <div className="flex flex-col md:flex-row items-start gap-4 border border-gray-600 rounded-xl p-4">
          <img
            src={carImage}
            alt={carTitle}
            className="w-full md:w-40 h-28 object-cover rounded-xl"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold">{carTitle}</h2>
            <p className="text-[#D9D9D9]">{carPrice} SYP per day</p>

          </div>
        </div>

        {/* التفاصيل */}
        <div className="flex justify-between text-sm text-gray-300 mt-4 px-1">
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            {carKm}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {carYear}
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            {carType}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {carLocation}
          </div>
        </div>

        {/* الأزرار */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onCancel}
            className="border border-Myprimary text-Myprimary px-6 py-2 rounded-full font-semibold hover:bg-yellow-600 hover:text-black transition"
          >
            {t('Cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="bg-Myprimary text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
          >
            {t('Yes, Remove')}
          </button>
        </div>
      </div>
    </div>
  );
}
 