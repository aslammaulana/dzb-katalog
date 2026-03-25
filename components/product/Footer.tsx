import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface FooterProps {
    isDarkMode?: boolean;
    productTitle?: string;
}

export default function Footer({ isDarkMode = false, productTitle = "" }: FooterProps) {
    const waText = encodeURIComponent(
        `Assalamualaikum.\nHallo Kak, Apakah Produk ini ${productTitle} masih ada?`
    );
    const waLink = `https://wa.me/6285756078836?text=${waText}`;

    return (
        <div className={`fixed bottom-0 md:sticky md:bottom-0 left-0 w-full border-t p-4 z-50 transition-colors ${isDarkMode ? 'bg-[#1a1a1a] border-[#27272a]' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3 max-w-[500px] mx-auto">
                {/* WA Button */}
                <Link
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-lg bg-[#f94960] text-white shadow-sm hover:bg-[#e03a4f] transition-colors focus:ring-2 focus:ring-[#f94960] focus:ring-offset-1 outline-none"
                >
                    <FaWhatsapp size={24} />
                </Link>
                {/* CTA Button */}
                <Link
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[46px] flex-1 items-center justify-center rounded-lg bg-[#f94960] text-[16px] font-semibold text-white shadow-sm hover:bg-[#e03a4f] transition-colors focus:ring-2 focus:ring-[#f94960] focus:ring-offset-1 outline-none"
                >
                    Pesan sekarang
                </Link>
            </div>
        </div>
    );
}
