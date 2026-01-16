
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect immediately to the create page, the layout will handle the lock screen.
    router.replace('/create');
  }, [router]);

  return null; // No need to render anything here, the redirect is handled.
}
