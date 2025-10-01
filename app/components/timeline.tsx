'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useState, useRef } from 'react';

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
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const toggleExpanded = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Create transforms for each item
  const itemTransforms = items.map((_, index) => 
    useTransform(scrollYProgress, [0, 1], [0, -50 - (index * 20)])
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent flex flex-col items-center justify-start relative pt-20 pb-12">
      <motion.div 
        className="text-center max-w-4xl w-full px-4 mb-16"
        style={{ y: y1, opacity }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e3b24]">
          {title}
        </h1>
      </motion.div>

      <motion.div 
        className="relative max-w-4xl w-full pl-4 pr-8 ml-8"
        style={{ y: y2 }}
      >
        {/* Timeline line */}
        <motion.div
          className="absolute left-4 top-0 bottom-0 w-1 bg-[#1e3b24] origin-top"
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
              style={{ y: itemTransforms[index] }}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-2 w-4 h-4 bg-[#1e3b24] rounded-full border-4 border-[#ede8d0] z-10"
                variants={dotVariants}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />

              {/* Content card */}
              <motion.div
                className="ml-12 bg-[#1e3b24]/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#1e3b24]/30 hover:shadow-xl transition-shadow duration-300 w-full h-64 flex flex-col cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(30, 59, 36, 0.2), 0 10px 10px -5px rgba(30, 59, 36, 0.1)"
                }}
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-[#1e3b24] text-2xl font-bold">
                    {item.title}
                  </h2>
                  {item.date && (
                    <span className="text-[#1e3b24]/70 text-sm font-medium">
                      {item.date}
                    </span>
                  )}
                </div>
                
                {item.subtitle && (
                  <p className="text-black italic text-sm mb-4 text-[#1e3b24]/80">
                    {item.subtitle}
                  </p>
                )}
                
                {/* Tech stack tags */}
                {item.tech && (
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (techIndex * 0.1) }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "#1e3b24",
                          color: "#ede8d0"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Preview of description */}
                <div className="space-y-2 flex-1 overflow-hidden">
                  {item.description.slice(0, 2).map((desc, descIndex) => (
                    <motion.p
                      key={descIndex}
                      className="text-black text-md leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (descIndex * 0.1) }}
                    >
                      - {desc}
                    </motion.p>
                  ))}
                  {item.description.length > 2 && (
                    <motion.p
                      className="text-[#1e3b24]/60 text-sm italic mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Click to read more...
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Expanded view modal */}
      <AnimatePresence>
        {expandedItem !== null && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedItem(null)}
          >
            <motion.div
              className="bg-[#ede8d0] rounded-xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-[#1e3b24]/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#1e3b24] mb-2">
                    {items[expandedItem!].title}
                  </h2>
                  {items[expandedItem!].subtitle && (
                    <p className="text-xl text-black italic text-[#1e3b24]/80">
                      {items[expandedItem!].subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setExpandedItem(null)}
                  className="text-[#1e3b24]/60 hover:text-[#1e3b24] text-2xl font-bold transition-colors"
                >
                  ×
                </button>
              </div>

              {items[expandedItem!].date && (
                <div className="mb-6">
                  <span className="bg-[#1e3b24]/10 text-[#1e3b24] px-4 py-2 rounded-full text-sm font-medium">
                    {items[expandedItem!].date}
                  </span>
                </div>
              )}

              {items[expandedItem!].tech && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {items[expandedItem!].tech!.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="px-4 py-2 bg-[#1e3b24]/10 text-[#1e3b24] text-sm rounded-full border border-[#1e3b24]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#1e3b24] mb-3">Description</h3>
                {items[expandedItem!].description.map((desc: string, descIndex: number) => (
                  <motion.div
                    key={descIndex}
                    className="bg-[#1e3b24]/5 rounded-lg p-4 border-l-4 border-[#1e3b24]/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: descIndex * 0.1 }}
                  >
                    <p className="text-black leading-relaxed">
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
