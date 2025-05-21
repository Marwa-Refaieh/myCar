import React from 'react';
import heroImg from '../../assets/home/heroImg.webp'

const HeroImage = () => {
    return (
        <section className="w-full pt-20">
            <img
                src={heroImg}
                alt="Hero Section"
                className="w-full h-[25rem] rounded-3xl shadow-md "
            />
        </section>
    );
}

export default HeroImage;
