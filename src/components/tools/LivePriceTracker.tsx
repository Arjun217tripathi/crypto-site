"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { Skeleton } from "./Skeleton";

interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
}

export default function LivePriceTracker() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const fetchPrices = async () => {
        try {
            const response = await fetch(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false"
            );
            const data = await response.json();
            setCoins(data);
            setLastUpdated(new Date());
        } catch (error) {
            console.error("Error fetching prices:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // Auto-refresh every 60s
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-16 w-full opacity-50" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Live Market <span className="text-blue-400">Prices</span>
                </h2>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 font-mono">
                        Updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                    <button
                        onClick={fetchPrices}
                        className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                            <th className="px-6 py-2 pb-4">Asset</th>
                            <th className="px-6 py-2 pb-4">Price</th>
                            <th className="px-6 py-2 pb-4">24h Change</th>
                            <th className="px-6 py-2 pb-4 hidden md:table-cell">Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {coins.map((coin, index) => (
                                <motion.tr
                                    key={coin.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300"
                                >
                                    <td className="px-6 py-5 rounded-l-2xl border-l border-t border-b border-white/5">
                                        <div className="flex items-center gap-3">
                                            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                                            <div>
                                                <div className="text-white font-bold text-base leading-none mb-1">{coin.name}</div>
                                                <div className="text-gray-500 text-xs uppercase font-mono">{coin.symbol}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 border-t border-b border-white/5">
                                        <div className="text-white font-mono font-bold">
                                            ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 border-t border-b border-white/5">
                                        <div className={`flex items-center gap-1 font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {coin.price_change_percentage_24h >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 rounded-r-2xl border-r border-t border-b border-white/5 hidden md:table-cell">
                                        <div className="text-gray-400 text-sm">
                                            ${(coin.market_cap / 1e9).toFixed(2)}B
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
