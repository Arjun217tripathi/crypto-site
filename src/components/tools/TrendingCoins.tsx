"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface TrendingCoin {
    item: {
        id: string;
        coin_id: number;
        name: string;
        symbol: string;
        thumb: string;
        score: number;
        price_btc: number;
        data: {
            price: string;
            price_change_percentage_24h: { usd: number };
        };
    };
}

export default function TrendingCoins() {
    const [trending, setTrending] = useState<TrendingCoin[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrending() {
            try {
                const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
                const json = await res.json();
                setTrending(json.coins.slice(0, 5));
            } catch (error) {
                console.error("Trending fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTrending();
    }, []);

    if (loading) return <div className="h-[300px] bg-white/5 rounded-3xl animate-pulse" />;

    return (
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500/20" />
                Trending <span className="text-orange-400">Now</span>
            </h2>
            <div className="space-y-4">
                {trending.map((coin, index) => (
                    <motion.div
                        key={coin.item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all hover:bg-white/10 group cursor-default"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-600 font-mono w-4">#{index + 1}</span>
                            <img src={coin.item.thumb} alt={coin.item.name} className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform" />
                            <div>
                                <h4 className="text-white font-bold leading-none mb-1">{coin.item.name}</h4>
                                <p className="text-gray-500 text-xs font-mono uppercase">{coin.item.symbol}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-white font-mono font-bold text-sm">
                                {coin.item.data.price.length > 10 ? coin.item.data.price.slice(0, 8) + '...' : coin.item.data.price}
                            </div>
                            <div className={`text-xs font-medium ${(coin.item.data.price_change_percentage_24h.usd || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {(coin.item.data.price_change_percentage_24h.usd || 0) >= 0 ? '+' : ''}{coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
