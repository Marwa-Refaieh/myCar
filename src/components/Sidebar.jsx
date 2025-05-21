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
import compact from '../assets/compact.png';
import crossover from '../assets/crossover.png';
import sport from '../assets/sport.png';
import suv from '../assets/suv.png';
import ColorPicker from './filters/ColorPicker';
import HorsepowerSlider from './filters/HorsepowerSlider';
import PriceSlider from './filters/PriceSlider';
import Button2 from './Button';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { sidebarOpen, toggleSidebar } = useSidebar();
    const [filters, setFilters] = useState({
        sort: "buy",
        type: "newest",
        brand: "",
        year: [2000, 2025],
        speed: [0, 300],
        transmission: "",
        fuelType: "",
        bodyType: "",
        color: "",
        horsepower: [0, 800],
        features: [],
        price: 0,
        city: "",
    });

    const countActiveFilters = () => {
        let count = 0;

        // sort
        if (filters.sort !== "buy") count++;

        // type
        if (filters.type !== "newest") count++;

        // brand
        if (filters.brand) count++;

        // year ( [2000, 2025])
        if (filters.year[0] !== 2000 || filters.year[1] !== 2025) count++;

        // speed ( [0, 300])
        if (filters.speed[0] !== 0 || filters.speed[1] !== 300) count++;

        // transmission
        if (filters.transmission) count++;

        // fuelType
        if (filters.fuelType) count++;

        // bodyType
        if (filters.bodyType) count++;

        // color
        if (filters.color) count++;

        // horsepower ( [0, 800])
        if (filters.horsepower[0] !== 0 || filters.horsepower[1] !== 800) count++;

        // features 
        if (filters.features.length > 0) count++;

        // price ( 0)
        if (filters.price !== 0) count++;

        // city
        if (filters.city) count++;

        return count;
    };


    const bodyTypeData = [
        { src: compact, name: "compact" },
        { src: crossover, name: "crossover" },
        { src: sport, name: "sport" },
        { src: suv, name: "suv" },
    ]

    const toggleFilter = (key, value, isArray = false) => {
        setFilters(prev => {
            if (isArray) {
                const exists = prev[key].includes(value);
                const newArray = exists
                    ? prev[key].filter(item => item !== value)
                    : [...prev[key], value];
                return { ...prev, [key]: newArray };
            } else {
                const newValue = prev[key] === value ? "" : value;
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
        console.log(filters);

    }, [filters]);

    return (
        <>
            <div
                className={`sidebar-scroll overflow-hidden fixed top-0 right-0 h-full 
                w-full sm:w-4/5 lg:w-96 
                bg-[#121212] text-white shadow-lg 
                transform transition-transform duration-300 z-50 overflow-y-auto 
                ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>


                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-300 hover:text-Myprimary text-lg transition"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>
                <div className="p-4 space-y-4">

                    {/* Sort */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={sort} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>Sort</p>
                        </div>
                        <RadioGroup value={filters.sort}
                            onValueChange={(value) => setFilters((prev) => ({ ...prev, sort: value }))} className="flex gap-5 pt-5">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="buy"
                                    id="buy"
                                    className="border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400"
                                />
                                <label htmlFor="buy" className="text-white">Buy</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="rental"
                                    id="rental"
                                    className="border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400"
                                />
                                <label htmlFor="rental" className="text-white">Rental</label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Type */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={sort} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>Type</p>
                        </div>
                        <RadioGroup value={filters.type}
                            onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))} className=" flex flex-wrap gap-5 pt-5">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="newest"
                                    id="newest"
                                    className="border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400"
                                />
                                <label htmlFor="newest" className="text-white">Newest</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="name"
                                    id="name"
                                    className="border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400"
                                />
                                <label htmlFor="name" className="text-white">Name (A-Z)</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="price-lowest"
                                    id="price-lowest"
                                    className="border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400"
                                />
                                <label htmlFor="price-lowest" className="text-white">Price: lowest to high</label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="price-highest"
                                    id="price-highest"
                                    className="border-white text-white data-[state=checked]:border-transparent data-[state=checked]:bg-Myprimary data-[state=checked]:ring-0  data-[state=checked]:after:bg-yellow-400"
                                />
                                <label htmlFor="price-highest" className="text-white">Price: highest to low</label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Car make/model */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={car} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>Car make/model</p>
                        </div>
                        <div className='py-5'>
                            <Brands setFilters={setFilters} filters={filters} />
                        </div>
                    </div>

                    {/* Year */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <YearRangeSlider filters={filters} setFilters={setFilters} />
                        </div>
                    </div>

                    {/* Speed */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <SpeedRangeSlider filters={filters} setFilters={setFilters} />
                        </div>
                    </div>

                    {/* Transmission */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={transmission} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>Transmission</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <div onClick={() => toggleFilter("transmission", "automatic")}>
                                <Button title="Automatic" active={filters.transmission.includes("automatic")} />
                            </div>

                            <div onClick={() => toggleFilter("transmission", "manual")}>
                                <Button
                                    title="Manual"
                                    active={filters.transmission.includes("manual")}
                                />
                            </div>


                        </div>
                    </div>

                    {/* Fuel Type */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={fuel} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>Fuel Type</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <div onClick={() => toggleFilter("fuelType", "petrol")}>
                                <Button title="Petrol" active={filters.fuelType.includes("petrol")} />
                            </div>

                            <div onClick={() => toggleFilter("fuelType", "diesel")}>
                                <Button title="Diesel" active={filters.fuelType.includes("diesel")} />
                            </div>

                            <div onClick={() => toggleFilter("fuelType", "electric")}>
                                <Button title="Electric" active={filters.fuelType.includes("electric")} />
                            </div>
                        </div>
                    </div>

                    {/* Body Types */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={car} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>Body Types</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            {bodyTypeData.map((item, index) => (
                                <BodyTypes
                                    key={index}
                                    src={item.src}
                                    name={item.name}
                                    active={filters.bodyType === item.name}
                                    onSelect={() => toggleFilter("bodyType", item.name)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Body Color */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={color} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>Body Color</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <ColorPicker onSelectColor={(color) => setFilters(prev => ({ ...prev, color }))} />
                        </div>
                    </div>

                    {/* Horsepower */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <HorsepowerSlider
                                onChangeHorsepower={(val) =>
                                    setFilters((prev) => ({ ...prev, horsepower: val }))
                                }
                            />
                        </div>
                    </div>

                    {/* Features */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={Star} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>Features</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <div onClick={() => toggleFilter("features", "Navigation", true)}>
                                <Button title="Navigation" active={filters.features.includes("Navigation")} />
                            </div>

                            <div onClick={() => toggleFilter("features", "Sun Roof", true)}>
                                <Button title="Sun Roof" active={filters.features.includes("Sun Roof")} />
                            </div>

                            <div onClick={() => toggleFilter("features", "2 doors", true)}>
                                <Button title="2 doors" active={filters.features.includes("2 doors")} />
                            </div>

                            <div onClick={() => toggleFilter("features", "7 seater", true)}>
                                <Button title="7 seater" active={filters.features.includes("7 seater")} />
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <PriceSlider
                                value={filters.price}
                                onChange={(val) => setFilters(prev => ({ ...prev, price: val }))}
                            />
                        </div>
                    </div>

                    {/* City */}
                    <div className='w-full flex flex-col border-b border-white/35 pb-3'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 bg-Mycard rounded-full p-1'>
                                <img src={location} className='w-full h-full' />
                            </div>
                            <p className='text-1xl'>City</p>
                        </div>
                        <div className='pt-5 flex flex-wrap gap-4'>
                            <div onClick={() => toggleFilter("city", "Damas")}>
                                <Button title="Damas" active={filters.city.includes("Damas")} />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center py-3'>
                        <Link to={"/filters"} onClick={toggleSidebar}>
                            <Button2 title={`Show Results${countActiveFilters() > 0 ? ` (${countActiveFilters()})` : ''}`} />
                        </Link>
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
