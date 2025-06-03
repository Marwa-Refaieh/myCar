import Card from '@/components/Card';
import Hero2 from '@/components/Hero2';
import Title from '@/components/Title';
import useFetchFavorites from '@/hooks/getFavCars';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NewArrival = () => {
    const { t } = useTranslation(['home', 'msg']);
    const [newCars, setNewCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [favoriteIds, setFavoriteIds] = useState([]);
    const { data } = useFetchFavorites();

    useEffect(() => {
        if (data && Array.isArray(data.data)) {
            setFavoriteIds(data.data.map(car => car.id));
        }
    }, [data]);

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



    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title={t("New Arrival")} />
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
                <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                    {newCars.map((car) => (
                        <Card key={car.id} car={car} favoriteIds={favoriteIds} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewArrival;
