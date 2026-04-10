"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, BarChart3 } from "lucide-react";

interface MarketData {
    total_market_cap: { usd: number };
    market_cap_percentage: { btc: number };
    market_cap_change_percentage_24h_usd: number;
}

export default function MarketSnapshot() {
    const [data, setData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://api.coingecko.com/api/v3/global");
                const json = await response.json();
                setData(json.data);
            } catch (error) {
                console.error("Error fetching global data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                ))}
            </div>
        );
    }

    const stats = [
        {
            label: "Total Market Cap",
            value: `$${(data?.total_market_cap.usd || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            icon: <BarChart3 className="w-5 h-5 text-blue-400" />,
            change: data?.market_cap_change_percentage_24h_usd.toFixed(2) + "%",
            isPositive: (data?.market_cap_change_percentage_24h_usd || 0) >= 0,
        },
        {
            label: "BTC Dominance",
            value: `${data?.market_cap_percentage.btc.toFixed(1)}%`,
            icon: <Activity className="w-5 h-5 text-orange-400" />,
            change: "Market Leader",
            isPositive: true,
        },
        {
            label: "24h Volume Change",
            value: "Dynamic",
            icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
            change: data?.market_cap_change_percentage_24h_usd.toFixed(2) + "%",
            isPositive: (data?.market_cap_change_percentage_24h_usd || 0) >= 0,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-gray-900 border border-white/5 group-hover:border-white/20 transition-colors">
                            {stat.icon}
                        </div>
                        <span className={`text-xs font-medium ${stat.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                            {stat.change}
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
