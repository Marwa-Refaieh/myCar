import React from 'react';
// import hero from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';
// import wave from '../assets/wave.png';
import { FaSearch } from 'react-icons/fa';
import * as SliderPrimitive from "@radix-ui/react-slider";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { useTranslation } from 'react-i18next';

const MIN = 100;
const MAX = 15000;

const Hero = () => {
    const { t, i18n } = useTranslation('home');
    const [price, setPrice] = React.useState([MIN, 5000]);
    const handlePriceChange = (range) => setPrice(range);

    return (
        <section
            className="relative min-h-[50vh] md:min-h-[94vh] w-full mt-10 bg-[#040403] flex items-center px-5 md:px-20 flex-col-reverse lg:flex-row justify-between overflow-hidden py-5 lg:py-0 bg-no-repeat bg-right bg-cover"
            style={{ backgroundImage: `url(${hero3})` }}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
            <div className='flex w-full justify-center md:justify-start'>
                <div className="relative z-20 flex flex-col justify-center items-start min-h-[50vh] md:min-h-[94vh] gap-6 w-full md:w-[90%] lg:w-[65%] py-10 md:py-0 sm:w-[80%]">
                    <h1 className="text-Myprimary text-5xl sm:text-6xl lg:text-7xl font-bold">
                        {t("Find A Car")}
                    </h1>
                    <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                        {t("Quick And Super Easy!")}
                    </h2>
                    {/* Conditions Tabs */}
                    <Tabs defaultValue="all" className="w-full mt-4 ">
                        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col justify-center items-start text-white font-semibold gap-2 md:pl-10 flex-wrap">
                            <p className='text-xl font-bold'>{t("I Am Looking For")}</p>
                            <TabsList className="bg-transparent flex flex-col sm:flex-row w-full my-10 md:my-0  sm:w-auto">
                                <TabsTrigger
                                    value="all"
                                    className="hover:text-Myprimary text-white px-4 py-2 rounded-none data-[state=active]:bg-Myprimary border-b sm:border-b-0 sm:border-r w-full sm:w-auto"
                                >
                                    {t("All Conditions")}
                                </TabsTrigger>

                                <TabsTrigger
                                    value="new"
                                    className="hover:text-Myprimary transition px-4 py-2 text-white rounded-none data-[state=active]:bg-Myprimary w-full sm:w-auto"
                                >
                                    {t("New Cars")}
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className=" text-white font-medium" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                            <TabsContent value="all">
                                <div className="mt-6 md:bg-white/10 md:backdrop-blur-lg bg-[#161614] md:border md:border-white/10 p-5 md:px-7 md:py-4 md:rounded-full rounded-3xl flex flex-col md:flex-row gap-3 w-full md:items-center md:justify-between">

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Location")}</label>
                                        <input type='text' placeholder='City' className='py-3 md:p-0
                                w-full md:w-20 px-3 rounded-full bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-lg'/>
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Brand")}</label>
                                        <input type='text' placeholder='BMW' className='py-3 md:p-0
                                w-full md:w-20 px-3 rounded-full bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-lg'/>
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Model")}</label>
                                        <input type='text' placeholder='M5' className='py-3 md:p-0
                                w-full md:w-20 px-3 rounded-full bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-lg'/>
                                    </div>

                                    <div className='md:w-full '>
                                        <label className='mb-5 md:mb-2 block md:text-xl'>{t("Price")}</label>
                                        <SliderPrimitive.Root
                                            className="relative flex items-center select-none touch-none w-full h-3"
                                            min={MIN}
                                            max={MAX}
                                            step={100}
                                            value={price}
                                            onValueChange={handlePriceChange}
                                            aria-label="Price range"
                                        >
                                            <SliderPrimitive.Track className="bg-[#353534] relative grow 
                                         h-[0.4rem] md:h-[0.1rem] rounded-md">
                                                <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full" />
                                            </SliderPrimitive.Track>
                                            {price.map((_, i) => (
                                                <SliderPrimitive.Thumb
                                                    key={i}
                                                    className="block w-4 h-4 md:w-2 md:h-2 md:border md:border-black bg-Myprimary rounded-full cursor-pointer hover:scale-110 transition"
                                                />
                                            ))}
                                        </SliderPrimitive.Root>
                                        <div className="text-xs pt-5 md:pt-1">
                                            {price[0]}$ - {price[1]}$
                                        </div>
                                    </div>
                                    <button className='md:hidden w-full py-2 bg-Myprimary hover:bg-primaryHover rounded-full mt-4 text-black'>Search</button>

                                    <div className='hidden md:flex justify-center w-full md:w-fit'>
                                        <button className="bg-black/80 mx-auto md:mx-0 w-12 h-12 flex items-center justify-center rounded-full shadow-md transition ">
                                            <FaSearch className="text-Myprimary hover:text-primaryHover" size={20} />
                                        </button>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="new">
                                <div className="mt-6 md:bg-white/10 md:backdrop-blur-lg bg-[#161614] md:border md:border-white/10 p-5 md:px-7 md:py-4 md:rounded-full rounded-3xl flex flex-col md:flex-row gap-3 w-full md:items-center md:justify-between">

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Location")}</label>
                                        <input type='text' placeholder='City' className='py-3 md:p-0
                                w-full md:w-20 px-3 rounded-full bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-lg'/>
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Brand")}</label>
                                        <input type='text' placeholder='BMW' className='py-3 md:p-0
                                w-full md:w-20 px-3 rounded-full bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-lg'/>
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Model")}</label>
                                        <input type='text' placeholder='M5' className='py-3 md:p-0
                                w-full md:w-20 px-3 rounded-full bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-lg'/>
                                    </div>

                                    <div className='md:w-full '>
                                        <label className='mb-5 md:mb-2 block md:text-xl'>{t("Price")}</label>
                                        <SliderPrimitive.Root
                                            className="relative flex items-center select-none touch-none w-full h-3"
                                            min={MIN}
                                            max={MAX}
                                            step={100}
                                            value={price}
                                            onValueChange={handlePriceChange}
                                            aria-label="Price range"
                                        >
                                            <SliderPrimitive.Track className="bg-[#353534] relative grow 
                                         h-[0.4rem] md:h-[0.1rem] rounded-md">
                                                <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full" />
                                            </SliderPrimitive.Track>
                                            {price.map((_, i) => (
                                                <SliderPrimitive.Thumb
                                                    key={i}
                                                    className="block w-4 h-4 md:w-2 md:h-2 md:border md:border-black bg-Myprimary rounded-full cursor-pointer hover:scale-110 transition"
                                                />
                                            ))}
                                        </SliderPrimitive.Root>
                                        <div className="text-xs pt-5 md:pt-1">
                                            {price[0]}$ - {price[1]}$
                                        </div>
                                    </div>
                                    <button className='md:hidden w-full py-2 bg-Myprimary hover:bg-primaryHover rounded-full mt-4 text-black'>Search</button>

                                    <div className='hidden md:flex justify-center w-full md:w-fit'>
                                        <button className="bg-black/80 mx-auto md:mx-0 w-12 h-12 flex items-center justify-center rounded-full shadow-md transition ">
                                            <FaSearch className="text-Myprimary hover:text-primaryHover" size={20} />
                                        </button>
                                    </div>
                                </div>
                            </TabsContent>

                        </div>
                    </Tabs>

                </div>
            </div>


        </section>
    );
};

export default Hero;