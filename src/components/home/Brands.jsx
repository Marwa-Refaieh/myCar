import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

const Brands = () => {
    const { t, i18n } = useTranslation('msg');
    const navigate = useNavigate();
    const swiperKey = i18n.language === 'ar' ? 'ar' : 'en';
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chunkSize, setChunkSize] = useState(8);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/car-features/get-brands')
            .then(res => {
                setBrands(res.data.data);
                setLoading(false);
            })
            .catch(() => {
                setError(t('cars.Failed to fetch data'));
                setLoading(false);
            });
    }, [t]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setChunkSize(4);
            else if (window.innerWidth < 1024) setChunkSize(6);
            else setChunkSize(8);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = (id, name) => {
        navigate(`/brand/${id}`, { state: { name } });
    };

    const brandChunks = chunkArray(brands, chunkSize);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="flex gap-2">
                    <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <p className="text-center text-red-500 text-3xl">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 relative">

            <div
                id="prev-button"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2  shadow rounded-full md:flex hidden"
            >
                <svg
                    className="w-6 h-6 text-Myprimary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div
                id="next-button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 shadow rounded-full md:flex hidden"
            >
                <svg
                    className="w-6 h-6 text-Myprimary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>

            <div
                id="custom-pagination"
                className="absolute bottom-2 left-0 right-0 flex justify-center z-10"
            ></div>

            <Swiper
                key={swiperKey}
                modules={[Navigation, Pagination]}
                navigation={{
                    nextEl: i18n.language === 'ar' ? '#prev-button' : '#next-button',
                    prevEl: i18n.language === 'ar' ? '#next-button' : '#prev-button',
                }}
                pagination={{
                    el: '#custom-pagination',
                    clickable: true,
                }}
                spaceBetween={30}
                slidesPerView={1}
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            >
                {brandChunks.map((chunk, index) => (
                    <SwiperSlide key={index}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 justify-items-center lg:px-20">
                            {chunk.map((brand) => (
                                <div
                                    key={brand.id}
                                    onClick={() => handleClick(brand.id, brand.name)}
                                    className="flex flex-col items-center justify-center cursor-pointer w-full max-w-[180px]"
                                >
                                    <div className=" relative border-2 border-Mycard rounded-3xl overflow-hidden shadow-md w-full h-36 transition flex justify-center p-2">
                                        <img src={brand.logo} alt={brand.name} className="w-[70%] h-[80%] object-contain" />
                                        <p className="text-[16px] text-center absolute bottom-4 left-[50%] -translate-x-[50%] w-full">
                                            {brand.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <style>
                {`
                #custom-pagination {
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    z-index: 10;
                }
                .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    border: 1px solid #ffff;
                    opacity: 1;
                    margin: 0 6px;
                    border-radius: 50%;
                    transition: background 0.3s;
                    cursor: pointer;
                }
                .swiper-pagination-bullet-active {
                    background: #F1EA28;
                }
            `}
            </style>

        </div>
    );
};

export default Brands;
