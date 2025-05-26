import Card from '@/components/Card';
import Hero2 from '@/components/Hero2';
import Title from '@/components/Title';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NewArrival = () => {
    const { t } = useTranslation(['home', 'msg']);
    const [newCars, setNewCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/home')
            .then(response => {
                setNewCars(response.data.data.latest_cars || []);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(t('cars.Failed to fetch data', { ns: 'msg' }));
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
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title={t("New Arrival")} />
                <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                    {newCars.map((car) => (
                        <Card key={car.id} car={car} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewArrival;
