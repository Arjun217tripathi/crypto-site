"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Instagram, Twitter, Send } from "lucide-react";
import dynamic from "next/dynamic";

// Optimized Dynamic Import for Heavy 3D Scene
const Scene3D = dynamic(() => import("./Scene3D"), {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[400px]" /> // Invisible placeholder to prevent CLS
});

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background 3D Elements */}
            <div className="absolute inset-0 z-0 scale-125 md:scale-100 opacity-80">
                <Scene3D color="#ffffff" />
            </div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-6 h-full flex flex-col items-center justify-center pt-24 md:pt-0">
                <div className="relative inline-block mb-8 md:mb-0 text-center md:text-left">
                    {/* Top Left Label - Centered on Mobile */}
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="block mb-4 md:absolute md:-top-10 md:-left-4 text-[10px] md:text-sm tracking-[0.4em] text-gray-400 font-bold uppercase whitespace-nowrap"
                    >
                        BLOCKCHAIN
                    </motion.span>

                    {/* Main Title - Split on Mobile */}
                    <div className="relative">
                        <h1 className="sr-only">Crypto Marketing Agency for Web3 & Blockchain Growth</h1>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[18vw] md:text-[11vw] font-bold leading-[0.8] md:leading-none tracking-[0.1em] md:tracking-[0.2em] text-white mix-blend-overlay flex flex-col md:block items-center"
                            aria-hidden="true"
                        >
                            <span>CRYP</span>
                            <span className="md:inline">TECHO</span>
                        </motion.div>
                    </div>

                    {/* Bottom Right Label - Centered on Mobile */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="block mt-4 md:absolute md:-bottom-10 md:-right-4 text-[10px] md:text-sm tracking-[0.4em] text-gray-400 font-bold uppercase whitespace-nowrap"
                    >
                        MARKETING
                    </motion.span>
                </div>

                {/* Supporting Text & CTA */}
                <div className="w-full max-w-[85vw] mt-12 md:mt-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="max-w-md text-center md:text-left mx-auto md:mx-0"
                    >
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light tracking-wide">
                            In a world of rapid transformation to the digital economy and encryption industry,
                            our company rises as a pioneer marketing and advertising company.
                        </p>
                        <button className="mt-8 w-full md:w-auto flex items-center justify-center gap-4 group px-8 py-4 glass rounded-full hover:bg-white hover:text-black transition-all duration-300">
                            <span className="text-xs tracking-widest uppercase font-bold text-white group-hover:text-black transition-colors">Get Started</span>
                            <ArrowDown className="w-4 h-4 group-hover:-rotate-45 transition-all duration-500" />
                        </button>
                    </motion.div>

                    {/* Social Icons - Stacked Vertical on Mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex md:flex-row flex-col items-center gap-6 md:gap-8"
                    >
                        <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hover:scale-110 duration-300" />
                        <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hover:scale-110 duration-300" />
                        <Send className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hover:scale-110 duration-300" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator - Hidden on very small screens, visible on regular mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-6 md:bottom-12 md:left-12 flex items-center justify-center transform scale-75 md:scale-100 origin-bottom-left"
            >
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Rotating Text */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <svg viewBox="0 0 100 100" width="100" height="100">
                            <defs>
                                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                            </defs>
                            <text fontSize="11" fill="white" letterSpacing="2px">
                                <textPath href="#circle">
                                    SCROLL TO EXPLORE • SCROLL TO EXPLORE •
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>
                    <ArrowDown className="w-5 h-5 text-white" />
                </div>
            </motion.div>
        </section>
    );
}
