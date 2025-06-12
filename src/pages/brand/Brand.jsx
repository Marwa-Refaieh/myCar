import Card from '@/components/Card';
import Hero2 from '@/components/Hero2';
import Title from '@/components/Title';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import useFetchFavorites from '@/hooks/getFavCars';

const Brand = () => {
    const { t } = useTranslation('msg');
    const location = useLocation();
    const name = location.state?.name;
    const { id } = useParams();
    const [cars, setCars] = useState([]);
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


    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title={name} />
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
                    {!loading && (
                        cars.length > 0 ? (
                            cars.map((car) => (
                                <Card key={car.id} car={car} favoriteIds={favoriteIds} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 text-3xl">
                                {t("cars.No cars available for this brand")}
                            </p>
                        )
                    )}

                </div>
            </div>
        </div>
    );
};

export default Brand;
