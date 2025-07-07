import React from "react";

export default function FeatureCard({ title, description, img }) {
  return (
    <div
      className="relative p-6 border bg-black border-[#f8f8f820] hover:border-[#f1ea28]  text-white flex-1 min-w-[250px] overflow-hidden"
    >
      {/* صورة علامة مائية في الأعلى يمين */}
      <img
        src={img}
        alt="icon"
        className="absolute top-4 right-4 w-16 h-16 opacity-10 pointer-events-none select-none"
      />

      {/* العنوان بخط جانبي */}
      <p className="relative text-sm text-white mb-16 uppercase tracking-wider pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-6 before:bg-[#f1ea28]">
        {title}
      </p>

      {/* الوصف */}
      <p className="text-sm max-w-[80%] text-[#f8f8f8b0]">{description}</p>
    </div>
  );
}
