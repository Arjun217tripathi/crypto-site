"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ToolHero from "@/components/tools/ToolHero";
import LivePriceTracker from "@/components/tools/LivePriceTracker";
import MarketSnapshot from "@/components/tools/MarketSnapshot";
import PriceConverter from "@/components/tools/PriceConverter";
import CoinDetailChart from "@/components/tools/CoinDetailChart";
import TrendingCoins from "@/components/tools/TrendingCoins";
import FearGreedIndex from "@/components/tools/FearGreedIndex";
import GasTracker from "@/components/tools/GasTracker";
import PortfolioTracker from "@/components/tools/PortfolioTracker";
import ToolLeadCapture from "@/components/tools/ToolLeadCapture";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function ToolsPage() {
    return (
        <main className="relative bg-black min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <ToolHero />

            <div className="container px-4 md:px-6 mx-auto space-y-24 pb-24 relative z-10">

                {/* Row 1: Market Intelligence */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MarketSnapshot />
                    </div>
                    <div className="h-full">
                        <FearGreedIndex />
                    </div>
                </section>

                {/* Row 2: Gas Fees & Utilities */}
                <section>
                    <GasTracker />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Price List - Left Column (Large) */}
                    <div className="lg:col-span-2 space-y-12">
                        <section id="tracker">
                            <LivePriceTracker />
                        </section>

                        <section id="portfolio">
                            <PortfolioTracker />
                        </section>

                        <section id="detail-chart">
                            <CoinDetailChart />
                        </section>
                    </div>

                    {/* Sidebar Tools - Right Column */}
                    <div className="space-y-12">
                        <section id="converter">
                            <PriceConverter />
                        </section>

                        <section id="trending">
                            <TrendingCoins />
                        </section>

                        {/* PRO TEASER */}
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="px-3 py-1 bg-neonPurple/20 text-neonPurple rounded-full text-[10px] font-bold tracking-widest border border-neonPurple/30">PRO</span>
                            </div>
                            <div className="relative z-10 space-y-4">
                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-gray-400" /> Advanced Analytics
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Unlock historical data, API webhooks, and advanced portfolio export. Coming soon for enterprise partners.
                                </p>
                                <div className="pt-2">
                                    <div className="h-10 w-full bg-white/5 border border-white/5 rounded-xl blur-[2px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lead Capture */}
                <section>
                    <ToolLeadCapture />
                </section>

                {/* Disclaimer */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="pt-12 border-t border-white/5"
                >
                    <p className="text-gray-600 text-xs text-center max-w-3xl mx-auto leading-relaxed">
                        Data provided by CoinGecko and Alternative.me. Prices and market data are for informational purposes only and do not constitute financial, investment, or legal advice. Cryptecho is not responsible for any errors or omissions in the data provided. Always perform your own research before making any financial decisions.
                    </p>
                </motion.section>
            </div>

            <Footer />
        </main>
    );
}
