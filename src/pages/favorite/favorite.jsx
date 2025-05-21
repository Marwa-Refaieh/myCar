import CarCard from '@/components/favorite/card'
import React from 'react'
import car from '../../assets/home/car1.webp'
import UserCard from '@/components/favorite/userCard';
export default function Favorite() {

  return (
    <div className='mt-24'>
      <h2 className='text-center text-3xl'>Favorite Cars</h2>
      <div className="min-h-screen w-[98%] md:w-[80%] mx-auto bg-gray-900 flex flex-wrap items-center justify-around p-6">
        <CarCard
          image={car}
          title="Hyundai Elantra"
          price="30,000"
          km="60k KM"
          year="2024"
          type="Automatic"
          location="Damas"
        />

        <CarCard
          image={car}
          title="Hyundai Elantra2"
          price="30,000"
          km="61k KM"
          year="2024"
          type="Automatic"
          location="Damas"
        />
        <CarCard
          image={car}
          title="Hyundai Elantra3"
          price="30,000"
          km="60k KM"
          year="2024"
          type="Automatic"
          location="Damas"
        />

        <CarCard
          image={car}
          title="Hyundai Elantra4"
          price="30,000"
          km="61k KM"
          year="2024"
          type="Automatic"
          location="Damas"
        />



      </div>
      <h2 className='text-center text-3xl'>Favorite Saller</h2>

      <div className=" w-[98%] md:w-[80%] mx-auto bg-gray-900 flex flex-wrap items-center justify-around p-6">
        <UserCard name='mustafa' image={car} following={14}
          followers="1.9K"
          rating={4}
          reviews={230} />
        <UserCard name='mustafa' image={car} following={14}
          followers="1.9K"
          rating={4}
          reviews={230} />
        <UserCard name='mustafa' image={car} following={14}
          followers="1.9K"
          rating={4}
          reviews={230} />
        <UserCard name='mustafa' image={car} following={14}
          followers="1.9K"
          rating={4}
          reviews={230} />
      </div>


    </div>
  )
}
