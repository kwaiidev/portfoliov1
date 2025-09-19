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
       className="absolute inset-0 blur w-full h-full object-cover z-0"  // z-0 here
     />
   </div>
   );
}
