"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

const BitcoinScene = dynamic(() => import("./BitcoinScene"), { ssr: false });

export default function About() {
    return (
        <section id="about" className="py-32 relative overflow-hidden bg-black">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start text-left"
                    >
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4 w-full">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">About Cryptecho</span>
                            <span className="ml-auto text-[10px] tracking-[0.2em] uppercase text-gray-600">Since 2025</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                            About Cryptecho – Full-Stack <span className="text-gray-500">Crypto Marketing Agency</span>
                        </h2>

                        <div className="space-y-6 text-gray-400 font-light leading-relaxed text-sm md:text-base">
                            <p>
                                We design <span className="text-white font-medium">integrated experiences</span> that link all stakeholders and components of interest (project idea, early investors, project execution, and post-launch marketing).
                            </p>
                            <p>
                                We offer well-designed and innovative strategies that allow us to build bridges to make cutting-edge technologies available for the Arab community by providing integrated and remarkable content that attracts and motivates foresighted investments.
                            </p>
                        </div>

                        <button className="mt-12 w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 glass rounded-full hover:bg-white hover:text-black transition-all duration-500 group">
                            <span className="text-xs tracking-widest uppercase font-bold">Read More</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                        </button>
                    </motion.div>

                    {/* Right Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[100px] rounded-full" />
                        <div className="relative z-10 glass-card rounded-[40px] overflow-hidden border-white/10">
                            <BitcoinScene />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
