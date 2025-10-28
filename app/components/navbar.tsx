"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show navbar when scrolling up or at the top
            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true);
            } 
            // Hide navbar when scrolling down (but not at the very top)
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }
            
            setLastScrollY(currentScrollY);

            // Only update active section if we're on the home page
            if (pathname === '/') {
                const sections = ['home', 'about'];
                const sectionElements = sections.map(section => 
                    document.getElementById(section)
                ).filter(Boolean);

                let current = '';
                sectionElements.forEach(section => {
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                            current = section.id;
                        }
                    }
                });

                if (current) {
                    setActiveSection(current);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, pathname]);

    const getActiveSection = () => {
        if (pathname === '/') {
            return activeSection;
        } else if (pathname === '/experience') {
            return 'career';
        } else if (pathname === '/projects') {
            return 'projects';
        } else if (pathname === '/blog') {
            return 'blog';
        }
        return 'home';
    };

    const navItems = [
        { id: 'home', label: 'Home', href: '/' },
        { id: 'about', label: 'About', href: '/#about' },
        { id: 'career', label: 'Experience', href: '/experience' },
        { id: 'projects', label: 'Projects', href: '/projects' },
        { id: 'blog', label: 'Blog', href: '/blog' }
    ];

    return (
        <>
            <motion.nav 
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                } text-white bg-gradient-to-b from-black/20 to-transparent`}
            >
                <div className="max-w-screen-xl mx-auto flex justify-between items-center p-3 md:p-4">
                    <Link href="/" className="z-20">
                        <motion.div 
                            className="text-xl md:text-2xl font-bold cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            Jason Sacerio
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        {navItems.map((item) => {
                            const isActive = getActiveSection() === item.id;
                            return (
                                <Link key={item.id} href={item.href}>
                                    <motion.div
                                        className={`relative pb-1 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                                            isActive 
                                                ? 'text-white' 
                                                : 'text-white/70 hover:text-white'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                                layoutId="activeIndicator"
                                                style={{ position: 'absolute', bottom: 0 }}
                                            />
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Social Links - Always Visible */}
                    <div className="flex items-center gap-3 md:gap-4 z-20">
                        <a
                            href="https://github.com/kwaiidev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                            aria-label="View GitHub Profile"
                        >
                            <svg
                                className="h-5 w-5 md:h-6 md:w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sacerio417/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                            aria-label="View LinkedIn Profile"
                        >
                            <svg
                                className="h-5 w-5 md:h-6 md:w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                            aria-label="View Resume"
                        >
                            <img 
                                src="/resume.svg" 
                                alt="Resume" 
                                className="h-5 w-5 md:h-6 md:w-6"
                            />
                        </a>
                        
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-8 h-8"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-[#0d1b2a]/95 backdrop-blur-lg border-b border-[#415a77]/30 md:hidden"
                    >
                        <div className="flex flex-col px-4 py-6 space-y-4">
                            {navItems.map((item) => {
                                const isActive = getActiveSection() === item.id;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <motion.div
                                            className={`relative py-2 text-base font-medium transition-colors inline-block ${
                                                isActive
                                                    ? 'text-white'
                                                    : 'text-white/70'
                                            }`}
                                            whileHover={{ x: 5 }}
                                        >
                                            {item.label}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute bottom-1 left-0 w-full h-0.5 bg-white"
                                                    layoutId="mobileActiveIndicator"
                                                    style={{ position: 'absolute', bottom: '0.25rem' }}
                                                />
                                            )}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
