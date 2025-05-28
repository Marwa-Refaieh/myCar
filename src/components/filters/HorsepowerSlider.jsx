import * as SliderPrimitive from "@radix-ui/react-slider";
import { useState } from "react";
import gas from '../../assets/gas.png';
import { useTranslation } from "react-i18next";

const MIN = 0;
const MAX = 1000;

export default function HorsepowerSlider({ onChangeHorsepower, initialValue }) {
    const [value, setValue] = useState(initialValue ?? 500);
    const { t } = useTranslation('home');

    const handleChange = (val) => {
        setValue(val[0]);
        onChangeHorsepower && onChangeHorsepower(val[0]);
    };

    return (
        <div className="text-white rounded-xl w-full max-w-lg mx-auto ">
            <div className="flex items-center justify-between mb-5">
                <div className='flex items-center gap-2'>
                    <div className='w-6 bg-Mycard rounded-full p-1'>
                        <img src={gas} className='w-full h-full' alt="gas" />
                    </div>
                    <p className='text-1xl'>{t("Horsepower")}</p>
                </div>
            </div>

            <SliderPrimitive.Root
                className="relative p-4 flex items-center select-none touch-none w-full h-5"
                min={MIN}
                max={MAX}
                step={1}
                value={[value]}
                onValueChange={handleChange}
                aria-label={t("Horsepower")}
            >
                <SliderPrimitive.Track className="bg-backgroundGray relative grow rounded-full h-[0.35rem]">
                    <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full transition-all duration-500 ease-in-out" />
                </SliderPrimitive.Track>

                <SliderPrimitive.Thumb
                    className="block w-5 h-5 bg-Myprimary rounded-full cursor-pointer  
                        focus:outline-none focus:ring-0 active:outline-none active:ring-0 border-0
                        transition-transform duration-500 ease-in-out hover:scale-110 hover:shadow-lg"
                    aria-label="Horsepower value"
                />

                <div
                    className="absolute -top-6 text-sm px-2 py-1 bg-gray-800 rounded transform -translate-x-1/2"
                    style={{
                        left: `${((value - MIN) / (MAX - MIN)) * 100}%`,
                    }}
                >
                    {value}
                </div>
            </SliderPrimitive.Root>
        </div>
    );
}

