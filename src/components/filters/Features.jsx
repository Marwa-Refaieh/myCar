import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';

const Features = ({ filters, toggleFilter }) => {
    const [featuresList, setFeaturesList] = useState([]);

    useEffect(() => {
        axios.get('https://mycarapplication.com/api/car-features/get-car-features')
            .then((res) => {
                if (res.data.data && res.data.data.length > 0) {
                    setFeaturesList(res.data.data);
                }
            })
            .catch((err) => {
                console.error('Error fetching features:', err);
            });
    }, []);

    return (
        <div className='pt-5 flex overflow-x-auto gap-4 scrollbar-hide'>
            {featuresList.map((feature) => (
                <div
                    key={feature.id}
                    onClick={() => toggleFilter("features", feature.id, true)}
                    className='shrink-0'
                >
                    <Button
                        title={feature.name}
                        active={filters.features.includes(feature.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Features;
