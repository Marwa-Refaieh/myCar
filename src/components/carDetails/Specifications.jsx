import React from 'react';
import calender from '../../assets/carDetails/calender.png';
import gas from '../../assets/carDetails/gas.png';
import fuel from '../../assets/carDetails/fuel.png';
import status from '../../assets/carDetails/status.png';
import carIcon from '../../assets/carDetails/car.png';
import colorIcon from '../../assets/carDetails/color.png';
import door from '../../assets/carDetails/door.png';
import carSeat from '../../assets/carDetails/car-seat.png';
import gasPump from '../../assets/carDetails/gas-pump.png';
import engine from '../../assets/carDetails/engine.png';
import cylinder from '../../assets/carDetails/cylinder.png';
import { useTranslation } from 'react-i18next';
import namer from 'color-namer';

const Specifications = ({ car }) => {
    const { t } = useTranslation('home');



    const specs = [
        { icon: calender, label: t("Year"), value: car.year_production },
        {
            icon: gas,
            label: t("Transmission"),
            value:
                car.transmission_type === 1 ? t("Automatic") :
                    car.transmission_type === 2 ? t("Electric") :
                        car.transmission_type === 3 ? t("Manual") :
                            t("Unknown")
        },
        {
            icon: fuel,
            label: t("Fuel Type"),
            value:
                car.fuel_type === 1 ? t("Petrol") :
                    car.fuel_type === 2 ? t("Diesel") :
                        car.fuel_type === 3 ? t("Electric") :
                            t("Unknown")
        },

        { icon: status, label: t("Status"), value: car.available === 1 ? t("Available") : t("Not Available") },
        {
            icon: carIcon,
            label: t("Type"),
            value: car.type === 1 ? t("Buy") : car.type === 2 ? t("Rental") : t("Unknown")
        },

        {
            icon: colorIcon,
            label: t("Color"),
            value: (() => {
                const argb = Number(car.color);
                const rgb = argb & 0xFFFFFF;
                const hex = `#${rgb.toString(16).padStart(6, '0')}`;
                const name = namer(hex).ntc[0].name;
                return name || hex;
            })()
        },

        { icon: door, label: t("Doors"), value: car.doors },
        { icon: carSeat, label: t("Seats"), value: car.seats },
        { icon: gasPump, label: t("Horsepower"), value: car.horsepower },
        { icon: engine, label: t("Engine Size"), value: `${car.engine_size} cc` },
        { icon: cylinder, label: t("Cylinders"), value: car.engine_cylinder },
    ];


    return (
        <div>
            <p className='text-2xl mb-5 mt-8'>{t("Specifications")}</p>
            <div className='flex flex-wrap justify-center md:justify-start gap-6'>
                {
                    specs.map((item, index) => (
                        <div key={index} className='border border-Mycard w-32 h-32 rounded-lg flex justify-center items-center flex-col gap-2 bg-MyOption'>
                            <img src={item.icon} alt={item.label} className='w-6' />
                            <p>{item.label}</p>
                            <p className='text-white/50 text-sm text-center break-words'>{item.value}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Specifications;
