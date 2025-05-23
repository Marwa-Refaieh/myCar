import React, { useEffect, useState } from 'react';
import brand1 from '../../assets/home/brand1.webp'
import brand2 from '../../assets/home/brand2.webp'
import brand3 from '../../assets/home/brand3.webp'
import brand4 from '../../assets/home/brand4.webp'
import brand5 from '../../assets/home/brand5.webp'
import brand6 from '../../assets/home/brand6.webp'
import brand7 from '../../assets/home/brand7.webp'
import brand8 from '../../assets/home/brand8.webp'
import brand9 from '../../assets/home/brand9.webp'
import brand10 from '../../assets/home/brand10.webp'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Brands = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const brandsData = [
        { src: brand1, alt: 'Brand', name: 'Toyota' },
        { src: brand2, alt: 'Brand', name: 'Honda' },
        { src: brand3, alt: 'Brand', name: 'Ford' },
        { src: brand4, alt: 'Brand', name: 'Chevrolet' },
        { src: brand5, alt: 'Brand', name: 'BMW' },
        { src: brand6, alt: 'Brand', name: 'Audi' },
        { src: brand7, alt: 'Brand', name: 'Mercedes' },
        { src: brand8, alt: 'Brand', name: 'Nissan' },
        { src: brand9, alt: 'Brand', name: 'Hyundai' },
        { src: brand10, alt: 'Brand', name: 'Kia' },
    ];
    useEffect(() => {
        axios.get('/api/brands')
            .then(res => setBrands(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleClick = (id, name) => {
        navigate(`/brand/${id}`, { state: { name } });
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
            {brandsData.map((brand, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(index, brand.name)}
                    className="flex flex-col items-center justify-center"
                >
                    <div
                        className="relative rounded-2xl overflow-hidden cursor-pointer
                hover:scale-110 transition-transform duration-300 ease-in-out shadow-md w-32 h-32"
                    >
                        <img
                            src={brand.src}
                            alt={brand.alt}
                            className="w-full h-full object-cover"
                        />
                    
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Brands;
