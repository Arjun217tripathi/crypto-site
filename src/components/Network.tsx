"use client";

import { motion } from "framer-motion";
import Scene3D from "./Scene3D";
import { ArrowUpRight } from "lucide-react";

export default function Network() {
    return (
        <section className="py-32 relative bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-bold leading-tight mb-8 md:mb-12 tracking-tighter uppercase"
                    >
                        Serving Crypto Projects in <br className="hidden md:block" />
                        <span className="text-gray-500">UAE & Dubai</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12"
                    >
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-xl text-left md:text-right md:ml-auto">
                            as we offer the proper support to companies starting from studying project ideas and finding investors to facilitating their launch and advertisement in the region.
                        </p>

                        <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 glass rounded-full hover:bg-white hover:text-black transition-all duration-500 group whitespace-nowrap">
                            <span className="text-xs tracking-widest uppercase font-bold">Read More</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                        </button>
                    </motion.div>
                </div>

                {/* Big Background 3D Object at Bottom */}
                <div className="absolute -bottom-1/2 -right-1/4 w-full h-full opacity-50 pointer-events-none">
                    <Scene3D color="#ff0080" />
                </div>
            </div>
        </section>
    );
}
