"use client";

import { FiMenu, FiSun, FiMoon, FiPhone } from "react-icons/fi";

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

export default function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
    return (
        <div className="px-4 pt-4">
            <header className="flex items-center justify-between p-2.5 bg-white rounded-full">
                {/* Left: Menu */}
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4e9ed] text-slate-700 hover:bg-slate-300 transition-colors">
                    <FiMenu size={20} />
                </button>

                {/* Right: Theme Toggle & CS */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4e9ed] text-slate-700 hover:bg-slate-300 transition-colors"
                    >
                        {isDarkMode ? <FiMoon size={18} /> : <FiSun size={18} />}
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4e9ed] text-slate-700 hover:bg-slate-300 transition-colors">
                        <FiPhone size={18} />
                    </button>
                </div>
            </header>
        </div>
    );
}
