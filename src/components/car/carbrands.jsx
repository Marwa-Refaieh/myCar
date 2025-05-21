import React, { useState } from 'react';
import brand from '../../assets/brand.png'
const CarBrands = ({ value, onClick }) => {
    const brands = ["تويوتا", "هيونداي", "مرسيدس", "بي إم دبليو", "فورد"];
    const [activeIndex, setActiveIndex] = useState(null);

    return (
      
      <div className="flex justify-between items-center flex-wrap">

        
          {brands.map((e , index) =>{
            return <div key={index} onClick={() => setActiveIndex(index)}>
              <div   className={`text-white border-2 bg-[#0E0E0C] mb-3 ${ activeIndex === index ? 'border-yellow-400' : 'border-gray'} flex-col  rounded-sm flex justify-center items-center p-1 cursor-pointer w-[119px] h-[119px]`} onClick={onClick} value={value}>
                <img src={brand} alt={e} />
                {e}
                </div>
            </div>
          })}
      </div>
    );
  };

  
  export default CarBrands;