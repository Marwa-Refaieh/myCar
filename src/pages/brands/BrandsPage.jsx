import React from 'react';
import Brands from '../../components/home/Brands';
import Hero2 from '@/components/Hero2';
import Title from '@/components/Title';

const BrandsPage = () => {

    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title="Branding" />
                <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                    <Brands/>
                </div>
            </div>
        </div>
    );
}

export default BrandsPage;
