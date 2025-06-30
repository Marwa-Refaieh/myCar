import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Hero2 from "../../components/Hero2";
import Card from "@/components/Card";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import useFetchFavorites from "@/hooks/getFavCars";
import { buildFiltersArray } from "@/utils/filterFunctions";

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
                
                {!loading && !error && (
                    <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                        {filteredCars.map((car, index) => (
                            <Card key={index} car={car} favoriteIds={favoriteIds} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Filters;
