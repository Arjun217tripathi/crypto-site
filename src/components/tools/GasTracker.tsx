"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Fuel, Zap, Clock, Activity } from "lucide-react";

interface GasInfo {
    network: string;
    low: number;
    average: number;
    fast: number;
    unit: string;
}

const NETWORKS = [
    { name: "Ethereum", id: "eth", color: "text-blue-400" },
    { name: "Polygon", id: "polygon", color: "text-purple-400" },
    { name: "Binance Smart Chain", id: "bsc", color: "text-yellow-400" },
];

export default function GasTracker() {
    const [gasData, setGasData] = useState<GasInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating fetching from multiple gas stations
        const fetchGas = async () => {
            // In a real app, you would fetch from Etherscan, PolygonScan, BscScan APIs
            // For the demo, we generate realistic dynamic data
            const data = NETWORKS.map(net => {
                const base = net.id === 'eth' ? 20 : net.id === 'polygon' ? 80 : 5;
                const variation = Math.random() * 5;
                return {
                    network: net.name,
                    low: Math.round(base + variation),
                    average: Math.round(base + variation + 5),
                    fast: Math.round(base + variation + 12),
                    unit: "Gwei"
                };
            });
            setGasData(data);
            setLoading(false);
        };

        fetchGas();
        const interval = setInterval(fetchGas, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:shadow-[0_0_40px_rgba(150,100,255,0.25)] transition-all duration-300">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <Fuel className="w-6 h-6 text-neonPurple" />
                    Gas Fees Tracker
                </h3>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">LIVE UPDATES</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {gasData.map((gas, index) => (
                    <motion.div
                        key={gas.network}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                            <div className={`p-1.5 rounded-md bg-white/5 ${NETWORKS[index].color}`}>
                                <Activity className="w-4 h-4" />
                            </div>
                            <h4 className="text-gray-400 font-bold text-sm uppercase tracking-wider">{gas.network}</h4>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <span className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                    <Clock className="w-3 h-3 text-rose-400" /> SLOW
                                </span>
                                <span className="text-white font-mono font-bold">{gas.low} <span className="text-[10px] text-gray-600">Gwei</span></span>
                            </div>
                            <div className="flex justify-between items-center bg-blue-500/5 p-3 rounded-xl border border-blue-500/10 hover:border-blue-500/20 transition-colors">
                                <span className="flex items-center gap-2 text-xs text-blue-400 font-medium font-bold">
                                    <Activity className="w-3 h-3" /> AVG
                                </span>
                                <span className="text-white font-mono font-bold">{gas.average} <span className="text-[10px] text-gray-600">Gwei</span></span>
                            </div>
                            <div className="flex justify-between items-center bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10 hover:border-emerald-500/20 transition-colors">
                                <span className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                                    <Zap className="w-3 h-3" /> FAST
                                </span>
                                <span className="text-white font-mono font-bold">{gas.fast} <span className="text-[10px] text-gray-600">Gwei</span></span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
