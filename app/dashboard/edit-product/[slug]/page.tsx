"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiImage, FiUpload, FiX } from "react-icons/fi";
import { supabase } from "@/utils/supabase";

const MOCK_IMAGES = [
    "product (1).jpeg",
    "product (2).jpeg",
    "product (3).jpeg",
];

export default function EditProductPage(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);
    const router = useRouter();

    // States
    const [productData, setProductData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [activeSidebarTarget, setActiveSidebarTarget] = useState<'main' | 'additional' | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedAdditionalImages, setSelectedAdditionalImages] = useState<string[]>([]);

    // Form States
    const [title, setTitle] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState("");
    const [description, setDescription] = useState("");

    // Fetch Existing Data
    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', params.slug)
                .single();

            if (!error && data) {
                setProductData(data);
                setTitle(data.title);
                setOriginalPrice(data.original_price ? data.original_price.toString() : "");
                setDiscountedPrice(data.discounted_price ? data.discounted_price.toString() : "");
                setDescription(data.description || "");
                setSelectedImage(data.main_image || null);
                setSelectedAdditionalImages(data.additional_images || []);
            }
            setIsLoading(false);
        }

        if (params.slug) {
            fetchProduct();
        }
    }, [params.slug]);

    const handleSubmit = async () => {
        if (!title) {
            alert("Judul produk minimal harus diisi!");
            return;
        }

        if (!productData?.id) {
            alert("Data produk tidak valid, coba muat ulang halaman.");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data, error } = await supabase
                .from('products')
                .update({
                    title,
                    original_price: originalPrice ? parseInt(originalPrice) : null,
                    discounted_price: discountedPrice ? parseInt(discountedPrice) : null,
                    description,
                    main_image: selectedImage,
                    additional_images: selectedAdditionalImages
                })
                .eq('id', productData.id)
                .select();

            console.log("Update result:", { data, error });

            if (error) throw error;

            alert("Produk berhasil diperbarui!");
            router.push('/dashboard/all-product');

        } catch (error: any) {
            console.error("Update error:", error);
            alert("Terjadi kesalahan saat menyimpan pembaruan: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="p-6 text-white text-center">Loading product data...</div>;
    }

    if (!productData) {
        return <div className="p-6 text-white text-center">Produk tidak ditemukan.</div>;
    }

    return (
        <div className="p-6 w-full flex flex-col gap-6 relative">
            <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>

            <div className="flex flex-col gap-6 rounded-xl border border-[#27272a] bg-[#1a1a1a] p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-1 flex-col gap-2">
                        <label className="text-sm font-medium text-white">Product Image</label>
                        <button
                            onClick={() => setActiveSidebarTarget('main')}
                            className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#27272a] bg-[#27272a]/50 text-zinc-400 hover:bg-[#27272a] transition-colors relative overflow-hidden"
                        >
                            {selectedImage ? (
                                <Image
                                    src={`/product/${selectedImage}`}
                                    alt="Selected"
                                    fill
                                    className="object-contain p-2"
                                />
                            ) : (
                                <>
                                    <FiImage className="h-6 w-6" />
                                    <span className="text-sm">Pilih Image Utama</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                        <label className="text-sm font-medium text-white">Image Tambahan</label>
                        <button
                            onClick={() => setActiveSidebarTarget('additional')}
                            className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#27272a] bg-[#27272a]/50 text-zinc-400 hover:bg-[#27272a] transition-colors relative overflow-hidden p-2"
                        >
                            {selectedAdditionalImages.length > 0 ? (
                                <div className="flex gap-2 h-full w-full items-center justify-start overflow-x-auto overflow-y-hidden scrollbar-thin">
                                    {selectedAdditionalImages.map((img) => (
                                        <div key={img} className="relative h-24 w-24 shrink-0 rounded-md border border-[#27272a] bg-white overflow-hidden">
                                            <Image
                                                src={`/product/${img}`}
                                                alt={img}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <FiImage className="h-6 w-6" />
                                    <span className="text-sm text-center px-2">Pilih Image Tambahan (Multi-select)</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white">Judul Produk</label>
                    <textarea
                        rows={2}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Masukkan judul atau nama produk..."
                        className="w-full rounded-lg border border-[#27272a] bg-[#27272a] p-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-1 flex-col gap-2">
                        <label className="text-sm font-medium text-white">Harga Awal (Coret)</label>
                        <input
                            type="number"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                            placeholder="Contoh: 150000"
                            className="w-full h-10 rounded-lg border border-[#27272a] bg-[#27272a] px-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <label className="text-sm font-medium text-white">Harga Terkini</label>
                        <input
                            type="number"
                            value={discountedPrice}
                            onChange={(e) => setDiscountedPrice(e.target.value)}
                            placeholder="Contoh: 99000"
                            className="w-full h-10 rounded-lg border border-[#27272a] bg-[#27272a] px-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white">Deskripsi</label>
                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tambahkan deskripsi lengkap produk..."
                        className="w-full rounded-lg border border-[#27272a] bg-[#27272a] p-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors resize-y"
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`flex h-10 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium text-white transition-colors
              ${isSubmitting ? "bg-emerald-800 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"}
            `}
                    >
                        <FiUpload className="h-4 w-4" />
                        {isSubmitting ? "Menyimpan..." : "Update Product"}
                    </button>
                </div>
            </div>

            {activeSidebarTarget !== null && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="flex-1 bg-black/50"
                        onClick={() => setActiveSidebarTarget(null)}
                    />
                    <div className="w-[80%] max-w-[400px] h-full bg-[#171717] border-l border-[#27272a] flex flex-col animate-in slide-in-from-right overflow-hidden shadow-2xl relative">
                        <div className="flex h-16 items-center justify-between px-6 border-b border-[#27272a]">
                            <h2 className="text-lg font-semibold text-white">
                                {activeSidebarTarget === 'main' ? 'Select Product Image' : 'Select Additional Images'}
                            </h2>
                            <button
                                onClick={() => setActiveSidebarTarget(null)}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <FiX className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4 content-start">
                            {MOCK_IMAGES.map((img) => {
                                const isSelected = activeSidebarTarget === 'main'
                                    ? selectedImage === img
                                    : selectedAdditionalImages.includes(img);

                                return (
                                    <div
                                        key={img}
                                        onClick={() => {
                                            if (activeSidebarTarget === 'main') {
                                                setSelectedImage(img);
                                                setActiveSidebarTarget(null);
                                            } else {
                                                setSelectedAdditionalImages(prev =>
                                                    prev.includes(img)
                                                        ? prev.filter(i => i !== img)
                                                        : [...prev, img]
                                                );
                                            }
                                        }}
                                        className={`relative aspect-square rounded-xl border-2 cursor-pointer overflow-hidden transition-all hover:border-emerald-500 bg-white
                      ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-[#27272a]'}`}
                                    >
                                        <Image
                                            src={`/product/${img}`}
                                            alt={img}
                                            fill
                                            className="object-contain p-2"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-black/80 p-2 text-[10px] text-center text-white truncate backdrop-blur-sm">
                                            {img}
                                        </div>
                                        {activeSidebarTarget === 'additional' && isSelected && (
                                            <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border-2 border-[#171717]">
                                                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[#171717] font-bold" stroke="currentColor" strokeWidth="4">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {activeSidebarTarget === 'additional' && (
                            <div className="p-4 border-t border-[#27272a] bg-[#1a1a1a]">
                                <button
                                    onClick={() => setActiveSidebarTarget(null)}
                                    className="w-full h-10 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                                >
                                    Confirm Selection ({selectedAdditionalImages.length})
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
