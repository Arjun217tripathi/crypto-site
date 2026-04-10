"use client";

import { motion } from "framer-motion";

export default function ToolHero() {
    return (
        <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
            {/* Background Gradient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10 text-center space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium tracking-wider text-gray-300 mb-4 backdrop-blur-md">
                        POWERED BY COINGECKO
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-4">
                        Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">Tools</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light"
                >
                    Real-time crypto data, market insights, and analytics tailored for the Web3 generation.
                </motion.p>
            </div>
        </section>
    );
}
