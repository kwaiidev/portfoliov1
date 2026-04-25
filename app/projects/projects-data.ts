export type ProjectBase = {
  title: string;
  slug: string;
  category: string;
  tech: string[];
  description: string;
  expandedDescription: string[];
  award?: string;
  imagePosition?: string;
};

export const projects: ProjectBase[] = [
  {
    title: 'Guido',
    slug: 'guido',
    category: 'Autonomomous Drones',
    tech: ['C++', 'ROS2', 'Google ADK', 'Python', 'SLAM', 'NVIDIA SDK', 'Jetson Orin Nano'],
    description: 'An autonomous wheelchair that can navigate using SLAM, waypoints, and natural voice commands.',
    expandedDescription: [
      'Built an autonomous, voice-controlled wheelchair system from scratch using ROS 2 Humble, LiDAR-based SLAM, and Nav2 on an NVIDIA Jetson Orin Nano.',
      'Engineered a layered autonomy architecture with separated command handling, supervisory logic, and Nav2 execution nodes.',
      'Developed a full-stack voice-to-motion pipeline that translates natural language into real-time motor control through a Jetson-to-Arduino serial bridge.',
    ],
    award: 'Most Innovative Hack @ HackUSF 2026',
  },
  {
    title: 'Conduit',
    slug: 'conduit',
    category: 'Accessibility',
    tech: ['Python', 'OpenCV', 'FastAPI', 'Flask', 'XGBoost', 'PyTorch'],
    description: 'A modular EEG, computer vision, and AI agent accessibility system for hands-free computer control.',
    expandedDescription: [
      'Built eye tracking around 478 facial landmarks, calibrated iris vectors, and adaptive One Euro filtering.',
      'Connected speech-to-text and intent classification to asynchronous event emission for responsive controls.',
      'Combined ASL recognition, EEG feature windows, and an Electron overlay into a flexible accessibility interface.',
    ],
    award: 'Healthcare 2nd @ Hacklytics 2026',
    imagePosition: 'center top',
  },
  {
    title: 'ZPM-TUNA',
    slug: 'zpm-tuna',
    category: 'Autonomous Drones',
    tech: ['ROS2', 'C++', 'OpenCV', 'Python', 'Arduino', 'Gazebo'],
    description: 'Autonomous drones that navigate mazes, find exits, and share what they learn with each other.',
    expandedDescription: [
      'Created ROS2-based autonomous drones for pathfinding through simulated burning-building environments.',
      'Used computer vision and navigation logic to identify routes and escape paths.',
      'Built a companion Flutter mobile app for sharing generated escape paths with users.',
    ],
    award: 'Pheratech 1st @ Knight Hacks VIII',
  },
  {
    title: 'face2learn',
    slug: 'face2learn',
    category: 'Accessibility',
    tech: ['Python', 'OpenCV', 'face-recognition', 'dlib', 'Tkinter'],
    description: 'A real-time facial recognition system for tracking face movement, gestures, and expressions.',
    expandedDescription: [
      'Tracked faces and gestures in real time with OpenCV and Dlib.',
      'Mapped facial expressions to virtual object interactions for accessible input experiments.',
    ],
    imagePosition: 'center top',
  },
  {
    title: 'Portfolio',
    slug: 'portfolio',
    category: 'Web',
    tech: ['TypeScript', 'Next.js', 'React', 'Tailwind', 'Framer Motion', 'HTML/CSS'],
    description: 'The portfolio you are looking at right now, built as a fast personal site with animated sections.',
    expandedDescription: [
      'Designed and built a Next.js portfolio with animated routes, responsive layouts, and custom visual sections.',
      'Uses reusable content, carousel, navigation, and motion components across the site.',
    ],
  },
  {
    title: 'essayAmplifier',
    slug: 'essay-amplifier',
    category: 'Web',
    tech: ['Python', 'Django', 'Bootstrap', 'AWS', 'SQLite', 'Docker', 'Git'],
    description: 'A Django platform for improving essays through dynamic NLP prompts and response workflows.',
    expandedDescription: [
      'Integrated the OpenAI API into a writing-improvement workflow focused on grammar, style, and clarity.',
      'Implemented persistence for user submissions, prompt-response mappings, and usage analytics.',
    ],
  },
  {
    title: 'swaghack',
    slug: 'swaghack',
    category: 'Systems',
    tech: ['C++', 'Java', 'IDA Pro'],
    description: 'A controlled anti-cheat research project exploring kernel-mode memory modification detection.',
    expandedDescription: [
      'Engineered a proof-of-concept kernel-mode driver for private, controlled anti-cheat stress testing.',
      'Identified weaknesses in detection logic and recommended stronger telemetry and validation mechanisms.',
    ],
  },
];
