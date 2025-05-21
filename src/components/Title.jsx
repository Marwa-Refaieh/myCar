import React from 'react';
import { motion } from "framer-motion";

const Title = ({title}) => {
    return (
        <div className="flex justify-center items-center">
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={`text-4xl md:text-5xl font-bold uppercase tracking-wide text-center
                        bg-gradient-to-r from-white via-Myprimary to-white
                        bg-[length:300%_100%] bg-left text-transparent bg-clip-text
                        animate-shine drop-shadow-[0_0_1px_rgba(255,255,255,0.7)]`}>
                {title}
            </motion.h1>
        </div>
    );
}

export default Title;
