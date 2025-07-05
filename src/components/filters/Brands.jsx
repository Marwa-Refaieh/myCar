import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Brands = ({ setFilters, filters, onBrandSelect }) => {
    const { t } = useTranslation('msg');
    const [brandsData, setBrandsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBrandClick = (brandId) => {
        setFilters((prev) => ({
            ...prev,
            brand_id: prev.brand_id === brandId ? null : brandId,
        }));
        if (onBrandSelect) {
            onBrandSelect(brandId);
        }
    };

    useEffect(() => {
        axios
            .get('https://mycarapplication.com/api/car-features/get-brands')
            .then((res) => {
                setBrandsData(res.data.data);
                setLoading(false);
                console.log(res.data.data);
                
            })
            .catch(() => {
                setError(t('cars.Failed to fetch data'));
                setLoading(false);
            });
    }, [t]);

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
      <div className="flex flex-nowrap items-center gap-5 overflow-x-auto max-w-full scrollbar-hide">
    {brandsData.length === 0 && <p>{t('No brands available.')}</p>}
    {brandsData.map((brand, index) => {
        const isActive = filters.brand_id === brand.id;

        return (
            <div
                key={index}
                onClick={() => handleBrandClick(brand.id)}
                className="flex flex-col items-center justify-center cursor-pointer flex-shrink-0"
            >
                <div
                    className={`relative border rounded-2xl overflow-hidden 
                    shadow-md drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] w-20 h-20 transition
                    ${isActive ? 'border-Myprimary shadow-[0_0_15px_1px_rgba(255,235,100,0.3)] bg-[rgba(250,204,21,0.1)]' : 'border-transparent'}`}>
                    <img
                        src={brand.logo}
                        className="w-full h-full object-cover bg-[#121212]"
                    />
                </div>
            </div>
        );
    })}
</div>

    );
};

export default Brands;
