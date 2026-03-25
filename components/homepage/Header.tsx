"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiSun, FiMoon, FiPhone } from "react-icons/fi";

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

export default function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if scrolled down more than 20px
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'px-4 pt-4' : 'px-4 pt-4'}`}>
            <header
                className={`flex items-center justify-between transition-all duration-300 ${isScrolled
                        ? 'p-2.5 rounded-full bg-black/60 backdrop-blur-md shadow-lg  '
                        : 'p-2.5 bg-white rounded-full'
                    }`}
            >
                {/* Left: Menu */}
                <button className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isScrolled ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-[#e4e9ed] text-slate-700 hover:bg-slate-300'
                    }`}>
                    <FiMenu size={20} />
                </button>

                {/* Right: Theme Toggle & CS */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isScrolled ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-[#e4e9ed] text-slate-700 hover:bg-slate-300'
                            }`}
                    >
                        {isDarkMode ? <FiMoon size={18} /> : <FiSun size={18} />}
                    </button>
                    <button className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isScrolled ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-[#e4e9ed] text-slate-700 hover:bg-slate-300'
                        }`}>
                        <FiPhone size={18} />
                    </button>
                </div>
            </header>
        </div>
    );
}
