// import React from "react";
// import { useLocation } from "react-router-dom";
// import Hero2 from "../../components/Hero2";
// import Card2 from "@/components/Card2";
// import Title from "@/components/Title";

// const Filters = () => {
//     const location = useLocation();
//     const filteredCars = location.state?.filteredCars || [];

//     return (
//         <div>
//             <Hero2 />
//             <div className="max-w-7xl mx-auto px-4 py-20">
//                 <Title title="Filtering Result" />
//                 <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
//                     {filteredCars.length > 0 ? (
//                         filteredCars.map((car, index) => (
//                             <Card2 key={index} car={car} />
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500">No cars found.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Filters;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Hero2 from "../../components/Hero2";
import Card2 from "@/components/Card2";
import Title from "@/components/Title";

const Filters = () => {

    const location = useLocation();
    const filters = location.state?.filters; 

    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const buildFiltersArray = (filters) => {
        const result = [];

        if (filters.features?.length) result.push({ name: "features", operation: "in", value: filters.features });
        if (filters.year_production.from && filters.year_production.to) result.push({ name: "year_production", value: filters.year_production });
        if (filters.type) result.push({ name: "type", value: filters.type });
        if (filters.transmission_type) result.push({ name: "transmission_type", value: filters.transmission_type });
        if (filters.body_type) result.push({ name: "body_type", value: filters.body_type });
        if (filters.fuel_type) result.push({ name: "fuel_type", value: filters.fuel_type });
        if (filters.city_id) result.push({ name: "city_id", value: filters.city_id });
        if (filters.model_id) result.push({ name: "model_id", value: filters.model_id });
        if (filters.brand_id) result.push({ name: "brand_id", value: filters.brand_id });
        if (filters.odometer.from && filters.odometer.to) result.push({ name: "odometer", value: filters.odometer });
        if (filters.color) result.push({ name: "color", value: filters.color });
        if (filters.horsepower) result.push({ name: "horsepower", operation: "eq", value: filters.horsepower });

        return result;
    };

    const fetchFilteredCars = async () => {
        if (!filters) return;

        setLoading(true);
        const Filters = buildFiltersArray(filters);

        try {
            const response = await axios({
                method: "get",
                url: "https://mycarapplication.com/api/car",
                data: {
                    Filters,
                    orders: []
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Response data:", response.data);
            setFilteredCars(response.data.data);
        } catch (error) {
            console.error("Error fetching filtered cars:", error);
            setFilteredCars([]);
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchFilteredCars();
    }, [filters]);

    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title="Filtering Result" />

                {loading && <p className="text-center text-gray-500">Loading...</p>}

                {!loading && filteredCars.length === 0 && (
                    <p className="text-center text-gray-500">No cars found.</p>
                )}

                <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                    {filteredCars.map((car, index) => (
                        <Card2 key={index} car={car} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filters;
