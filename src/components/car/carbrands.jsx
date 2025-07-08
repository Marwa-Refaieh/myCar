import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '@/baseUrl';

const CarBrands = ({ selectBrand }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState('');
  const [myBrands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/car-features/get-brands`);
        setBrands(response.data.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError('Failed To Fetch Brands');
      } finally {
        setLoading(false);
      }
    };

    fetchName();
  }, []);

  const handleBrand = (e, index) => {
    setActiveIndex(index);
    localStorage.setItem('selectedBrand', JSON.stringify(e.id));
    selectBrand(e.id); // don't stringify if backend expects number
  };

  if (loading) {
    return (
      <div className="block mx-auto h-40">
        <div className="flex gap-2">
          <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-800 font-bold mx-auto w-fit">{error}</p>;

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full">
      {myBrands.map((e, index) => (
        <div
          key={e.id}
          onClick={() => handleBrand(e, index)}
          className={`cursor-pointer flex flex-col items-center justify-center rounded-xl h-[110px] w-full border-2 border-[#363434] transition-all duration-300 ${
            activeIndex === index
              ? 'border-yellow-400 bg-yellow-100/5'
              : 'border-gray-600 hover:border-yellow-400'
          }`}
        >
          <img
            src={e.logo}
            alt={e.name}
            className="h-8 mb-2 object-contain"
          />
          <p className="text-white text-sm">{e.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CarBrands;
