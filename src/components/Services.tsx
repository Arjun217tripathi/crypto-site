"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Services() {
    return (
        <section id="services" className="py-32 relative bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-6xl font-bold leading-tight uppercase tracking-tighter">
                        Crypto Marketing Services <br />
                        <span className="text-gray-500">We Offer</span>
                    </h2>
                </motion.div>

                <div className="relative min-h-[auto] md:min-h-[800px] w-full max-w-7xl mx-auto">
                    {/* 3D Center Object */}
                    <div className="relative md:absolute top-0 left-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full h-[400px] md:w-[600px] md:h-[600px] z-0 opacity-80 mb-12 md:mb-0">
                        <Scene3D color="#00ffff" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-full md:min-h-[600px]">
                        {/* Left Column */}
                        <div className="flex flex-col justify-center gap-6 md:gap-24 py-0 md:py-12 order-2 md:order-1">
                            <ServiceCard
                                title="Community Building"
                                desc="Cultivate a loyal and engaged audience across social media platforms like Twitter, Telegram, and Discord."
                                lineDirection="right"
                            />
                            <ServiceCard
                                title="Content Marketing"
                                desc="Educational, informative, and engaging content that builds trust and awareness around your project."
                                lineDirection="right"
                            />
                        </div>

                        {/* Middle Column - Spacer for 3D object + Bottom Card */}
                        <div className="flex flex-col justify-end py-0 md:py-12 order-4 md:order-2">
                            <div className="hidden md:block flex-1"></div> {/* Spacer */}
                            <ServiceCard
                                title="SEO & Paid Advertising"
                                desc="Maximize visibility through targeted crypto-specific SEO strategies and pay-per-click campaigns."
                                lineDirection="top"
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col justify-center gap-6 md:gap-24 py-0 md:py-12 order-3 md:order-3">
                            <ServiceCard
                                title="Token Launch Campaigns"
                                desc="Strategically promote your ICO, STO, or IEO, creating maximum buzz in the market."
                                lineDirection="left"
                            />
                            <ServiceCard
                                title="Influencer Marketing"
                                desc="Leverage the credibility of crypto influencers to expand your reach and establish credibility in the space."
                                lineDirection="left"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ title, desc, lineDirection }: { title: string, desc: string, lineDirection: 'left' | 'right' | 'top' }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all group relative w-full h-fit bg-black/40 backdrop-blur-md"
        >
            <h4 className="text-lg font-bold mb-4 tracking-wide text-white group-hover:text-cyan-400 transition-colors">{title}:</h4>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
                {desc}
            </p>

            {/* Decorative Lines - Only visible on large screens */}
            {lineDirection === 'right' && (
                <div className="hidden lg:block absolute top-1/2 -right-24 w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            )}
            {lineDirection === 'left' && (
                <div className="hidden lg:block absolute top-1/2 -left-24 w-24 h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
            )}
            {lineDirection === 'top' && (
                <div className="hidden lg:block absolute -top-24 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-t from-white/20 to-transparent" />
            )}
        </motion.div>
    );
}
