"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Twitter, Send } from "lucide-react";
import Link from "next/link";
import Scene3D from "./Scene3D";

export default function CTA() {
    return (
        <section className="py-20 relative bg-black overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-8xl font-bold tracking-tighter mb-8 uppercase">
                        Ready to take your<br />
                        <span className="text-gray-500">Crypto Project</span><br />
                        to the next level?
                    </h2>

                    <p className="text-gray-400 max-w-lg mx-auto mb-12 font-light">
                        Let's create a marketing plan that puts your brand in front of the people who matter most. Contact us today!
                    </p>

                    <button className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold hover:pr-14 transition-all duration-500 group relative overflow-hidden">
                        <span>Get In Touch</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </button>
                </motion.div>

                {/* Floating 3D Blob behind CTA */}
                <div className="absolute inset-x-0 bottom-[-20%] h-full opacity-40">
                    <Scene3D color="#bf00ff" />
                </div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="py-20 bg-black border-t border-white/5 relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                        <h2 className="text-xl md:text-2xl tracking-widest text-gray-400 mb-6 md:mb-4 uppercase font-bold">Ready to Scale Your Crypto Project?</h2>
                        <button className="w-full md:w-auto px-8 py-4 md:py-3 glass rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">Get Started</button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <Link href="#home" className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors">Home</Link>
                        <Link href="#about" className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors">About</Link>
                        <Link href="#vision" className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors">Vision</Link>
                        <Link href="#services" className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors">Services</Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8 md:gap-0">
                    <div className="mb-0 md:mb-0">
                        <h1 className="text-[15vw] md:text-[12vw] leading-none font-bold tracking-[0.2em] text-white/5 select-none hover:text-white/10 transition-colors duration-1000">CRYPTECHO</h1>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right w-full md:w-auto">
                        <div className="flex items-center gap-8 md:gap-6 justify-center md:justify-end">
                            <Instagram className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                            <Twitter className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                            <Send className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                        </div>
                        <p className="text-[10px] tracking-widest text-gray-600 uppercase">&copy; Cryptecho 2025. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
