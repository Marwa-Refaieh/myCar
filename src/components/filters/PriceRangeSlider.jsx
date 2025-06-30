import * as SliderPrimitive from "@radix-ui/react-slider";
import pricetag from '../../assets/pricetag.png';
import { useTranslation } from "react-i18next";
import { useState } from "react";

const MIN = 0;
const MAX = 30000;

export default function PriceRangeSlider({ filters, setFilters }) {
    const { t } = useTranslation('home');

    const range = [
        filters.price?.from ?? MIN,
        filters.price?.to ?? null,
    ];

    const [isEditingMaxPrice, setIsEditingMaxPrice] = useState(false);
    const [manualMaxPrice, setManualMaxPrice] = useState('');

    const handlePriceChange = (newRange) => {
        setFilters((prev) => ({
            ...prev,
            price: {
                from: newRange[0],
                to: newRange[1] === MAX ? null : newRange[1],
            },
        }));
    };

    return (
        <div className="text-white rounded-xl w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div className='flex items-center gap-2'>
                    <div className='w-6 bg-Mycard rounded-full p-1'>
                        <img src={pricetag} className='w-full h-full' alt="price icon" />
                    </div>
                    <p className='text-1xl'>{t("Price")}</p>
                </div>

                <span className="text-lg flex items-center gap-1">
                    {range[0] ?? MIN} -{" "}
                    {isEditingMaxPrice ? (
                        <input
                            type="text"
                            autoFocus
                            value={manualMaxPrice}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || /^[0-9]+$/.test(val)) {
                                    setManualMaxPrice(val);
                                }
                            }}
                            onBlur={() => {
                                const newValue = parseInt(manualMaxPrice);
                                setFilters(prev => ({
                                    ...prev,
                                    price: {
                                        ...prev.price,
                                        to: isNaN(newValue) ? null : newValue,
                                    }
                                }));
                                setManualMaxPrice(isNaN(newValue) ? '' : newValue.toString());
                                setIsEditingMaxPrice(false);
                            }}
                            onKeyDown={(e) => {
                                if (
                                    !(
                                        (e.key >= '0' && e.key <= '9') ||
                                        e.key === 'Backspace' ||
                                        e.key === 'ArrowLeft' ||
                                        e.key === 'ArrowRight' ||
                                        e.key === 'Delete' ||
                                        e.key === 'Tab' ||
                                        e.key === 'Enter'
                                    )
                                ) {
                                    e.preventDefault();
                                }
                                if (e.key === 'Enter') {
                                    const newValue = parseInt(manualMaxPrice);
                                    setFilters(prev => ({
                                        ...prev,
                                        price: {
                                            ...prev.price,
                                            to: isNaN(newValue) ? null : newValue,
                                        }
                                    }));
                                    setManualMaxPrice(isNaN(newValue) ? '' : newValue.toString());
                                    setIsEditingMaxPrice(false);
                                    e.target.blur();
                                }
                            }}
                            placeholder={t("Unlimited")}
                            className="transition placeholder:text-sm bg-transparent outline-none text-white px-2 w-24"
                        />
                    ) : (
                        <span
                            className="cursor-pointer"
                            onClick={() => {
                                setManualMaxPrice(filters.price?.to ?? '');
                                setIsEditingMaxPrice(true);
                            }}
                        >
                            {filters.price?.to === null ? t("Unlimited") : range[1]}
                        </span>
                    )}
                </span>
            </div>

            <SliderPrimitive.Root
                className="relative p-4 flex items-center select-none touch-none w-full h-5"
                min={MIN}
                max={MAX}
                step={100}
                value={[
                    range[0],
                    range[1] === null ? MAX : range[1],
                ]}
                onValueChange={handlePriceChange}
                aria-label="Price range"
            >
                <SliderPrimitive.Track className="bg-backgroundGray relative grow rounded-full h-[0.35rem]">
                    <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full transition-all duration-500 ease-in-out" />
                </SliderPrimitive.Track>

                {[range[0], range[1] === null ? MAX : range[1]].map((val, i) => (
                    <SliderPrimitive.Thumb
                        key={i}
                        className="block w-5 h-5 bg-Myprimary rounded-full cursor-pointer hover:scale-110 hover:shadow-lg transition-transform"
                        aria-label={i === 0 ? "Minimum price" : "Maximum price"}
                        style={{ willChange: "transform" }}
                    />
                ))}

                {[range[0], range[1]].map((val, i) => {
                    let leftPercent;
                    if (val === null) {
                        leftPercent = 100;
                    } else if (val > MAX) {
                        leftPercent = 100;
                    } else {
                        leftPercent = ((val - MIN) / (MAX - MIN)) * 100;
                    }

                    return (
                        <div
                            key={"tooltip-" + i}
                            className={`absolute -top-8 text-sm px-2 py-1 bg-gray-800 rounded text-white whitespace-nowrap transition-transform duration-200`}
                            style={{
                                left: `${leftPercent}%`,
                                transform: i === 1
                                    ? `translateX(${leftPercent > 90 ? '-100%' : leftPercent < 10 ? '0%' : '-50%'})`
                                    : 'translateX(-50%)'
                            }}
                        >
                            {i === 1 && val === null ? t("Unlimited") : `$${val}`}
                        </div>

                    );
                })}

            </SliderPrimitive.Root>
        </div>
    );
}
