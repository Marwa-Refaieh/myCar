import Hero2 from '@/components/Hero2';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import Card from '@/components/Card';
import Title from '@/components/Title';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useFetchFavorites from '@/hooks/getFavCars';
import Sidebar2 from '@/components/Sidebar2';
import { buildFiltersArray, getOrdersFromSort } from '@/utils/filterFunctions';
import { useLocation } from 'react-router-dom';

const Cars = () => {
    const { t, i18n } = useTranslation(['home', 'msg']);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const [hasFetchedCars, setHasFetchedCars] = useState(false);

    const [filters, setFilters] = useState({
        features: [],
        year_production: {
            from: 1970,
            to: null,
        },
        type: null,
        transmission_type: null,
        body_type: null,
        fuel_type: null,
        city_id: null,
        model_id: null,
        brand_id: null,
        odometer: {
            from: 0,
            to: null,
        },
        price: {
            from: 0,
            to: null,
        },
        color: null,
        horsepower: {
            from: 0,
            to: null,
        },
        sort: null
    });
    const [appliedFilters, setAppliedFilters] = useState(null);
    const [filteredCars, setFilteredCars] = useState([]);

    const [favoriteIds, setFavoriteIds] = useState([]);
    const { data } = useFetchFavorites();

    const [hasInitializedFromLocation, setHasInitializedFromLocation] = useState(false);

    useEffect(() => {
        if (location.state?.type && !hasInitializedFromLocation) {
            const updatedFilters = { ...filters, type: Number(location.state.type) };

            setFilters(updatedFilters);
            setTimeout(() => {
                setAppliedFilters(updatedFilters);
            }, 400);
            setHasInitializedFromLocation(true);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [location.state, filters, hasInitializedFromLocation]);

    useEffect(() => {
        if (appliedFilters) {
            fetchFilteredCars(appliedFilters);
        }

    }, [appliedFilters]);

    useEffect(() => {
        if (appliedFilters === null) {
            setLoading(true);
            axios.get("https://mycarapplication.com/api/car")
                .then(res => {
                    setCars(res.data.data);
                    setFilteredCars([]);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [appliedFilters]);

    useEffect(() => {
        if (data && Array.isArray(data.data)) {
            setFavoriteIds(data.data.map(car => car.id));
        }
    }, [data]);

    const fetchFilteredCars = async (currentFilters) => {
        setLoading(true);
        const Filters = buildFiltersArray(currentFilters);
        console.log(" Filters to API:", Filters);

        try {
            const response = await axios.get("https://mycarapplication.com/api/car", {
                params: {
                    Filters,
                    orders: getOrdersFromSort(filters.sort),
                },
            });

            setFilteredCars(response.data.data);
            setError(null);
            setHasFetchedCars(true);
        } catch (error) {
            console.error("Error fetching filtered cars:", error);
            setError(t('cars.Failed to fetch data'));
            setFilteredCars([]);
            setHasFetchedCars(true);
        }

        setLoading(false);
    };

    useEffect(() => {
        console.log(filteredCars);

    }, [filteredCars]);

    if (loading) {
        return (
            <>
                <Hero2 />
                <div className="flex justify-center items-center min-h-[90vh]">
                    <div className="flex gap-2">
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Hero2 />
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <p className="text-center text-red-500 text-3xl">{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Hero2 />

            <div className="flex lg:flex-row flex-col">
                <div
                    className={`sticky top-[70px] max-h-[calc(100vh-70px)] overflow-auto pr-2 ${i18n.language === 'ar' ? 'border-l' : 'border-r'}`}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <div className="hidden lg:flex scrollbar-hide p-0 m-0">
                        <Sidebar2 isPermanent={true} filters={filters} setFilters={setFilters} fetchFilteredCars={fetchFilteredCars} setAppliedFilters={setAppliedFilters} />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="max-w-7xl mx-auto px-4 py-16 mt-5 md:mt-0">
                        <Title title={t("Cars")} />

                        {/* {appliedFilters ? (
                            filteredCars.length > 0 ? (
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {filteredCars.map((car, index) => (
                                        <Card key={index} car={car} favoriteIds={favoriteIds} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-white text-xl mt-10">
                                    {t("No cars match your filters")}
                                </div>
                            )
                        ) : (
                            <div className="flex flex-wrap gap-8 justify-center my-5">
                                {cars.map((car, index) => (
                                    <Card key={index} car={car} favoriteIds={favoriteIds} />
                                ))}
                            </div>
                        )} */}


                        {appliedFilters ? (
                            loading ? (
                                <></>
                            ) : filteredCars.length > 0 ? (
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {filteredCars.map((car, index) => (
                                        <Card key={index} car={car} favoriteIds={favoriteIds} />
                                    ))}
                                </div>
                            ) : hasFetchedCars ? (
                                <div className="text-center text-white text-xl mt-10">
                                    {t("No cars match your filters")}
                                </div>
                            ) : null
                        ) : (
                            <div className="flex flex-wrap gap-8 justify-center my-5">
                                {cars.map((car, index) => (
                                    <Card key={index} car={car} favoriteIds={favoriteIds} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cars;
