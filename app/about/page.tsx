'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tech from '../components/skills';
import ImageCarousel from '../components/ImageCarousel';
import FunFactsCarousel from '../components/FunFactsCarousel';
import CSSWaves from '../components/CSSWaves';
import TextContentCard from '../components/TextContentCard';

export default function AboutPage() {
  // Ref for the hobbies-skills section to track scroll progress
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Transform scroll progress to vertical movement (0 to 400px as user scrolls through section)
  const funFactsY = useTransform(scrollYProgress, [0, 1], [0, 400]);
   // Carousel data
   const carouselSlides = [
     {
       title: "Thanksgiving",
       description: "check",
       image: "/adriandi.jpg",
       tooltip: "My girlfriend, Adriana, and I at my family's Thanksgiving dinner"
     },
     {
        title: "fishing",
        description: "Underwater hunting and fishing",
        image: "/bigcatch.jpg",
        tooltip: "last time i went to the bahamas, some light appetizers"
     },
     {
        title: "SJ Sharks Game",
        description: "big fan of hockey, this was my first non-panthers game with my longtime online friends from california.",
        image: "/sjsharks.jpg",
        tooltip: "big fan of hockey, this was my first non-panthers game with my longtime online friends from california."
      },
      {
        title: "on a boat",
        description: "Time on the water",
        image: "/onboat.jpg",
        tooltip: "(RTL) my cousin, moms husband, uncle, and I chilling on the water"
      },
   ];
 
   // Fun facts data
   const funFacts = [
     {
       title: "pro gamer",
       description: "i competed in professional valorant for 2 years (only 2000 hours)."
     },
     {
       title: "biggest catch?",
       description: "i have no idea actually i dont keep track.. probably a 9ft hammerhead."
     },
     {
       title: "favorite book?",
       description: "gonna have to go with The Brothers Karamazov by Dostoevsky.. alittle less basic maybe On War by Clausewitz."
     },
     {
       title: "favorite song?",
       description: "tough one.. right now probably Paint Me A Birmingham by Tracy Lawrence, or Tishomingo by Zach Bryan."
     },
     {
       title: "favorite game?",
       description: "OAT minecraft no doubt."
     },
     {
       title: "dream car?",
       description: "a lifted 1978 Chevy K-10 (OPEN MIND GUYS), not even close, next closest would have to be a porsche 918 spyder."
     },
     {
       title: "favorite quote?",
       description: "i like reading so i have a few but gonna go with 'from nothing, comes nothing' -Parmenides"
     },
     {
       title: "first language?",
       description: "PHP WOOOHOOOO!"
     }
   ];
 

 
   return (
     <CSSWaves className="relative min-h-screen">
       {/* About me */}
       <section id="about" className="relative min-h-screen py-8 md:py-20 overflow-hidden">
         <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 lg:gap-40 items-start pt-8 md:pt-40 min-h-[80vh]">
             {/* Text side */}
             <motion.div
               className="space-y-8"
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
               {/* Text Panel Container */}
               <TextContentCard>
                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#e0e1dd] mb-4 md:mb-8">
                   welcome to my portfolio
                 </h1>
                 <div className="space-y-4 md:space-y-6">
                   <p className="text-[#e0e1dd] text-base md:text-lg lg:text-xl leading-relaxed">
                     I&apos;m a software engineer with a focus on low-level programming and systems development. My work centers on understanding how software interacts with hardware and finding ways to optimize performance at the core level. I enjoy building efficient solutions that bridge the gap between machine and application, whether that&apos;s through fine-tuned system code, hardware integration, or exploring new methods to improve reliability and speed.
                   </p>
                   <p className="text-[#e0e1dd] text-base md:text-lg lg:text-xl leading-relaxed">
                     Currently, I&apos;m a third-year Computer Science student at the University of Central Florida. Beyond the classroom, I&apos;m always experimenting with projects that push my technical growth, from working with hardware components to refining my skills in system optimization. My portfolio reflects both a strong academic foundation and a curiosity-driven approach to problem solving, showcasing the work I&apos;ve done to deepen my expertise in computer science and engineering.
                   </p>
                 </div>
               </TextContentCard>
             </motion.div>
 
             {/* Visual side */}
            <motion.div
              className="relative order-2 md:pt-10 max-w-md w-full mx-auto"
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
               <ImageCarousel 
                 slides={carouselSlides}
                 showTooltips={true}
                mode="cover"
                containerHeightClass="h-120"
               />
             </motion.div>
           </div>
         </div>
       </section>
 
     {/* Hobbies & Skills combined section with animated fun facts */}
     <section id="hobbies-skills" ref={sectionRef} className="relative py-8 md:py-20">
       <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 lg:gap-40 items-start pt-8 md:pt-16">
            
            {/* Left column - Stacked text content */}
            <div className="space-y-16 md:space-y-32">
              {/* Hobbies text */}
              <motion.div
                id="hobbies"
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <TextContentCard>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#e0e1dd] mb-4 md:mb-8">
                    hobbies
                  </h1>
                  <p className="text-[#e0e1dd] text-base md:text-lg lg:text-xl leading-relaxed mb-3 md:mb-4">
                    In my free time, I enjoy many activities, spearfishing, boating, playing video games, reading, and finding technology to mess with. Video games have been around in my life since I was a kid, although some view it as a waste of time, I truly believe video games can teach you so much about life. It is important to have moderation in everything, similar to video games. But my favorite hobby by far is water activities.
                  </p>
                  <p className="text-[#e0e1dd] text-base md:text-lg lg:text-xl leading-relaxed">
                    I have been boating and spearfishing for as long as I can remember, and it has probably had the biggest impact on my life. Spending so much time on the water has taught me the value of patience, precision, and awareness qualities that I believe reflect in my character. My favorite trait, it has trained me to think quickly and be calm under pressure when things go south, which is often the case in unpredictable environments.
                  </p>
                </TextContentCard>
              </motion.div>

              {/* Skills text */}
              <motion.div
                id="skills"
                className="space-y-4 md:space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <TextContentCard>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#e0e1dd] mb-4 md:mb-8">
                    skills
                  </h1>
                  <p className="text-[#e0e1dd] text-base md:text-lg lg:text-xl leading-relaxed mb-3 md:mb-4">
                    My technical expertise spans across multiple domains, with a strong foundation in systems programming, hardware interfacing, and performance optimization. I&apos;m proficient in various programming languages and frameworks that enable me to build efficient, scalable solutions.
                  </p>
                  <p className="text-[#e0e1dd] text-base md:text-lg lg:text-xl leading-relaxed">
                    I continuously work on expanding my skill set through hands-on projects and real-world applications, ensuring I stay current with the latest technologies and best practices in software development.
                  </p>
                </TextContentCard>
              </motion.div>
            </div>

           {/* Right column - Scroll-following Fun Facts + Tech */}
           <div className="relative order-2 lg:order-none space-y-16">
             <motion.div
               className="lg:sticky lg:top-24"
               style={{ y: funFactsY }}
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
               <FunFactsCarousel 
                 facts={funFacts}
                 title="fun facts"
               />
             </motion.div>

             {/* Skills display */}
             <motion.div
               className="relative pt-80"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
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
                                 
                 {/* Content */}
                 <div className="relative z-10">
                   <Tech />
                 </div>
               </motion.div>
             </motion.div>
           </div>
          </div>
        </div>
      </section>
     </CSSWaves>
   );
 }
