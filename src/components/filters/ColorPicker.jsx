import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ColorPicker = ({ onSelectColor }) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        axios
            .get('https://mycarapplication.com/api/car-features/get-colors')
            .then((response) => {
                setColors(response.data);
            })
            .catch((err) => {
                setError(err.message);
                console.error("Error fetching colors:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <div className="flex gap-2">
                <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
            </div>
        </div>
    )
    if (error) return <p>Error: {error}</p>;

    const handleColorClick = (colorName) => {
        setSelectedColor(colorName);
        onSelectColor && onSelectColor(colorName);
    };

    return (
        <div className="flex items-center justify-between gap-4">
            <div
                className="w-16 h-16 flex-shrink-0 rounded-md shadow-md border border-white/50"
                style={{ backgroundColor: selectedColor.toLowerCase() }}
            ></div>

            <div className="flex flex-wrap gap-4">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => handleColorClick(color.name)}
                        className={`rounded-full w-6 h-6 cursor-pointer shadow-sm focus:outline-none 
                        ${selectedColor === color ? 'ring-2 ring-white' : ''}`}
                        style={{ backgroundColor: color.name.toLowerCase() }}
                        aria-label={`Select color ${color}`}
                    />
                ))}
            </div>
        </div>
    );
};


export default ColorPicker;