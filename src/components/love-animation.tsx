"use client";

import { useEffect, useState, ReactNode } from 'react';

export function LoveAnimation() {
  // Line 6 fix: JSX.Element[] ki jagah ReactNode[] use karein
  const [hearts, setHearts] = useState<ReactNode[]>([]);

  useEffect(() => {
    const createHearts = () => {
      const newHearts = Array.from({ length: 15 }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 15}s`,
          animationDelay: `${Math.random() * 10}s`,
          // transform yahan initial state ke liye hai
          transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(45deg)`,
        } as React.CSSProperties; // Type safety ke liye

        return <div key={i} className="heart" style={style}></div>;
      });
      setHearts(newHearts);
    };

    createHearts();
  }, []);

  return <div className="hearts-container">{hearts}</div>;
}