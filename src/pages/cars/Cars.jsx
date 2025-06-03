import Hero2 from '@/components/Hero2';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import Card from '@/components/Card';
import Button from '@/components/Button';
import Title from '@/components/Title';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useFetchFavorites from '@/hooks/getFavCars';

const Cars = () => {
    const { t } = useTranslation(['home', 'msg']);
    const location = useLocation();
    const defaultTab = location.state?.defaultTab || 'buy';
    const [buy, setBuy] = useState([])
    const [rent, setRent] = useState([])
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
        axios.get("https://mycarapplication.com/api/car")
            .then(res => {
                const cars = res.data.data;
                const buyCars = cars.filter(car => car.type === 1);
                const rentCars = cars.filter(car => car.type === 2);
                setBuy(buyCars);
                setRent(rentCars);
                setLoading(false);
            })
            .catch(() => {
                setError(t('cars.Failed to fetch data', { ns: 'msg' }));
                setLoading(false);
            });
    }, []);

    const renderByTransmission = (carsArray, transmissionType) => {
        const filteredCars = carsArray.filter(car => car.transmission_type == transmissionType);

        if (filteredCars.length === 0) {
            return (
                <p className="text-center text-3xl text-gray-500 my-10">
                    {t("cars.No cars available for this category.", { ns: 'msg' })}
                </p>
            );
        }

        return filteredCars.map(car => (
            <Card key={car.id} car={car} favoriteIds={favoriteIds}/>
        ));
    };

    if (loading) {
        return (
            <div>
                <Hero2 />
                <div className="flex justify-center items-center min-h-[90vh]">
                    <div className="flex space-x-2">
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>

        );
    }

    if (error) {
        return (
            <div>
                <Hero2 />
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <p className="text-center text-red-500 text-3xl">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Tabs defaultValue={defaultTab} className="max-w-7xl mx-auto px-4 flex flex-col items-center">
                    <Title title={t("Cars")} />
                    <TabsList className="bg-[#4a4646] py-4 md:py-7 px-0 md:px-0 mx-2 md:mx-4 mt-5 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium ">
                        <TabsTrigger
                            value="buy"
                            className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base capitalize"
                        >
                            {t('buy')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="rent"
                            className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base capitalize"
                        >
                            {t('rent')}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy" className="w-full">
                        <Tabs defaultValue="automatic" className='w-full flex flex-col items-center'>
                            <TabsList className="bg-[#4a4646] py-4 md:py-7 px-0 md:px-0 mx-2 md:mx-4 mt-5 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">
                                <TabsTrigger
                                    value="automatic"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    {t("Automatic")}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="electric"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    {t("Electric")}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="manual"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    {t("Manual")}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="automatic" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {renderByTransmission(buy, 1)}
                                </div>
                            </TabsContent>

                            <TabsContent value="electric" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {renderByTransmission(buy, 2)}
                                </div>
                            </TabsContent>

                            <TabsContent value="manual" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {renderByTransmission(buy, 3)}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>

                    <TabsContent value="rent" className="w-full">
                        <Tabs defaultValue="automatic" className='w-full flex flex-col items-center'>
                            <TabsList className="bg-[#4a4646] py-4 md:py-7 px-0 md:px-0 mx-2 md:mx-4 mt-5 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">
                                <TabsTrigger
                                    value="automatic"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    {t("Automatic")}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="electric"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    {t("Electric")}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="manual"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    {t("Manual")}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="automatic" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {renderByTransmission(rent, 1)}
                                </div>
                            </TabsContent>

                            <TabsContent value="electric" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {renderByTransmission(rent, 2)}
                                </div>
                            </TabsContent>

                            <TabsContent value="manual" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {renderByTransmission(rent, 3)}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Cars;
