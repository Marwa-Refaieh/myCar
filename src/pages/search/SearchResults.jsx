// src/pages/SearchResultsPage.jsx
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

const SearchResultsPage = () => {
    const location = useLocation(); 
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('q') || ''; 

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchTerm) {
                setResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const dummyData = [
                    { id: 1, name: "Luxury Sedan 2024", description: "Sleek and powerful.", price: 75000, imageUrl: "https://via.placeholder.com/400x250/333/FFF?text=Luxury+Car+1" },
                    { id: 2, name: "Sport Coupe V6", description: "Fast and agile.", price: 60000, imageUrl: "https://via.placeholder.com/400x250/333/FFF?text=Sport+Car+2" },
                    { id: 3, name: "Electric SUV Pro", description: "Eco-friendly and spacious.", price: 82000, imageUrl: "https://via.placeholder.com/400x250/333/FFF?text=Electric+SUV+3" },
                    { id: 4, name: "Classic Roadster 1980", description: "Timeless elegance.", price: 95000, imageUrl: "https://via.placeholder.com/400x250/333/FFF?text=Classic+Car+4" },
                ].filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()) || car.description.toLowerCase().includes(searchTerm.toLowerCase()));
               
                await new Promise(resolve => setTimeout(resolve, 500));

                setResults(dummyData); 
            } catch (err) {
                setError("Failed to fetch search results. Please try again.");
                console.error("Error fetching search results:", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm]); 

    return (
        <div className="container mx-auto p-6 bg-gray-900 min-h-screen text-white">
            <div className="fixed top-20 right-5 z-50">
                <button
                    onClick={() => window.history.back()}
                    className="bg-Myprimary hover:bg-primaryHover text-black p-2 rounded-full shadow-lg transition-transform transform hover:scale-110"
                    aria-label="Go Back"
                >
                    <X size={20} />
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center">
                Search Results for: "<span className="text-blue-400">{searchTerm}</span>"
            </h1>

            {loading && <p className="text-center text-lg text-gray-400">Loading results...</p>}
            {error && <p className="text-center text-lg text-red-500">{error}</p>}

            {!loading && !error && results.length === 0 && (
                <p className="text-center text-lg text-gray-400">No results found for "{searchTerm}".</p>
            )}

            {!loading && !error && results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((car) => (
                        <div key={car.id} className="bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-200">
                            <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h2 className="text-xl font-semibold text-white mb-2">{car.name}</h2>
                            <p className="text-gray-300 mb-2">{car.description}</p>
                            <p className="text-blue-400 font-bold text-lg">${car.price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default SearchResultsPage;