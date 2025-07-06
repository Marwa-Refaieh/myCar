import React from "react";
import img from '../../assets/hero3.jpg'
export default function AboutSection() {
  return (
    <section className="bg-[#111] text-white px-6 md:px-20 py-16">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* الصورة */}
        <div className="md:w-1/2 w-full">
          <img
            src={img}
            alt="Car"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* المحتوى */}
        <div className="md:w-1/2 w-full">
          {/* العنوان الصغير */}
          <p className="relative text-sm text-white mb-2 uppercase tracking-wider before:content-[''] before:absolute before:left-[-5px] before:top-0 before:-translate-x-full before:h-6 before:w-[2px] before:bg-blue-400 before:mr-2">
  About Autoace
</p>

          {/* العنوان الكبير */}
          <h2 className="text-3xl uppercase md:text-4xl font-bold mb-6 leading-tight">
            Superior Service <br /> With a Touch of Class
          </h2>

          {/* Core Values */}
          <div className="mb-6">
            <p className="relative text-sm text-white mb-2 uppercase tracking-wider before:content-[''] before:absolute before:left-[-5px] before:top-0 before:-translate-x-full before:h-6 before:w-[2px] before:bg-blue-400 before:mr-2">
              Core Values
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              fringilla dolor aliquet quam venenatis ultricies. Mauris volutpat
              sed neque in neque quis purus volutpat.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Morbi id ex dictum, viverra justo ut, vestibulum ex. Mauris
              placerat consequat sem.
            </p>
          </div>

          {/* Our Story */}
          <div>
            <p className="relative text-sm text-white mb-2 uppercase tracking-wider before:content-[''] before:absolute before:left-[-5px] before:top-0 before:-translate-x-full before:h-6 before:w-[2px] before:bg-blue-400 before:mr-2">
              Our Story
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              Donec tempor sollicitudin mauris, eu varius arcu dictum sit amet.
              Duis hendrerit consequat orci. Ut scelerisque faucibus quam ac
              viverra. Nullam pellentesque auctor lacus non tempor.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Praesent ut nisi vitae tellus aliquam auctor ac nec felis.
              Praesent nec augue sollicitudin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
