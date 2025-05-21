import React from 'react';
import buy from '../../assets/home/buy.png'
import sell from '../../assets/home/sell.png'
import rent from '../../assets/home/rent.png'
import Button from '../Button';
import { Link } from 'react-router-dom';

const Services = () => {
    const images = [
        {
            src: buy,
            alt: 'Car 1',
            title: 'buy'
        },
        {
            src: sell,
            alt: 'Car 2',
            title: 'sell'

        },
        {
            src: rent,
            alt: 'Car 3',
            title: 'rent'

        },
    ];
    return (
        <section className="max-w-7xl mx-auto px-4 pt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {images.map((image, index) => (
                    <div key={index} className=" rounded-xl shadow-md overflow-hidden flex flex-col items-center">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full object-cover object-top"
                        />
                        <Link to={'/cars'} state={{ defaultTab: image.title }} className="p-4 w-full flex justify-center">
                            <Button title={image.title} />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;
