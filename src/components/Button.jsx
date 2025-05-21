import React from 'react';

const Button = ({title}) => {
    return (
        <>
            <button  className='bg-Myprimary inline-block text-black py-3 px-10 font-bold rounded-full hover:bg-primaryHover transition uppercase '>{title}</button>
        </>
    );
}

export default Button;
