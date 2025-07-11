
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
import Button2 from './Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PriceRangeSlider from './filters/PriceRangeSlider';
import { countActiveFilters, getOrdersFromSort } from '@/utils/filterFunctions';
import Models from './filters/Models';
import Features from './filters/Features';

const Sidebar = ({ isPermanent = false, onClose }) => {
    const { t, i18n } = useTranslation('home');
    const { sidebarOpen, toggleSidebar } = useSidebar();
    const [city, setCity] = useState([]);
    const [models, setModels] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);
    const [filters, setFilters] = useState({
        features: [],
        year_production: {
            from: 1970,
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
        horsepower: {
            from: 0,
            to: null,
        },
        sort: null
    });


    countActiveFilters(filters)

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
        if (!isPermanent && sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [sidebarOpen, isPermanent]);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/car-features/get-cities')
            .then(res => {
                setCity(res.data.data);
            });
    }, []);

    const handleBrandSelect = (brandId) => {
        setLoadingModels(true);
        axios.get(`https://mycarapplication.com/api/car-features/get-model-of-brands?brand_id=${brandId}`)
            .then((response) => {
                setModels(response.data);
                setLoadingModels(false);
            })
            .catch((error) => {
                console.error("Failed to fetch models:", error);
                setLoadingModels(false);
            });
    };


    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            toggleSidebar();
        }
    };

    return (
        <>
            <div
                className={`sidebar-scroll overflow-hidden text-white shadow-lg overflow-y-auto ${isPermanent
                    ? 'bg-[#040403] w-96 h-auto lg:block'
                    : 'bg-[#121212] fixed top-0 right-0 h-full w-full sm:w-4/5 lg:w-96 transform transition-transform duration-300 z-50 ' +
                    (sidebarOpen ? 'translate-x-0' : 'translate-x-full')
                    }`}
            >

                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold">{t("Filters")}</h2>
                    {!isPermanent && (
                        <button
                            onClick={handleClose}
                            className="text-gray-300 hover:text-Myprimary text-lg transition"
                        >
                            <FaTimes size={18} />
                        </button>
                    )}
                </div>
                <div className="p-4 space-y-4">
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
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-Myprimary 
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="newest" className="text-white">{t("Newest")}</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="name"
                                    id="name"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-Myprimary
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="name" className="text-white">{t("Name")} (A-Z)</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="price-lowest"
                                    id="price-lowest"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-Myprimary
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="price-lowest" className="text-white">
                                    {t("Price: lowest to high")}</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="price-highest"
                                    id="price-highest"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-Myprimary
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="price-highest" className="text-white">
                                    {t("Price: highest to low")}</label>
                            </div>
                        </RadioGroup>
                    </div>

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
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-Myprimary 
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="buy" className="text-white">{t("Buy")}</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="2"
                                    id="rental"
                                    className={`border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-Myprimary 
                                    ${i18n.language === 'ar' ? 'ml-2' : ''}`}
                                />
                                <label htmlFor="rental" className="text-white">{t("Rental")}</label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Brands */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={car} className='w-full h-full' alt="car" />
                            </div>
                            <p className='text-1xl'>{t("Car make/model")}</p>
                        </div>
                        <div className='py-5'>
                            <Brands setFilters={setFilters} filters={filters}
                                onBrandSelect={handleBrandSelect} />
                        </div>
                    </div>

                    {/* Models */}
                    {filters.brand_id && (
                        <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                            <div className='flex items-center gap-2'>
                                <div className='w-6 bg-Mycard rounded-full p-1'>
                                    <img src={car} className='w-full h-full' alt="car" />
                                </div>
                                <p className='text-1xl'>{t("Brand Model")}</p>
                            </div>

                            <div className='pt-5 flex flex-wrap gap-4'>
                                <Models
                                    models={models}
                                    filters={filters}
                                    toggleFilter={toggleFilter}
                                    loading={loadingModels}
                                />

                            </div>
                        </div>
                    )}

                    {/* Price */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <PriceRangeSlider filters={filters} setFilters={setFilters} />
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

                    {/* City */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={location} className='w-full h-full' alt="location" />
                            </div>
                            <p className='text-1xl'>{t("City")}</p>
                        </div>
                        <div className='pt-5 flex gap-4 overflow-x-auto scrollbar-hide'>
                            {city.map((cityItem) => (
                                <div
                                    key={cityItem.id}
                                    onClick={() => toggleFilter("city_id", cityItem.id)}
                                    className="cursor-pointer shrink-0"
                                >
                                    <Button
                                        title={cityItem.name}
                                        active={filters.city_id === cityItem.id}
                                    />
                                </div>
                            ))}
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
                        <HorsepowerSlider filters={filters} setFilters={setFilters} />
                    </div>

                    {/* Features */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={Star} className='w-full h-full' alt="star" />
                            </div>
                            <p className='text-1xl'>{t("Features")}</p>
                        </div>
                        <Features filters={filters} setFilters={setFilters} toggleFilter={toggleFilter} />

                    </div>

                    <div className='flex justify-center py-3 gap-4'>
                        <Link
                            to="/filters"
                            state={{ filters: { ...filters, orders: getOrdersFromSort(filters.sort) } }}
                            onClick={isPermanent ? null : handleClose}
                        >
                            <Button2 title={`${t("Show Results")}${countActiveFilters(filters) > 0 ? ` (${countActiveFilters(filters)})` : ''}`} />

                        </Link>

                        <button
                            onClick={() => setFilters({
                                features: [],
                                year_production: { from: 1970, to: null },
                                type: null,
                                transmission_type: null,
                                body_type: null,
                                fuel_type: null,
                                city_id: null,
                                model_id: null,
                                brand_id: null,
                                odometer: { from: 0, to: null },
                                price: { from: 0, to: null },
                                color: null,
                                horsepower: { from: 0, to: null },
                                sort: null
                            })}
                            className="bg-Myprimary rounded-full text-black px-5 py-2 font-bold hover:bg-primaryHover transition"
                        >
                            {t("Reset")}
                        </button>
                    </div>
                </div>
            </div>

            {!isPermanent && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={handleClose}
                />
            )}
        </>
    );
};

export default Sidebar;