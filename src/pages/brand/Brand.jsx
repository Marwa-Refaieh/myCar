import Card from '@/components/Card';
import Hero2 from '@/components/Hero2';
import Title from '@/components/Title';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Brand = () => {
    const { t } = useTranslation('msg');
    const location = useLocation();
    const name = location.state?.name;
    const { id } = useParams();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/car')
            .then(res => {
                const allCars = res.data.data;
                const filteredCars = allCars.filter(car => car.brand.id == id);
                setCars(filteredCars);
                setLoading(false);

            })
            .catch(() => {
                setError(t('cars.Failed to fetch data'));
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="flex space-x-2">
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
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title={name} />
                <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                    {cars.length > 0 ? (
                        cars.map((car) => (
                            <Card key={car.id} car={car} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-3xl">
                            {t("cars.No cars available for this brand")}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Brand;
