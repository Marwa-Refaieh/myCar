import React from 'react';
import WorksCard from './worksCard';

const Works = () => {
    const data = [
        {
            number: "01",
            title: "Buy a Car",
            feature1: "Wide variety of cars",
            feature2: "Photos, full details, and price comparisons",
            feature3: "Connect directly with sellers"

        },

        {
            number: "02",
            title: "Sell Your Car",
            feature1: "Quick and simple listing process",
            feature2: "Free or featured ad options",
            feature3: "Support to help you write better ads and close deals"
        },

        {
            number: "03",
            title: "Rent a Car",
            feature1: "Affordable rental offers",
            feature2: "Trusted car rental agencies and individuals",
            feature3: "Book directly from your phone"
        },

        {
            number: "04",
            title: "Car Dealers & Showrooms",
            feature1: "Professional dashboard",
            feature2: "Bulk uploading options",
            feature3: "Custom marketing packages"
        },

        {
            number: "05",
            title: "Car Search & Alerts",
            feature1: "Save time",
            feature2: "Always stay ahead",
            feature3: "Get real-time updates"
        }

    ]
    return (
        <div className='mb-20 bg-[#121212] px-4 py-20'>
            <div>
                <small className="relative text-sm text-white mb-2 uppercase tracking-wider pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-4 before:bg-Myprimary">
                    Our Services
                </small>

                <div className='flex lg:flex-row flex-col justify-between gap-4'>
                    <div className='w-full lg:w-1/2 flex flex-col justify-between mb-5 lg:mb-0'>
                        {/* <div className='flex flex-col text-4xl md:text-[2.5rem] font-medium md:leading-[3.5rem]'>
                            <p className="lg:block hidden">Superior Service</p>
                            <p className="lg:block hidden">with a Touch of</p>
                            <p className="lg:block hidden">Class</p>
                            <p className="lg:hidden block">Superior Service with a Touch of Class</p>
                        </div> */}

                        <div className='flex flex-col text-xl mt-5'>
                            <p>At My Car, we provide a complete set of services to make your car experience easy, secure, and efficient. Whether you're a buyer, seller, renter, or dealer, we’ve got the tools and support to help you every step of the way.</p>
                        </div>

                        <div className='h-[70%]  hidden lg:flex justify-center'>
                            <img
                                src='https://images.unsplash.com/photo-1503736334956-4c8f8e92946d'
                                className='w-full h-full object-cover rounded-xl'
                            />
                        </div>
                    </div>

                    <div className='w-full lg:w-1/2 flex flex-wrap justify-center gap-6 md:gap-3'>
                        {data.map((item) => (
                            <WorksCard
                                key={item.number}
                                number={item.number}
                                title={item.title}
                                feature1={item.feature1}
                                feature2={item.feature2}
                                feature3={item.feature3}
                            />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Works;
