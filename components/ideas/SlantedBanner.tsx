'use client';

import { useEffect, useState } from "react";

export default function SlantedBanner() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          backgroundImage: `url('/banner.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${offset}px`,
          backgroundBlendMode: 'darken',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
          transition: 'background-position 0.1s linear',
        }}
      />
      <div
        className="relative z-10 flex items-center justify-center h-full flex-col"
        style={{
          transform: `translateY(${offset * 0.3}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        <h1 className="text-5xl font-bold text-white text-center">Ideas</h1>
        <p className="text-xl mt-2 text-white text-center">Where all our great things begin</p>
      </div>
    </div>
  );
}
