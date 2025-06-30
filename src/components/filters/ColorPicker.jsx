import React, { useState } from 'react';

const ColorPicker = ({ onSelectColor }) => {
    const [selectedColor, setSelectedColor] = useState('#000000');

    const colors = [
        '#000000',
        '#FFFFFF',
        '#C0C0C0',
        '#808080',
        '#FF0000',
        '#0000FF',
        '#008000',
        '#FFFF00',
        '#800000',
        '#FFA500',
        '#FFC0CB',
        '#800080',
        '#A52A2A',
        '#00FFFF',
        '#FFD700',
        '#696969',
        '#2F4F4F',
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