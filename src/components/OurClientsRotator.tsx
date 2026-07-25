"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface Client {
 name: string;
 description: string;
 logo: string;
 website?: string;
 facebook?: string;
 instagram?: string;
 linkedin?: string;
}

interface OurClientsRotatorProps {
 clients: Client[];
}

export function OurClientsRotator({ clients }: OurClientsRotatorProps) {
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
 if (clients.length === 0) return;
 const interval = setInterval(() => {
 setCurrentIndex((prev) => (prev + 1) % clients.length);
 }, 10000);
 return () => clearInterval(interval);
 }, [clients.length]);

 if (clients.length === 0) return null;

 return (
 <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
 {/* Logo Rotator */}
 <div className="relative flex min-h-72 w-full overflow-hidden border border-white/10 bg-white">
 {clients.map((client, index) => (
 <div
 key={client.name}
 className={`absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out ${
 index === currentIndex ? "opacity-100" : "opacity-0"
 }`}
 >
 <Image
 src={client.logo}
 alt={client.name}
 fill
 className="object-contain p-8"
 priority={index === 0}
 sizes="(max-width: 1024px) 100vw, 50vw"
 />
 </div>
 ))}
 </div>

 {/* Client Info */}
 <div className="relative min-h-60">
 {clients.map((client, index) => (
 <div
 key={client.name}
 className={`transition-opacity duration-1000 ease-in-out ${
 index === currentIndex
 ? "opacity-100 visible relative"
 : "opacity-0 invisible absolute inset-0"
 }`}
 >
 <h3 className="text-2xl font-black">{client.name}</h3>
 <p className="mt-4 text-sm leading-6 text-white/50">
 {client.description}
 </p>
 {(client.website || client.facebook || client.instagram || client.linkedin) && (
 <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/30">
 {client.website && (
 <a
 href={`https://${client.website}`}
 target="_blank"
 rel="noopener noreferrer"
 className="transition-colors hover:text-white/70"
 >
 {client.website}
 </a>
 )}
 {client.facebook && (
 <a
 href={client.facebook}
 target="_blank"
 rel="noopener noreferrer"
 className="transition-colors hover:text-white/70"
 >
 Facebook
 </a>
 )}
 {client.instagram && (
 <a
 href={client.instagram}
 target="_blank"
 rel="noopener noreferrer"
 className="transition-colors hover:text-white/70"
 >
 Instagram
 </a>
 )}
 {client.linkedin && (
 <a
 href={client.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 className="transition-colors hover:text-white/70"
 >
 LinkedIn
 </a>
 )}
 </div>
 )}
 </div>
 ))}
 </div>

 {/* Dots Navigation */}
 {clients.length > 1 && (
 <div className="col-span-full flex justify-center gap-2">
 {clients.map((_, index) => (
 <button
 key={index}
 onClick={() => setCurrentIndex(index)}
 className={`h-2.5 transition-all duration-300 ${
 index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/75"
 }`}
 aria-label={`Go to client ${index + 1}`}
 />
 ))}
 </div>
 )}
 </div>
 );
}
