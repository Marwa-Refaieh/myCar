import React from "react";
import Hero2 from "../../components/Hero2";
import Card2 from "@/components/Card2";
import Title from "@/components/Title";

const Filters = () => {
    return (
        <div>
            <Hero2 />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <Title title="Filtering ResultF" />
                <div className="flex flex-wrap gap-8 justify-center mt-10 md:mt-16">
                    {[...Array(5)].map((_, index) => (
                        <Card2 key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filters;
