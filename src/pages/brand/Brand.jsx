import Card from '@/components/Card';
import Hero2 from '@/components/Hero2';
import Title from '@/components/Title';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Brand = () => {
    const location = useLocation();
    const name = location.state?.name;
    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title={name} />
                <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                    <Card />
                </div>
            </div>
        </div>
    );
}

export default Brand;
