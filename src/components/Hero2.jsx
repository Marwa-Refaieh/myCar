import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero2 = () => {
    const { t } = useTranslation('home');
    return (
        <section
            className="md:flex hidden relative h-[45vh] w-full mt-16 bg-[#232321] items-center px-6 flex-col-reverse lg:flex-row justify-between overflow-hidden bg-no-repeat bg-cover bg-center"
            style={{
                backgroundImage: `url('/src/assets/hero6.webp')`
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40 z-10" />
            
            <div className="w-full h-full flex flex-col items-start pl-16 justify-center text-center z-30">
                <h1 className="text-Myprimary text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
                    {t("Find A Car")}
                </h1>
                <h2 className="text-white text-2xl sm:text-2xl lg:text-4xl font-bold">
                    {t("Quick And Super Easy!")}
                </h2>
            </div>
        </section>
    );
}

export default Hero2;
