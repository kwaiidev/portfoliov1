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
  expandedDescription?: string | string[];
  className?: string;
  expandable?: boolean;
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
  expandable = false
}: TextContentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const CardWrapper = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => {
    return (
      <motion.div 
        className={`bg-[#0d1b2a]/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-[#415a77]/30 hover:shadow-xl transition-shadow duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(27, 38, 59, 0.4), 0 10px 10px -5px rgba(65, 90, 119, 0.3), 0 0 20px rgba(119, 141, 169, 0.2)"
        }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  };

  // If props provided, use structured layout
  if (title || description || tags) {
    return (
      <>
        <CardWrapper onClick={expandable ? () => setIsExpanded(true) : undefined}>
          {title && (
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#e0e1dd]">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-[#e0e1dd]/70 text-lg font-medium mt-1">
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
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-[#0d1b2a]/10 text-[#e0e1dd] text-xs rounded-full border border-[#415a77]/20">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {description && (
            <div className="space-y-4">
              {Array.isArray(description) ? (
                description.map((desc, index) => (
                  <p key={index} className="text-[#e0e1dd] text-md leading-relaxed">
                    {desc}
                  </p>
                ))
              ) : (
                <p className="text-[#e0e1dd] text-md leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          )}
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
                      {Array.isArray(expandedDescription) ? (
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
                          <p className="text-[#e0e1dd] leading-relaxed">
                            {expandedDescription}
                          </p>
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

