"use client";

import { useEffect, useState } from "react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/dashboard/ProductCard";
import { supabase } from "@/utils/supabase";

export default function AllProductPage() {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setProducts(data);
            } else {
                console.error("Failed to fetch products:", error);
            }
            setLoading(false);
        }

        fetchProducts();
    }, []);

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (!error) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert("Gagal menghapus produk: " + error.message);
            }
        }
    };

    const handleEdit = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/dashboard/edit-product/${slug}`);
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/manage-category" className="flex h-10 items-center justify-center rounded-lg border border-white px-4 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors">
                        Manage Category
                    </Link>
                    <Link href="/dashboard/new-product" className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                        <FiPlus className="h-4 w-4" />
                        New Product
                    </Link>
                </div>
            </div>

            {/* Controls Area */}
            <div className="flex flex-col sm:flex-row items-center gap-4 border border-[#27272a] bg-[#1a1a1a] rounded-xl p-2 w-full">
                {/* Category Dropdown Area */}
                <button className="flex h-10 w-full sm:w-auto min-w-[180px] items-center justify-between rounded-lg bg-[#27272a] px-4 text-sm font-medium text-white hover:bg-[#3f3f46] transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                        Category
                    </div>
                    <FiChevronDown className="h-4 w-4" />
                </button>

                {/* Search Bar */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari Nama Product..."
                    className="flex-1 h-10 px-4 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
                />
            </div>

            {/* Product Grid Area */}
            {loading ? (
                <div className="flex justify-center py-20 text-zinc-400">Loading products from Supabase...</div>
            ) : filteredProducts.length === 0 ? (
                <div className="flex justify-center py-20 text-zinc-400">Tidak ada produk yang cocok dengan pencarian Anda.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {filteredProducts.map((product) => (
                        <Link key={product.id} href={`/product/${product.slug}`}>
                            <ProductCard
                                imageUrl={`/product/${product.main_image || 'product (1).jpeg'}`}
                                title={product.title}
                                originalPrice={product.original_price ? `Rp. ${product.original_price.toLocaleString('id-ID')}` : ""}
                                discountedPrice={product.discounted_price ? `Rp. ${product.discounted_price.toLocaleString('id-ID')}` : ""}
                                onDelete={(e) => handleDelete(e, product.id)}
                                onEdit={(e) => handleEdit(e, product.slug)}
                                onView={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/product/${product.slug}`); }}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
