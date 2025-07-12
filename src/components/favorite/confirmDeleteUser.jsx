import React from 'react';
import { useTranslation } from 'react-i18next';
export default function ConfirmDeleteUser({
  image,
  name,
  following,
  followers,
  reviews,
  onConfirm,
  onCancel, 
}) {
  const { t, i18n } = useTranslation('fav'); 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1E1E1E] text-white rounded-2xl p-6 w-full max-w-md text-center space-y-4 shadow-xl">

        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-2 border-white"
          />
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold">@{name}</h3>

        {/* Follow stats */}
        <div className="flex justify-center space-x-8 text-sm">
          <div>
            <p className="font-semibold">{following}</p>
            <p className="text-gray-400">{t('Following')}</p>
          </div>
          <div>
            <p className="font-semibold">{followers}</p>
            <p className="text-gray-400">{t('Followers')}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-center items-center space-x-1">
          <span className="text-sm text-gray-500"><b>{t('email')} :</b>{reviews} </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 pt-2">
          <button
            onClick={onCancel}
            className="border border-Myprimary text-Myprimary px-6 py-2 rounded-full hover:bg-yellow-500 hover:text-black transition"
          >
            {t('Cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="bg-Myprimary text-black px-6 py-2 rounded-full hover:bg-yellow-300 transition"
          >
            {t('Yes, Remove')}
          </button>
        </div>
      </div>
    </div>
  );
}
