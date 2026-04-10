"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Plus, Trash2, TrendingUp, TrendingDown, X } from "lucide-react";

interface Asset {
    id: string;
    symbol: string;
    name: string;
    amount: number;
    currentPrice?: number;
}

const AVAILABLE_COINS = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
    { id: "binancecoin", name: "BNB", symbol: "BNB" },
    { id: "ripple", name: "XRP", symbol: "XRP" },
];

export default function PortfolioTracker() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoinId, setSelectedCoinId] = useState(AVAILABLE_COINS[0].id);
    const [assetAmount, setAssetAmount] = useState("");
    const [loading, setLoading] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("cryptecho_portfolio");
        if (saved) {
            setAssets(JSON.parse(saved));
        }
    }, []);

    // Fetch prices for assets
    useEffect(() => {
        if (assets.length === 0) return;

        async function fetchPrices() {
            const ids = assets.map(a => a.id).join(",");
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
                const data = await res.json();
                const updatedAssets = assets.map(asset => ({
                    ...asset,
                    currentPrice: data[asset.id]?.usd || 0
                }));
                setAssets(updatedAssets);
            } catch (err) {
                console.error("Portfolio price fetch error:", err);
            }
        }

        fetchPrices();
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, [assets.length]);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("cryptecho_portfolio", JSON.stringify(assets));
    }, [assets]);

    const addAsset = () => {
        const coin = AVAILABLE_COINS.find(c => c.id === selectedCoinId);
        if (!coin || !assetAmount) return;

        const newAsset: Asset = {
            ...coin,
            amount: parseFloat(assetAmount),
        };

        setAssets([...assets, newAsset]);
        setAssetAmount("");
        setIsModalOpen(false);
    };

    const removeAsset = (index: number) => {
        setAssets(assets.filter((_, i) => i !== index));
    };

    const totalValue = assets.reduce((sum, asset) => sum + (asset.amount * (asset.currentPrice || 0)), 0);

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:shadow-[0_0_40px_rgba(150,100,255,0.15)] transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <Wallet className="w-6 h-6 text-neonBlue" />
                        Personal Portfolio
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 font-medium">Tracking {assets.length} Assets (Local Storage Only)</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-white font-mono">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                        <TrendingUp className="w-3 h-3" /> Total Value
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] border-b border-white/5">
                            <th className="pb-4 pt-0">Asset</th>
                            <th className="pb-4 pt-0">Holdings</th>
                            <th className="pb-4 pt-0">Value</th>
                            <th className="pb-4 pt-0 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {assets.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 text-center">
                                    <p className="text-gray-600 text-sm italic">Your portfolio is empty. Add your first asset to start tracking.</p>
                                </td>
                            </tr>
                        ) : (
                            assets.map((asset, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={`${asset.id}-${i}`}
                                    className="group"
                                >
                                    <td className="py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs text-white">
                                                {asset.symbol.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold leading-none mb-1">{asset.name}</div>
                                                <div className="text-gray-500 text-[10px] tracking-widest uppercase">{asset.symbol}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 font-mono text-sm text-gray-300">
                                        {asset.amount.toLocaleString()} {asset.symbol}
                                    </td>
                                    <td className="py-5 font-mono text-sm text-white font-bold">
                                        ${((asset.currentPrice || 0) * asset.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-5 text-right">
                                        <button
                                            onClick={() => removeAsset(i)}
                                            className="p-2 rounded-lg hover:bg-rose-500/10 text-gray-600 hover:text-rose-400 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 rounded-2xl border border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2 group text-sm font-bold text-gray-400 hover:text-white"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add Asset
                </button>
            </div>

            {/* Add Asset Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-[#0B0B0B] border border-white/10 rounded-3xl p-8 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h4 className="text-xl font-bold text-white">Add New Asset</h4>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Select Coin</label>
                                    <div className="relative">
                                        <select
                                            value={selectedCoinId}
                                            onChange={(e) => setSelectedCoinId(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-neonBlue/50"
                                        >
                                            {AVAILABLE_COINS.map(coin => (
                                                <option key={coin.id} value={coin.id} className="bg-black text-white">{coin.name} ({coin.symbol})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Amount Owned</label>
                                    <input
                                        type="number"
                                        value={assetAmount}
                                        onChange={(e) => setAssetAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue/50"
                                    />
                                </div>

                                <button
                                    onClick={addAsset}
                                    className="w-full py-4 bg-white text-black rounded-xl font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95"
                                >
                                    Confirm Asset
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
