import { FaTimes } from 'react-icons/fa';
import { useSidebar } from '../context/SidebarContext';
import sort from '../assets/sort.png';
import car from '../assets/car.png';
import fuel from '../assets/fuel.png';
import color from '../assets/color.png';
import Star from '../assets/Star.png';
import location from '../assets/location.png';
import transmission from '../assets/transmission.png';
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import Brands from '../components/filters/Brands';
import { useEffect, useState } from "react";
import YearRangeSlider from './filters/YearRangeSlider';
import SpeedRangeSlider from './filters/SpeedRangeSlider';
import Button from './filters/Button';
import BodyTypes from './filters/BodyTypes';
import ColorPicker from './filters/ColorPicker';
import HorsepowerSlider from './filters/HorsepowerSlider';
import PriceSlider from './filters/PriceSlider';
import Button2 from './Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PriceRangeSlider from './filters/PriceRangeSlider';

const Sidebar = () => {
    const { t, i18n } = useTranslation('home');
    const { sidebarOpen, toggleSidebar } = useSidebar();
    const [city, setCity] = useState([])
    const [filters, setFilters] = useState({
        features: [],
        year_production: {
            from: 2006,
            to: null,
        },
        type: null,
        transmission_type: null,
        body_type: null,
        fuel_type: null,
        city_id: null,
        model_id: null,
        brand_id: null,
        odometer: {
            from: 0,
            to: null,
        },
        price: {
            from: 0,
            to: null,
        },
        color: null,
        horsepower: null,
        sort: null
    });

    const getOrdersFromSort = (sortValue) => {
        switch (sortValue) {
            case 'newest':
                return [{ name: 'year_production', direction: 'desc' }];
            case 'name':
                return [{ name: 'name', direction: 'asc' }];
            case 'price-lowest':
                return [{ name: 'price', direction: 'asc' }];
            case 'price-highest':
                return [{ name: 'price', direction: 'desc' }];
            default:
                return [];
        }
    };

    const countActiveFilters = () => {
        let count = 0;

        // sort
        if (filters.type) count++;

        // brand
        if (filters.brand_id) count++;

        // year ( [2000, 2025])
        if (filters.year_production.from !== 2006 || filters.year_production.to !== null) count++;

        // speed ( [0, 300])
        if (filters.odometer.from !== 0 || filters.odometer.to !== null) count++;

        // transmission
        if (filters.transmission_type) count++;

        // fuelType
        if (filters.fuel_type) count++;

        // bodyType
        if (filters.body_type) count++;

        // color
        if (filters.color) count++;

        // horsepower 
        if (filters.horsepower) count++;

        // features 
        if (filters.features.length > 0) count++;

        // city
        if (filters.city_id) count++;

        return count;
    };

    const toggleFilter = (key, value, isArray = false) => {
        setFilters(prev => {
            if (isArray) {
                const exists = prev[key].includes(value);
                const newArray = exists
                    ? prev[key].filter(item => item !== value)
                    : [...prev[key], value];
                return { ...prev, [key]: newArray };
            } else {
                const newValue = prev[key] === value ? null : value;
                return { ...prev, [key]: newValue };
            }
        });
    };

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [sidebarOpen]);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/car-features/get-cities')
            .then(res => {
                setCity(res.data.data)
            })
    }, []);

    return (
        <>
            <div
                className={`sidebar-scroll overflow-hidden fixed top-0 right-0 h-full 
                w-full sm:w-4/5 lg:w-96 
                bg-[#121212] text-white shadow-lg 
                transform transition-transform duration-300 z-50 overflow-y-auto 
                ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold">{t("Filters")}</h2>
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-300 hover:text-Myprimary text-lg transition"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>
                <div className="p-4 space-y-4">

                    {/* Type */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={sort} className='w-full h-full' alt="sort" />
                            </div>
                            <p className='text-1xl'>{t("Type")}</p>
                        </div>
                        <RadioGroup value={filters.type} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                            onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))} className="flex gap-5 pt-5">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="1"
                                    id="buy"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400 
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="buy" className="text-white">{t("Buy")}</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="2"
                                    id="rental"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400 
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="rental" className="text-white">{t("Rental")}</label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Sort */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={sort} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>{t("Sort")}</p>
                        </div>
                        <RadioGroup value={filters.sort} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                            onValueChange={(value) => setFilters((prev) => ({ ...prev, sort: value }))} className=" flex flex-wrap gap-5 pt-5">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="newest"
                                    id="newest"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400 
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="newest" className="text-white">{t("Newest")}</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="name"
                                    id="name"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="name" className="text-white">{t("Name")} (A-Z)</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="price-lowest"
                                    id="price-lowest"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="price-lowest" className="text-white">
                                    {t("Price: lowest to high")}</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="price-highest"
                                    id="price-highest"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="price-highest" className="text-white">
                                    {t("Price: highest to low")}</label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Car make/model */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={car} className='w-full h-full' alt="car" />
                            </div>
                            <p className='text-1xl'>{t("Car make/model")}</p>
                        </div>
                        <div className='py-5'>
                            <Brands setFilters={setFilters} filters={filters} />
                        </div>
                    </div>

                    {/* Year */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <YearRangeSlider filters={filters} setFilters={setFilters} />
                    </div>

                    {/* Speed */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <SpeedRangeSlider filters={filters} setFilters={setFilters} />
                    </div>

                    {/* Transmission */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={transmission} className='w-full h-full' alt="transmission" />
                            </div>
                            <p className='text-1xl'>{t("Transmission")}</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <div onClick={() => toggleFilter("transmission_type", 1)}>
                                <Button title={t("Automatic")} active={filters.transmission_type === 1} />
                            </div>

                            <div onClick={() => toggleFilter("transmission_type", 3)}>
                                <Button
                                    title={t("Manual")}
                                    active={filters.transmission_type === 3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Fuel Type */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={fuel} className='w-full h-full' alt="fuel" />
                            </div>
                            <p className='text-1xl'>{t("Fuel Type")}</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <div onClick={() => toggleFilter("fuel_type", 1)}>
                                <Button title={t("Petrol")} active={filters.fuel_type === 1} />
                            </div>

                            <div onClick={() => toggleFilter("fuel_type", 2)}>
                                <Button title={t("Diesel")} active={filters.fuel_type === 2} />
                            </div>

                            <div onClick={() => toggleFilter("fuel_type", 3)}>
                                <Button title={t("Electric")} active={filters.fuel_type === 3} />
                            </div>

                        </div>
                    </div>

                    {/* Body Types */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={car} className='w-full h-full' alt="car" />
                            </div>
                            <p className='text-1xl'>{t("Body Types")}</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <BodyTypes filters={filters} setFilters={setFilters} />
                        </div>
                    </div>

                    {/* Body Color */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={color} className='w-full h-full' alt="color" />
                            </div>
                            <p className='text-1xl'>{t("Body Color")}</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <ColorPicker onSelectColor={(color) => setFilters(prev => ({ ...prev, color }))} />
                        </div>
                    </div>

                    {/* Horsepower */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <HorsepowerSlider
                            initialValue={filters.horsepower}
                            onChangeHorsepower={(val) =>
                                setFilters((prev) => ({ ...prev, horsepower: val }))
                            }
                        />
                    </div>

                    {/* Features */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={Star} className='w-full h-full' alt="star" />
                            </div>
                            <p className='text-1xl'>{t("Features")}</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <div onClick={() => toggleFilter("features", 1, true)}>
                                <Button title={t("Navigation")} active={filters.features.includes(1)} />
                            </div>

                            <div onClick={() => toggleFilter("features", 2, true)}>
                                <Button title={t("Sun Roof")} active={filters.features.includes(2)} />
                            </div>

                            <div onClick={() => toggleFilter("features", 3, true)}>
                                <Button title={t("2 doors")} active={filters.features.includes(3)} />
                            </div>

                            <div onClick={() => toggleFilter("features", 4, true)}>
                                <Button title={t("7 seater")} active={filters.features.includes(4)} />
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <PriceRangeSlider filters={filters} setFilters={setFilters} />
                        </div>
                    </div>

                    {/* City */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={location} className='w-full h-full' alt="location" />
                            </div>
                            <p className='text-1xl'>{t("City")}</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            {city.map((cityItem) => (
                                <div
                                    key={cityItem.id}
                                    onClick={() => toggleFilter("city_id", cityItem.id)}
                                    className="cursor-pointer"
                                >
                                    <Button
                                        title={cityItem.name}
                                        active={filters.city_id === cityItem.id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex justify-center py-3 gap-4'>
                        <Link
                            to="/filters"
                            state={{ filters: { ...filters, orders: getOrdersFromSort(filters.sort) } }}
                            onClick={toggleSidebar}
                        >
                            <Button2 title={`${t("Show Results")}${countActiveFilters() > 0 ? ` (${countActiveFilters()})` : ''}`} />
                        </Link>

                        <button
                            onClick={() => setFilters({
                                features: [],
                                year_production: {
                                    from: 2006,
                                    to: null,
                                },
                                type: null,
                                transmission_type: null,
                                body_type: null,
                                fuel_type: null,
                                city_id: null,
                                model_id: null,
                                brand_id: null,
                                odometer: {
                                    from: 0,
                                    to: null,
                                },
                                price: {
                                    from: 0,
                                    to: null,
                                },
                                color: null,
                                horsepower: null,
                                sort: null
                            })}
                            className="bg-Myprimary rounded-full text-black px-5 py-2 font-bold hover:bg-primaryHover transition"
                        >
                            {t("Reset")}
                        </button>
                    </div>

                </div>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;