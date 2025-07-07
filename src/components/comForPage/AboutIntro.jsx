// import React from "react";
// import img from '../../assets/OIP.webp'
// export default function AboutSection() {
//   return (
//     <section className="bg-black text-white px-6 md:px-20 pb-16">
//       <div className="flex flex-col md:flex-row items-center gap-6 md:justify-around">
//         {/* الصورة */}
//         <div className="max-w-[100%] md:max-w-[45%]">
//           <img
//             src={img}
//             alt="Car"
//             className="max-w-[100%] md:max-w-[70%] mx-auto h-auto object-cover rounded-md"
//           />
//         </div>

//         {/* المحتوى */}
//         <div className="max-w-[100%] md:max-w-[40%]">
//           {/* العنوان الصغير */}
//           <p className="relative text-sm font-bold text-white mb-4 uppercase tracking-wider before:content-[''] before:absolute before:left-[-5px] before:top-0 before:-translate-x-full before:h-6 before:w-[2px] before:bg-[#f1ea28] before:mr-2">
//   About Autoace
// </p>

//           {/* العنوان الكبير */}
//           <p className="text-gray-300 text-sm leading-relaxed mb-2">
//           My Car is a Syrian-based platform that simplifies the way you buy, sell, or rent cars. Whether you're searching for your next vehicle, selling your current one, or just need a car for a few days—My Car is your smart, secure, and fast solution. <br /><br />
//           We aim to connect car owners and seekers across Syria through an easy-to-use system that guarantees transparency and trust in every deal.
//           </p>

//           {/* Core Values */}
//           {/* <div>
//             <p className="relative font-bold text-sm text-white mb-2 uppercase tracking-wider before:content-[''] before:absolute before:left-[-5px] before:top-0 before:-translate-x-full before:h-6 before:w-[2px] before:bg-[#f1ea28] before:mr-2">
//             Our Mission
//             </p>
//             <p className="text-gray-300 text-sm leading-relaxed">
//             To improve the car marketplace in Syria by offering a trusted, modern platform that makes car buying, selling, and renting simple, transparent, and accessible to everyone.
//             </p>
//           </div> */}

//           {/* Our Story */}
//           {/* <div>
//             <p className="relative font-bold text-sm text-white mb-2 uppercase tracking-wider before:content-[''] before:absolute before:left-[-5px] before:top-0 before:-translate-x-full before:h-6 before:w-[2px] before:bg-[#f1ea28] before:mr-2">
//               Our Vision
//             </p>
//             <p className="text-gray-300 text-sm leading-relaxed ">
//             To become the #1 trusted car platform in Syria, where every user finds exactly what they need with ease and confidence.
//             </p>
//           </div> */}
//         </div>
//       </div>
//     </section>
//   );
// }



import React from 'react';
import img from '../../assets/OIP.webp'
import Button from '../Button';

const Blog = () => {
    const blogs = [
        {
            id: 1,
            title: "About Autoace",
            description: "My Car is a Syrian-based platform that simplifies the way you buy, sell, or rent cars. Whether you're searching for your next vehicle, selling your current one, or just need a car for a few days—My Car is your smart, secure, and fast solution We aim to connect car owners and seekers across Syria through an easy-to-use system that guarantees transparency and trust in every deal.",
            image: img,
        },
    ];
 
    return (
        <section className="text-white md:py-20  flex flex-col gap-20">
            <div className="space-y-16">
                {blogs.map((blog, index) => (
                    <div
                        key={blog.id}
                        className={`flex flex-col-reverse ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center justify-between`}
                    >
                        <div className="w-full md:w-[80%] lg:w-[50%] text-center lg:text-left">
                            <p className="text-Myprimary text-2xl md:text-3xl mb-8">
                                {blog.title}
                            </p>

                            <p className="text-white mb-8 xs:mx-auto  max-w-[90%] leading-relaxed text-sm md:text-[1.3rem]">
                                {blog.description}
                            </p>

                        </div>

                        <div className="w-[90%] md:w-[60%] lg:w-[40%] border-[1px] border-Myprimary rounded-[3rem] p-4">
                            <img
                                src={blog.image}
                                alt="Car"
                                className="w-full object-cover rounded-[3rem]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Blog;
