
'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LockScreen } from '@/components/lock-screen';
import { LoveAnimation } from '@/components/love-animation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLocked, setIsLocked] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem('isUnlocked') === 'true') {
      setIsLocked(false);
    }
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem('isUnlocked', 'true');
    setIsLocked(false);
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <title>Rekhu Milu Love Story</title>
        <meta name="description" content="A beautiful digital anniversary album with romantic quotes and page-turning effects." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased h-full bg-background')}>
        {isClient && <LoveAnimation />}
        {isClient ? (
          isLocked ? (
            <LockScreen onUnlock={handleUnlock} />
          ) : (
            <>
              <main>{children}</main>
              <Toaster />
            </>
          )
        ) : null}
      </body>
    </html>
  );
}
