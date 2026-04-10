"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const content = [
    {
        title: "OUR OBJECTIVE",
        description: "is to enable investors and entrepreneurs who seek to get the required permits for launching their business in the thriving Emirati market through the hands of our team specialized in project studies. Starting from the Whitepaper, we guarantee to offer a thorough study and integrated consultancy at the stage of establishment and various project developments to guarantee a powerful and sustainable take-off in this promising field.",
    },
    {
        title: "OUR VISION",
        description: "To be the leading marketing agency in the Web3 space, bridging the gap between traditional business models and the decentralized future, specifically in the UAE and Dubai region.",
    },
];

export default function ObjectiveVision() {
    return (
        <section id="vision" className="py-20 relative bg-black overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 z-0">
                <Scene3D color="#bf00ff" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                        Our Objective & Vision in <span className="text-gray-500">Web3 Growth</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-6">
                    {content.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="glass-card rounded-[32px] p-8 md:p-12 hover:bg-white/5 group overflow-hidden relative"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-2xl md:text-4xl font-bold tracking-tight">{item.title}</h3>
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-4xl font-light">
                                {item.description}
                            </p>

                            {/* Subtle hover reveal light */}
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:bg-white/10 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
