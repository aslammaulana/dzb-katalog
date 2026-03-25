"use client";

import { useState } from "react";
import Header from "@/components/product/Header";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDescription from "@/components/product/ProductDescription";
import Footer from "@/components/product/Footer";

export default function ProductDetail() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Dummy data
    const images = [
        "/product/product (1).jpeg",
        "/product/product (2).jpeg",
        "/product/product (3).jpeg",
    ];

    const productData = {
        title: "Lorem Ipsum is simply dummy text of the product",
        oldPrice: "Rp 256.000",
        newPrice: "Rp198.000",
        description: [
            "Ebook dalam bentuk PDF file berisi 44 halaman tentang mengenai cara belajar step belajar membaca dari perkenalan alphabet hingga belajar membaca dengan lancar.",
            "Materi pembelajaran ini dibuat khusus dengan design yang modern dan interaktif agar lebih menyenangkan dan mudah dipahami."
        ]
    };

    return (
        <div className={`min-h-screen w-full bg-white text-slate-800 ${isDarkMode ? 'dark' : ''}`}>
            <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col bg-[#f7f8fa] relative shadow-sm border-x border-slate-100">
                <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                <ProductCarousel images={images} />
                <ProductInfo title={productData.title} oldPrice={productData.oldPrice} newPrice={productData.newPrice} />
                <ProductDescription paragraphs={productData.description} />
                <Footer />
            </div>
        </div>
    );
}
