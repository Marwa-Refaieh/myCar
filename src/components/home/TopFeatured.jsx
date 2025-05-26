import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Card from '../Card';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const TopFeatured = () => {
    const { t, i18n } = useTranslation(['home', 'msg']);
    const [newCars, setNewCars] = useState([]);
    const [allCars, setAllCars] = useState([]);
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

        axios.get('https://mycarapplication.com/api/car')
            .then(response => {
                setAllCars(response.data.data || []);
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
            <Tabs dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} defaultValue="all" className="max-w-7xl mx-auto px-4 flex flex-col items-center ">
                <h2 className='font-bold text-center mb-10 text-Myprimary text-5xl'>
                    {t("Our Top Featured Vehicles")}</h2>
                <TabsList className="hidden md:flex bg-[#4a4646] py-4 md:py-7 px-0 md:px-0 mx-2 md:mx-4 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">
                    <TabsTrigger
                        value="all"
                        className={`py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-white/20 text-base 
                        ${i18n.language === 'ar' ? 'border-l' : 'border-r'}`}
                    >
                        {t("All Cars")}
                    </TabsTrigger>
                    <TabsTrigger
                        value="new"
                        className={`py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-white/20 text-base 
                        ${i18n.language === 'ar' ? 'border-l' : 'border-r'}`}
                    >
                        {t("New Arrival")}
                    </TabsTrigger>
                    <TabsTrigger
                        value="best"
                        className={`py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-white/20 text-base 
                        ${i18n.language === 'ar' ? 'border-l' : 'border-r'}`}
                    >
                        {t("Best Seller")}
                    </TabsTrigger>
                    <TabsTrigger
                        value="used"
                        className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all text-base"
                    >
                        {t("Used Cars")}
                    </TabsTrigger>
                </TabsList>

                <div className='space-y-5 block md:hidden'>
                    <TabsList className="flex bg-[#4a4646] py-6 px-0 mx-2 rounded-full overflow-hidden text-white text-lg font-medium">
                        <TabsTrigger
                            value="all"
                            className={`w-full p-6 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-white/20 text-sm
                            ${i18n.language === 'ar' ? 'border-l' : 'border-r'}`}
                        >
                            {t("All Cars")}
                        </TabsTrigger>
                        <TabsTrigger
                            value="new"
                            className="w-full p-6 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all text-sm"
                        >
                            {t("New Arrival")}
                        </TabsTrigger>

                    </TabsList>

                    <TabsList className="flex bg-[#4a4646] py-6 px-0 md:px-0 mx-2 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">

                        <TabsTrigger
                            value="best"
                            className={`p-6 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-white/20 text-sm
                            ${i18n.language === 'ar' ? 'border-l' : 'border-r'}`}
                        >
                            {t("Best Seller")}
                        </TabsTrigger>
                        <TabsTrigger
                            value="used"
                            className="p-6 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all text-sm"
                        >
                            {t("Used Cars")}
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="all" className="w-full">
                    {allCars.length > 0 ? (
                        <>
                            <div className="flex flex-wrap gap-8 justify-center my-10">
                                {allCars.slice(0, 6).map((car) => (
                                    <Card key={car.id} car={car} />
                                ))}
                            </div>
                            <Link to={"/cars"} className='flex justify-center'>
                                <Button title={t("SEE ALL CARS")} />
                            </Link>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 text-xl">
                            {t("cars.No cars available", { ns: 'msg' })}
                        </p>
                    )}

                </TabsContent>

                <TabsContent value="new" className="w-full">
                    {newCars.length > 0 ? (
                        <>
                            <div className="flex flex-wrap gap-8 justify-center my-10">
                                {newCars.slice(0, 6).map((car) => (
                                    <Card key={car.id} car={car} />
                                ))}
                            </div>
                            <Link to={"/new"} className='flex justify-center'>
                                <Button title={t("SEE New Arrival")} />
                            </Link>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 text-xl">
                            {t("cars.No cars available", { ns: 'msg' })}
                        </p>
                    )}
                </TabsContent>

                <TabsContent value="best" className="w-full">
                    <div className="flex flex-wrap gap-8 justify-center my-10">
                        {[...Array(2)].map((_, index) => (
                            <Card key={index} />
                        ))}
                    </div>
                    <Link to={"/best"} className='flex justify-center'>
                        <Button title={t("SEE Best Seller")} />
                    </Link>
                </TabsContent>

                <TabsContent value="used" className="w-full">
                    <div className="flex flex-wrap gap-8 justify-center my-10">
                        {[...Array(1)].map((_, index) => (
                            <Card key={index} />
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <Button title={t("SEE Used Cars")} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default TopFeatured;
