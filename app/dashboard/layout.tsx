"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen flex-col bg-[#121212] text-white overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden">
                <Header onMenuClick={() => setMobileSidebarOpen(true)} />
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                    mobileOpen={mobileSidebarOpen}
                    onMobileClose={() => setMobileSidebarOpen(false)}
                />

                {/* Mobile Backdrop */}
                {mobileSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden md:pl-[64px] bg-[#121212]">
                    {children}
                </main>
            </div>
        </div>
    );
}
