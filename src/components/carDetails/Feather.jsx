import React from 'react';
import { useTranslation } from 'react-i18next';

const Feather = ({ car }) => {
    const { t } = useTranslation('home');

    // افتراضياً الميزات من car.feature أو مصفوفة فارغة إذا غير موجودة
    const features = car?.feature && car.feature.length > 0
        ? car.feature
        : [t("No features available")]; // رسالة افتراضية

    return (
        <div className='w-full md:w-[50%]'>
            <p className='text-2xl mb-5 mt-8'>{t("Features")}</p>
            <div className='flex flex-wrap gap-10 justify-center md:justify-start'>
                {
                    features.map((feature, index) => (
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
                            <p>{typeof feature === 'string' ? feature : feature.name || feature}</p>
                            {/* افتراضياً الخاصية feature قد تكون نص أو كائن */}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Feather;
