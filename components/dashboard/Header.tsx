"use client";

import { FiMenu } from "react-icons/fi";
import Link from "next/link";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="flex h-14 items-center gap-4 border-b border-[#27272a] bg-[#121212] px-4">
            <button
                onClick={onMenuClick}
                className="flex items-center justify-center rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
                <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold md:hidden">
                DZ
            </div>
            <Link href="/dashboard" className="text-base font-semibold text-white md:hidden">
                dzb-katalog
            </Link>
        </header>
    );
}
