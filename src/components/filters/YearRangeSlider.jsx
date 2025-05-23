import React from 'react';
import hero from '../../assets/hero2.png';
import wave from '../../assets/wave.png';
import { FaSearch } from 'react-icons/fa';
import * as SliderPrimitive from "@radix-ui/react-slider";

const MIN = 100;
const MAX = 15000;

const Hero = () => {
    const [price, setPrice] = React.useState([MIN, 5000]);

    const handlePriceChange = (range) => setPrice(range);

    return (
        <section className="relative h-[90vh] w-full mt-16 bg-[#232321] flex items-center px-5 md:px-20 flex-col-reverse lg:flex-row justify-between overflow-hidden">
            <div className="relative z-20 flex flex-col justify-center items-start h-full gap-6 w-full lg:w-1/2 pt-10">
                <h1 className="text-Myprimary text-5xl sm:text-6xl lg:text-7xl font-bold">
                    Find A Car
                </h1>
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                    Quick And Super Easy!
                </h2>

                {/* Conditions Tabs */}
                <div className="flex items-center text-white font-semibold gap-6 mt-4">
                    <span>I Am Looking For</span>
                    <div className="flex items-center gap-4">
                        <button className="bg-yellow-400 text-black px-4 py-2 rounded-md">All Conditions</button>
                        <button className="hover:text-yellow-400 transition">New Cars</button>
                        <button className="hover:text-yellow-400 transition">Used Cars</button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mt-6 bg-white w-full rounded-full px-6 py-4 shadow-lg flex items-center gap-6 max-w-3xl text-sm">
                    <div className="flex flex-col">
                        <label className="font-bold text-black">Location</label>
                        <input type="text" placeholder="City" className="text-gray-600 outline-none" />
                    </div>
                    <div className="border-l h-8"></div>
                    <div className="flex flex-col">
                        <label className="font-bold text-black">Brand</label>
                        <input type="text" placeholder="BMW" className="text-gray-600 outline-none" />
                    </div>
                    <div className="border-l h-8"></div>
                    <div className="flex flex-col">
                        <label className="font-bold text-black">Model</label>
                        <input type="text" placeholder="M5" className="text-gray-600 outline-none" />
                    </div>
                    <div className="border-l h-8"></div>

                    {/* Price */}
                    <div className="flex flex-col w-40">
                        <label className="font-bold text-black">Price</label>
                        <div className="text-gray-600 text-xs mb-1">
                            {price[0]}$ - {price[1]}$
                        </div>
                        <SliderPrimitive.Root
                            className="relative flex items-center select-none touch-none w-full h-3"
                            min={MIN}
                            max={MAX}
                            step={100}
                            value={price}
                            onValueChange={handlePriceChange}
                            aria-label="Price range"
                        >
                            <SliderPrimitive.Track className="bg-gray-300 relative grow rounded-full h-[0.3rem]">
                                <SliderPrimitive.Range className="absolute bg-yellow-400 rounded-full h-full" />
                            </SliderPrimitive.Track>
                            {price.map((_, i) => (
                                <SliderPrimitive.Thumb
                                    key={i}
                                    className="block w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:scale-110 transition"
                                />
                            ))}
                        </SliderPrimitive.Root>
                    </div>

                    {/* Search Icon */}
                    <div className="ml-auto">
                        <button className="bg-yellow-400 w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-yellow-500 transition">
                            <FaSearch className="text-black" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Car Image */}
            <div className="w-full">
                <img
                    src={hero}
                    alt="Car Background"
                    className="max-w-full md:max-h-[80vh] max-h-[50vh] object-contain"
                />
            </div>

            {/* Wave Decoration */}
            <img
                src={wave}
                alt="Wave Decoration"
                className="absolute bottom-0 left-0 w-full object-cover pointer-events-none z-0"
            />
        </section>
    );
};

export default Hero;
