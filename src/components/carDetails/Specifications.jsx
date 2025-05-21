import React from 'react';
import calender from '../../assets/carDetails/calender.png'
import gas from '../../assets/carDetails/gas.png'
import fuel from '../../assets/carDetails/fuel.png'
import status from '../../assets/carDetails/status.png'
import car from '../../assets/carDetails/car.png'
import color from '../../assets/carDetails/color.png'
import door from '../../assets/carDetails/door.png'
import carSeat from '../../assets/carDetails/car-seat.png'
import gasPump from '../../assets/carDetails/gas-pump.png'
import engine from '../../assets/carDetails/engine.png'
import cylinder from '../../assets/carDetails/cylinder.png'

const Specifications = () => {
    const images = [calender, gas, fuel, status, car, color, door, carSeat, gasPump, engine, cylinder]
    return (
        <div>
            <p className='text-2xl mb-5 mt-8'>Specifications</p>
            <div className='flex flex-wrap justify-center md:justify-start gap-6'>
                {
                    images.map((img, index) => (
                        <div key={index} className='border border-Mycard w-32 h-32 rounded-lg flex justify-center items-center flex-col gap-2 bg-MyOption'>
                            <img  src={img} className='w-6' />
                            <p>Status</p>
                            <p className='text-white/50'>Automatic</p>
                        </div>
                    ))
                }
            </div>


        </div>
    );
}

export default Specifications;
