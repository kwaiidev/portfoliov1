'use client';

import Carousel from './Carousel';
import { FiCircle, FiCode, FiFileText, FiMusic, FiLayers, FiLayout } from 'react-icons/fi';

interface FunFact {
  title: string;
  description: string;
}

interface FunFactsCarouselProps {
  facts: FunFact[];
  className?: string;
  title?: string;
}

// Map fun fact titles to appropriate icons
const getIconForFact = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('gamer') || lowerTitle.includes('game')) {
    return <FiLayers className="carousel-icon" />;
  }
  if (lowerTitle.includes('catch') || lowerTitle.includes('fish')) {
    return <FiCircle className="carousel-icon" />;
  }
  if (lowerTitle.includes('book')) {
    return <FiFileText className="carousel-icon" />;
  }
  if (lowerTitle.includes('song') || lowerTitle.includes('music')) {
    return <FiMusic className="carousel-icon" />;
  }
  if (lowerTitle.includes('car') || lowerTitle.includes('vehicle')) {
    return <FiLayout className="carousel-icon" />;
  }
  if (lowerTitle.includes('quote')) {
    return <FiFileText className="carousel-icon" />;
  }
  if (lowerTitle.includes('language') || lowerTitle.includes('php') || lowerTitle.includes('code')) {
    return <FiCode className="carousel-icon" />;
  }
  // Default icon
  return <FiCircle className="carousel-icon" />;
};

export default function FunFactsCarousel({ facts, className = "", title = "fun facts" }: FunFactsCarouselProps) {
  // Map facts to carousel items format
  const carouselItems = facts.map((fact, index) => ({
    title: fact.title,
    description: fact.description,
    id: index + 1,
    icon: getIconForFact(fact.title)
  }));

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Carousel */}
      <div className="relative h-96 flex items-center justify-center">
        <Carousel
          items={carouselItems}
          baseWidth={400}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>
    </div>
  );
}
