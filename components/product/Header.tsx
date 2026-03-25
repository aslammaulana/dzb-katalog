"use client";

import Link from "next/link";
import { FiArrowLeft, FiSun, FiMoon, FiPhone } from "react-icons/fi";

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

export default function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
    return (
        <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4 ">
            {/* Left: Back Button */}
            <Link href="/">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
                    <FiArrowLeft size={20} />
                </button>
            </Link>

            {/* Right: Theme Toggle & CS */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                    {isDarkMode ? <FiMoon size={18} /> : <FiSun size={18} />}
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
                    <FiPhone size={18} />
                </button>
            </div>
        </header>
    );
}
