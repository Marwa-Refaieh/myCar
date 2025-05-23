import React from 'react';
import { Link } from 'react-router-dom';
import car from '../assets/home/car1.webp';
import distance from '../assets/distance.svg';
import calender from '../assets/calender.svg';
import typeCare from '../assets/type.svg';
import locationIcon from '../assets/location.svg';
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react"; 

const Card2 = ({ showActions = false }) => {

    return (
        <div className="xs:w-full w-[60%] md:w-[30%] lg:w-[28%] rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl bg-[#121212]">
            <Link to="/details/2">
                <img
                    src={car}
                    alt="Product Image"
                    className="w-full h-44 object-cover rounded-3xl"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
            </Link>

            <div className="p-4 pb-0 space-y-2">
                <div className="flex flex-wrap justify-between items-center">
                    <h3 className="text-2xl font-semibold text-Myprimary">Product Title</h3>
                </div>

                <div className="flex items-center justify-between pt-1 flex-wrap border-b border-white/30 pb-4">
                    <div className='w-[45%]'>
                        <div className="flex items-center gap-1">
                            <img src={distance} alt="Distance" className='w-3 text-icon' />
                            <p>60k KM</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={calender} alt="Calender" className='w-3 text-icon' />
                            <p>2024</p>
                        </div>
                    </div>

                    <div className='w-[45%]'>
                        <div className="flex items-center gap-1">
                            <img src={typeCare} alt="TypeCare" className='w-3 text-icon' />
                            <p>Automatic</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={locationIcon} alt="Location" className='w-3 text-icon' />
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



                {showActions && (
                    <div className="flex justify-between mt-4 gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-black border-white/30 hover:bg-primaryHover w-full flex items-center gap-2 justify-center rounded-full bg-Myprimary"
                        >
                            <Pencil className="w-4 h-4" />
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="w-full flex items-center gap-2 justify-center rounded-full"
                        >
                            <Trash className="w-4 h-4" />
                            Delete
                        </Button>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Card2;
