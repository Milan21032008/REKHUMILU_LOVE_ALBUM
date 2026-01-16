"use client";

import type { Page } from '@/app/create/page';

const STORAGE_KEY = 'eternalPagesAlbum';

export function saveAlbum(pages: Page[]): void {
  if (typeof window !== 'undefined') {
    try {
      const data = JSON.stringify(pages);
      window.localStorage.setItem(STORAGE_KEY, data);
    } catch (error) {
      console.error("Failed to save album to localStorage:", error);
    }
  }
}

export function loadAlbum(): Page[] | null {
  if (typeof window !== 'undefined') {
    try {
      const data = window.localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to load album from localStorage:", error);
      return null;
    }
  }
  return null;
}

export function exportAlbum(pages: Page[]): void {
    if (typeof window !== 'undefined') {
        try {
            const data = {
                appName: "Eternal Pages Anniversary Album",
                version: "1.0.0",
                createdAt: new Date().toISOString(),
                album: pages,
            };
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `eternal-pages-album-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to export album:", error);
        }
    }
}
