import * as SliderPrimitive from "@radix-ui/react-slider";
import gas from '../../assets/gas.png';
import { useTranslation } from "react-i18next";
import { useState } from "react";

const MIN = 0;
const MAX = 1000;

export default function HorsepowerSlider({ filters, setFilters }) {
    const { t } = useTranslation('home');

    const range = [
        filters.horsepower?.from ?? MIN,
        filters.horsepower?.to ?? null,
    ];

    const [isEditingMaxHp, setIsEditingMaxHp] = useState(false);
    const [manualMaxHp, setManualMaxHp] = useState('');

    const handleHorsepowerChange = (newRange) => {
        setFilters((prev) => ({
            ...prev,
            horsepower: {
                from: newRange[0],
                to: newRange[1] === MAX ? null : newRange[1],
            },
        }));
    };

    const formatHpValue = (val) => {
        if (val >= 1000) return `${val / 1000}k HP`;
        return `${val} HP`;
    };

    return (
        <div className="text-white rounded-xl w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div className='flex items-center gap-2'>
                    <div className='w-6 bg-Mycard rounded-full p-1'>
                        <img src={gas} className='w-full h-full' alt="horsepower icon" />
                    </div>
                    <p className='text-1xl'>{t("Horsepower")}</p>
                </div>

                <span className="text-lg flex items-center gap-1">
                    {formatHpValue(range[0] ?? MIN)} -{" "}
                    {isEditingMaxHp ? (
                        <input
                            type="text"
                            autoFocus
                            value={manualMaxHp}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || /^[0-9]+$/.test(val)) {
                                    setManualMaxHp(val);
                                }
                            }}
                            onBlur={() => {
                                const newValue = parseInt(manualMaxHp);
                                setFilters(prev => ({
                                    ...prev,
                                    horsepower: {
                                        ...prev.horsepower,
                                        to: isNaN(newValue) ? null : newValue,
                                    }
                                }));
                                setIsEditingMaxHp(false);
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
                                setManualMaxHp(filters.horsepower?.to ?? '');
                                setIsEditingMaxHp(true);
                            }}
                        >
                            {filters.horsepower?.to === null ? t("Unlimited") : formatHpValue(filters.horsepower.to)}
                        </span>
                    )}
                </span>
            </div>

            <SliderPrimitive.Root
                className="relative p-4 flex items-center select-none touch-none w-full h-5"
                min={MIN}
                max={MAX}
                step={10}
                value={[
                    range[0],
                    range[1] === null ? MAX : range[1],
                ]}
                onValueChange={handleHorsepowerChange}
                aria-label="Horsepower range"
            >
                <SliderPrimitive.Track className="bg-backgroundGray relative grow rounded-full h-[0.35rem]">
                    <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full transition-all duration-500 ease-in-out" />
                </SliderPrimitive.Track>

                {[range[0], range[1] === null ? MAX : range[1]].map((val, i) => (
                    <SliderPrimitive.Thumb
                        key={i}
                        className="block w-5 h-5 bg-Myprimary rounded-full cursor-pointer hover:scale-110 hover:shadow-lg transition-transform"
                        aria-label={i === 0 ? "Minimum horsepower" : "Maximum horsepower"}
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
                            {i === 1 && val === null ? t("Unlimited") : `${val}`}
                        </div>

                    );
                })}
            </SliderPrimitive.Root>
        </div>
    );
}
