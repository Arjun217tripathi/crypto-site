"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function ToolLeadCapture() {
    return (
        <div className="relative group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 blur-[80px] opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 text-center overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Sparkles className="w-32 h-32 text-white" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-2xl mx-auto"
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-6">
                        CRYPTECHO STRATEGY
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter uppercase">
                        Want expert help scaling your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">Crypto Project?</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light mb-10 leading-relaxed">
                        Get a free tokenomics review and marketing strategy call. Join 50+ startups launched with Cryptecho.
                    </p>

                    <button className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 group">
                        <span>Start a Project</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
