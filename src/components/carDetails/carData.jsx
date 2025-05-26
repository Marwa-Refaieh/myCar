import React from 'react';
import location from '../../assets/location.png';
import LikeButton from '../LikeButton';
import { useTranslation } from 'react-i18next';

const CarData = ({ car }) => {
    const { t, i18n } = useTranslation('home');

    if (!car) return null;

    const displayValue = (value, fallbackKey) => {
        if (value === null || value === undefined || value === '') {
            return t(fallbackKey);
        }
        return value;
    };

    return (
        <div>
            <small className="text-sm text-Myprimary">
                {car.available === 1 ? t("Available") : t("Not Available")}
            </small>

            <div className={`flex justify-between items-center ${i18n.language === 'ar' ? 'pl-10' : 'pr-10'}`}>
                <h4 className="text-2xl">{displayValue(car.name, "name not available")}</h4>
                <LikeButton
                    itemType="car"
                    itemId={car.id}
                    initialLiked={car.is_favorite}
                />
            </div>

            <p className="py-4 text-white whitespace-pre-line">
                {displayValue(car.description, "description not available")}
            </p>

            <p className="pt-2">
                {t("Rental Price")} : SYP {car.price ? car.price.toLocaleString() : 
                t("price not available")} /{' '}
                <span className="text-Myprimary">
                    {car.price_type === 1 ? t("day") : car.price_type === 2 ? t("month") : 
                    t("price type not available")}
                </span>
            </p>

            <div>
                <h4 className="text-Myprimary text-2xl py-3">{t("What’s included?")}</h4>
                <div className="flex flex-col gap-3">
                    <p>
                        {t("Odometer")}: <span className="text-white/50">{car.odometer ? car.odometer.toLocaleString() + ' km' : t("distance not available")}</span>
                    </p>
                    <div>
                        <p>{t("Tax and Insurance")}</p>
                        <p className="text-white/50">
                            {car.tax_and_insurance
                                ? t("Our prices include mandatory taxes such as VAT, Vehicle licensing Fee.")
                                : t("No tax or insurance included.")}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <p className='text-Myprimary text-2xl py-3'>{t("Location")}</p>
                <div className='flex gap-2 items-center'>
                    <img src={location} alt='location icon' className='w-6' />
                    <p>{car.city?.name || t("location not available")}</p>
                </div>
            </div>
        </div>
    );
};

export default CarData;
