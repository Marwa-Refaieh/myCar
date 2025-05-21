import React from 'react';

const BodyTypes = ({ src, name, onSelect, active }) => {
  const baseClass = 'flex flex-col justify-center gap-2 bg-MyOption px-4 py-2 border-2 rounded-lg cursor-pointer border-Mycard transition-all duration-300 ease-in-out';
  const activeClass = 'border-Myprimary shadow-[0_0_15px_1px_rgba(255,235,100,0.3)] bg-[rgba(250,204,21,0.1)]';

  return (
    <div
      onClick={() => onSelect(name)}
      className={`${baseClass} ${active ? activeClass : ''} hover:border-Myprimary hover:shadow-[0_0_15px_1px_rgba(255,235,100,0.3)] hover:bg-[rgba(250,204,21,0.1)]`}
    >
      <img src={src} alt={name} className='w-16' />
      <p className='text-center'>{name}</p>
    </div>
  );
}

export default BodyTypes;
