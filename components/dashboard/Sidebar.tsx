"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiBox, FiMenu, FiX, FiSettings, FiUser } from "react-icons/fi";

interface SidebarProps {
    mobileOpen?: boolean;
    onMobileClose?: () => void;
}

const menuItems = [
    { href: "/dashboard", icon: FiHome, label: "Dashboard", exact: true },
    { href: "/dashboard/all-product", icon: FiBox, label: "All Products", exact: false },
];

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
    const pathname = usePathname();

    const navContent = (isMobile: boolean) => (
        <nav className={`flex flex-col gap-2 px-2 py-4 w-full`}>
            {menuItems.map((item) => {
                const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={isMobile ? onMobileClose : undefined}
                        className={`flex h-10 w-full items-center justify-start rounded-lg px-3 transition-colors ${isActive ? "bg-[#27272a] text-white" : "text-zinc-400 hover:bg-[#27272a] hover:text-white"}`}
                    >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span
                            className={`ml-3 overflow-hidden text-sm font-medium whitespace-nowrap ${isMobile ? "opacity-100" : "opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"}`}
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="group hidden md:flex fixed left-0 top-0 z-40 h-screen w-[64px] flex-col border-r border-[#27272a] bg-[#121212] transition-all duration-300 ease-in-out hover:w-[240px] overflow-y-auto overflow-x-hidden">
                <div className="flex h-14 items-center gap-3 px-3 border-b border-[#27272a] shrink-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                        DZ
                    </div>
                    <span className="text-base font-semibold tracking-tight text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                        dzb-katalog
                    </span>
                </div>

                {navContent(false)}

                <div className="mt-auto flex flex-col gap-2 px-2 py-4">
                    <button className="flex h-10 w-full items-center justify-start rounded-lg px-3 text-zinc-400 hover:bg-[#27272a] hover:text-white transition-colors">
                        <FiUser className="h-5 w-5 shrink-0" />
                        <span className="ml-3 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Profile
                        </span>
                    </button>
                    <button className="flex h-10 w-full items-center justify-start rounded-lg px-3 text-zinc-400 hover:bg-[#27272a] hover:text-white transition-colors">
                        <FiSettings className="h-5 w-5 shrink-0" />
                        <span className="ml-3 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Settings
                        </span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-[80%] max-w-[300px] flex-col border-r border-[#27272a] bg-[#121212] transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex h-14 items-center justify-between px-4 border-b border-[#27272a]">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                            DZ
                        </div>
                        <span className="text-base font-semibold tracking-tight text-white">dzb-katalog</span>
                    </div>
                    <button
                        onClick={onMobileClose}
                        className="flex items-center justify-center rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                        <FiX className="h-6 w-6" />
                    </button>
                </div>
                {navContent(true)}
            </aside>
        </>
    );
}
