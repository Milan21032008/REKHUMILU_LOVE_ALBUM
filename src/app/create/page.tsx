"use client";

import { useState, useEffect } from 'react';
import { Loader2, Heart } from 'lucide-react';
import { Album } from '@/components/album';

export type Page = {
  id: string;
  imageUrl: string;
  quote: string;
};

// --- AAPKI EXACT LIST (Check kar lein) ---
const localImages: { id: string; imageUrl: string; }[] = [
    // 1. COVER PHOTO (Sabse Upar)
    { id: 'cover', imageUrl: '/images/my-love.jpg' }, 

    // 2. STORY PHOTOS (Aapka Diya Hua Sequence)
    { id: '1', imageUrl: '/images/family-sketch-heart.jpg' },
    { id: '2', imageUrl: '/images/family-with-baby-sketch.jpg' },
    { id: '3', imageUrl: '/images/mother-and-baby-sketch.jpg' },
    { id: '4', imageUrl: '/images/family-portrait-sketch.jpg' },
    { id: '5', imageUrl: '/images/family-drawing.jpg' },
    { id: '6', imageUrl: '/images/family-kiss-sketch.jpg' },
    { id: '7', imageUrl: '/images/mother-laughing-baby-sketch.jpg' },
    { id: '8', imageUrl: '/images/family-walking-sketch.jpg' },
    { id: '9', imageUrl: '/images/family-children.jpg' },
    { id: '10', imageUrl: '/images/family-in-heart-sketch.jpg' },
    { id: '11', imageUrl: '/images/family-silhouette.jpg' },
    { id: '12', imageUrl: '/images/family-holding-baby-sketch.jpg' },
];

const quotes = [
    "Our love story is written in moments like these.",
    "Every moment with you is a beautiful chapter.",
    "Together is my favorite place to be.",
    "You are my today and all of my tomorrows.",
    "A single moment can contain a lifetime of love.",
    "Loved you yesterday, love you still, always have, always will.",
    "The best things in life are better with you.",
    "Our love is the best adventure.",
    "Finding you was the start of everything.",
    "You and me, a forever kind of love.",
    "My heart is and always will be yours.",
    "Your smile is my favorite place to get lost.",
    "Every day with you is my favorite day."
];

function generateInitialAlbum(): Page[] {
    const shuffledQuotes = [...quotes].sort(() => 0.5 - Math.random());
    
    const pagesWithQuotes = localImages.map((photo, index) => {
        return {
            id: photo.id,
            imageUrl: photo.imageUrl,
            quote: shuffledQuotes[index % shuffledQuotes.length] ?? "Love you forever",
        };
    });

    return pagesWithQuotes;
}

export default function CreateAlbumPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialPages = generateInitialAlbum();
    setPages(initialPages);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
      </div>
    );
  }
  
  return (
      <div className="container mx-auto p-4 py-8 flex flex-col items-center h-full w-full fixed inset-0 md:relative">
        <div className="w-full flex justify-center items-center mb-6">
            <h1 className="font-headline text-3xl text-center text-foreground flex items-center gap-2">
              <Heart className="text-rose-600 fill-rose-600"/> Rekhu Milu Love Story
            </h1>
        </div>
        <div className="flex-1 w-full h-[calc(100%-120px)] md:h-auto">
            {/* Pages data ko Album component mein bhej rahe hain */}
            <Album pages={pages} />
        </div>
        <div className="mt-4 text-center">
            <p className="font-headline text-2xl font-bold text-rose-600 tracking-wider">I Love You Rekhu</p>
        </div>
      </div>
    );
}