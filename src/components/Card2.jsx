import React from 'react';
import { Link } from 'react-router-dom';
import distance from '../assets/distance.svg';
import calender from '../assets/calender.svg';
import typeCare from '../assets/type.svg';
import img from '../assets/image.webp';
import locationIcon from '../assets/location.svg';
import { Star } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Card2 = ({ car }) => {
    const { t,i18n } = useTranslation('msg');

    return (
        <div  dir={i18n.language === 'ar' ? 'ltr' : 'ltr'} className="xs:w-full w-[60%] md:w-[30%] lg:w-[28%] rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer  transition-all duration-300 hover:shadow-xl bg-[#121212]">
            <Link to={`/details/${car.id}`}>
                <img
                    src={car.image || car.images?.[0] || img}
                    alt={car.name}
                    className="w-full h-44 object-cover rounded-3xl"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />

            </Link>

            <div className="p-4 pb-0 space-y-2">
                <div className="flex flex-wrap justify-between items-center">
                    <h3 className="text-2xl font-semibold text-Myprimary">{car.name}</h3>
                </div>

                <div className="flex items-center justify-between pt-1 flex-wrap border-b border-white/30 pb-4">
                    <div className='w-[45%]'>
                        <div className="flex items-center gap-1">
                            <img src={distance} alt="Distance" className='w-3 text-icon' />
                            <p>{car.odometer?.toLocaleString()} KM</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={calender} alt="Calender" className='w-3 text-icon' />
                            <p>{car.year_production}</p>
                        </div>
                    </div>

                    <div className='w-[45%]'>
                        <div className="flex items-center gap-1">
                            <img src={typeCare} alt="TypeCare" className='w-3 text-icon' />
                            <p>
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
                            <p>{car.city?.name || 'Unknown'}</p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <p className='text-white/50'>price: {car.price?.toLocaleString()} $</p>
                    <div className='flex items-center text-sm gap-1'>
                        <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
                        <p className='text-white/50'>{car.rating || 0} Rating</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Card2;
