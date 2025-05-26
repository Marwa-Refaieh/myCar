import React from 'react';
import wave from '../assets/wave2.png'
import { useTranslation } from 'react-i18next';

const Hero2 = () => {
    const { t } = useTranslation('home');
    return (
        <section className="md:block hidden relative h-[45vh] w-full mt-16 bg-[#232321] flex items-center px-6 flex-col-reverse lg:flex-row justify-between overflow-hidden">

            <div className="w-full h-full flex flex-col items-center justify-center text-center z-30 ">
                <h1 className="text-Myprimary text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
                    {t("Find A Car")}
                </h1>
                <h2 className="text-white text-2xl sm:text-2xl lg:text-4xl font-bold">
                    {t("Quick And Super Easy!")}
                </h2>
            </div>


            <img
                src={wave}
                alt="Wave Decoration"
                className="absolute bottom-0 right-0 w-[45%] object-cover pointer-events-none z-0"
            />

            <img
                src={wave}
                alt="Wave Decoration"
                className="absolute bottom-0 left-0 w-[45%] object-cover pointer-events-none z-0 -scale-x-100"
            />
        </section>
    );
}

export default Hero2;
