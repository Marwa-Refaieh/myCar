import React from 'react';
import img from '../../assets/OIP.webp'
import { useTranslation } from 'react-i18next';


const Blog = () => {
    const { t, i18n } = useTranslation('about');

    const blogs = [
        {
            id: 1,
            title: "About Autoace",
            description: "My Car is a Syrian-based platform that simplifies the way you buy, sell, or rent cars. Whether you're searching for your next vehicle, selling your current one, or just need a car for a few days—My Car is your smart, secure, and fast solution We aim to connect car owners and seekers across Syria through an easy-to-use system that guarantees transparency and trust in every deal.",
            image: img,
        },
    ];
 
    return (
        <section className="text-white md:py-20 max-w-[90%] mx-auto flex flex-col gap-20">
            <div className="space-y-16">
                {blogs.map((blog, index) => (
                    <div
                        key={blog.id}
                        className={`flex flex-col-reverse ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center justify-between`}
                    >
                        <div className="w-full md:w-[80%] lg:w-[50%] text-center lg:text-left">
                            <p className={`text-Myprimary  text-2xl md:text-3xl max-w-[90%] mb-8 ${i18n.language === 'ar' ? 'text-center md:text-right' : ''}`}>
                                {t("About My Car")}
                            </p>

                            <p className={`text-white mb-8 xs:mx-auto  max-w-[90%] leading-relaxed text-sm md:text-[1.3rem] ${i18n.language === 'ar' ? 'text-center md:text-right' : ''}`}>
                                {t("descriptionIntro")}
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
