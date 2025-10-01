'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Tech from './components/skills';
import Timeline from './components/timeline';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-100%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const curveY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  
  // Spring animations for smooth effects
  const smoothY = useSpring(backgroundY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothCurveY = useSpring(curveY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Carousel data
  const carouselSlides = [
    {
      title: "Systems Programming",
      description: "Low-level optimization and hardware interfacing",
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    },
    {
      title: "Problem Solving",
      description: "Creative solutions to complex challenges",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    },
    {
      title: "Innovation",
      description: "Exploring new technologies and approaches",
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    }
  ];

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Main landing area */}
      <section id="home" className="relative h-screen bg-black overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: smoothY }}
        >
          <video
              src="/background.mp4"
              autoPlay
              loop
              muted
              playsInline
            className="w-full h-[120%] object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{ y: smoothTextY, opacity: textOpacity }}
        >
          <motion.h1
            className="text-4xl md:text-4xl font-bold text-white text-center mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "the greatest fear is not what will happen, but what will not."
          </motion.h1>
          <motion.p
            className="font-bold text-white text-center text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            hello, i'm jason.
          </motion.p>
          
          {/* Scroll down hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
        
        
        <motion.div 
          className="absolute bottom-0 left-0 w-full overflow-hidden"
          style={{ 
            y: smoothCurveY
          }}
        >
          <svg
            className="relative block w-full h-20 transform scale-y-[-1]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 20 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="#ede8d0"
            ></path>
          </svg>
        </motion.div>
      </section>

      {/* About me */}
      <section id="about" className="relative min-h-screen bg-gradient-to-b from-[#ede8d0] via-[#f2ede0] to-[#f5f0e8] py-20">
        <div className="max-w-8xl mx-auto px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start pt-16 min-h-[80vh]">
            {/* Text side */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#1e3b24] mb-3">
                welcome to my portfolio
              </h1>
              <p className="text-black text-lg md:text-xl leading-relaxed">
              I’m a software engineer with a focus on low-level programming and systems development. My work centers on understanding how software interacts with hardware and finding ways to optimize performance at the core level. I enjoy building efficient solutions that bridge the gap between machine and application, whether that’s through fine-tuned system code, hardware integration, or exploring new methods to improve reliability and speed.
              </p>
              <p className="text-black text-lg md:text-xl leading-relaxed">
                Currently, I’m a third-year Computer Science student at the University of Central Florida. Beyond the classroom, I’m always experimenting with projects that push my technical growth, from working with hardware components to refining my skills in system optimization. My portfolio reflects both a strong academic foundation and a curiosity-driven approach to problem solving, showcasing the work I’ve done to deepen my expertise in computer science and engineering.
              </p>
            </motion.div>


            {/* Visual side */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
                {/* Slides */}
                <div className="relative h-full overflow-hidden">
                  <motion.div 
                    className="flex h-full"
                    animate={{ x: `-${currentSlide * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {carouselSlides.map((slide, index) => (
                      <div key={index} className="min-w-full h-full bg-gradient-to-br from-[#1e3b24] to-[#606C38] flex items-center justify-center">
                        <div className="text-center text-white p-8">
                          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                              <path d={slide.icon}/>
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
                          <p className="text-sm opacity-80">{slide.description}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
                
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselSlides.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-white' : 'bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I do for fun */}
      <section id="hobbies" className="relative min-h-screen bg-gradient-to-b from-[#f5f0e8] via-[#f0e8d4] to-[#ede8d0] py-20">
        <div className="max-w-8xl mx-auto px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start pt-16 min-h-[80vh]">
            {/* Text side */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#1e3b24] mb-8">
                hobbies
              </h1>
              <p className="text-black text-lg md:text-xl leading-relaxed">
                In my free time, I enjoy spearfishing, experimenting with random components I find, and playing video games. My technical focus spans systems programming, hardware interfacing, and performance optimization.
              </p>
              <p className="text-black text-lg md:text-xl leading-relaxed">
                When I'm not coding or studying, you'll find me exploring the underwater world through spearfishing, where I've learned to appreciate the precision and patience required for both technical problem-solving and marine life observation.
              </p>
            </motion.div>

            {/* Coming soon */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                <p className="text-[#1e3b24] text-lg">Future hobbies content</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I know */}
      <section id="skills" className="relative min-h-screen bg-gradient-to-b from-[#ede8d0] via-[#f2ede0] to-[#f5f0e8] py-20">
        <div className="max-w-8xl mx-auto px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start pt-16 min-h-[80vh]">
            {/* Text side */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#1e3b24] mb-8">
                skills
              </h1>
              <p className="text-black text-lg md:text-xl leading-relaxed">
                My technical expertise spans across multiple domains, with a strong foundation in systems programming, hardware interfacing, and performance optimization. I'm proficient in various programming languages and frameworks that enable me to build efficient, scalable solutions.
              </p>
              <p className="text-black text-lg md:text-xl leading-relaxed">
                I continuously work on expanding my skill set through hands-on projects and real-world applications, ensuring I stay current with the latest technologies and best practices in software development.
              </p>
            </motion.div>

            {/* Skills display */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl p-8">
                <Tech />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <footer className="bg-[#283618]/80 text-[#FEFAE0] py-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Who I am */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#DDA15E]">Jason Sacerio</h3>
              <p className="text-[#FEFAE0]/80">
                Software Engineer specializing in low-level programming and systems development.
              </p>
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#DDA15E]">Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-[#FEFAE0]/80 hover:text-[#DDA15E] transition-colors">Home</a>
                <a href="#about" className="block text-[#FEFAE0]/80 hover:text-[#DDA15E] transition-colors">About</a>
                <a href="#hobbies" className="block text-[#FEFAE0]/80 hover:text-[#DDA15E] transition-colors">Hobbies</a>
                <a href="#skills" className="block text-[#FEFAE0]/80 hover:text-[#DDA15E] transition-colors">Skills</a>
              </div>
            </div>

            {/* Social stuff */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#DDA15E]">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/kwaiidev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FEFAE0]/80 hover:text-[#DDA15E] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/sacerio417/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FEFAE0]/80 hover:text-[#DDA15E] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FEFAE0]/80 hover:text-[#DDA15E] transition-colors"
                  aria-label="Resume"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#FEFAE0]/20 mt-8 pt-8 text-center">
            <p className="text-[#FEFAE0]/60">
              © 2024 Jason Sacerio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
