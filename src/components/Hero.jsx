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
            className="relative min-h-[94vh] w-full mt-10 bg-[#040403] flex items-center px-5 md:px-20 flex-col-reverse lg:flex-row justify-between overflow-hidden py-5 lg:py-0 bg-no-repeat bg-right bg-cover"
            style={{ backgroundImage: `url(${hero3})` }}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
            <div className="relative z-20 flex flex-col justify-center items-start h-full gap-6 w-full lg:w-1/2 ">
                <h1 className="text-Myprimary text-5xl sm:text-6xl lg:text-7xl font-bold">
                    {t("Find A Car")}
                </h1>
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {t("Quick And Super Easy!")}
                </h2>
                {/* Conditions Tabs */}
                <Tabs defaultValue="all" className="w-full mt-4">
                    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col justify-center items-start text-white font-semibold gap-6 flex-wrap">
                        <p>{t("I Am Looking For")}</p>
                        <TabsList className="bg-transparent flex flex-col sm:flex-row px-0 w-full my-10 md:my-0  sm:w-auto">
                            <TabsTrigger
                                value="all"
                                className="hover:text-Myprimary text-white px-4 py-2 rounded-none data-[state=active]:bg-Myprimary border-b sm:border-b-0 sm:border-r w-full sm:w-auto"
                            >
                                {t("All Conditions")}
                            </TabsTrigger>

                            <TabsTrigger
                                value="new"
                                className="hover:text-Myprimary transition px-4 py-2 text-white rounded-none data-[state=active]:bg-Myprimary w-full sm:w-auto border-b sm:border-b-0 sm:border-r"
                            >
                                {t("New Cars")}
                            </TabsTrigger>

                            <TabsTrigger
                                value="used"
                                className="hover:text-Myprimary transition px-4 py-2 text-white rounded-none data-[state=active]:bg-Myprimary border-b sm:border-b-0 sm:border-l-0 w-full sm:w-auto"
                            >
                                {t("Used Cars")}
                            </TabsTrigger>
                        </TabsList>
                    </div>



                    <div className="mt-4 text-white font-medium" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                        <TabsContent value="all">
                            <div className="mt-6 bg-white md:w-fit lg:w-full rounded-md md:rounded-full px-6 py-2 shadow-lg flex flex-wrap md:flex-nowrap justify-evenly items-start gap-4 text-sm">

                                {/* Group 1: Location + Brand */}
                                <div className="flex w-full  md:w-auto gap-4 ">
                                    {/* Location */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">{t("Location")}</label>
                                        <input type="text" placeholder={t("City")} className="text-black outline-none w-full" />
                                    </div>

                                    {/* Brand */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">{t("Brand")}</label>
                                        <input type="text" placeholder="BMW" className="text-black outline-none w-full" />
                                    </div>
                                </div>

                                {/* Group 2: Model + Price */}
                                <div className="flex w-full md:w-auto gap-4  ">
                                    {/* Model */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">{t("Model")}</label>
                                        <input type="text" placeholder="M5" className="text-black outline-none w-full" />
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-col w-1/2 md:w-28 gap-2">
                                        <label className="font-bold text-black">{t("Price")}</label>
                                        <SliderPrimitive.Root
                                            className="relative flex items-center select-none touch-none w-full h-3"
                                            min={MIN}
                                            max={MAX}
                                            step={100}
                                            value={price}
                                            onValueChange={handlePriceChange}
                                            aria-label="Price range"
                                        >
                                            <SliderPrimitive.Track className="bg-gray-300 relative grow rounded-full bg-slate-400 h-[0.1rem] rounded-md">
                                                <SliderPrimitive.Range className="absolute bg-black rounded-full h-full" />
                                            </SliderPrimitive.Track>
                                            {price.map((_, i) => (
                                                <SliderPrimitive.Thumb
                                                    key={i}
                                                    className="block w-2 h-2 border-2 border-black bg-yellow-400 rounded-full cursor-pointer hover:scale-110 transition"
                                                />
                                            ))}
                                        </SliderPrimitive.Root>
                                        <div className="text-black text-xs ">
                                            {price[0]}$ - {price[1]}$
                                        </div>
                                    </div>
                                </div>

                                {/* Search Icon */}
                                <div className="flex-shrink-0 self-center md:self-auto ">
                                    <button className="bg-black w-12 h-12 flex items-center justify-center rounded-full shadow-md transition">
                                        <FaSearch className="text-Myprimary hover:text-primaryHover" size={20} />
                                    </button>
                                </div>
                            </div>

                        </TabsContent>
                        <TabsContent value="new">
                            <div className="mt-6 bg-white md:w-fit lg:w-full rounded-md md:rounded-full px-6 py-2 shadow-lg flex flex-wrap md:flex-nowrap justify-evenly items-start gap-4 text-sm">

                                {/* Group 1: Location + Brand */}
                                <div className="flex w-full  md:w-auto gap-4 ">
                                    {/* Location */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">Location</label>
                                        <input type="text" placeholder="City" className="text-black outline-none w-full" />
                                    </div>

                                    {/* Brand */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">Brand</label>
                                        <input type="text" placeholder="BMW" className="text-black outline-none w-full" />
                                    </div>
                                </div>

                                {/* Group 2: Model + Price */}
                                <div className="flex w-full md:w-auto gap-4  ">
                                    {/* Model */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">Model</label>
                                        <input type="text" placeholder="M5" className="text-black outline-none w-full" />
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-col w-1/2 md:w-28 gap-2">
                                        <label className="font-bold text-black">Price</label>
                                        <SliderPrimitive.Root
                                            className="relative flex items-center select-none touch-none w-full h-3"
                                            min={MIN}
                                            max={MAX}
                                            step={100}
                                            value={price}
                                            onValueChange={handlePriceChange}
                                            aria-label="Price range"
                                        >
                                            <SliderPrimitive.Track className="bg-gray-300 relative grow rounded-full bg-slate-400 h-[0.1rem] rounded-md">
                                                <SliderPrimitive.Range className="absolute bg-black rounded-full h-full" />
                                            </SliderPrimitive.Track>
                                            {price.map((_, i) => (
                                                <SliderPrimitive.Thumb
                                                    key={i}
                                                    className="block w-2 h-2 border-2 border-black bg-yellow-400 rounded-full cursor-pointer hover:scale-110 transition"
                                                />
                                            ))}
                                        </SliderPrimitive.Root>
                                        <div className="text-black text-xs ">
                                            {price[0]}$ - {price[1]}$
                                        </div>
                                    </div>
                                </div>

                                {/* Search Icon */}
                                <div className="flex-shrink-0 self-center md:self-auto ">
                                    <button className="bg-black w-12 h-12 flex items-center justify-center rounded-full shadow-md transition">
                                        <FaSearch className="text-Myprimary hover:text-primaryHover" size={20} />
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="used">
                            <div className="mt-6 bg-white md:w-fit lg:w-full rounded-md md:rounded-full px-6 py-2 shadow-lg flex flex-wrap md:flex-nowrap justify-evenly items-start gap-4 text-sm">

                                {/* Group 1: Location + Brand */}
                                <div className="flex w-full  md:w-auto gap-4 ">
                                    {/* Location */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">Location</label>
                                        <input type="text" placeholder="City" className="text-black outline-none w-full" />
                                    </div>

                                    {/* Brand */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">Brand</label>
                                        <input type="text" placeholder="BMW" className="text-black outline-none w-full" />
                                    </div>
                                </div>

                                {/* Group 2: Model + Price */}
                                <div className="flex w-full md:w-auto gap-4  ">
                                    {/* Model */}
                                    <div className="flex flex-col w-1/2 md:w-20 gap-2">
                                        <label className="font-bold text-black">Model</label>
                                        <input type="text" placeholder="M5" className="text-black outline-none w-full" />
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-col w-1/2 md:w-28 gap-2">
                                        <label className="font-bold text-black">Price</label>
                                        <SliderPrimitive.Root
                                            className="relative flex items-center select-none touch-none w-full h-3"
                                            min={MIN}
                                            max={MAX}
                                            step={100}
                                            value={price}
                                            onValueChange={handlePriceChange}
                                            aria-label="Price range"
                                        >
                                            <SliderPrimitive.Track className="bg-gray-300 relative grow rounded-full bg-slate-400 h-[0.1rem] rounded-md">
                                                <SliderPrimitive.Range className="absolute bg-black rounded-full h-full" />
                                            </SliderPrimitive.Track>
                                            {price.map((_, i) => (
                                                <SliderPrimitive.Thumb
                                                    key={i}
                                                    className="block w-2 h-2 border-2 border-black bg-yellow-400 rounded-full cursor-pointer hover:scale-110 transition"
                                                />
                                            ))}
                                        </SliderPrimitive.Root>
                                        <div className="text-black text-xs ">
                                            {price[0]}$ - {price[1]}$
                                        </div>
                                    </div>
                                </div>

                                {/* Search Icon */}
                                <div className="flex-shrink-0 self-center md:self-auto ">
                                    <button className="bg-black w-12 h-12 flex items-center justify-center rounded-full shadow-md transition">
                                        <FaSearch className="text-Myprimary hover:text-primaryHover" size={20} />
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>

            </div>


            {/* <div className="hidden lg:flex w-full lg:w-1/2 flex justify-center items-center">
                <img
                    src={hero}
                    alt="Car Background"
                    className={`max-w-full md:max-h-[80vh] max-h-[50vh] object-contain relative z-10 
                    ${i18n.language === 'ar' ? '-scale-x-100' : ''}`}
                />
            </div> */}

            {/* Wave Decoration */}
            {/* <img
                src={wave}
                alt="Wave Decoration"
                className="absolute bottom-0 left-0 w-full object-cover pointer-events-none z-0"
            /> */}
        </section>
    );
};

export default Hero;