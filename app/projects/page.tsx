'use client';
import { motion } from 'framer-motion';
import CSSWaves from '../components/CSSWaves';
import TextContentCard from '../components/TextContentCard';

export default function Projects() {
  const projects = [
    {
      title: "ZPM-TUNA",
      tech: ["ros2", "opencv", "python", "arduino", "gazebo"],
      description: "created autonomous drones that can navigate through a maze and find exits while learning off of eachother",
      expandedDescription: [
        "ROS2 based autonomous drones that can navigate through burning buildings to find exits while learning.",
        "Used flutter to create a mobile app that allows users to escape fires with said paths."
      ],
      award: "Pheratech 1st KHVIII 2025"
    },
    {
      title: "face2learn",
      tech: ["python", "opencv", "face-recognition", "dlib", "tkinter"],
      description: "Developed a facial recognition system using OpenCV and Dlib to track face movements and gestures in real-time.",
      expandedDescription: [
        "Developed a facial recognition system using OpenCV and Dlib to track face movements and gestures in real-time, enabling users to interact with virtual objects and control them using facial expressions.",
        "Implemented a real-time face tracking algorithm that continuously analyzes video input, identifying and tracking faces in real-time, allowing for smooth and accurate interaction with virtual environments."
      ]
    },
    {
      title: "Portfolio",
      tech: ["typescript", "next.js", "react", "tailwind", "framer", "HTML/CSS"],
      description: "Developed a portfolio website that we are looking at right now",
      expandedDescription: [
        "Just my portfolio :P"
      ]
    },
    {
      title: "essayAmplifier",
      tech: ["python", "django", "bootstrap", "aws", "sqlite", "docker", "git"],
      description: "Django-based web platform integrated with the OpenAI API, enabling users to enhance essays through dynamically generated NLP prompts.",
      expandedDescription: [
        "Django-based web platform integrated with the OpenAI API, enabling users to enhance essays through dynamically generated NLP prompts tailored for grammar, style, and clarity improvements.",
        "Implemented a MongoDB-backed data pipeline for storing user submissions, prompt-response mappings, and usage analytics, optimizing query performance and ensuring scalable handling of high-volume API interactions."
      ]
    },
    {
      title: "swaghack",
      tech: ["c++", "java", "ida pro"],
      description: "Engineered a proof-of-concept kernel-mode driver to simulate undetected memory modifications in anti-cheat systems.",
      expandedDescription: [
        "Engineered a proof-of-concept kernel-mode driver to simulate undetected memory modifications in the Lunar Client Anticheat on Minecraft, reproducing techniques real cheats use to evade anti-cheat detection and stress-test server security controls.",
        "Conducted controlled testing in a private environment, identifying weaknesses in detection logic and recommending enhanced telemetry and validation mechanisms to strengthen overall anti-cheat effectiveness."
      ]
    }
  ];

  return (
    <CSSWaves className="relative min-h-screen">
      <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-9xl mx-auto">
          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[#e0e1dd] mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            projects
          </motion.h1>

          {/* Projects Grid - 5 columns on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TextContentCard
                  title={project.title}
                  tags={project.tech}
                  description={project.description}
                  expandedDescription={project.expandedDescription}
                  expandable={true}
                  award={project.award}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CSSWaves>
  );
}
