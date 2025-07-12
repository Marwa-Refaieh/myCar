import React from 'react';
import car7 from '../../assets/home/car7.webp';
import car8 from '../../assets/home/car8.webp';
import Button from '../Button';
import img3 from '../../assets/home/car9.jpg'
import img2 from '../../assets/home/Impressions.jpg'
import img from '../../assets/home/scams.jpeg'
import { useTranslation } from 'react-i18next';

const Blog = () => {
    const { t, i18n } = useTranslation('blog');

    const blogPosts = [
        {
            id: 1,
            title: t("Avoid Scams. Drive Smart."),
            description: t("Avoid Scams Description"),
            image: img,
        },
        {
            id: 2,
            title: t("First Impressions Matter."),
            description: t("First Impressions Description"),
            image: img2,
        },
        {
            id: 3,
            title: t("What’s Everyone Driving?"),
            description: t("Driving Description"),
            image: img3,
        }
    ];


    return (
        <section className="text-white pb-20 flex flex-col gap-20">
            <h2 className="text-3xl md:text-5xl font-bold text-center  text-Myprimary">Read Our Blog Post</h2>

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
                            <h3 className="mt-2 text-lg font-bold leading-snug text-Myprimary">
                                {post.title}
                            </h3>
                            <p className="mt-2 text-sm text-white/50">{post.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Blog;
