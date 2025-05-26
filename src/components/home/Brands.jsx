import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Brands = () => {
    const { t } = useTranslation('msg');

    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/home')
            .then(res => {
                setBrands(res.data.data.brands);
                setLoading(false);
            })
            .catch(() => {
                setError(t('cars.Failed to fetch data'));
                setLoading(false);
            });
    }, []);

    const handleClick = (id, name) => {
        navigate(`/brand/${id}`, { state: { name } });
    };

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center w-full">
            {brands.map((brand) => (
                <div
                    key={brand.id}
                    onClick={() => handleClick(brand.id, brand.name)}
                    className="flex flex-col items-center justify-center cursor-pointer"
                >
                    <div
                        className="relative rounded-2xl overflow-hidden
                        hover:scale-110 transition-transform duration-300 ease-in-out shadow-md w-32 h-32"
                    >
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Brands;
