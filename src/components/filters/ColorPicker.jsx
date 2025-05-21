import React, { useState } from 'react';

const ColorPicker = ({ onSelectColor }) => {
    const [selectedColor, setSelectedColor] = useState('#000000');

    const colors = [
        '#000000',
        '#D4AF37',
        '#9A6E7F',
        '#E06C5B',
        '#8E44AD',
        '#6A5ACD',
        '#B084CC',
        '#8B4513',
        '#CD5C5C',
        '#FF6347',
        '#A0522D',
    ];

    const handleColorClick = (color) => {
        setSelectedColor(color);
        onSelectColor && onSelectColor(color); 
    };

    return (
        <div className="flex items-center justify-between gap-4">
            <div
                className="w-16 h-16 flex-shrink-0 rounded-md shadow-md border-2 border-MyOption"
                style={{ backgroundColor: selectedColor }}
            ></div>

            <div className="flex flex-wrap gap-4">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => handleColorClick(color)}
                        className={`rounded-full w-6 h-6 cursor-pointer shadow-sm focus:outline-none 
                        ${selectedColor === color ? 'ring-2 ring-white' : ''}`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                    />
                ))}
            </div>
        </div>
    );
};


export default ColorPicker;