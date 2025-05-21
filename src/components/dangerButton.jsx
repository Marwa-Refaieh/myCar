import React from 'react';

const DangerButton = ({title}) => {
    return (
        <>
            <button  className='bg-red-700 inline-block text-white py-3 px-10 font-bold rounded-full hover:bg-red-800 transition uppercase '>{title}</button>
        </>
    );
}

export default DangerButton;
