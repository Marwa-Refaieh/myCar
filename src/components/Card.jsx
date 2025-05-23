import React from 'react';
import car from '../assets/home/car1.webp'
import distance from '../assets/distance.svg'
import calender from '../assets/calender.svg'
import typeCare from '../assets/type.svg'
import location from '../assets/location.svg'
import { Link } from 'react-router-dom';

const Card = () => {


    return (
        <Link to={'/details/1'} className='w-full sm:w-[47%] lg:w-[30%]'>
            <div
                className="border-[1px] border-Myprimary rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl">
                <img
                    src={car}
                    alt="Product Image"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-3xl"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="p-4 space-y-2">
                    <div className="flex justify-between border-b border-white/30 pb-4">
                        <h3 className="text-2xl font-semibold text-Myprimary">Product Title</h3>
                        <p className="text-xl font-semibold">17.000$</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 flex-wrap gap-y-2">
                        <div className="flex items-center gap-1">
                            <img src={distance} alt="Distance" />
                            <p>60k KM</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <img src={calender} alt="Calender" />
                            <p>2024</p>
                        </div>

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
            </div>
        </Link>

    );
}

export default Card;



