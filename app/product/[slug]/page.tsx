"use client";

import { useEffect, useState, use } from "react";
import Header from "@/components/product/Header";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDescription from "@/components/product/ProductDescription";
import Footer from "@/components/product/Footer";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

export default function ProductDetail(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', params.slug)
                .single();

            if (!error && data) {
                setProduct(data);
            }
            setLoading(false);
        }

        if (params.slug) {
            fetchProduct();
        }
    }, [params.slug]);

    if (!loading && !product) {
        return (
            <div className={`min-h-screen w-full bg-white text-slate-800 ${isDarkMode ? 'dark' : ''}`}>
                <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col items-center justify-center gap-4 bg-[#f7f8fa] relative shadow-sm border-x border-slate-100 p-8 text-center">
                    <h1 className="text-xl font-bold">Produk tidak ditemukan</h1>
                    <Link href="/" className="text-sm text-pink-600 font-medium hover:underline">
                        Kembali ke Halaman Utama
                    </Link>
                </div>
            </div>
        );
    }

    // Mempersiapkan array gambar untuk ProductCarousel
    const images: string[] = [];
    if (product?.main_image) {
        images.push(`/product/${product.main_image}`);
    }
    if (product?.additional_images && product.additional_images.length > 0) {
        product.additional_images.forEach((img: string) => {
            images.push(`/product/${img}`);
        });
    }

    // Default jika loading atau tidak ada gambar
    if (loading || images.length === 0) {
        images.push("/product/product (1).jpeg"); // Will be covered by skeleton during loading
    }

    // Mengubah deskripsi teks biasa menjadi format array paragraf sesuai prop ProductDescription
    const paragraphs = product?.description
        ? product.description.split('\n').filter((p: string) => p.trim() !== '')
        : loading ? ["Memuat deksripsi..."] : ["Tidak ada deskripsi yang tersedia untuk produk ini."];

    return (
        <div className={`min-h-screen w-full transition-colors duration-300 ${isDarkMode && mounted ? 'dark bg-[#121212] text-white' : 'bg-[#afc1f1] text-slate-800'}`}>
            <div className={`mx-auto flex min-h-screen w-full max-w-[500px] flex-col relative shadow-sm border-x transition-colors duration-300 ${isDarkMode && mounted ? 'bg-[#121212] border-[#27272a]' : 'bg-[#ffffff] border-slate-100'}`}>
                <Header isDarkMode={isDarkMode} setIsDarkMode={handleSetDarkMode} />

                <ProductCarousel images={images} isLoading={loading} />

                <ProductInfo
                    title={loading ? "Memuat produk..." : product?.title}
                    oldPrice={product?.original_price ? `Rp ${product.original_price.toLocaleString('id-ID')}` : ""}
                    newPrice={product?.discounted_price ? `Rp ${product.discounted_price.toLocaleString('id-ID')}` : ""}
                    isDarkMode={isDarkMode}
                    isLoading={loading}
                />

                <ProductDescription paragraphs={paragraphs} isDarkMode={isDarkMode} isLoading={loading} />

                <Footer isDarkMode={isDarkMode} productTitle={product?.title || ""} />

            </div>
        </div>
    );
}
