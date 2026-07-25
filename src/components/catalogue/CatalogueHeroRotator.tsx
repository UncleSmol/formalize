"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CatalogueHeroRotatorProps {
 images: { src: string; label: string }[];
}

export function CatalogueHeroRotator({ images }: CatalogueHeroRotatorProps) {
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
 if (images.length === 0) return;
 const interval = setInterval(() => {
 setCurrentIndex((prev) => (prev + 1) % images.length);
 }, 5000);
 return () => clearInterval(interval);
 }, [images.length]);

 if (images.length === 0) return null;

 return (
 <div className="relative flex min-h-80 w-full overflow-hidden ">
 {images.map((image, index) => (
 <div
 key={index}
 className={`absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out ${
 index === currentIndex ? "opacity-100" : "opacity-0"
 }`}
 >
 <Image
 src={image.src}
 alt={image.label}
 fill
 className="object-contain"
 priority={index === 0}
 sizes="(max-width: 1024px) 100vw, 55vw"
 />
 </div>
 ))}

 {/* Dots Navigation */}
 {images.length > 1 && (
 <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
 {images.map((_, index) => (
 <button
 key={index}
 onClick={() => setCurrentIndex(index)}
 className={`h-2.5 transition-all duration-300 ${
 index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/75"
 }`}
 aria-label={`Go to image ${index + 1}`}
 />
 ))}
 </div>
 )}
 </div>
 );
}
