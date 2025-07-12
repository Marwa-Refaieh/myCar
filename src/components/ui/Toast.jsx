import { AnimatePresence, motion } from "framer-motion";

const Toast = ({ message, show }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-5 left-0 z-50 text-black w-full"
                >
                    <div className="backdrop-blur-md bg-red-500/90 border border-white/20 text-white w-fit flex items-center gap-3 mx-auto px-6 py-3 rounded-lg font-medium shadow-lg text-sm sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {message}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
