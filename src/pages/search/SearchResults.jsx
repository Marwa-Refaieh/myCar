import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';
import { useTranslation } from 'react-i18next';

const SearchResults = () => {
    const { t } = useTranslation('msg');
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('q') || '';

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        axios.get('https://mycarapplication.com/api/car')
            .then((response) => {
                const data = response.data.data;

                const filtered = data.filter(car =>
                    car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    car.model?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    car.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase())
                );

                setResults(filtered);
            })
            .catch(() => {
                setError(t('searchResults.errorFetching'));
                setResults([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchTerm, t]);

    return (
        <div className="container mx-auto p-6 min-h-screen text-white">
            <div className="fixed top-20 right-5 z-50">
                <button
                    onClick={() => window.history.back()}
                    className="bg-Myprimary hover:bg-primaryHover text-black p-2 rounded-full shadow-lg transition-transform transform hover:scale-110"
                    aria-label={t('searchResults.goBack')}
                >
                    <X size={20} />
                </button>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 text-center">
                    <div className="flex gap-2">
                        <div className="w-4 h-4 bg-Myprimary rounded-full animate-bounce" />
                        <div className="w-4 h-4 bg-Myprimary rounded-full animate-bounce delay-200" />
                        <div className="w-4 h-4 bg-Myprimary rounded-full animate-bounce delay-400" />
                    </div>
                </div>
            )}

            {error && (
                <div className="flex flex-col items-center justify-center min-h-[100vh] gap-2 text-center">
                    <p className="text-lg text-red-500 font-medium">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-Myprimary hover:bg-primaryHover text-black">
                        {t('searchResults.retry')}
                    </Button>
                </div>
            )}

            {!loading && !error && results.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[100vh] gap-2 text-center">
                    <p className="text-lg text-gray-400">
                        {t('searchResults.noResults')} "<span className="text-Myprimary font-semibold">{searchTerm}</span>"
                    </p>
                    <p className="text-sm text-gray-500">{t('searchResults.tryDifferentKeywords')}</p>
                </div>
            )}

            {!loading && !error && results.length > 0 && (
                <div className="flex justify-center gap-6 mt-20">
                    {results.map((car) => (
                        <Card key={car.id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
