import React from 'react';
import choose from '../../assets/home/choose.png'

const Choose = () => {
    return (
        <section className="bg-black text-white md:py-20">
            <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
                
                <div className="w-full md:w-1/2">
                    <div className="font-bold mb-4">
                        <h2 className="text-Myprimary text-3xl md:text-5xl pb-5">Why Did You Choose</h2>
                        <p className="text-white text-2xl md:text-4xl">Our Car Listing Services?</p>
                    </div>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                        If you’re in the market for a new car, you have probably done your fair share of research to car services.
                        You know what kind of car you want, what features you need? We are here to help you at any time.
                    </p>
                   
                    <div className="flex flex-wrap gap-6 justify-between text-center">
                        <div className="w-[45%] sm:w-[22%]">
                            <div className="text-Myprimary text-2xl font-bold">500+</div>
                            <div className="text-sm text-gray-400">Vehicles Available</div>
                        </div>
                        <div className="w-[45%] sm:w-[22%]">
                            <div className="text-Myprimary text-2xl font-bold">300+</div>
                            <div className="text-sm text-gray-400">Happy Customers</div>
                        </div>
                        <div className="w-[45%] sm:w-[22%]">
                            <div className="text-Myprimary text-2xl font-bold">24+</div>
                            <div className="text-sm text-gray-400">7/24 Support</div>
                        </div>
                        <div className="w-[45%] sm:w-[22%]">
                            <div className="text-Myprimary text-2xl font-bold">125+</div>
                            <div className="text-sm text-gray-400">Car Model & Make</div>
                        </div>
                    </div>
                </div>
               
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <img src={choose} alt="Car" className="w-full max-w-md object-contain -scale-x-100" />
                </div>
            </div>
        </section>

    );
}

export default Choose;
