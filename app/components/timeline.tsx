'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

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
  return (
    <div className="min-h-screen bg-[#ede8d0] flex flex-col items-center justify-start relative pt-20 pb-12">
      <motion.div 
        className="text-center max-w-4xl w-full px-4 mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e3b24]">
          {title}
        </h1>
      </motion.div>

      <div className="relative max-w-4xl w-full px-4">
        {/* Timeline line */}
        <motion.div
          className="absolute left-8 top-0 bottom-0 w-1 bg-[#1e3b24] origin-top"
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
                className="absolute left-6 w-4 h-4 bg-[#1e3b24] rounded-full border-4 border-[#ede8d0] z-10"
                variants={dotVariants}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />

              {/* Content card */}
              <motion.div
                className="ml-16 bg-[#1e3b24]/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#1e3b24]/30 hover:shadow-xl transition-shadow duration-300 w-full h-64 flex flex-col"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(30, 59, 36, 0.2), 0 10px 10px -5px rgba(30, 59, 36, 0.1)"
                }}
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

                <div className="space-y-2 flex-1 overflow-hidden">
                  {item.description.map((desc, descIndex) => (
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
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
