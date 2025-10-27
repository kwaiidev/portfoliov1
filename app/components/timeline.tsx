'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextContentCard from './TextContentCard';

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
};

export const timelineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1
  }
};

export const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1
  }
};

interface TimelineItem {
  title: string;
  subtitle?: string;
  description: string[];
  tech?: string[];
  date?: string;
}

interface TimelineProps {
  title: string;
  items: TimelineItem[];
}

export default function Timeline({ title, items }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent flex flex-col items-center justify-start relative pt-20 pb-12">
      <motion.div 
        className="text-center max-w-4xl w-full px-4 mb-16"
        style={{ y: y1, opacity }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#e0e1dd]">
          {title}
        </h1>
      </motion.div>

      <motion.div 
        className="relative max-w-4xl w-full pl-4 pr-8 ml-8"
        style={{ y: y2 }}
      >
        {/* Timeline line */}
        <motion.div
          className="absolute left-4 top-0 bottom-0 w-1 bg-[#415a77] origin-top"
          style={{ y: y3 }}
          variants={timelineVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />

        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex items-start"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-2 w-4 h-4 bg-[#415a77] rounded-full border-4 border-[#e0e1dd] z-10"
                variants={dotVariants}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />

              {/* Content card */}
              <div className="ml-12">
                <TextContentCard
                  title={item.title}
                  subtitle={item.subtitle}
                  date={item.date}
                  tags={item.tech}
                  description={`${item.description.slice(0, 2).join('. ')}${item.description.length > 2 ? '...' : ''}`}
                  expandedDescription={item.description}
                  expandable={true}
                  className="w-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
