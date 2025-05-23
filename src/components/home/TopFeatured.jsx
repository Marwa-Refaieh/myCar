import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Card from '../Card';
import Button from '../Button';
import { Link } from 'react-router-dom';

const TopFeatured = () => {

    return (
        <div>
            <Tabs defaultValue="all" className="max-w-7xl mx-auto px-4 flex flex-col items-center ">
                <h2 className='font-bold text-center mb-10 text-Myprimary text-5xl'>Our Top Featured Vehicles</h2>
                <TabsList className="hidden md:flex bg-[#4a4646] py-4 md:py-7 px-0 md:px-0 mx-2 md:mx-4 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">
                    <TabsTrigger
                        value="all"
                        className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                    >
                        All Cars
                    </TabsTrigger>
                    <TabsTrigger
                        value="new"
                        className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                    >
                        New Arrival
                    </TabsTrigger>
                    <TabsTrigger
                        value="best"
                        className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-base"
                    >
                        Best Seller
                    </TabsTrigger>
                    <TabsTrigger
                        value="used"
                        className="py-7 px-10 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all text-base"
                    >
                        Used Cars
                    </TabsTrigger>
                </TabsList>

                <div className='space-y-5 block md:hidden'>
                    <TabsList className="flex bg-[#4a4646] py-6 px-0 mx-2 rounded-full overflow-hidden text-white text-lg font-medium">
                        <TabsTrigger
                            value="all"
                            className="w-full p-6 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-sm"
                        >
                            All Cars
                        </TabsTrigger>
                        <TabsTrigger
                            value="new"
                            className="w-full p-6 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all text-sm"
                        >
                            New Arrival
                        </TabsTrigger>

                    </TabsList>

                    <TabsList className="flex bg-[#4a4646] py-6 px-0 md:px-0 mx-2 rounded-full overflow-hidden text-white text-lg md:text-xl font-medium">

                        <TabsTrigger
                            value="best"
                            className="p-6 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all border-r border-white/20 text-sm"
                        >
                            Best Seller
                        </TabsTrigger>
                        <TabsTrigger
                            value="used"
                            className="p-6 data-[state=active]:bg-[#f1ea28] data-[state=active]:text-black transition-all text-sm"
                        >
                            Used Cars
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="all" className="w-full">
                    <div className="flex flex-wrap gap-8 justify-center my-10">
                        {[...Array(5)].map((_, index) => (
                            <Card key={index} />
                        ))}
                    </div>
                    <Link to={"/cars"} className='flex justify-center'>
                        <Button title="SEE ALL CARS" />
                    </Link>
                </TabsContent>

                <TabsContent value="new" className="w-full">
                    <div className="flex flex-wrap gap-8 justify-center my-10">
                        {[...Array(3)].map((_, index) => (
                            <Card key={index} />
                        ))}
                    </div>
                    <Link to={"/new"} className='flex justify-center'>
                        <Button title="SEE New Arrival" />
                    </Link>
                </TabsContent>

                <TabsContent value="best" className="w-full">
                    <div className="flex flex-wrap gap-8 justify-center my-10">
                        {[...Array(2)].map((_, index) => (
                            <Card key={index} />
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <Button title="SEE Best Seller" />
                    </div>
                </TabsContent>

                <TabsContent value="used" className="w-full">
                    <div className="flex flex-wrap gap-8 justify-center my-10">
                        {[...Array(1)].map((_, index) => (
                            <Card key={index} />
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <Button title="SEE Used Cars" />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default TopFeatured;
