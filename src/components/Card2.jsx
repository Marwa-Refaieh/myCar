import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import typeCare from '../assets/type.svg';
import img from '../assets/image.webp';
import locationIcon from '../assets/location.svg';
import { CalendarDays, Gauge, Star } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LikeButton from './LikeButton';
import { Pencil } from 'lucide-react';

const Card2 = ({ car, favoriteIds }) => {
    const { t, i18n } = useTranslation('msg');
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const isProfilePage = path.includes("/sellerProfile") || path.includes("/Profile");
    if (!car) return null;
    const handleLikeClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const handleEditClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/updatecar/${car.id}`);
    };
    return (
        <div dir={i18n.language === 'ar' ? 'ltr' : 'ltr'} className="w-[48%] md:w-[30%] lg:w-[28%] rounded-sm md:rounded-3xl p-1 md:p-4 shadow-lg overflow-hidden cursor-pointer  transition-all mb-2 duration-300 hover:shadow-xl bg-[#121212] relative">
            <Link to={`/details/${car.id}`}>
                <img
                    src={car.image || car.images?.[0] || img}
                    alt={car.name}
                    className="w-full h-24 md:h-44 object-cover rounded-3xl"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
            </Link>

            <div
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 bg-black/60 rounded-full w-6 h-6 md:w-8 md:h-8 flex justify-center items-center"
                onClick={handleLikeClick}
            >
                <LikeButton
                    itemType="car"
                    itemId={car.id}
                    isFavorite={favoriteIds.includes(car.id)}
                />
            </div>

            {isProfilePage && (
                <div
                    className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-black/60 rounded-full w-6 h-6 md:w-8 md:h-8 flex justify-center items-center hover:bg-black/80 cursor-pointer"
                    onClick={handleEditClick}
                >
                    <Pencil className="text-white w-4 h-4" />
                </div>
            )}

            <div className="p-0 md:p-4 pb-0 space-y-2">
                <div className="flex flex-wrap justify-between items-center">
                    <h3 className="text-md md:text-2xl font-semibold text-Myprimary">{car.name}</h3>
                </div>

                <div className="flex items-center justify-between pt-1 flex-wrap border-b border-white/30 pb-4">
                    <div className='w-[45%]'>
                        <div className="flex items-center gap-1">
                            <Gauge className="text-Myprimary w-2 h-2 md:w-4 md:h-4" />
                            <p className='text-xs md:text-sm'>{car.odometer?.toLocaleString()}KM</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <CalendarDays className="text-Myprimary  w-2 h-2 md:w-4 md:h-4" />
                            <p className='text-xs md:text-sm'>{car.year_production}</p>
                        </div>
                    </div>

                    <div className='w-[45%]'>
                        <div className="flex items-center gap-1">
                            <img src={typeCare} alt="TypeCare" className='w-3 text-icon' />
                            <p className='text-xs md:text-sm'>
                                {car.transmission_type === 1
                                    ? 'Automatic'
                                    : car.transmission_type === 2
                                        ? 'Electric'
                                        : car.transmission_type === 3
                                            ? 'Manual'
                                            : t('car.transmission_not_available')}
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={locationIcon} alt="Location" className='w-3 text-icon' />
                            <p className='text-xs md:text-sm'>{car.city?.name || 'Unknown'}</p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <p className='text-xs md:text-sm text-white/50'>price:{car.price?.toLocaleString()}$</p>
                    <div className='flex items-center text-xs md:text-sm gap-1'>
                        <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
                        <p className='text-xs md:text-sm text-white/50'>{car.rating || 0} Rating</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Card2;
