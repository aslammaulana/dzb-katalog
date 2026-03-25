"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ProductCarouselProps {
    images: string[];
    isLoading?: boolean;
}

export default function ProductCarousel({ images, isLoading = false }: ProductCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Mouse drag states
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [savedScrollLeft, setSavedScrollLeft] = useState(0);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const width = scrollContainerRef.current.clientWidth;
            const newIndex = Math.round(scrollLeft / width);
            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
            }
        }
    };

    const scrollToImage = (index: number) => {
        if (scrollContainerRef.current) {
            const width = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollTo({
                left: index * width,
                behavior: "smooth"
            });
            setCurrentIndex(index);
        }
    };

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDown(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setSavedScrollLeft(scrollContainerRef.current.scrollLeft);
        // Temporarily remove snapping for smooth drag
        scrollContainerRef.current.style.scrollSnapType = 'none';
        scrollContainerRef.current.style.scrollBehavior = 'auto';
    };

    const handleMouseLeaveOrUp = () => {
        setIsDown(false);
        if (scrollContainerRef.current) {
            // Restore snapping
            scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
            scrollContainerRef.current.style.scrollBehavior = 'smooth';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed multiplier
        scrollContainerRef.current.scrollLeft = savedScrollLeft - walk;
    };

    return (
        <div className="relative mb-5 w-full bg-slate-100 aspect-4/4 sm:aspect-4/4">
            {/* Skeleton overlay shown until first image loads, or if explicitly loading */}
            {(!imageLoaded || isLoading) && (
                <div className="absolute inset-0 z-20 animate-pulse bg-slate-200" />
            )}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeaveOrUp}
                onMouseUp={handleMouseLeaveOrUp}
                onMouseMove={handleMouseMove}
                className={`flex overflow-x-auto snap-x snap-mandatory h-full w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
                {images.map((src, idx) => (
                    <div key={idx} className="relative min-w-full h-full snap-start select-none">
                        <Image
                            src={src}
                            alt={`Product Image ${idx + 1}`}
                            fill
                            className="object-cover pointer-events-none"
                            priority={idx === 0}
                            sizes="(max-width: 600px) 100vw, 500px"
                            draggable={false}
                            onLoad={() => { if (idx === 0) setImageLoaded(true); }}
                        />
                    </div>
                ))}
            </div>
            {/* Carousel Dots */}
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToImage(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${idx === currentIndex ? 'w-6 bg-[#f94960]' : 'w-3 bg-black/40 hover:bg-black/60'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
