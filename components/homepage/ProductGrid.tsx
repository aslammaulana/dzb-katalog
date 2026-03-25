"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface ProductGridProps {
    isDarkMode?: boolean;
    searchQuery?: string;
}

export default function ProductGrid({ isDarkMode = false, searchQuery = "" }: ProductGridProps) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setProducts(data);
            }
            setLoading(false);
        }

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    if (loading) {
        return (
            <main className="grid grid-cols-2 gap-5 px-4 pb-12 mt-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex flex-col overflow-hidden rounded-lg ring-1 ${isDarkMode ? 'bg-[#1a1a1a] ring-[#27272a]' : 'bg-[#f7f7f7] ring-slate-100'}`}>
                        {/* Image skeleton */}
                        <div className={`aspect-square w-full animate-pulse ${isDarkMode ? 'bg-[#27272a]' : 'bg-slate-200'}`} />
                        {/* Text skeletons */}
                        <div className="flex flex-col p-3.5 gap-2">
                            <div className={`h-3 w-full rounded animate-pulse ${isDarkMode ? 'bg-[#27272a]' : 'bg-slate-200'}`} />
                            <div className={`h-3 w-3/4 rounded animate-pulse ${isDarkMode ? 'bg-[#27272a]' : 'bg-slate-200'}`} />
                            <div className={`h-4 w-1/2 rounded mt-1 animate-pulse ${isDarkMode ? 'bg-[#3f3f46]' : 'bg-slate-300'}`} />
                        </div>
                    </div>
                ))}
            </main>
        );
    }

    if (filteredProducts.length === 0) {
        return <div className={`w-full py-10 text-center text-sm ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{searchQuery ? `Tidak ada produk "${searchQuery}"` : 'Belum ada produk yang tersedia.'}</div>;
    }

    return (
        <main className="grid grid-cols-2 gap-5 px-4 pb-12 mt-4">
            {filteredProducts.map((product) => {
                // Calculate discount if valid
                let discountText = "";
                if (product.original_price && product.discounted_price && product.original_price > product.discounted_price) {
                    const pct = Math.round(((product.original_price - product.discounted_price) / product.original_price) * 100);
                    discountText = `${pct}%`;
                }

                return (
                    <Link key={product.id} href={`/product/${product.slug}`} className={`group flex flex-col overflow-hidden rounded-lg ring-1 transition-all hover:shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] ring-[#27272a]' : 'bg-[#ffffff91] ring-[#f0f0f0]'}`}>
                        {/* Image Container */}
                        <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                            {/* Ribbon Diskon */}
                            {discountText && (
                                <div className="absolute left-2 top-2 z-10 rounded-md bg-[#f94960] px-2 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">
                                    {discountText}
                                </div>
                            )}
                            {/* Product Image */}
                            <Image
                                src={`/product/${product.main_image || 'product (1).jpeg'}`}
                                alt={product.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 600px) 50vw, 300px"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col p-3.5 space-y-1.5">
                            <h2 className={`line-clamp-2 text-sm font-semibold leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {product.title}
                            </h2>
                            <div className="mt-auto flex flex-col pt-1">
                                {product.original_price && (
                                    <span className="text-xs font-medium text-slate-400 line-through">
                                        Rp {product.original_price.toLocaleString('id-ID')}
                                    </span>
                                )}
                                <span className="text-sm font-bold tracking-tight text-[#f94960]">
                                    Rp {product.discounted_price?.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </main>
    );
}
