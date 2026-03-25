import Image from "next/image";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

interface ProductCardProps {
    imageUrl: string;
    title: string;
    originalPrice: string;
    discountedPrice: string;
    onEdit?: (e: React.MouseEvent) => void;
    onDelete?: (e: React.MouseEvent) => void;
    onView?: (e: React.MouseEvent) => void;
}

export function ProductCard({
    imageUrl,
    title,
    originalPrice,
    discountedPrice,
    onEdit,
    onDelete,
    onView,
}: ProductCardProps) {
    return (
        <div className="flex flex-col rounded-xl border border-[#27272a] bg-[#171717] overflow-hidden text-white">
            <div className="flex p-4 gap-4 pb-2 border-b border-[#ffffff1a]">
                <div className="h-16 w-16 shrink-0 relative rounded-md overflow-hidden bg-white">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-contain p-1"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-[15px] font-medium leading-tight">
                        {title}
                    </h3>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 line-through">
                        {originalPrice}
                    </span>
                    <span className="text-[17px] font-bold">
                        {discountedPrice}
                    </span>
                </div>

                <div className="flex justify-end gap-2 mt-1">
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onView?.(e); }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f1f1] text-[#1c1c1c] hover:bg-white transition-colors"
                    >
                        <FiEye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit?.(e); }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f1f1] text-[#1c1c1c] hover:bg-white transition-colors"
                    >
                        <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete?.(e); }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f1f1] text-[#1c1c1c] hover:bg-white transition-colors"
                    >
                        <FiTrash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
