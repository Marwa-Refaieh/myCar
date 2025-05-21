import Hero2 from '@/components/Hero2';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import Card from '@/components/Card';
import Button from '@/components/Button';
import Title from '@/components/Title';
import { useLocation } from 'react-router-dom';

const Cars = () => {
    const location = useLocation();
    const defaultTab = location.state?.defaultTab || 'buy'; 
    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Tabs defaultValue={defaultTab} className="max-w-7xl mx-auto px-4 flex flex-col items-center">
                    <Title title="Cars" />
                    <TabsList className="bg-[#4a4646] py-4 md:py-7 px-0 md:px-0 mx-2 md:mx-4 mt-5 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">
                        <TabsTrigger
                            value="buy"
                            className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                        >
                            Buy
                        </TabsTrigger>
                        <TabsTrigger
                            value="sell"
                            className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                        >
                            Sell
                        </TabsTrigger>
                        <TabsTrigger
                            value="rent"
                            className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                        >
                            Rent
                        </TabsTrigger>
                    </TabsList>


                    <TabsContent value="buy" className="w-full">
                        <Tabs defaultValue="automatic" className='w-full flex flex-col items-center'>
                            <TabsList className="bg-[#4a4646] py-4 md:py-7 px-0 md:px-0 mx-2 md:mx-4 mt-5 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">
                                <TabsTrigger
                                    value="automatic"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    Automatic
                                </TabsTrigger>
                                <TabsTrigger
                                    value="electric"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    Electric
                                </TabsTrigger>
                                <TabsTrigger
                                    value="manual"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    Manual
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="automatic" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(1)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="electric" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(2)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="manual" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(3)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>

                    <TabsContent value="sell" className="w-full">
                        <Tabs defaultValue="automatic" className='w-full flex flex-col items-center'>
                            <TabsList className="bg-[#4a4646] py-4 md:py-7 px-0 md:px-0 mx-2 md:mx-4 mt-5 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">
                                <TabsTrigger
                                    value="automatic"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    Automatic
                                </TabsTrigger>
                                <TabsTrigger
                                    value="electric"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    Electric
                                </TabsTrigger>
                                <TabsTrigger
                                    value="manual"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    Manual
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="automatic" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(1)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="electric" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(2)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="manual" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(3)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
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
                                    Automatic
                                </TabsTrigger>
                                <TabsTrigger
                                    value="electric"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    Electric
                                </TabsTrigger>
                                <TabsTrigger
                                    value="manual"
                                    className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                                >
                                    Manual
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="automatic" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(1)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="electric" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(2)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="manual" className="w-full">
                                <div className="flex flex-wrap gap-8 justify-center my-5">
                                    {[...Array(3)].map((_, index) => (
                                        <Card key={index} />
                                    ))}
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
