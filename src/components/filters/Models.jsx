import React from 'react';
import Button from './Button';
import { useTranslation } from 'react-i18next';

const Models = ({ models, filters, toggleFilter, loading }) => {
    const { t } = useTranslation();

    if (!filters.brand_id) return null;

    return (
        <div className="relative w-full">
           
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center rounded-md z-10">
                    <div className="flex gap-2">
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
                    </div>
                </div>
            )}
          
            <div
                className={`flex flex-nowrap gap-3 overflow-x-auto max-w-full scrollbar-hide transition-opacity duration-800 ease-in-out ${
                    loading ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
                {models && models.length > 0 ? (
                    models.map((model) => (
                        <div
                            key={model.id}
                            onClick={() => toggleFilter("model_id", model.id)}
                            className="flex-shrink-0"
                        >
                            <Button
                                title={model.name.en}
                                active={filters.model_id === model.id}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-white/50">{t("No models available")}</p>
                )}
            </div>
        </div>
    );
};

export default Models;
