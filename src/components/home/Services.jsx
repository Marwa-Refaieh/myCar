import React from 'react';
import buy from '../../assets/home/buy.webp';
import sell from '../../assets/home/sell.webp';
import rent from '../../assets/home/rent.webp';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t } = useTranslation('home');
    const images = [
        { src: buy, alt: 'Buy a car', title: t('buy'), type: '1' },
        { src: rent, alt: 'Rent a car', title: t('rent'), type: '2' },
        { src: sell, alt: 'Sell a car', title: t('sell'), type: 'sell' },
    ];


    return (
        <>
            <div className="hidden md:flex flex-wrap justify-center gap-10 pt-10 md:py-10 mt-10">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="group w-[23rem] h-96 [perspective:1000px]">
                        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                            {/* Front */}
                            <Link to='/'>
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
                            </Link>

                            {/* Back */}
                            <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-MyOption rounded-md shadow-xl flex items-center justify-center [transform-style:preserve-3d]">
                                <div className="[transform:translateZ(150px)] text-center">
                                    {img.title !== t('sell') ? (
                                        <Link to={'/cars'} state={{ type: img.type }}>
                                            <button className="text-black text-sm rounded-full font-semibold bg-Myprimary px-6 py-2 hover:bg-primaryHover transition relative underline uppercase">
                                                {t("Order Now")}
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link to={'/create'} state={{ type: img.type }}>
                                            <button
                                                className="text-black text-sm rounded-full font-semibold  cursor-pointer bg-Myprimary px-6 py-2 hover:bg-primaryHover transition relative underline uppercase">
                                                {t("Create Car")}
                                            </button>
                                        </Link>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div >

            <div className='md:hidden flex flex-col md:flex-row flex-wrap gap-6 md:gap-10 justify-center items-center mx-auto mt-12 w-full md:w-fit'>

                <div>
                    <Link to={'/create'}
                        className='text-black rounded-full bg-Myprimary px-8 md:px-12 font-bold py-3 hover:bg-primaryHover transition uppercase text-center block'
                    >
                        {t("Sale Your Car With Us")}
                    </Link>
                </div>

                <div className='flex flex-wrap gap-4 justify-center'>
                    <Link to={'/cars'} state={{ type: 1 }}>
                        <button className="rounded-full font-semibold border border-Myprimary px-10 py-2 hover:bg-primaryHover transition uppercase">
                            {t("Buy")}
                        </button>
                    </Link>

                    <Link to={'/cars'} state={{ type: 2 }}>
                        <button className="rounded-full font-semibold border border-Myprimary px-10 py-2 hover:bg-primaryHover transition uppercase">
                            {t("Rent")}
                        </button>
                    </Link>
                </div>

            </div>


        </>

    );
};

export default Services;
