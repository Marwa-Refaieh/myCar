import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Hero2 from "../../components/Hero2";
import Card2 from "@/components/Card2";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import useFetchFavorites from "@/hooks/getFavCars";

const Filters = () => {

    const location = useLocation();
    const filters = location.state?.filters;
    const { t } = useTranslation('msg');
    const [error, setError] = useState(null);

    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(false);

    const [favoriteIds, setFavoriteIds] = useState([]);
    const { data } = useFetchFavorites();

    useEffect(() => {
        if (data && Array.isArray(data.data)) {
            setFavoriteIds(data.data.map(car => car.id));
        }
    }, [data]);

    const buildFiltersArray = (filters) => {

        const result = [];

        if (Array.isArray(filters.features) && filters.features.length > 0) {
            result.push({ name: "features", operation: "in", value: filters.features });
        }

        if (filters.year_production?.from != null && filters.year_production?.to != null) {
            result.push({ name: "year_production", value: filters.year_production });
        }

        if (filters.type) result.push({ name: "type", value: filters.type });
        if (filters.transmission_type) result.push({ name: "transmission_type", value: filters.transmission_type });
        if (filters.body_type) result.push({ name: "body_type", value: filters.body_type });
        if (filters.fuel_type) result.push({ name: "fuel_type", value: filters.fuel_type });
        if (filters.city_id) result.push({ name: "city_id", value: filters.city_id });
        if (filters.model_id) result.push({ name: "model_id", value: filters.model_id });
        if (filters.brand_id) result.push({ name: "brand_id", value: filters.brand_id });

        if (filters.odometer?.from != null && filters.odometer?.to != null) {
            result.push({ name: "odometer", value: filters.odometer });
        }

        if (filters.price?.from != null && filters.price?.to != null) {
            result.push({ name: "price", value: filters.price });
        }

        if (filters.color) result.push({ name: "color", value: filters.color });

        if (filters.horsepower != null) {
            result.push({ name: "horsepower", operation: "eq", value: filters.horsepower });
        }

        return result;
    };

    const fetchFilteredCars = async () => {
        if (!filters) return;

        setLoading(true);
        const Filters = buildFiltersArray(filters);

        try {
            const response = await axios({
                method: "get",
                url: "https://mycarapplication.com/api/car",
                params: {
                    Filters: Filters,
                    orders: filters.orders
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setFilteredCars(response.data.data);
        } catch (error) {
            console.error("Error fetching filtered cars:", error);
            setError(t('searchResults.errorFetching'));
            setFilteredCars([]);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchFilteredCars();
    }, [filters]);

    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title="Filtering Result" />

                {loading &&
                    <div className="flex justify-center items-center h-40">
                        <div className="flex space-x-2">
                            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
                        </div>
                    </div>}

                {!loading && !error && filteredCars.length === 0 && (
                    <div className="flex flex-col items-centerjustify-center my-32 gap-2 text-center">
                        <p className="text-2xl text-gray-400">
                            {t('filterResults.noFilteredResults')}
                        </p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center my-32 gap-2 text-center">
                        <p className="text-2xl text-red-500 font-medium">{error}</p>
                    </div>
                )}

                <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                    {filteredCars.map((car, index) => (
                        <Card2 key={index} car={car} favoriteIds={favoriteIds}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filters;
