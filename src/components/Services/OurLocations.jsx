import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const OurLocations = () => {
    return (
        <div className="relative  text-white flex-1 basis-full sm:basis-[48%] md:basis-[30%] 
             h-[60vh] md:h-[70vh] lg:h-[80vh]">
            <img
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d"
                alt="car"
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50 z-10"></div>

            <div className="absolute top-4 left-4 text-white text-[1.5rem] md:text-[2rem] font-bold tracking-wider uppercase pl-4 z-20 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-5 before:bg-Myprimary">
                01
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 bg-gradient-to-t from-black/80 to-transparent z-20">
                <h3 className="text-xl md:text-2xl font-bold mb-1 uppercase">Maintenance</h3>
                <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing, luctus nec ullamcorper.
                </p>

                <a
                    href="#"
                    className="text-xs font-bold flex items-center gap-2 uppercase">
                    Learn More
                    <FaArrowRight className="text-xs mt-[2px] text-Myprimary" />
                </a>
            </div>
        </div>
    );
}

export default OurLocations;
