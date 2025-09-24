'use client';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <div className="absolute bg-black inset-0 overflow-hidden">
          <video
              src="/background.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full blur object-cover"
          />

    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none opacity-0 transition-opacity duration-1000 ease-out animate-fade-in-once">
        <h1 className="text-3xl font-bold text-white text-center">"the greatest fear is not what will happen, but what will not."</h1>
            <p className="font-bold text-white text-center mt-2">welcome to my portfolio, enjoy your stay!</p>
    </div>
    </div>
  );
}
