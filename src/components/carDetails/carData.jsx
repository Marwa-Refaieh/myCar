import React from 'react';
import location from '../../assets/location.png'
import LikeButton from '../LikeButton';

const CarData = () => {
    return (
        <div>
            <small className="text-sm text-Myprimary">Avaliable</small>
            <div className='flex justify-between items-center pr-10'>
                <h4 className="text-2xl">Mercedes SL 63 AMG</h4>
                <LikeButton
                    itemType="car"
                    itemId="1"
                    initialLiked={true}
                />
            </div>
            <p className="py-4 text-white/50">The Mercedes SL 63 AMG is a sports car created using advanced technologies that have made it incredibly fast and powerful.</p>

            <p className="pt-2">Rental Price : SYP 5000,000 /<span className="text-Myprimary">day</span></p>

            <div>
                <h4 className="text-Myprimary text-2xl py-3">What’s included?</h4>
                <div className="flex flex-col gap-3">
                    <p>Odometer: <span className="text-white/50">3000 km balance</span></p>
                    <div>
                        <p>Tax and Insurance</p>
                        <p className="text-white/50">Our prices include mandarory taxes such as VAT, Vehicle licencing Fee.</p>
                    </div>
                </div>
            </div>

            <div>
                <p className='text-Myprimary text-2xl py-3'>Location</p>
                <div className='flex gap-2 items-center'>
                    <img src={location} alt='image' className='w-6' />
                    <p>200-298 Clipper St San Francisco, CA 94114, USA</p>
                </div>
                <button className='inline-block font-bold rounded-full bg-Myprimary text-black transition uppercase px-10 py-2 mt-5 hover:bg-primaryHover'>Get Direction</button>
            </div>
        </div>
    );
}

export default CarData;
