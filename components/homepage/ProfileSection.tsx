import Image from "next/image";

interface ProfileSectionProps {
    isDarkMode?: boolean;
}

export default function ProfileSection({ isDarkMode = false }: ProfileSectionProps) {
    return (
        <section className="flex flex-col items-center pt-6 pb-4 px-4 relative z-10">
            {/* Logo landscape container — matches the horizontal aspect ratio of the logo */}
            <div className="relative w-28 h-28 overflow-hidden rounded-full shadow-sm">
                <Image
                    src="/logo-zahra.png"
                    alt="Logo Zahra Bangunan"
                    fill
                    className="object-contain"
                    sizes="292px"
                    priority
                />
            </div>
            <p className={`mt-5 mb-7 text-[16px] font-medium text-center transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Perusahaan Retail Bahan Bangunan <br /> Terlengkap Di Aceh</p>
        </section>
    );
}
