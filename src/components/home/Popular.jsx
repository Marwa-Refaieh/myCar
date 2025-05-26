import React, { useEffect, useState } from 'react';
import Card from '../Card';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Popular = () => {
    const { t } = useTranslation('msg');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/home')
            .then(response => {
                setCars(response.data.data.top_rated_cars || []);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(t('cars.Failed to fetch data'));
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center gap-4 mt-10">
                <div className="w-5 h-5 bg-Myprimary rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-Myprimary rounded-full animate-bounce delay-200"></div>
                <div className="w-5 h-5 bg-Myprimary rounded-full animate-bounce delay-400"></div>
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
            <h2 className="text-5xl font-bold text-center mb-10 text-Myprimary">
                {t("cars.Explore Popular Categories")}
            </h2>
            <div className="flex flex-wrap gap-8 justify-center my-10">
                {cars.map((car) => (
                    <Card key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
};

export default Popular;
