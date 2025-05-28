import * as SliderPrimitive from "@radix-ui/react-slider";
import distance from '../../assets/distance.png';
import { useTranslation } from "react-i18next";

const MIN = 0;
const MAX = 200000;

export default function SpeedRangeSlider({ filters, setFilters }) {
    const range = filters.odometer ? [filters.odometer.from, filters.odometer.to] : [MIN, MAX];
    const { t } = useTranslation('home');

    const handleSpeedChange = (newRange) => {
        setFilters((prev) => ({
            ...prev,
            odometer: {
                from: newRange[0],
                to: newRange[1],
            },
        }));
    };

    const formatOdometerValue = (val) => {
        if (val >= 1000) return `${Math.round(val / 1000)}k Km`;
        return `${val} Km`;
    };

    return (
        <div className="text-white rounded-xl w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div className='flex items-center gap-2'>
                    <div className='w-6 bg-Mycard rounded-full p-1'>
                        <img src={distance} className='w-full h-full' alt="speed icon" />
                    </div>
                    <p className='text-1xl'>{t("Odometer")}</p>
                </div>

                <span className="text-lg">
                    {formatOdometerValue(range[0] || 0)} - {formatOdometerValue(range[1] || MAX)}
                </span>
            </div>

            <SliderPrimitive.Root
                className="relative p-4 flex items-center select-none touch-none w-full h-5"
                min={MIN}
                max={MAX}
                step={1000}
                value={range}
                onValueChange={handleSpeedChange}
                aria-label="Odometer range"
            >
                <SliderPrimitive.Track className="bg-backgroundGray relative grow rounded-full h-[0.35rem]">
                    <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full transition-all duration-500 ease-in-out" />
                </SliderPrimitive.Track>

                {range.map((val, i) => (
                    <SliderPrimitive.Thumb
                        key={i}
                        className="block w-5 h-5 bg-Myprimary rounded-full cursor-pointer hover:scale-110 hover:shadow-lg transition-transform"
                        aria-label={i === 0 ? "Minimum odometer" : "Maximum odometer"}
                        style={{ willChange: "transform" }}
                    />
                ))}

                {range.map((val, i) =>
                    val != null ? (
                        <div
                            key={"tooltip-" + i}
                            className="absolute -top-8 text-sm px-2 py-1 bg-gray-800 rounded transform -translate-x-1/2"
                            style={{
                                left: `${((val - MIN) / (MAX - MIN)) * 100}%`,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {formatOdometerValue(val)}
                        </div>
                    ) : null
                )}
            </SliderPrimitive.Root>
        </div>
    );
}
