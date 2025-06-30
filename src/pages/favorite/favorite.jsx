import CarCard from '@/components/favorite/card'
import React, { useState , useEffect } from 'react'
import car from '../../assets/home/car1.webp'
import UserCard from '@/components/favorite/userCard';
import useFetchFavorites from '@/hooks/getFavCars';
import useFetchFavoritesSaller from '@/hooks/getFavSaller';
export default function Favorite() {


 const [notFoundCar , setNotFoundCar] = useState('')
 const [notFoundSaller , setNotFoundSaller] = useState('')
  const { data, loading, error } = useFetchFavorites();
  const { dataSaller, loadingSaller, errorSaller } = useFetchFavoritesSaller();

  useEffect(() => {
    if (!loading && data?.data?.length === 0) {
      setNotFoundCar('No Car In Your Favorite');
    }
    if (!loadingSaller && dataSaller?.data?.length === 0) {
      setNotFoundSaller('No Seller In Your Favorite');
    }
  }, [loading, data, loadingSaller, dataSaller]);
  if (loading || loadingSaller) return <div className="mt-60 block w-fit mx-auto  h-40">
  <div className="flex space-x-2">
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
  </div>
</div>
  if (error || errorSaller) return <p className="text-red-500 mt-60 block w-fit mx-auto  h-40">⚠️ {error}</p>;
 
  return (
    <div className='mt-24 min-h-screen'>
      <h2 className='text-center text-3xl'>Favorite Cars</h2>
      <div className=" w-[98%] md:w-[80%] mx-auto bg-gray-900 flex flex-wrap items-center justify-around p-6">
        {data.data.map((item) =>{
          return        <CarCard
          image={item.image}
          title={item.name}
          price={`${item.price}`}
          km={`${item.odometer} km`}
          year={`${item.year_production}`}
          location={item.city.name}
        />
        })}
        <p className='text-center text-red-700 text-xl'>{notFoundCar}</p>

 

      </div>
      <h2 className='text-center text-3xl'>Favorite Saller</h2>

      <div className=" w-[98%] md:w-[80%] mx-auto bg-gray-900 flex flex-wrap items-center justify-around p-6">
        {dataSaller.data.map((item) =>{
          return         <UserCard name={item.username} image={item.image_url} following={item.following}
          followers={item.followers}
          reviews={item.email} />
        })}

      </div>
      <p className='text-center text-red-700 text-xl'>{notFoundSaller}</p>


    </div>
  )
}
