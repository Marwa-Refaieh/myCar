import { CheckIcon, Star } from 'lucide-react';
import React from 'react';
import { GiBulletBill } from 'react-icons/gi';

const WorksCard = ({ number, title, feature1, feature2, feature3 }) => {
    return (
        <div className="sm:w-full md:w-[48%] border border-white/40 py-3 pl-3 text-white rounded-md">
            <p className="text-lg font-semibold flex items-center gap-2 ">
                <span className="w-[2px] h-4 bg-Myprimary inline-block"></span>
                {number}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2 uppercase text-Myprimary">{title}</h3>

            <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                    <Star className="w-3 h-3 text-Myprimary" />
                    <p className="text-sm text-white/70">
                        {feature1}
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    <Star className="w-3 h-3 text-Myprimary" />
                    <p className="text-sm text-white/70">
                        {feature2}
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    <Star className="w-3 h-3 text-Myprimary" />
                    <p className="text-sm text-white/70">
                        {feature3}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WorksCard;
