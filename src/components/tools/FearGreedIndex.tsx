"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToolCardSkeleton } from "./Skeleton";

interface FngData {
    value: string;
    value_classification: string;
}

export default function FearGreedIndex() {
    const [data, setData] = useState<FngData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("https://api.alternative.me/fng/");
                const json = await res.json();
                setData(json.data[0]);
            } catch (error) {
                console.error("F&G fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <ToolCardSkeleton />;

    const value = parseInt(data?.value || "0");
    const classification = data?.value_classification || "Neutral";

    const getGradientColor = (val: number) => {
        if (val < 25) return "from-rose-500 to-rose-400"; // Extreme Fear
        if (val < 45) return "from-orange-500 to-orange-400"; // Fear
        if (val < 55) return "from-yellow-400 to-yellow-300"; // Neutral
        if (val < 75) return "from-emerald-400 to-emerald-300"; // Greed
        return "from-green-500 to-green-400"; // Extreme Greed
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-[0_0_40px_rgba(150,100,255,0.25)] transition-all duration-300">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Fear & Greed Index</h3>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">SENTIMENT</span>
            </div>

            <div className="space-y-8">
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl font-bold text-white mb-2"
                    >
                        {value}
                    </motion.div>
                    <div className={`text-lg font-bold uppercase tracking-widest ${value < 45 ? 'text-rose-400' : value > 55 ? 'text-emerald-400' : 'text-yellow-400'
                        }`}>
                        {classification}
                    </div>
                </div>

                <div className="relative pt-2">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${getGradientColor(value)} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                        />
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                        <span>Extreme Fear</span>
                        <span>Neutral</span>
                        <span>Extreme Greed</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                    <p className="text-gray-500 text-xs text-center leading-relaxed">
                        Market Sentiment: <span className="text-white font-medium">{classification} ({value})</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
