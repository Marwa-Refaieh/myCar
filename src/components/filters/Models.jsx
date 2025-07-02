import React from 'react';
import Button from './Button'; 
import { useTranslation } from 'react-i18next';

const Models = ({ models, filters, toggleFilter }) => {
    const { t } = useTranslation();

    if (!filters.brand_id) return null;

    return (
        <div className='flex flex-wrap gap-3'>
             {models && models.length > 0 ? (
                    models.map((model) => (
                        <div key={model.id} onClick={() => toggleFilter("model_id", model.id)}>
                            <Button
                                title={model.name.en}
                                active={filters.model_id === model.id}
                            />
                        </div>
                    ))
                ) : (
                    <p className='text-sm text-white/50'>{t("No models available")}</p>
                )}
        </div>
    );
};

export default Models;
