'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

interface TextContentCardProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  date?: string;
  tags?: string[];
  description?: string | string[];
  expandedDescription?: string | string[] | ReactNode;
  className?: string;
  expandable?: boolean;
  award?: string;
}

export default function TextContentCard({ 
  children, 
  title,
  subtitle,
  date,
  tags,
  description,
  expandedDescription,
  className = "",
  expandable = false,
  award
}: TextContentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const CardWrapper = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => {
    return (
      <motion.div 
        className={`bg-[#0d1b2a]/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-[#415a77]/30 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col relative ${onClick ? 'cursor-pointer' : ''} ${className}`}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(27, 38, 59, 0.4), 0 10px 10px -5px rgba(65, 90, 119, 0.3), 0 0 20px rgba(119, 141, 169, 0.2)"
        }}
        onClick={onClick}
      >
        {award && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-yellow-300 whitespace-nowrap">
               {award}
            </div>
          </div>
        )}
        {children}
      </motion.div>
    );
  };

  // If props provided, use structured layout
  if (title || description || tags) {
    return (
      <>
        <CardWrapper onClick={expandable ? () => setIsExpanded(true) : undefined}>
          <div className="flex flex-col h-full">
            {title && (
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl font-bold text-[#e0e1dd]">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-[#e0e1dd]/70 text-sm font-medium mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                {date && (
                  <span className="text-[#e0e1dd]/70 text-sm font-medium">
                    {date}
                  </span>
                )}
              </div>
            )}
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#0d1b2a]/10 text-[#e0e1dd] text-xs rounded-full border border-[#415a77]/20">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {description && (
              <div className="space-y-2 flex-grow text-sm">
                {Array.isArray(description) ? (
                  description.map((desc, index) => (
                  <p key={index} className="text-[#e0e1dd] text-sm leading-relaxed line-clamp-3">
                    {desc}
                  </p>
                ))
              ) : (
                <p className="text-[#e0e1dd] text-sm leading-relaxed line-clamp-4">
                  {description}
                </p>
              )}
            </div>
          )}
          </div>
        </CardWrapper>

        {/* Modal overlay (like timeline) */}
        {isExpanded && expandable && typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(false)}
              >
                <motion.div
                  className="bg-[#0d1b2a] rounded-xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-[#415a77]/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-[#e0e1dd] mb-2">
                        {title}
                      </h2>
                      {subtitle && (
                        <p className="text-xl text-[#e0e1dd]/80">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-[#e0e1dd]/60 hover:text-[#e0e1dd] text-3xl font-bold transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  
                  {date && (
                    <div className="mb-6">
                      <span className="bg-[#415a77]/10 text-[#e0e1dd] px-4 py-2 rounded-full text-sm font-medium">
                        {date}
                      </span>
                    </div>
                  )}
                  
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag, index) => (
                        <span key={index} className="px-4 py-2 bg-[#415a77]/10 text-[#e0e1dd] text-sm rounded-full border border-[#415a77]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {expandedDescription && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#e0e1dd] mb-3">Description</h3>
                      {typeof expandedDescription === 'object' && !Array.isArray(expandedDescription) ? (
                        // ReactNode case
                        <div className="bg-[#415a77]/5 rounded-lg p-4 border-l-4 border-[#415a77]/30">
                          <div className="text-[#e0e1dd] leading-relaxed space-y-4">
                            {expandedDescription}
                          </div>
                        </div>
                      ) : Array.isArray(expandedDescription) ? (
                        expandedDescription.map((desc, index) => (
                          <motion.div
                            key={index}
                            className="bg-[#415a77]/5 rounded-lg p-4 border-l-4 border-[#415a77]/30"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <p className="text-[#e0e1dd] leading-relaxed">
                              {desc}
                            </p>
                          </motion.div>
                        ))
                      ) : (
                        <div className="bg-[#415a77]/5 rounded-lg p-4 border-l-4 border-[#415a77]/30">
                          <div className="text-[#e0e1dd] leading-relaxed space-y-4">
                            {typeof expandedDescription === 'string' && expandedDescription.split('\n\n').map((paragraph: string, paraIndex: number) => {
                              // Clean the paragraph
                              const cleaned = paragraph.trim();
                              if (!cleaned) return null;
                              
                              // Check if this is a standalone bold line
                              if (cleaned.match(/^\s*\*\*[\s\S]+\*\*\s*$/)) {
                                // It's a bold line, extract the text
                                const match = cleaned.match(/\*\*([\s\S]+?)\*\*/);
                                if (match) {
                                  return (
                                    <h3 key={paraIndex} className="font-bold text-xl text-[#e0e1dd]">
                                      {match[1].trim()}
                                    </h3>
                                  );
                                }
                              }
                              
                              // Regular paragraph
                              return (
                                <p key={paraIndex} className="mb-4">
                                  {cleaned}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </>
    );
  }

  // Otherwise, render children normally
  return <CardWrapper>{children}</CardWrapper>;
}

