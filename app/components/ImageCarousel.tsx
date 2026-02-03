'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CarouselSlide {
  title: string;
  description: string;
  image: string;
  tooltip?: string;
  objectPosition?: string; // e.g., 'center top', '50% 20%'
}

type FitMode = 'cover' | 'contain' | 'smart';

interface ImageCarouselProps {
  slides: CarouselSlide[];
  className?: string;
  showTooltips?: boolean;
  mode?: FitMode; // image fit strategy
  containerHeightClass?: string; // fixed height class (e.g., 'h-96')
}

export default function ImageCarousel({ slides, className = "", showTooltips = true, mode = 'contain', containerHeightClass = 'h-96' }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [naturalSizes, setNaturalSizes] = useState<Array<{ w: number; h: number } | undefined>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const getImageBox = (index: number) => {
    const nat = naturalSizes[index];
    const cw = containerSize.w;
    const ch = containerSize.h;
    if (!nat || cw === 0 || ch === 0) {
      return { x: 0, y: 0, w: cw, h: ch };
    }
    if (mode === 'cover') {
      return { x: 0, y: 0, w: cw, h: ch };
    }
    const iw = nat.w;
    const ih = nat.h;
    const containerRatio = cw / ch;
    const imageRatio = iw / ih;
    let renderedW: number;
    let renderedH: number;
    if (imageRatio > containerRatio) {
      renderedW = cw;
      renderedH = cw / imageRatio;
    } else {
      renderedH = ch;
      renderedW = ch * imageRatio;
    }
    const x = (cw - renderedW) / 2;
    const y = (ch - renderedH) / 2;
    return { x, y, w: renderedW, h: renderedH };
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Carousel container */}
      <div
        ref={containerRef}
        className={`relative ${containerHeightClass} rounded-xl overflow-hidden bg-[#0d1b2a]/40 border border-[#415a77]/30`}
      >
        {/* Slides */}
        <div className="relative h-full overflow-hidden">
          <motion.div 
            className="flex h-full"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {slides.map((slide, index) => {
              const box = getImageBox(index);
              const btnSize = 32; // 8 * 4px
              const margin = 12;
              const btnLeft = Math.max(0, box.x + box.w - btnSize - margin);
              const btnTop = Math.max(0, box.y + box.h - btnSize - margin);
              return (
                <div key={index} className="min-w-full h-full relative">
                  <div className={`absolute inset-0 ${mode !== 'cover' ? 'flex items-center justify-center' : ''} rounded-xl overflow-hidden`}>
                    <Image 
                      src={slide.image} 
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
                      priority={index === 0}
                      className={`${mode === 'cover' ? 'object-cover' : 'object-contain'} rounded-xl`}
                      style={slide.objectPosition ? { objectPosition: slide.objectPosition } : undefined}
                      onLoadingComplete={(img: { naturalWidth: number; naturalHeight: number }) => {
                        const w = img.naturalWidth ?? 0;
                        const h = img.naturalHeight ?? 0;
                        if (w && h) {
                          setNaturalSizes(prev => {
                            const next = prev.slice();
                            next[index] = { w, h };
                            return next;
                          });
                        }
                      }}
                    />
                  </div>
                  {showTooltips && (
                    <div className="absolute group" style={{ left: btnLeft, top: btnTop }}>
                      <button className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div className="absolute bottom-10 right-0 w-64 bg-black/80 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <p className="text-white text-sm">
                          {slide.tooltip || slide.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="flex items-center justify-center space-x-4">
        {/* Previous button */}
        <button 
          onClick={prevSlide}
          className="p-2 scale-110 hover:scale-125 transition-transform"
        >
          <svg className="w-6 h-6 text-[#e0e1dd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Dots */}
        <div className="flex items-center space-x-2">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                currentSlide === index ? 'w-4 h-4 bg-[#F0EBD8]' : 'w-3 h-3 bg-[#F0EBD8]/40'
              }`}
            />
          ))}
        </div>
        
        {/* Next button */}
        <button 
          onClick={nextSlide}
          className="p-2 scale-110 hover:scale-125 transition-transform"
        >
          <svg className="w-6 h-6 text-[#e0e1dd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
