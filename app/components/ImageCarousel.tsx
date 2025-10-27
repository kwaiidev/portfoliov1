'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CarouselSlide {
  title: string;
  description: string;
  image: string;
  tooltip?: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  className?: string;
  showTooltips?: boolean;
}

export default function ImageCarousel({ slides, className = "", showTooltips = true }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
        {/* Slides */}
        <div className="relative h-full overflow-hidden">
          <motion.div 
            className="flex h-full"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full h-full relative">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Tooltip */}
                {showTooltips && (
                  <div className="absolute bottom-4 right-4 group">
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <div className="absolute bottom-10 right-0 w-64 bg-black/80 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <p className="text-white text-sm">
                        {slide.tooltip || slide.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
