import React, { useState, useEffect } from 'react';
import CarCard from '@/components/favorite/card';
import UserCard from '@/components/favorite/userCard';
import useFetchFavorites from '@/hooks/getFavCars';
import useFetchFavoritesSaller from '@/hooks/getFavSaller';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
export default function Favorite() {
  const [activeTab, setActiveTab] = useState('cars');
  const [notFoundCar, setNotFoundCar] = useState('');
  const [notFoundSaller, setNotFoundSaller] = useState('');

  const { data, loading, error } = useFetchFavorites();
  const { dataSaller, loadingSaller, errorSaller } = useFetchFavoritesSaller();

  useEffect(() => {
    if (!loading && (!Array.isArray(data?.data) || data.data.length === 0)) {
      setNotFoundCar('No Car In Your Favorite');
    }
    if (!loadingSaller && (!Array.isArray(dataSaller?.data) || dataSaller.data.length === 0)) {
      setNotFoundSaller('No Seller In Your Favorite');
    }
  }, [loading, data, loadingSaller, dataSaller]); 

  if (loading || loadingSaller) {
    return (
      <div className="mt-60 block w-fit mx-auto h-40">
        <div className="flex gap-2">
          <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
        </div>
      </div>
    );
  }

  if (error || errorSaller) {
    return <p className="text-red-500 mt-60 block w-fit mx-auto h-40">⚠️ {error || errorSaller}</p>;
  }

  return (
    <div className="mt-24 min-h-screen">
      <h2 className="text-center text-3xl font-bold mb-6">Favorite</h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('cars')}
          className={`px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 ${
            activeTab === 'cars' ? 'bg-Myprimary text-black' : 'bg-gray-800'
          }`}
        >
          Cars
        </button>
        <button
          onClick={() => setActiveTab('sellers')}
          className={`px-6 py-2 rounded-full font-semibold text-white ml-2 transition-all duration-300 ${
            activeTab === 'sellers' ? 'bg-Myprimary text-black' : 'bg-gray-800'
          }`}
        >
          Sellers
        </button>
      </div>

      {/* Cars Tab */}
      {activeTab === 'cars' && (
        <div className="w-[98%] md:w-[80%] mx-auto bg-gray-900 flex flex-wrap items-center justify-around p-6 rounded-xl shadow-lg">
          {Array.isArray(data?.data) && data.data.length > 0 ? (
            data.data.map((item, index) => (
             
                              <CarCard
                key={index}
                image={item.image}
                id={item.id}
                title={item.name}
                price={`${item.price}`}
                km={`${item.odometer} km`}
                year={`${item.year_production}`}
                location={item.city?.name || 'N/A'}
              /> 
              
            ))
          ) : (
            <p className="text-center text-red-700 text-xl">{notFoundCar}</p>
          )}
        </div>
      )}

      {/* Sellers Tab */}
      {activeTab === 'sellers' && (
        <div className="w-[98%] md:w-[80%] mx-auto bg-gray-900 flex flex-wrap items-center justify-around p-6 rounded-xl shadow-lg">
          {Array.isArray(dataSaller?.data) && dataSaller.data.length > 0 ? (
            dataSaller.data.map((item, index) => (
              <UserCard
                key={index}
                name={item.username}
                image={item.image_url}
                following={item.following}
                followers={item.followers}
                reviews={item.email}
              />
            ))
          ) : (
            <p className="text-center text-red-700 text-xl">{notFoundSaller}</p>
          )}
        </div>
      )}
    </div>
  );
}
