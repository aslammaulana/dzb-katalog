interface ProductDescriptionProps {
    paragraphs: string[];
    isDarkMode?: boolean;
    isLoading?: boolean;
}

export default function ProductDescription({ paragraphs, isDarkMode = false, isLoading = false }: ProductDescriptionProps) {
    return (
        <section className="flex flex-col p-5 mb-28 rounded-2xl flex-1 z-10 relative">
            <h2 className={`text-xs font-bold tracking-wider uppercase mb-3 transition-colors ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                Description
            </h2>
            <div className={`text-sm leading-relaxed space-y-3 transition-colors ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'} ${isLoading ? 'opacity-0' : ''}`}>
                {paragraphs.map((text, idx) => (
                    <p key={idx}>{text}</p>
                ))}
            </div>
        </section>
    );
}
