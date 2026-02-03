'use client';
import { motion } from 'framer-motion';
import CSSWaves from './components/CSSWaves';

export default function Home() {
  return (
    <CSSWaves className="relative min-h-screen">
    <div className="relative" style={{ position: 'relative' }}>
      
      {/* Main landing area */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
              src="/background.mp4"
              autoPlay
              loop
              muted
              playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#778da9]/40" />
        </div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl px-4 font-bold text-white text-center mb-6"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7), 0px 0px 8px rgba(255,255,255,0.3)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            &ldquo;the greatest fear is not what will happen, but what will not.&rdquo;
          </motion.h1>
          <motion.p
            className="font-bold text-white text-center text-base md:text-lg lg:text-xl px-4"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7), 0px 0px 8px rgba(255,255,255,0.3)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            hello, i&apos;m jason.
          </motion.p>
          
          {/* Scroll down hint */}

        </motion.div>
        
      </section>

    </div>
    </CSSWaves>
  );
}