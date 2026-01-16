"use client";

import { useState } from 'react';
import { type Page as PageType } from '@/app/create/page';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Heart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import './album.css';

interface AlbumProps {
  pages: PageType[];
}

// Quote Page Component
const QuotePage = ({ quote, imageUrl }: { quote: string; imageUrl: string }) => {
    return (
        <div className="album-page-content relative overflow-hidden bg-gray-900">
             {/* Background Image (Blurred) */}
             <div className="absolute inset-0 w-full h-full">
                <Image
                    src={imageUrl}
                    alt="background"
                    fill
                    className="object-cover blur-md scale-110 opacity-60"
                />
             </div>
             {/* Dark Overlay */}
             <div className="absolute inset-0 bg-black/40" />
             {/* Quote Text */}
             <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-8 border-l border-white/20">
                 <Heart className="w-8 h-8 text-rose-400 mb-4 fill-rose-400/20" />
                 <p className="font-headline text-lg sm:text-xl lg:text-2xl italic text-white drop-shadow-md max-w-md leading-relaxed">
                    "{quote}"
                 </p>
                 <div className="w-12 h-1 bg-white/50 rounded-full mt-6" />
            </div>
        </div>
    );
};

function DesktopAlbum({ pages }: AlbumProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const goToNextPage = () => { if (currentPageIndex < pages.length + 1) setCurrentPageIndex(currentPageIndex + 1); };
  const goToPrevPage = () => { if (currentPageIndex > 0) setCurrentPageIndex(currentPageIndex - 1); };

  const leaves = [];

  // --- 1. COVER PAGE ---
  if (pages.length > 0) {
    leaves.push({
        front: (
            <div className="album-page-cover-front album-page-content bg-black relative">
                {pages[0] && <Image src={pages[0].imageUrl} alt="Cover" fill className="object-cover opacity-80" priority />}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 bg-gradient-to-t from-black/90 via-transparent to-black/20">
                    <h1 className="font-headline text-5xl text-white drop-shadow-xl mb-2">Rekhu & Milu</h1>
                    <p className="text-white/90 font-body text-xl tracking-widest uppercase">Love Story</p>
                </div>
            </div>
        ),
        back: (
            // Jab Cover khulega -> Left side par Pehli photo dikhegi
            <div className="album-page-content image-page bg-white relative">
                 {pages[0] && <Image src={pages[0].imageUrl} alt="First Photo" fill className="object-cover" />}
            </div>
        )
    });
  }

  // --- 2. INNER PAGES ---
  for (let i = 1; i < pages.length; i++) {
    leaves.push({
        // RIGHT SIDE: Previous Photo ka Quote
        front: <QuotePage quote={pages[i-1]?.quote} imageUrl={pages[i-1]?.imageUrl} />,
        
        // LEFT SIDE (Next Flip): Next Photo
        back: (
            <div className="album-page-content image-page bg-white relative">
                {pages[i] && (
                    <Image 
                        src={pages[i].imageUrl} 
                        alt={`Page ${i+1}`} 
                        fill 
                        className="object-cover" 
                    />
                )}
            </div>
        )
    });
  }

  // --- 3. LAST PAGE ---
  if (pages.length > 0) {
      leaves.push({
          front: <QuotePage quote={pages[pages.length - 1]?.quote} imageUrl={pages[pages.length - 1]?.imageUrl} />,
          back: (
            <div className="album-page-cover-back album-page-content bg-rose-50 flex items-center justify-center">
                <div className="text-center text-rose-600">
                    <Heart className="w-16 h-16 mx-auto mb-4 fill-rose-600 animate-pulse" />
                    <p className="font-headline text-3xl">Forever Yours</p>
                </div>
            </div>
          )
      });
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
      <div className="book-container">
        <div className="book">
          {leaves.map((leaf, index) => {
            
            const isFlipped = index < currentPageIndex;
            
            // --- YE HAI WO JADUI FIX (MAGIC FIX) ---
            // Agar page flip ho gaya hai, toh uska z-index kam nahi hona chahiye, balki adjust hona chahiye
            // taaki wo Left stack mein sahi jagah baithe.
            let zIndex = leaves.length - index; 
            if (isFlipped) {
                // Flip hone ke baad, index badha kar z-index badhayenge taaki ye page upar aa sake
                zIndex = index; 
            }

            return (
              <div
                key={index}
                className={cn('book-page-container', { flipped: isFlipped })}
                style={{ zIndex }} 
                onClick={() => isFlipped ? goToPrevPage() : goToNextPage()}
              >
                <div className="book-page book-page-front">{leaf.front}</div>
                <div className="book-page book-page-back">{leaf.back}</div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-muted-foreground text-sm mt-4 animate-bounce">Tap right to flip • Tap left to go back</p>
    </div>
  );
}

function MobileAlbum({ pages }: AlbumProps) {
    return (
        <Carousel className="w-full h-full">
            <CarouselContent>
                <CarouselItem className="h-full w-full relative">
                     <div className="w-full h-full relative">
                        {pages[0] && <Image src={pages[0].imageUrl} alt="Cover" fill className="object-cover" />}
                        <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
                            <h1 className="text-4xl text-white font-bold drop-shadow-lg">Rekhu & Milu</h1>
                        </div>
                     </div>
                </CarouselItem>

                {pages.map((page, index) => (
                    <CarouselItem key={index} className="h-full w-full relative bg-black">
                         <Image src={page.imageUrl} alt="img" fill className="object-cover" />
                         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-6 pb-12 pt-20">
                             <p className="text-center text-white italic text-lg leading-relaxed">"{page.quote}"</p>
                         </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-black/20 text-white border-none" />
            <CarouselNext className="right-2 bg-black/20 text-white border-none" />
        </Carousel>
    );
}

export function Album({ pages }: AlbumProps) {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;
  if (!pages || pages.length === 0) return <div className="text-center p-10">Loading photos...</div>;
  return isMobile ? <MobileAlbum pages={pages} /> : <DesktopAlbum pages={pages} />;
}