import React from 'react';
import img from '../../assets/2024-mg-cyberster (1).webp'
import img2 from '../../assets/OIP (1).webp'
import img3 from '../../assets/2015-2017-mustang__57389.webp'
import img4 from '../../assets/wp11815133.webp'
import img5 from '../../assets/OIP (2).webp'
import { useTranslation } from 'react-i18next';

const BlogGrid = () => { 
  const { t, i18n } = useTranslation('blog');
  const blogPosts = [
    {
      id: 1,
      title: t("blogPosts_1_title"),
      description: t("blogPosts_1_description"),
      image: img,
    },
    {
      id: 2,
      title: t("blogPosts_2_title"),
      description: t("blogPosts_2_description"),
      image: img2,
    },
    {
      id: 3,
      title: t("blogPosts_3_title"),
      description: t("blogPosts_3_description"),
      image: img3,
    },
    {
      id: 4,
      title: t("blogPosts_4_title"),
      description: t("blogPosts_4_description"),
      image: img4,
    },
    {
      id: 5,
      title: t("blogPosts_5_title"),
      description: t("blogPosts_5_description"),
      image: img5,
    },
  ];
  
  return (
    <section className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="relative bg-[#111] group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-105 group-hover:skew-y-1"
              />
            </div>

            {/* Content */}
            <div className="p-5 relative z-20">
              <h3 className="mt-2 text-lg font-bold leading-snug text-white">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-Myprimary">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogGrid;