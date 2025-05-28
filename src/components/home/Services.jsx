import React from 'react';
import buy from '../../assets/home/buy.webp';
import sell from '../../assets/home/sell.webp';
import rent from '../../assets/home/rent.webp';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t } = useTranslation('home');
    const images = [
        { src: buy, alt: 'Buy a car', title: t('buy') },
        { src: sell, alt: 'Sell a car', title: t('sell') },
        { src: rent, alt: 'Rent a car', title: t('rent' ) },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-10 pt-10 md:py-10 mt-10">
            {images.map((img, index) => (
                <div
                    key={index}
                    className="group w-[23rem] h-96 [perspective:1000px]"
                >
                    <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                        {/* Front */}
                        <div className="absolute w-full h-full [backface-visibility:hidden]">
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover rounded-md shadow-xl"
                            />
                            <div className="absolute bottom-8 left-8  text-6xl font-bold drop-shadow-md uppercase text-Myprimary ">
                                {img.title}
                            </div>
                        </div>

                        {/* Back */}
                        <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-MyOption rounded-xl shadow-xl flex items-center justify-center [transform-style:preserve-3d]">
                            <div className="[transform:translateZ(150px)] text-center">
                                <Link to={'/cars'} state={{ defaultTab: img.title }}>
                                    <button className="text-black text-sm rounded-full font-semibold bg-Myprimary px-6 py-2  hover:bg-primaryHover transition relative underline uppercase">
                                        {t("Order Now")}
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Services;
