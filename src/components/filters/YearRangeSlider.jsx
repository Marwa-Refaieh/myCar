import * as SliderPrimitive from "@radix-ui/react-slider";
import calendar from '../../assets/calendar.png';
import { useTranslation } from "react-i18next";

const MIN = 2006;
const MAX = 2025;

export default function YearRangeSlider({ filters, setFilters }) {
    const range = filters.year_production ? [filters.year_production.from, filters.year_production.to] : [MIN, MIN + 6];
    const { t } = useTranslation('home');

    const handleRangeChange = (newRange) => {
        setFilters((prev) => ({
            ...prev,
            year_production: {
                from: newRange[0],
                to: newRange[1],
            },
        }));
    };

    return (
        <div className="text-white rounded-xl w-full max-w-lg mx-auto ">
            <div className="flex items-center justify-between mb-10">
                <div className='flex items-center gap-2'>
                    <div className='w-6 bg-Mycard rounded-full p-1'>
                        <img src={calendar} className='w-full h-full' />
                    </div>
                    <p className='text-1xl'>{t("Year")}</p>
                </div>
                <span className="text-lg">
                    {range[0] == null ? "2006" : range[0]} - {range[1] == null ? "2025" : range[1]}
                </span>
            </div>

            <SliderPrimitive.Root
                className="relative p-4 flex items-center select-none touch-none w-full h-5"
                min={MIN}
                max={MAX}
                step={1}
                value={range}
                onValueChange={handleRangeChange}
                aria-label="Year range"
            >
                <SliderPrimitive.Track className="bg-backgroundGray relative grow rounded-full h-[0.35rem]">
                    <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full transition-all duration-500 ease-in-out" />
                </SliderPrimitive.Track>

                {range.map((val, i) => (
                    <SliderPrimitive.Thumb
                        key={i}
                        className="block w-5 h-5 bg-Myprimary rounded-full cursor-pointer 
                        focus:outline-none border-0 transition-transform duration-500 ease-in-out 
                        hover:scale-110 hover:shadow-lg"
                        aria-label={i === 0 ? "Minimum year" : "Maximum year"}
                        style={{ willChange: "transform" }}
                    />
                ))}

                {range.map((val, i) => (
                    <div
                        key={"tooltip-" + i}
                        className="absolute -top-8 text-sm px-2 py-1 bg-gray-800 rounded transform -translate-x-1/2"
                        style={{
                            left: `${((val - MIN) / (MAX - MIN)) * 100}%`,
                        }}
                    >
                        {val}
                    </div>
                ))}
            </SliderPrimitive.Root>
        </div>
    );
}

