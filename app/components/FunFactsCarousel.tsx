'use client';

import { useState } from 'react';

interface FunFact {
  title: string;
  description: string;
}

interface FunFactsCarouselProps {
  facts: FunFact[];
  className?: string;
  title?: string;
}

export default function FunFactsCarousel({ facts, className = "", title = "fun facts" }: FunFactsCarouselProps) {
  const [currentFact, setCurrentFact] = useState(0);

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFact((prev) => (prev - 1 + facts.length) % facts.length);
  };

  const goToFact = (index: number) => {
    setCurrentFact(index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#1e3b24] mb-4">{title}</h2>
      
      {/* Fun facts panel */}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 h-48 flex items-center justify-center">
        {/* Current fact display */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 text-[#1e3b24]">
            {facts[currentFact].title}
          </h3>
          <p className="text-sm text-[#1e3b24]">
            {facts[currentFact].description}
          </p>
        </div>
      </div>
      
      {/* Navigation controls - outside the panel */}
      <div className="flex items-center justify-center space-x-4">
        {/* Previous button */}
        <button 
          onClick={prevFact}
          className="p-2 scale-110 hover:scale-125 transition-transform"
        >
          <svg className="w-4 h-4 text-[#1e3b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Dots */}
        <div className="flex items-center space-x-2">
          {facts.map((_, index) => (
            <button 
              key={index}
              onClick={() => goToFact(index)}
              className={`rounded-full transition-all ${
                currentFact === index ? 'w-3 h-3 bg-[#1e3b24]' : 'w-2 h-2 bg-[#1e3b24]/40'
              }`}
            />
          ))}
        </div>
        
        {/* Next button */}
        <button 
          onClick={nextFact}
          className="p-2 scale-110 hover:scale-125 transition-transform"
        >
          <svg className="w-4 h-4 text-[#1e3b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
