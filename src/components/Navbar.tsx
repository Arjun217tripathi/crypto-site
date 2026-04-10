"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Vision", href: "#vision" },
    { name: "Services", href: "#services" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/5" : "py-6 md:py-8"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="text-xl md:text-2xl font-bold tracking-widest text-white z-50 relative">
                        CRYPTECHO
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-12">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 tracking-wide"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <button className="group relative px-6 py-2.5 bg-white text-black rounded-full font-semibold overflow-hidden transition-all duration-300 hover:pr-10">
                            <span className="relative z-10">Start a Project</span>
                            <ArrowUpRight className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 w-4 h-4" />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-full glass border border-white/10 text-white relative"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="fixed inset-0 z-40 bg-black flex flex-col pt-32 px-6 pb-12 md:hidden"
                    >
                        <div className="flex flex-col gap-8 flex-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-4xl font-bold tracking-tighter text-white hover:text-gray-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <button className="w-full py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest mt-auto">
                            Start a Project
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
