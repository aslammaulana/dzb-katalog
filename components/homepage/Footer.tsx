interface FooterProps {
    isDarkMode?: boolean;
}

export default function Footer({ isDarkMode = false }: FooterProps) {
    return (
        <footer className="w-full py-6 mt-auto text-center">
            <p className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                &copy; Copyright Depo Zahra Bangunan | 2026
            </p>
        </footer>
    );
}
