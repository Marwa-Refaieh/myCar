import React from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import image from '../../assets/image.webp';
import user from '../../assets/User.png';
import call from '../../assets/Call.png';
import star from '../../assets/Star1.png';
import Button2 from '../Button2';
import Specifications from './Specifications';
import Feather from './Feather';
import ReviewCard from './ReviewCard';
import Card2 from '../card2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReportModal from '../ReportModal';

const CarTabs = () => {
    const handleReport = (reason) => {
        const reportUrl = "/api/report";

        axios.post(reportUrl, { reason })
            .then(response => {
                console.log("Report submitted successfully:", response.data);
            })
            .catch(error => {
                console.error("Error submitting report:", error);
            });
    };

    return (
        <div>
            <Tabs defaultValue="details" className="w-full mt-20">
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
                    <div>
                        <p className="text-white/50 xs:text-center">Oct 19 . 10 min</p>

                        <div className="flex flex-col items-start md:flex-row md:items-center gap-8 md:gap-28 mt-4">

                            <div className="flex xs:w-full xs:flex-col xs:items-center items-start sm:items-center gap-4 sm:gap-8">
                                <div className="w-28 h-28">
                                    <img
                                        src={image}
                                        alt="image"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <img src={user} alt="user" className="w-5 h-5" />
                                        <p>Saeed Fallah</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <img src={call} alt="call" className="w-5 h-5" />
                                        <p>+963 662 1334</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <img src={star} alt="star" className="w-5 h-5" />
                                        <p>4.9 (230 Reviews)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="xs:w-full flex flex-row md:flex-col gap-3 mt-4 lg:mt-0 xs:justify-center">
                                <Link to={"/sellerProfile/1"}>
                                    <Button2 title="Details" style="px-3 py-1" />
                                </Link>
                                <ReportModal
                                    triggerText="Report"
                                    title="Report Seller"
                                    placeholder="Write the reason for reporting this seller..."
                                    onSubmit={handleReport}
                                />
                            </div>
                        </div>
                    </div>

                    <Specifications />
                    <div className='border-b border-white/50 pb-8'>
                        <Feather />
                    </div>
                    <div>
                        <p className='text-2xl mt-6'>Recommend</p>
                        <div className="flex flex-wrap gap-6 py-10 justify-center md:justify-start">
                            <Card2 />
                        </div>
                    </div>

                </TabsContent>

                <TabsContent value="reviews" className="p-4 ">
                    <ReviewCard />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default CarTabs;
