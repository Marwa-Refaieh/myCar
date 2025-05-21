import * as SliderPrimitive from "@radix-ui/react-slider";
import pricetag from '../../assets/pricetag.png';

const MIN = 0;
const MAX = 30000;

export default function PriceSlider({ value, onChange }) {
    return (
        <div className="text-white rounded-xl w-full max-w-lg mx-auto ">
            <div className="flex items-center justify-between mb-5">
                <div className='flex items-center gap-2'>
                    <div className='w-6 bg-Mycard rounded-full p-1'>
                        <img src={pricetag} className='w-full h-full' />
                    </div>
                    <p className='text-1xl'>Price</p>
                </div>
                <span className="text-lg">${value.toLocaleString()}</span>
            </div>

            <SliderPrimitive.Root
                className="relative p-4 flex items-center select-none touch-none w-full h-5"
                min={MIN}
                max={MAX}
                step={100}
                value={[value]}
                onValueChange={(val) => onChange(val[0])}
                aria-label="Price"
            >
                <SliderPrimitive.Track className="bg-backgroundGray relative grow rounded-full h-[0.35rem]">
                    <SliderPrimitive.Range className="absolute bg-Myprimary rounded-full h-full" />
                </SliderPrimitive.Track>

                <SliderPrimitive.Thumb
                    className="block w-5 h-5 bg-Myprimary rounded-full cursor-pointer hover:scale-110 hover:shadow-lg"
                    aria-label="Price value"
                />

                <div
                    className="absolute -top-5 text-sm px-2 p bg-gray-800 rounded transform -translate-x-1/2"
                    style={{
                        left: `${((value - MIN) / (MAX - MIN)) * 100}%`,
                    }}
                >
                    ${value.toLocaleString()}
                </div>
            </SliderPrimitive.Root>
        </div>
    );
}
