// import { useParams } from 'react-router-dom';

import ImageGallery from "@/components/carDetails/ImageGallery";
import Hero from "@/components/Hero2";
import Services from "@/components/home/Services";
import car1 from "../../assets/carDetails/car1.png";
import car2 from "../../assets/carDetails/car2.png";
import car3 from "../../assets/carDetails/car3.png";
import car4 from "../../assets/carDetails/car4.png";
import CarData from "@/components/carDetails/carData";
import CarTabs from "@/components/carDetails/carTabs";
import { useParams } from "react-router-dom";

export default function CarDetails() {
    const param = useParams()
    const id = param.id

    const productImages = [car1, car2, car3, car4];
    return (
        <>
            <Hero />
            <p className="text-center">{id}</p>
            <div className='max-w-7xl mx-auto px-4 pt-28 md:pt-16'>
                <div className="flex flex-col items-center lg:items-start gap-10 lg:gap-0 lg:flex-row lg:justify-between">
                    <div className="w-[90%] md:w-[70%] lg:w-[50%]">
                        <ImageGallery images={productImages} />
                    </div>
                    <div className="w-[90%] md:w-[70%] lg:w-[40%]">
                        <CarData />
                    </div>
                </div>
                <CarTabs />
            </div>
        </>
    );
}
