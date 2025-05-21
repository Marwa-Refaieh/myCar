import React from 'react';
import car from '../assets/home/car1.webp'
import distance from '../assets/distance.svg'
import calender from '../assets/calender.svg'
import typeCare from '../assets/type.svg'
import location from '../assets/location.svg'
import { Star } from "lucide-react";
import { Link } from 'react-router-dom';

const Card2 = () => {

    return (
        <>
            <Link to={'/details/2'} className='w-full'>
                <div className="xs:w-full w-[60%] md:w-[30%] lg:w-[25%] rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl bg-[#121212]">
                    <img
                        src={car}
                        alt="Product Image"
                        width={600}
                        height={400}
                        className="w-full h-44 object-cover rounded-3xl"
                        style={{ aspectRatio: "600/400", objectFit: "cover" }}
                    />
                    <div className="p-4 pb-0 space-y-2">
                        <div className="flex flex-wrap justify-between items-center border-b border-white/30 pb-4">
                            <h3 className="text-2xl font-semibold text-Myprimary">Product Title</h3>

                        </div>
                        <div className="flex items-center justify-between pt-4 flex-wrap border-b border-white/30 pb-4">

                            <div className='w-[45%]'>
                                <div className="flex items-center gap-1">
                                    <img src={distance} alt="Distance" />
                                    <p>60k KM</p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <img src={calender} alt="Calender" />
                                    <p>2024</p>
                                </div>
                            </div>


                            <div className='w-[45%]'>
                                <div className="flex items-center gap-1">
                                    <img src={typeCare} alt="TypeCare" />
                                    <p>Automatic</p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <img src={location} alt="Location" />
                                    <p>Damas</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <p className='text-white/50'>price: 17.000$</p>
                            <div className='flex items-center text-sm gap-1'>
                                <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
                                <p className='text-white/50'>4.9 Rating</p>
                            </div>

                        </div>
                    </div>
                </div>
            </Link>


        </>
    );

    // return (
    //     <div onClick={handleClick} className="xs:w-full w-[60%] md:w-[30%] lg:w-[25%] rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl bg-[#121212]">
    //         <img
    //             src={car.image}
    //             alt={car.name}
    //             width={600}
    //             height={400}
    //             className="w-full h-44 object-cover rounded-3xl"
    //             style={{ aspectRatio: "600/400", objectFit: "cover" }}
    //         />
    //         <div className="p-4 pb-0 space-y-2">
    //             <div className="flex flex-wrap justify-between items-center border-b border-white/30 pb-4">
    //                 <h3 className="text-2xl font-semibold text-Myprimary">{car.name}</h3>
    //             </div>

    //             <div className="flex items-center justify-between pt-4 flex-wrap border-b border-white/30 pb-4">
    //                 <div className='w-[45%]'>
    //                     <div className="flex items-center gap-1">
    //                         <img src={distance} alt="Distance" />
    //                         <p>{car.kilometers} KM</p>
    //                     </div>

    //                     <div className="flex items-center gap-1">
    //                         <img src={calender} alt="Year" />
    //                         <p>{car.year}</p>
    //                     </div>
    //                 </div>

    //                 <div className='w-[45%]'>
    //                     <div className="flex items-center gap-1">
    //                         <img src={typeCare} alt="Transmission" />
    //                         <p>{car.transmission}</p>
    //                     </div>

    //                     <div className="flex items-center gap-1">
    //                         <img src={location} alt="Location" />
    //                         <p>{car.location}</p>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='flex items-center justify-between'>
    //                 <p className='text-white/50'>Price: ${car.price}</p>
    //                 <div className='flex items-center text-sm gap-1'>
    //                     <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
    //                     <p className='text-white/50'>{car.rating} Rating</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    // );
}

export default Card2;

