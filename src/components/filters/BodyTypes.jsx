import React from 'react';
import compact from '../../assets/compact.png';
import crossover from '../../assets/crossover.png';
import sedan from '../../assets/sedan.png';
import sport from '../../assets/sport.png';
import suv from '../../assets/suv.png';

const bodyTypeData = [
  { src: compact, name: "compact", value: 1 },
  { src: crossover, name: "crossover", value: 2 },
  { src: sport, name: "sport", value: 0 },
  { src: suv, name: "suv", value: 4 },
  { src: sedan, name: "sedan", value: 6 },
];

const BodyTypes = ({ filters, setFilters }) => {
  const baseClass =
    'flex flex-col justify-center bg-MyOption px-2 py-3 border-2 rounded-lg cursor-pointer border-Mycard transition-all duration-300 ease-in-out';
  const activeClass =
    'border-Myprimary shadow-[0_0_15px_1px_rgba(255,235,100,0.3)] bg-[rgba(250,204,21,0.1)]';

  const handleSelect = (value) => {
    setFilters((prev) => ({
      ...prev,
      body_type: prev.body_type === value ? null : value,
    }));
  };

  return (
    <div className="flex flex-wrap gap-3">
      {bodyTypeData.map((item, index) => {
        const isActive = filters.body_type === item.value;

        return (
          <div
            key={index}
            onClick={() => handleSelect(item.value)}
            className={`
              ${baseClass} 
              ${isActive ? activeClass : ''} 
              w-[25%] gap-1
              flex flex-col items-center justify-center px-4  
              text-center border rounded-lg transition-all cursor-pointer
            `}
          >
            <div
              className="w-16 h-10 bg-Myprimary"
              style={{
                WebkitMaskImage: `url(${item.src})`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskImage: `url(${item.src})`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
              }}
            ></div>
            <p className="text-sm font-medium text-white">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BodyTypes;
