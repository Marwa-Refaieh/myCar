import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import hero3 from '../assets/hero3.png';
import { FaSearch } from 'react-icons/fa';
import * as SliderPrimitive from "@radix-ui/react-slider";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const MIN = 100;
const MAX = 15000;

const Hero = () => {
    const { t, i18n } = useTranslation('home');
    const [city, setCity] = useState([])
    const [brand, setBrand] = useState([])
    const [model, setModel] = useState([])


    const [input, setInput] = useState({
        cityId: "",
        brandId: "",
        modelId: "",
    })

    const [filters, setFilters] = useState({
        city_id: null,
        model_id: null,
        brand_id: null,
        price: {
            from: 0,
            to: null,
        },
    });

    const range = [
        filters.price?.from ?? MIN,
        filters.price?.to ?? null,
    ];

    const [isEditingMaxPrice, setIsEditingMaxPrice] = useState(false);
    const [manualMaxPrice, setManualMaxPrice] = useState('');

    const handlePriceChange = (newRange) => {
        setFilters((prev) => ({
            ...prev,
            price: {
                from: newRange[0],
                to: newRange[1] === MAX ? null : newRange[1],
            },
        }));
    };

    useEffect(() => {
        const foundCity = city.find(
            c => c.name.toLowerCase() === input.cityId.toLowerCase()
        );

        setFilters(prev => ({
            ...prev,
            city_id: foundCity ? foundCity.id : null
        }));
    }, [input.cityId]);

    useEffect(() => {
        const foundBrand = brand.find(
            c => c.name.toLowerCase() === input.brandId.toLowerCase()
        );

        if (foundBrand) {
            setFilters(prev => ({
                ...prev,
                brand_id: foundBrand.id
            }));
            setModel(foundBrand.brandModels || []);
        } else {
            setFilters(prev => ({ ...prev, brand_id: null }));
            setModel([]);
        }
    }, [input.brandId]);

    useEffect(() => {
        const foundModel = model.find(
            model => model.name.toLowerCase() === input.modelId.toLowerCase()
        );

        setFilters(prev => ({
            ...prev,
            model_id: foundModel ? foundModel.id : null
        }));
    }, [input.modelId, model]);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/car-features/get-cities')
            .then(res => {
                setCity(res.data.data)
            })
        axios.get('https://mycarapplication.com/api/car-features/get-brands')
            .then(res => {
                setBrand(res.data.data)
            })

    }, []);
 

    return (
        <section
            className="relative min-h-[50vh] md:min-h-[94vh] w-full mt-10 bg-[#040403] flex items-center px-5 md:px-20 flex-col-reverse lg:flex-row justify-between overflow-hidden py-5 lg:py-0 bg-no-repeat bg-right bg-cover"
            style={{ backgroundImage: `url(${hero3})` }} >
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
            <div className='flex w-full justify-center md:justify-start'>
                <div className="relative z-20 flex flex-col justify-center items-start min-h-[50vh] md:min-h-[94vh] gap-6 w-full md:w-[90%] lg:w-[65%] py-10 md:py-0 sm:w-[80%]">
                    <h1 className="text-Myprimary text-5xl sm:text-6xl lg:text-7xl font-bold">
                        {t("Find A Car")}
                    </h1>
                    <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                        {t("Quick And Super Easy!")}
                    </h2>

                    <Tabs defaultValue="all" className="w-full mt-4 ">
                        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col justify-center items-start text-white font-semibold gap-2 md:pl-10 flex-wrap">
                            <p className='text-xl font-bold'>{t("I Am Looking For")}</p>
                            <TabsList className="bg-transparent flex flex-col sm:flex-row w-full my-10 md:my-0  sm:w-auto">
                                <TabsTrigger
                                    value="all"
                                    className="hover:text-Myprimary text-white px-4 py-2 rounded-none data-[state=active]:bg-Myprimary border-b sm:border-b-0 sm:border-r w-full sm:w-auto border-none"
                                >
                                    {t("All Conditions")}
                                </TabsTrigger>

                                <TabsTrigger
                                    value="new"
                                    className="hover:text-Myprimary transition px-4 py-2 text-white rounded-none data-[state=active]:bg-Myprimary w-full sm:w-auto  sm:border-r-2 sm:border-l-2 border-t-2 border-b-2 sm:border-t-0  sm:border-b-0 border-white/50 "
                                >
                                    {t("New Cars")}
                                </TabsTrigger>

                                <TabsTrigger
                                    value="used"
                                    className="hover:text-Myprimary transition px-4 py-2 text-white rounded-none data-[state=active]:bg-Myprimary w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-none"
                                >
                                    {t("Used Cars")}
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className=" text-white font-medium" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                            <TabsContent value="all">
                                <div className="mt-6 md:bg-white/10 md:backdrop-blur-lg bg-[#161614] md:border md:border-white/10 p-5 md:px-7 md:py-4 md:rounded-full rounded-3xl flex flex-col md:flex-row gap-3 w-full md:items-center md:justify-between">

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Location")}</label>
                                        <input type='text' placeholder={t("Area")} value={input.cityId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, cityId: e.target.value }))} className='py-3 md:p-0
                                            w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Brand")}</label>
                                        <input type='text' placeholder={t("Brand Name")} value={input.brandId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, brandId: e.target.value }))} className='py-3 md:p-0 w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Model")}</label>
                                        <input type='text' placeholder={t("Model Name")} value={input.modelId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, modelId: e.target.value }))} className='py-3 md:p-0 w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='md:w-full '>
                                        <label className='mb-5 md:mb-2 block md:text-xl'>{t("Price")}</label>

                                        <SliderPrimitive.Root
                                            className="relative flex items-center select-none touch-none w-full h-3"
                                            min={MIN}
                                            max={MAX}
                                            step={100}
                                            value={[
                                                range[0],
                                                range[1] === null ? MAX : range[1],
                                            ]}
                                            onValueChange={handlePriceChange}
                                            aria-label="Price range"
                                        >
                                            <SliderPrimitive.Track className="bg-[#353534] relative grow h-[0.4rem] md:h-[0.1rem] rounded-md">
                                                <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full" />
                                            </SliderPrimitive.Track>

                                            {[range[0], range[1] === null ? MAX : range[1]].map((val, i) => (
                                                <SliderPrimitive.Thumb
                                                    key={i}
                                                    className="block md:w-2 md:h-2 w-4 h-4 bg-Myprimary rounded-full cursor-pointer hover:scale-110 hover:shadow-lg transition-transform"
                                                    aria-label={i === 0 ? "Minimum price" : "Maximum price"}
                                                    style={{ willChange: "transform" }}
                                                />
                                            ))}
                                        </SliderPrimitive.Root>

                                        <div className="text-xs pt-5 md:pt-1 w-full flex items-center ">
                                            {isEditingMaxPrice ? (
                                                <>
                                                    <span>${filters.price.from} - </span>
                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        value={manualMaxPrice}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (val === '' || /^[0-9]+$/.test(val)) {
                                                                setManualMaxPrice(val);
                                                            }
                                                        }}
                                                        onBlur={() => {
                                                            const newValue = parseInt(manualMaxPrice);
                                                            setFilters(prev => ({
                                                                ...prev,
                                                                price: {
                                                                    ...prev.price,
                                                                    to: isNaN(newValue) ? null : newValue,
                                                                }
                                                            }));
                                                            setManualMaxPrice(isNaN(newValue) ? '' : newValue.toString());
                                                            setIsEditingMaxPrice(false);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (
                                                                !(
                                                                    (e.key >= '0' && e.key <= '9') ||
                                                                    e.key === 'Backspace' ||
                                                                    e.key === 'ArrowLeft' ||
                                                                    e.key === 'ArrowRight' ||
                                                                    e.key === 'Delete' ||
                                                                    e.key === 'Tab' ||
                                                                    e.key === 'Enter'
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                            if (e.key === 'Enter') {
                                                                const newValue = parseInt(manualMaxPrice);
                                                                setFilters(prev => ({
                                                                    ...prev,
                                                                    price: {
                                                                        ...prev.price,
                                                                        to: isNaN(newValue) ? null : newValue,
                                                                    }
                                                                }));
                                                                setManualMaxPrice(isNaN(newValue) ? '' : newValue.toString());
                                                                setIsEditingMaxPrice(false);
                                                                e.target.blur();
                                                            }
                                                        }}
                                                        placeholder={t("Unlimited")}
                                                        className="transition placeholder:text-sm bg-transparent outline-none text-white px-2 w-24"
                                                    />
                                                </>
                                            ) : (
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setManualMaxPrice(filters.price?.to ?? '');
                                                        setIsEditingMaxPrice(true);
                                                    }}
                                                >
                                                    {filters.price?.to === null
                                                        ? `$${filters.price.from} - ${t("Unlimited")}`
                                                        : `$${filters.price.from} - $${filters.price.to}`}
                                                </span>
                                            )}
                                        </div>


                                    </div>

                                    <Link to="/filters" state={{ filters }}>
                                        <button className='md:hidden w-full py-2 bg-Myprimary hover:bg-primaryHover rounded-full mt-4 text-black'>Search</button>
                                    </Link>

                                    <Link to="/filters" state={{ filters }} className='hidden md:flex justify-center w-full md:w-fit'>
                                        <button className="bg-black/80 mx-auto md:mx-0 w-12 h-12 flex items-center justify-center rounded-full shadow-md transition ">
                                            <FaSearch className="text-Myprimary hover:text-primaryHover" size={20} />
                                        </button>
                                    </Link>
                                </div>
                            </TabsContent>

                            <TabsContent value="new">
                                <div className="mt-6 md:bg-white/10 md:backdrop-blur-lg bg-[#161614] md:border md:border-white/10 p-5 md:px-7 md:py-4 md:rounded-full rounded-3xl flex flex-col md:flex-row gap-3 w-full md:items-center md:justify-between">

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Location")}</label>
                                        <input type='text' placeholder={t("Area")} value={input.cityId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, cityId: e.target.value }))} className='py-3 md:p-0
                                            w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Brand")}</label>
                                        <input type='text' placeholder={t("Brand Name")} value={input.brandId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, brandId: e.target.value }))} className='py-3 md:p-0 w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Model")}</label>
                                        <input type='text' placeholder={t("Model Name")} value={input.modelId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, modelId: e.target.value }))} className='py-3 md:p-0 w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='md:w-full '>
                                        <label className='mb-5 md:mb-2 block md:text-xl'>{t("Price")}</label>

                                        <SliderPrimitive.Root
                                            className="relative flex items-center select-none touch-none w-full h-3"
                                            min={MIN}
                                            max={MAX}
                                            step={100}
                                            value={[
                                                range[0],
                                                range[1] === null ? MAX : range[1],
                                            ]}
                                            onValueChange={handlePriceChange}
                                            aria-label="Price range"
                                        >
                                            <SliderPrimitive.Track className="bg-[#353534] relative grow h-[0.4rem] md:h-[0.1rem] rounded-md">
                                                <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full" />
                                            </SliderPrimitive.Track>

                                            {[range[0], range[1] === null ? MAX : range[1]].map((val, i) => (
                                                <SliderPrimitive.Thumb
                                                    key={i}
                                                    className="block md:w-2 md:h-2 w-4 h-4 bg-Myprimary rounded-full cursor-pointer hover:scale-110 hover:shadow-lg transition-transform"
                                                    aria-label={i === 0 ? "Minimum price" : "Maximum price"}
                                                    style={{ willChange: "transform" }}
                                                />
                                            ))}
                                        </SliderPrimitive.Root>

                                        <div className="text-xs pt-5 md:pt-1 w-full flex items-center ">
                                            {isEditingMaxPrice ? (
                                                <>
                                                    <span>${filters.price.from} - </span>
                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        value={manualMaxPrice}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (val === '' || /^[0-9]+$/.test(val)) {
                                                                setManualMaxPrice(val);
                                                            }
                                                        }}
                                                        onBlur={() => {
                                                            const newValue = parseInt(manualMaxPrice);
                                                            setFilters(prev => ({
                                                                ...prev,
                                                                price: {
                                                                    ...prev.price,
                                                                    to: isNaN(newValue) ? null : newValue,
                                                                }
                                                            }));
                                                            setManualMaxPrice(isNaN(newValue) ? '' : newValue.toString());
                                                            setIsEditingMaxPrice(false);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (
                                                                !(
                                                                    (e.key >= '0' && e.key <= '9') ||
                                                                    e.key === 'Backspace' ||
                                                                    e.key === 'ArrowLeft' ||
                                                                    e.key === 'ArrowRight' ||
                                                                    e.key === 'Delete' ||
                                                                    e.key === 'Tab' ||
                                                                    e.key === 'Enter'
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                            if (e.key === 'Enter') {
                                                                const newValue = parseInt(manualMaxPrice);
                                                                setFilters(prev => ({
                                                                    ...prev,
                                                                    price: {
                                                                        ...prev.price,
                                                                        to: isNaN(newValue) ? null : newValue,
                                                                    }
                                                                }));
                                                                setManualMaxPrice(isNaN(newValue) ? '' : newValue.toString());
                                                                setIsEditingMaxPrice(false);
                                                                e.target.blur();
                                                            }
                                                        }}
                                                        placeholder={t("Unlimited")}
                                                        className="transition placeholder:text-sm bg-transparent outline-none text-white px-2 w-24"
                                                    />
                                                </>
                                            ) : (
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setManualMaxPrice(filters.price?.to ?? '');
                                                        setIsEditingMaxPrice(true);
                                                    }}
                                                >
                                                    {filters.price?.to === null
                                                        ? `$${filters.price.from} - ${t("Unlimited")}`
                                                        : `$${filters.price.from} - $${filters.price.to}`}
                                                </span>
                                            )}
                                        </div>


                                    </div>

                                    <Link to="/filters" state={{ filters }}>
                                        <button className='md:hidden w-full py-2 bg-Myprimary hover:bg-primaryHover rounded-full mt-4 text-black'>Search</button>
                                    </Link>

                                    <Link to="/filters" state={{ filters }} className='hidden md:flex justify-center w-full md:w-fit'>
                                        <button className="bg-black/80 mx-auto md:mx-0 w-12 h-12 flex items-center justify-center rounded-full shadow-md transition ">
                                            <FaSearch className="text-Myprimary hover:text-primaryHover" size={20} />
                                        </button>
                                    </Link>
                                </div>
                            </TabsContent>

                            <TabsContent value="used">
                                <div className="mt-6 md:bg-white/10 md:backdrop-blur-lg bg-[#161614] md:border md:border-white/10 p-5 md:px-7 md:py-4 md:rounded-full rounded-3xl flex flex-col md:flex-row gap-3 w-full md:items-center md:justify-between">
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Location")}</label>
                                        <input type='text' placeholder={t("Area")} value={input.cityId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, cityId: e.target.value }))} className='py-3 md:p-0
                                            w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Brand")}</label>
                                        <input type='text' placeholder={t("Brand Name")} value={input.brandId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, brandId: e.target.value }))} className='py-3 md:p-0 w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='md:text-xl md:mb-2'>{t("Model")}</label>
                                        <input type='text' placeholder={t("Model Name")} value={input.modelId} onChange={(e) =>
                                            setInput(prev => ({ ...prev, modelId: e.target.value }))} className='py-3 md:p-0 w-full px-3 rounded-full md:rounded-none bg-[#0e0e0c] md:bg-transparent border border-white/5 md:border-none md:px-0 outline-none placeholder:text-sm placeholder:text-white/55 placeholder:font-normal md:placeholder:text-[16px]' />
                                    </div>

                                    <div className='md:w-full '>
                                        <label className='mb-5 md:mb-2 block md:text-xl'>{t("Price")}</label>

                                        <SliderPrimitive.Root
                                            className="relative flex items-center select-none touch-none w-full h-3"
                                            min={MIN}
                                            max={MAX}
                                            step={100}
                                            value={[
                                                range[0],
                                                range[1] === null ? MAX : range[1],
                                            ]}
                                            onValueChange={handlePriceChange}
                                            aria-label="Price range"
                                        >
                                            <SliderPrimitive.Track className="bg-[#353534] relative grow h-[0.4rem] md:h-[0.1rem] rounded-md">
                                                <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full" />
                                            </SliderPrimitive.Track>

                                            {[range[0], range[1] === null ? MAX : range[1]].map((val, i) => (
                                                <SliderPrimitive.Thumb
                                                    key={i}
                                                    className="block md:w-2 md:h-2 w-4 h-4 bg-Myprimary rounded-full cursor-pointer hover:scale-110 hover:shadow-lg transition-transform"
                                                    aria-label={i === 0 ? "Minimum price" : "Maximum price"}
                                                    style={{ willChange: "transform" }}
                                                />
                                            ))}
                                        </SliderPrimitive.Root>

                                        <div className="text-xs pt-5 md:pt-1 w-full flex items-center ">
                                            {isEditingMaxPrice ? (
                                                <>
                                                    <span>${filters.price.from} - </span>
                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        value={manualMaxPrice}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (val === '' || /^[0-9]+$/.test(val)) {
                                                                setManualMaxPrice(val);
                                                            }
                                                        }}
                                                        onBlur={() => {
                                                            const newValue = parseInt(manualMaxPrice);
                                                            setFilters(prev => ({
                                                                ...prev,
                                                                price: {
                                                                    ...prev.price,
                                                                    to: isNaN(newValue) ? null : newValue,
                                                                }
                                                            }));
                                                            setManualMaxPrice(isNaN(newValue) ? '' : newValue.toString());
                                                            setIsEditingMaxPrice(false);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (
                                                                !(
                                                                    (e.key >= '0' && e.key <= '9') ||
                                                                    e.key === 'Backspace' ||
                                                                    e.key === 'ArrowLeft' ||
                                                                    e.key === 'ArrowRight' ||
                                                                    e.key === 'Delete' ||
                                                                    e.key === 'Tab' ||
                                                                    e.key === 'Enter'
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                            if (e.key === 'Enter') {
                                                                const newValue = parseInt(manualMaxPrice);
                                                                setFilters(prev => ({
                                                                    ...prev,
                                                                    price: {
                                                                        ...prev.price,
                                                                        to: isNaN(newValue) ? null : newValue,
                                                                    }
                                                                }));
                                                                setManualMaxPrice(isNaN(newValue) ? '' : newValue.toString());
                                                                setIsEditingMaxPrice(false);
                                                                e.target.blur();
                                                            }
                                                        }}
                                                        placeholder={t("Unlimited")}
                                                        className="transition placeholder:text-sm bg-transparent outline-none text-white px-2 w-24"
                                                    />
                                                </>
                                            ) : (
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setManualMaxPrice(filters.price?.to ?? '');
                                                        setIsEditingMaxPrice(true);
                                                    }}
                                                >
                                                    {filters.price?.to === null
                                                        ? `$${filters.price.from} - ${t("Unlimited")}`
                                                        : `$${filters.price.from} - $${filters.price.to}`}
                                                </span>
                                            )}
                                        </div>


                                    </div>

                                    <Link to="/filters" state={{ filters }}>
                                        <button className='md:hidden w-full py-2 bg-Myprimary hover:bg-primaryHover rounded-full mt-4 text-black'>Search</button>
                                    </Link>

                                    <Link to="/filters" state={{ filters }} className='hidden md:flex justify-center w-full md:w-fit'>
                                        <button className="bg-black/80 mx-auto md:mx-0 w-12 h-12 flex items-center justify-center rounded-full shadow-md transition ">
                                            <FaSearch className="text-Myprimary hover:text-primaryHover" size={20} />
                                        </button>
                                    </Link>
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