'use client';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        src="/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 blur w-full h-full object-cover z-0"/>

    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1 className="text-2xl font-bold text-white text-center">"The greatest fear is not what will happen, but what will not."</h1>
            <p className="font-bold text-white text-center mt-2">Hello, I'm Jason, come take a look</p>
    </div>
    </div>
  );
}
