"use client";

import { useState, useEffect } from "react";
import Header from "@/components/homepage/Header";
import ProfileSection from "@/components/homepage/ProfileSection";
import ActionBar from "@/components/homepage/ActionBar";
import ProductGrid from "@/components/homepage/ProductGrid";
import Footer from "@/components/homepage/Footer";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const handleSetDarkMode = (value: boolean) => {
    setIsDarkMode(value);
    localStorage.setItem("theme", value ? "dark" : "light");
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${isDarkMode && mounted ? 'dark bg-[#121212] text-white' : 'bg-[#afc1f1] text-slate-800'}`}>
      <div className={`mx-auto flex min-h-screen w-full max-w-[500px] flex-col relative shadow-sm border-x transition-colors duration-300 ${isDarkMode && mounted ? 'bg-[#121212] border-[#27272a]' : 'bg-[#fcfcfc] border-slate-100'}`}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={handleSetDarkMode} />
        <ProfileSection isDarkMode={isDarkMode} />
        <ActionBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} isDarkMode={isDarkMode} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ProductGrid isDarkMode={isDarkMode} searchQuery={searchQuery} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
