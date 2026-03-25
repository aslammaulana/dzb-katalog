"use client";

import { FiChevronDown, FiFilter, FiSearch, FiLayout } from "react-icons/fi";

interface ActionBarProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (value: boolean) => void;
    isDarkMode?: boolean;
    searchQuery?: string;
    setSearchQuery?: (value: string) => void;
}

export default function ActionBar({ isSearchOpen, setIsSearchOpen, isDarkMode = false, searchQuery = "", setSearchQuery }: ActionBarProps) {
    const btnBase = isDarkMode
        ? "bg-[#27272a] text-zinc-200 hover:bg-[#3f3f46]"
        : "bg-[#e4e9ed] text-slate-700 hover:bg-slate-300";

    return (
        <section className="px-4 py-2 relative z-10">
            <div className="flex items-center justify-between">
                {/* Kiri: Kategori, Filter, Search */}
                <div className="flex items-center gap-2">
                    <button className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${btnBase}`}>
                        Semua Kategori <FiChevronDown />
                    </button>
                    <button className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${btnBase}`}>
                        <FiFilter size={18} />
                    </button>
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isSearchOpen ? 'bg-[#5686fe] text-white' : btnBase}`}
                    >
                        <FiSearch size={18} />
                    </button>
                </div>

                {/* Kanan: Layout */}
                <button className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${btnBase}`}>
                    <FiLayout size={18} />
                </button>
            </div>

            {/* Search Bar (Collapsible) */}
            <div className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out p-1 ${isSearchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="relative border-t border-transparent pt-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 mt-0.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari produk di katalog..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery?.(e.target.value)}
                        className={`w-full rounded-full border-none py-3 pl-12 pr-4 text-sm outline-none ring-1 transition-all font-medium placeholder:text-slate-400 ${isDarkMode ? 'bg-[#27272a] text-white ring-[#3f3f46] focus:ring-[#5686fe]' : 'bg-white text-slate-700 ring-slate-100 focus:ring-2 focus:ring-slate-300'}`}
                    />
                </div>
            </div>
        </section>
    );
}
