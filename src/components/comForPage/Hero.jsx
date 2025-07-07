import React from "react";

export default function HeroSection({ title, page1, page2 , img }) {
  return (
    <div className="relative h-[60vh] bg-black">
      {/* الخلفية */}
      <img 
        src={img}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* التعتيم والكتابة */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 uppercase">{title}</h1>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span className="uppercase">{page1}</span>
          <svg
            className="w-4 h-4 text-Myprimary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M7.05 4.05a1 1 0 011.414 0L13 8.586a1 1 0 010 1.414l-4.536 4.536a1 1 0 01-1.414-1.414L10.586 10 7.05 6.464a1 1 0 010-1.414z" />
          </svg>
          <span className="text-white uppercase">{page2}</span>
        </div>
      </div>
    </div>
  );
}
