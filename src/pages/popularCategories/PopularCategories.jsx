import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Hero2 from '@/components/Hero2';
import Title from '@/components/Title';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const PopularCategories = () => {
    const { t } = useTranslation('home');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/home')
            .then(response => {
                setCars(response.data.data.top_rated_cars);
                setLoading(false);
            })
            .catch(() => {
                setError('An error occurred while fetching data.');
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title={t("Explore Popular Categories")} />

                {loading && (
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <span className="animate-bounce w-5 h-5 bg-Myprimary rounded-full" />
                        <span className="animate-bounce w-5 h-5 bg-Myprimary rounded-full delay-150" />
                        <span className="animate-bounce w-5 h-5 bg-Myprimary rounded-full delay-300" />
                    </div>
                )}

                {error && (
                    <p className="text-red-500 text-center mt-6">{error}</p>
                )}

                {!loading && !error && (
                    <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                        {cars.map((car) => (
                            <Card key={car.id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularCategories;
