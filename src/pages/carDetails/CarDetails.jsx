import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ImageGallery from "@/components/carDetails/ImageGallery";
import Hero from "@/components/Hero2";
import Services from "@/components/home/Services";
import CarData from "@/components/carDetails/carData";
import CarTabs from "@/components/carDetails/carTabs";
import { useTranslation } from 'react-i18next';

export default function CarDetails() {
    const { t } = useTranslation('msg');
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://mycarapplication.com/api/car/${id}`)
            .then(res => {
                setCar(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError(t('cars.Failed to fetch data'));
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div>
                <Hero />
                <div className="flex justify-center items-center h-40">
                    <div className="flex space-x-2">
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>

        );
    }
    if (error) {
        return (
            <div>
                <Hero />
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <p className="text-center text-red-500 text-3xl">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Hero />
            <div className='max-w-7xl mx-auto px-4 pt-28 md:pt-16'>
                <div className="flex flex-col items-center lg:items-start gap-10 lg:gap-0 lg:flex-row lg:justify-between">
                    <div className="w-full md:w-[70%] lg:w-[50%]">
                        <ImageGallery images={car.images} carId={car.id} car={car} video={car.video_link}/>
                    </div>
                    <div className="w-[90%] md:w-[70%] lg:w-[40%]">
                        <CarData car={car} />
                    </div>
                </div>
                <CarTabs car={car} />
            </div>
        </>
    );
}
