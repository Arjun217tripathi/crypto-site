"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ChevronDown } from "lucide-react";

const TOP_COINS = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "binancecoin", name: "BNB", symbol: "BNB" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "ripple", name: "XRP", symbol: "XRP" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
];

const CURRENCIES = [
    { code: "usd", name: "US Dollar", symbol: "$" },
    { code: "inr", name: "Indian Rupee", symbol: "₹" },
    { code: "aed", name: "UAE Dirham", symbol: "د.إ" },
    { code: "eur", name: "Euro", symbol: "€" },
];

export default function PriceConverter() {
    const [amount, setAmount] = useState<string>("1");
    const [selectedCoin, setSelectedCoin] = useState(TOP_COINS[0]);
    const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
    const [rate, setRate] = useState<number | null>(null);
    const [isReverse, setIsReverse] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchRate() {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin.id}&vs_currencies=${selectedCurrency.code}`
                );
                const data = await res.json();
                setRate(data[selectedCoin.id][selectedCurrency.code]);
            } catch (error) {
                console.error("Scale fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRate();
    }, [selectedCoin, selectedCurrency]);

    const result = rate ? (isReverse ? parseFloat(amount) / rate : parseFloat(amount) * rate) : 0;

    return (
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ArrowLeftRight className="w-24 h-24 text-blue-500" />
            </div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <span className="p-2 bg-blue-500/10 rounded-lg"><ArrowLeftRight className="w-5 h-5 text-blue-400" /></span>
                    Quick Converter
                </h2>

                <div className={`space-y-6 ${isReverse ? 'flex flex-col-reverse' : 'flex flex-col'}`}>
                    {/* Input Unit */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">
                            {isReverse ? "You Send" : "Convert From"}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                placeholder="0.00"
                            />
                            <div className="relative group/select">
                                <select
                                    value={isReverse ? selectedCurrency.code : selectedCoin.id}
                                    onChange={(e) => {
                                        if (isReverse) {
                                            setSelectedCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0]);
                                        } else {
                                            setSelectedCoin(TOP_COINS.find(c => c.id === e.target.value) || TOP_COINS[0]);
                                        }
                                    }}
                                    className="appearance-none bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-12 text-lg font-bold text-white focus:outline-none hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    {isReverse
                                        ? CURRENCIES.map(c => <option key={c.code} value={c.code} className="bg-gray-900">{c.code.toUpperCase()}</option>)
                                        : TOP_COINS.map(c => <option key={c.id} value={c.id} className="bg-gray-900">{c.symbol}</option>)
                                    }
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center -my-2 relative z-20">
                        <button
                            onClick={() => setIsReverse(!isReverse)}
                            className="p-3 bg-white text-black rounded-full hover:scale-110 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <ArrowLeftRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Result Unit */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">
                            {isReverse ? "You Receive" : "Convert To"}
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xl font-bold text-blue-400">
                                {loading ? "..." : result.toLocaleString(undefined, { maximumFractionDigits: isReverse ? 8 : 2 })}
                            </div>
                            <div className="relative group/select">
                                <select
                                    value={isReverse ? selectedCoin.id : selectedCurrency.code}
                                    onChange={(e) => {
                                        if (isReverse) {
                                            setSelectedCoin(TOP_COINS.find(c => c.id === e.target.value) || TOP_COINS[0]);
                                        } else {
                                            setSelectedCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0]);
                                        }
                                    }}
                                    className="appearance-none bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-12 text-lg font-bold text-white focus:outline-none hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    {isReverse
                                        ? TOP_COINS.map(c => <option key={c.id} value={c.id} className="bg-gray-900">{c.symbol}</option>)
                                        : CURRENCIES.map(c => <option key={c.code} value={c.code} className="bg-gray-900">{c.code.toUpperCase()}</option>)
                                    }
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-gray-500 text-xs text-center font-medium">
                        1 {selectedCoin.symbol} = {rate?.toLocaleString()} {selectedCurrency.code.toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
    );
}
