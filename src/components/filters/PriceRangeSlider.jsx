import * as SliderPrimitive from "@radix-ui/react-slider";
import pricetag from '../../assets/pricetag.png';
import { useTranslation } from "react-i18next";

const MIN = 0;
const MAX = 30000;

export default function PriceRangeSlider({ filters, setFilters }) {
    const { t } = useTranslation('home');

    const range = [
        filters.price?.from ?? MIN,
        filters.price?.to ?? null,
    ];

    const handlePriceChange = (newRange) => {
        setFilters((prev) => ({
            ...prev,
            price: {
                from: newRange[0],
                to: newRange[1],
            },
        }));
    };

    return (
        <div className="text-white rounded-xl w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div className='flex items-center gap-2'>
                    <div className='w-6 bg-Mycard rounded-full p-1'>
                        <img src={pricetag} className='w-full h-full' />
                    </div>
                    <p className='text-1xl'>{t("Price")}</p>
                </div>

                <span className="text-lg">
                     {range[0] == null ? "0" : range[0]} - {range[1] == null ? "30000" : range[1]}$
                </span>
            </div>

            <SliderPrimitive.Root
                className="relative p-4 flex items-center select-none touch-none w-full h-5"
                min={MIN}
                max={MAX}
                step={100}
                value={range}
                onValueChange={handlePriceChange}
                aria-label="Price range"
            >
                <SliderPrimitive.Track className="bg-backgroundGray relative grow rounded-full h-[0.35rem]">
                    <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full transition-all duration-500 ease-in-out" />
                </SliderPrimitive.Track>

                {range.map((val, i) => (
                    <SliderPrimitive.Thumb
                        key={i}
                        className="block w-5 h-5 bg-Myprimary rounded-full cursor-pointer hover:scale-110 hover:shadow-lg transition-transform"
                        aria-label={i === 0 ? "Minimum price" : "Maximum price"}
                        style={{ willChange: "transform" }}
                    />
                ))}

                {range.map((val, i) => (
                    <div
                        key={"tooltip-" + i}
                        className="absolute -top-8 text-sm px-2 py-1 bg-gray-800 rounded transform -translate-x-1/2"
                        style={{
                            left: `${((val - MIN) / (MAX - MIN)) * 100}%`,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {val}$
                    </div>
                ))}
            </SliderPrimitive.Root>
        </div>
    );
}
