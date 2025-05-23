import React from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import Card2 from '../Card2';
import ReviewCard from '../carDetails/ReviewCard';

const SellerTabs = () => {
    return (
        <div>
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2 items-end bg-transparent border-b border-white/30 rounded-none p-0">
                    <TabsTrigger
                        value="details"
                        className="text-white bg-transparent data-[state=active]:text-[#f1ea28] 
                        data-[state=active]:bg-transparent data-[state=active]:border-[#f1ea28]
                        data-[state=active]:border-b rounded-none pb-3 transition"
                    >
                        Details
                    </TabsTrigger>

                    <TabsTrigger value="reviews" className="text-white bg-transparent 
                    data-[state=active]:text-[#f1ea28] data-[state=active]:bg-transparent data-[state=active]:border-[#f1ea28] data-[state=active]:border-b rounded-none pb-3 transition">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="p-4 ">
                    <Card2 showActions={true} />

                </TabsContent>

                <TabsContent value="reviews" className="p-4 ">
                    <ReviewCard />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default SellerTabs;
