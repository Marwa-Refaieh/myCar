import React from 'react';
import car7 from '../../assets/home/car7.webp';
import car8 from '../../assets/home/car8.webp';
import Button from '../Button';

const Blog = () => {
    const blogs = [
        {
            id: 1,
            title: "The Ultimate Guide to Choosing the Perfect Family Car: Factors to Consider for Safety, Comfort, and Versatility",
            description: "Fusce ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae ornare dolor. Morbi fermentum.",
            image: car7,
        },
        {
            id: 2,
            title: "Top 10 Family Cars in 2025: Reviews and Comparisons",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget purus eu tortor tincidunt consequat.",
            image: car8,
        },
    ];

    return (
        <section className="text-white py-20 flex flex-col gap-20">
            <h2 className="text-5xl font-bold text-center lg:mb-10 text-Myprimary">Read Our Blog Post</h2>

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

                            <p className="text-gray mb-8 leading-relaxed text-[1.3rem]">
                                {blog.description}
                            </p>

                            <Button title="Read More" />
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
