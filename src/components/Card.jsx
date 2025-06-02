import typeCar from '../assets/type.svg';
import location from '../assets/location.svg';
import { Link } from 'react-router-dom';
import img from '../assets/image.webp';
import { useTranslation } from 'react-i18next';
import { Gauge } from 'lucide-react';
import { CalendarDays } from "lucide-react";
import LikeButton from './LikeButton';

const Card = ({ car, favoriteIds }) => {

    const { t, i18n } = useTranslation('msg');

    if (!car) return null;
    const handleLikeClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <Link to={`/details/${car.id}`} className='w-[75%] xs:w-full sm:w-[60%] md:w-[47%] lg:w-[30%]' dir={i18n.language === 'ar' ? 'ltr' : 'ltr'}>
            <div className="border-[1px] border-Myprimary rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl relative">
                <img
                    src={car.image || img}
                    alt={car.name || t('car.image_alt')}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-3xl"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div
                    className="absolute top-6 right-6 z-10 bg-black/60 rounded-full w-8 h-8 flex justify-center items-center"
                    onClick={handleLikeClick}
                >
                    <LikeButton
                        itemType="car"
                        itemId={car.id}
                        isFavorite={favoriteIds.includes(car.id)}
                    />
                </div>
                <div className="md:p-2 mt-1">
                    <div className="flex justify-between items-center border-b border-white/30 pb-4">
                        <h3 className="text-2xl font-semibold text-Myprimary">
                            {car.name || t('car.name_not_available')}
                        </h3>
                        <p className="text-xl font-semibold">
                            {car.price != null ? `${car.price.toLocaleString()}$` : t('car.price_not_available')}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 flex-wrap gap-y-2 text-sm">
                        <div className="flex items-center gap-1">
                            <Gauge className="text-Myprimary w-4 h-4" />
                            <p>{car.odometer != null ? `${car.odometer.toLocaleString()} km` : t('car.distance_not_available')}</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <CalendarDays className="text-Myprimary w-4 h-4" />
                            <p>{car.year_production || t('car.year_not_available')}</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <img src={typeCar} alt={t('car.transmission')} />
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
                            <img src={location} alt={t('car.location')} />
                            <p>{car.city?.name || t('car.location_not_available')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );

};

export default Card;
