import React from 'react';
import hero from '../assets/hero2.png'
import wave from '../assets/wave.png'

const Hero = () => {
    return (

        <section className="relative h-[90vh] w-full mt-16 bg-[#232321] flex items-center px-5 md:px-20 flex-col-reverse lg:flex-row justify-between overflow-hidden">

            <div className='relative z-20 flex flex-col justify-center md:justify-betweengap-4 items-center md:flex-row h-full gap-6'>
                <div className="w-full  flex flex-col justify-center  gap-6 z-10 md:mt-0 ">
                    <h1 className="text-Myprimary text-4xl sm:text-5xl lg:text-7xl font-bold">
                        Find A Car
                    </h1>
                    <h2 className="text-white text-2xl sm:text-2xl lg:text-4xl font-bold">
                        Quick And Super Easy!
                    </h2>
                </div>

                <div className="w-full">
                    <img
                        src={hero}
                        alt="Car Background"
                        className="max-w-full md:max-h-[80vh] max-h-[50vh] object-contain"
                    />
                </div>
            </div>


            <img
                src={wave}
                alt="Wave Decoration"
                className="absolute bottom-0 left-0 w-full object-cover pointer-events-none z-0"
            />
        </section>

    );
}

export default Hero;
