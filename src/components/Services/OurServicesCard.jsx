import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

const OurServicesCard = ({ number, title, question, text, soon }) => {
    const { i18n } = useTranslation('services');

    return (
        <div className=" text-white basis-full sm:basis-[48%] md:basis-[45%] lg:basis-[30%] 
     border-MyOption border-2 rounded-lg overflow-hidden">

            <div
                className={`relative text-white text-[1.5rem] md:text-[2rem] font-bold uppercase ${i18n.language === 'ar' ? 'mr-4 pr-2' : 'ml-4 pl-2'
                    } before:content-[''] before:absolute ${i18n.language === 'ar' ? 'before:right-0' : 'before:left-0'
                    } before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-5 before:bg-yellow-400`}
            >
                {number}
            </div>


            <div className="w-full p-4 md:p-5 bg-gradient-to-t from-black/80 to-transparent ">
                <h3 className="text-xl md:text-[1.4rem] font-bold mb-1 uppercase text-Myprimary">{title} <span className='text-white'>{soon}</span></h3>
                <h3 className="text-sm md:text-xl font-semibold mb-1 mt-2 ">{question}</h3>
                <p className="text-xs md:text-sm text-white/60 mb-3 md:mb-4">{text}</p>
            </div>
        </div>
    );

};

export default OurServicesCard;
