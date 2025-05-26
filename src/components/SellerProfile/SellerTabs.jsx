import React from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import Card2 from '../Card2';
import ReviewCard from '../carDetails/ReviewCard';
import { useTranslation } from 'react-i18next';

const SellerTabs = ({ cars, reviews }) => {
    const { t, i18n } = useTranslation('home');

    return (
        <div>
            <Tabs dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2 items-end bg-transparent border-b border-white/30 rounded-none p-0">
                    <TabsTrigger
                        value="details"
                        className="text-white bg-transparent data-[state=active]:text-[#f1ea28] 
                        data-[state=active]:bg-transparent data-[state=active]:border-[#f1ea28]
                        data-[state=active]:border-b rounded-none pb-3 transition"
                    >
                        {t("Details")} ({cars.length})
                    </TabsTrigger>

                    <TabsTrigger
                        value="reviews"
                        className="text-white bg-transparent 
                        data-[state=active]:text-[#f1ea28] data-[state=active]:bg-transparent 
                        data-[state=active]:border-[#f1ea28] data-[state=active]:border-b 
                        rounded-none pb-3 transition"
                    >
                        {t("Reviews")} ({reviews.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="p-4">
                    <div className="flex justify-center flex-wrap gap-10">
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <Card2 key={car.id} car={car} />
                            ))
                        ) : (
                            <p className="text-gray-400">{t("No cars available")}</p>
                        )}
                    </div>
                </TabsContent>


                <TabsContent value="reviews" className="p-4 space-y-4">
                    <ReviewCard reviews={reviews} />
                </TabsContent>

            </Tabs>
        </div>
    );
}

export default SellerTabs;
