"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from "recharts";
import { Info, BarChart2 } from "lucide-react";

interface CoinDetail {
    id: string;
    name: string;
    symbol: string;
    image: { small: string };
    market_data: {
        current_price: { usd: number };
        price_change_percentage_24h: number;
        high_24h: { usd: number };
        low_24h: { usd: number };
        market_cap: { usd: number };
        circulating_supply: number;
        sparkline_7d: { price: number[] };
    };
}

export default function CoinDetailChart() {
    const [coinId, setCoinId] = useState("bitcoin");
    const [data, setData] = useState<CoinDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetails() {
            setLoading(true);
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();
    }, [coinId]);

    const chartData = data?.market_data.sparkline_7d.price.map((price, index) => ({
        time: index,
        price: price,
    })) || [];

    if (loading && !data) return <div className="h-[400px] bg-white/5 rounded-3xl animate-pulse" />;

    return (
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img src={data?.image.small} alt={data?.name} className="w-12 h-12 rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                            <BarChart2 className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            {data?.name} <span className="text-gray-500 uppercase text-sm font-mono mt-1">{data?.symbol}</span>
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-mono font-bold text-white">
                                ${data?.market_data.current_price.usd.toLocaleString()}
                            </span>
                            <span className={`text-sm font-medium ${(data?.market_data.price_change_percentage_24h || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {(data?.market_data.price_change_percentage_24h || 0) >= 0 ? '+' : ''}{data?.market_data.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                    {["bitcoin", "ethereum", "solana", "cardano"].map((id) => (
                        <button
                            key={id}
                            onClick={() => setCoinId(id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${coinId === id ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-[300px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                                itemStyle={{ color: "#3b82f6", fontWeight: "bold" }}
                                labelStyle={{ display: "none" }}
                            />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={false}
                                animationDuration={2000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="absolute top-2 left-2 pointer-events-none">
                        <span className="text-[10px] text-gray-500 font-mono">7D PRICE PERFORMANCE</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Info className="w-4 h-4" /> Market Stats
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: "24h High", value: `$${data?.market_data.high_24h.usd.toLocaleString()}` },
                            { label: "24h Low", value: `$${data?.market_data.low_24h.usd.toLocaleString()}` },
                            { label: "Market Cap", value: `$${(data?.market_data.market_cap.usd || 0 / 1e9).toLocaleString(undefined, { maximumFractionDigits: 1 })}B` },
                            { label: "Supply", value: `${(data?.market_data.circulating_supply || 0 / 1e6).toLocaleString(undefined, { maximumFractionDigits: 1 })}M` },
                        ].map((stat, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                <span className="text-gray-400 text-sm">{stat.label}</span>
                                <span className="text-white font-mono font-bold text-sm tracking-tight">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
