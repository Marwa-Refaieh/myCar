import React, { useEffect, useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import userIcon from '../../assets/User.png';
import callIcon from '../../assets/Call.png';
import starIcon from '../../assets/Star1.png';
import img from '../../assets/image.webp';
import Button2 from '../Button2';
import Specifications from './Specifications';
import Feather from './Feather';
import ReviewCard from './ReviewCard';
import Card2 from '../card2';
import { Link } from 'react-router-dom';
import ReportModal from '../ReportModal';
import { useTranslation } from 'react-i18next';
import useFetchFavorites from '@/hooks/getFavCars';
import Card from '../Card';

const CarTabs = ({ car }) => {
    const { t, i18n } = useTranslation('home');
    const [favoriteIds, setFavoriteIds] = useState([]);
    const { data } = useFetchFavorites();

    useEffect(() => {
        if (data && Array.isArray(data.data)) {
            setFavoriteIds(data.data.map(car => car.id));
        }
    }, [data]);
    return (
        <div>
            <Tabs dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} defaultValue="details" className="w-full mt-20">
                <TabsList className="grid w-full grid-cols-2 items-end bg-transparent border-b border-white/30 rounded-none p-0">
                    <TabsTrigger
                        value="details"
                        className="text-white bg-transparent data-[state=active]:text-[#f1ea28] 
                        data-[state=active]:bg-transparent data-[state=active]:border-[#f1ea28]
                        data-[state=active]:border-b rounded-none pb-3 transition"
                    >
                        {t("Details")}
                    </TabsTrigger>

                    <TabsTrigger value="reviews" className="text-white bg-transparent 
                    data-[state=active]:text-[#f1ea28] data-[state=active]:bg-transparent data-[state=active]:border-[#f1ea28] data-[state=active]:border-b rounded-none pb-3 transition">
                        {t("Reviews")}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="p-4 ">
                    <div>
                        <p className="text-white/50 xs:text-center">
                            {car.created_at ? car.created_at.split(' ')[0] : t("Unknown date")}
                        </p>

                        <div className="flex flex-col items-start md:flex-row md:items-center gap-8 md:gap-28 mt-4">

                            <div className="flex md:flex-row xs:w-full xs:flex-row xs:items-center items-start sm:items-center gap-4 sm:gap-8">
                                <div className="w-28 h-28">
                                    <img
                                        src={car.user?.image_url || img}
                                        alt={car.user?.full_name || "User image"}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <img src={userIcon} alt="user" className="w-5 h-5" />
                                        <p>{car.user?.full_name || t("name not available")}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <img src={callIcon} alt="call" className="w-5 h-5" />
                                        <p>{car.user?.mobile || t("mobile not available")}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <img src={starIcon} alt="star" className="w-5 h-5" />
                                        <p>
                                            {car.user?.rating || 0}{" "}
                                            {car.user?.rating === 1 ? t("Review") : t("Reviews")}
                                        </p>

                                    </div>
                                </div>
                            </div>

                            <div className="xs:w-full flex flex-row md:flex-col gap-3 mt-4 lg:mt-0 xs:justify-center">
                                {car.user && car.user.id ? (
                                    <Link to={`/sellerProfile/${car.user.id}`}>
                                        <Button2 title={t("Details")} style="px-3 py-1" />
                                    </Link>
                                ) : (
                                    <span>{t("Seller info not available")}</span>
                                )}

                                <ReportModal
                                    sellerId={car.user.id}
                                    triggerText={t("Report")}
                                    title={t("Report Seller")}
                                    placeholder={t("Write the reason for reporting this seller...")}
                                />
                            </div>
                        </div>
                    </div>

                    <Specifications car={car} />

                    {/* <div className='border-b border-white/50 pb-8'>
                        <Feather car={car} />
                    </div> */}

                    <div>
                        <p className='text-2xl mt-6'>{t("Recommend")}</p>
                        <div className="flex flex-wrap gap-4 md:gap-6  py-10 justify-center md:justify-start">
                            {car.recommendedCars?.map((item) => (
                                <Card key={item.id} car={item} favoriteIds={favoriteIds} />
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-4 ">
                    <ReviewCard reviews={car.reviews} id={car.id} type='car' />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CarTabs;
