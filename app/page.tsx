'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Tech from './components/skills';
import ImageCarousel from './components/ImageCarousel';
import FunFactsCarousel from './components/FunFactsCarousel';
import CSSWaves from './components/CSSWaves';
import TextContentCard from './components/TextContentCard';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-100%']);
  const curveY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  
  // Spring animations for smooth effects
  const smoothY = useSpring(backgroundY, { stiffness: 50, damping: 25, restDelta: 0.01 });
  const smoothTextY = useSpring(textY, { stiffness: 50, damping: 25, restDelta: 0.01 });
  const smoothCurveY = useSpring(curveY, { stiffness: 50, damping: 25, restDelta: 0.01 });

  // Carousel data
  const carouselSlides = [
    {
      title: "Flanigans",
      description: "check",
      image: "/adriandi.jpg",
      tooltip: "My girlfriend and I at our (my) favorite restaurant, Flanigans"
    },
    {
      title: "Problem Solving",
      description: "Creative solutions to complex challenges",
      image: "/images/problem-solving.jpg",
      tooltip: "Approaching complex challenges with creative thinking, systematic analysis, and innovative solutions that push technological boundaries."
    },
    {
      title: "Innovation",
      description: "Exploring new technologies and approaches",
      image: "/images/innovation.jpg",
      tooltip: "Exploring cutting-edge technologies, experimenting with new approaches, and building solutions that shape the future of software development."
    }
  ];

  // Fun facts data
  const funFacts = [
    {
      title: "test",
      description: "test"
    },
    {
      title: "test",
      description: "test"
    }
  ];

  // Hobbies carousel data
  const hobbiesCarouselSlides = [
    {
      title: "Spearfishing",
      description: "Underwater hunting and fishing",
      image: "/images/spearfishing.jpg",
      tooltip: "One of my favorite activities - the patience and precision required translates well to programming"
    },
    {
      title: "Boating",
      description: "Time on the water",
      image: "/images/boating.jpg",
      tooltip: "Spending time on the water teaches patience and quick thinking under pressure"
    },
    {
      title: "Gaming",
      description: "Strategic problem solving",
      image: "/images/gaming.jpg",
      tooltip: "Video games have taught me more about problem-solving than most traditional education"
    }
  ];

  return (
    <CSSWaves className="relative min-h-screen">
    <div ref={containerRef} className="relative" style={{ position: 'relative' }}>
      
      {/* Main landing area */}
      <section id="home" className="relative h-screen overflow-hidden">
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
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-[#778da9]/40" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{ y: smoothTextY }}
        >
          <motion.h1
            className="text-4xl md:text-4xl font-bold text-white text-center mb-6"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7), 0px 0px 8px rgba(255,255,255,0.3)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            &ldquo;the greatest fear is not what will happen, but what will not.&rdquo;
          </motion.h1>
          <motion.p
            className="font-bold text-white text-center text-lg md:text-xl"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7), 0px 0px 8px rgba(255,255,255,0.3)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            hello, i&apos;m jason.
          </motion.p>
          
          {/* Scroll down hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
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
              fill="#778da9"
            ></path>
          </svg>
        </motion.div>
      </section>

      {/* About me */}
      <section id="about" className="relative min-h-screen py-20 overflow-hidden">
        <div className="max-w-8xl mx-auto px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start pt-16 min-h-[80vh]">
            {/* Text side */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Text Panel Container */}
              <TextContentCard>
                <h1 className="text-4xl md:text-5xl font-bold text-[#e0e1dd] mb-8">
                  welcome to my portfolio
                </h1>
                <div className="space-y-6">
                  <p className="text-[#e0e1dd] text-lg md:text-xl leading-relaxed">
                    I&apos;m a software engineer with a focus on low-level programming and systems development. My work centers on understanding how software interacts with hardware and finding ways to optimize performance at the core level. I enjoy building efficient solutions that bridge the gap between machine and application, whether that&apos;s through fine-tuned system code, hardware integration, or exploring new methods to improve reliability and speed.
                  </p>
                  <p className="text-[#e0e1dd] text-lg md:text-xl leading-relaxed">
                    Currently, I&apos;m a third-year Computer Science student at the University of Central Florida. Beyond the classroom, I&apos;m always experimenting with projects that push my technical growth, from working with hardware components to refining my skills in system optimization. My portfolio reflects both a strong academic foundation and a curiosity-driven approach to problem solving, showcasing the work I&apos;ve done to deepen my expertise in computer science and engineering.
                  </p>
                </div>
              </TextContentCard>
            </motion.div>

            {/* Visual side */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ImageCarousel 
                slides={carouselSlides}
                showTooltips={true}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I do for fun */}
      <section id="hobbies" className="relative min-h-screen py-20">
        <div className="max-w-8xl mx-auto px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start pt-16 min-h-[80vh]">
            {/* Text side */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TextContentCard>
                <h1 className="text-4xl md:text-5xl font-bold text-[#e0e1dd] mb-8">
                  hobbies
                </h1>
                <p className="text-[#e0e1dd] text-lg md:text-xl leading-relaxed mb-4">
                  In my free time, I enjoy many activities, spearfishing, boating, playing video games, reading, and finding technology to mess with. Video games have been around in my life since I was a kid, although some view it as a waste of time, I truly believe video games can teach you so much about life. It is important to have moderation in everything, similar to video games. But my favorite hobby by far is water activities.
                </p>
                <p className="text-[#e0e1dd] text-lg md:text-xl leading-relaxed">
                  I have been boating and spearfishing for as long as I can remember, and it has probably had the biggest impact on my life. Spending so much time on the water has taught me the value of patience, precision, and awareness qualities that I believe reflect in my character. My favorite trait, it has trained me to think quickly and be calm under pressure when things go south, which is often the case in unpredictable environments.
                </p>
              </TextContentCard>
            </motion.div>

            {/* Right column - Image carousel and fun facts */}
            <motion.div
              className="relative space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Hobbies images carousel */}
              <div>
                <ImageCarousel 
                  slides={hobbiesCarouselSlides}
                  showTooltips={true}
                />
              </div>

              {/* Fun facts */}
              <FunFactsCarousel 
                facts={funFacts}
                title="fun facts"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I know */}
      <section id="skills" className="relative min-h-screen py-20">
        <div className="max-w-8xl mx-auto px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start pt-16 min-h-[80vh]">
            {/* Text side */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TextContentCard>
                <h1 className="text-4xl md:text-5xl font-bold text-[#e0e1dd] mb-8">
                  skills
                </h1>
                <p className="text-[#e0e1dd] text-lg md:text-xl leading-relaxed mb-4">
                  My technical expertise spans across multiple domains, with a strong foundation in systems programming, hardware interfacing, and performance optimization. I&apos;m proficient in various programming languages and frameworks that enable me to build efficient, scalable solutions.
                </p>
                <p className="text-[#e0e1dd] text-lg md:text-xl leading-relaxed">
                  I continuously work on expanding my skill set through hands-on projects and real-world applications, ensuring I stay current with the latest technologies and best practices in software development.
                </p>
              </TextContentCard>
            </motion.div>

            {/* Skills display */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="relative bg-[#0d1b2a]/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-[#415a77]/30 group overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(13, 27, 42, 0.8), 0 0 30px rgba(119, 141, 169, 0.3)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1b263b]/20 to-[#0d1b2a]/40 rounded-2xl"></div>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#778da9]/20 via-[#415a77]/30 to-[#778da9]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <Tech />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
    </CSSWaves>
  );
}