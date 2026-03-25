interface ProductInfoProps {
    title: string;
    oldPrice: string;
    newPrice: string;
    isDarkMode?: boolean;
    isLoading?: boolean;
}

export default function ProductInfo({ title, oldPrice, newPrice, isDarkMode = false, isLoading = false }: ProductInfoProps) {
    return (
        <section className="flex flex-col p-5 z-10 relative">
            <h1 className={`text-xl sm:text-2xl font-bold leading-snug transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'} ${isLoading ? 'animate-pulse text-transparent bg-slate-300 rounded w-3/4' : ''}`}>
                {title}
            </h1>
            <div className={`flex flex-col gap-1 pt-4 ${isLoading ? 'opacity-0' : ''}`}>
                <span className={`text-sm font-semibold line-through transition-colors ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                    {oldPrice}
                </span>
                <span className="text-3xl font-bold tracking-tight text-[#f94960]">
                    {newPrice}
                </span>
            </div>
        </section>
    );
}
