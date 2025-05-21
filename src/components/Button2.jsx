import React from 'react';

const Button2 = ({ title, style = "py-3 px-10" }) => {
    return (
        <>
            <button className={`border-Myprimary border text-Myprimary inline-block  font-bold rounded-full hover:bg-primaryHover hover:text-black transition uppercase ${style} `}>{title}</button>
        </>
    );
}

export default Button2;
