import React from 'react';

const Feather = () => {
    const feathers = Array(6).fill({});
    return (
        <div className='w-full md:w-[50%]'>
            <p className='text-2xl mb-5 mt-8'>Features</p>
            <div className='flex flex-wrap gap-10 justify-center md:justify-start'>
                {
                    feathers.map((_, index) => (
                        <div key={index} className='flex gap-2 items-center'>
                            <div className="w-6 h-6 rounded-full bg-Myprimary flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p>Cruise Control</p>
                        </div>
                    ))
                }

            </div>

        </div>

    );
}

export default Feather;
