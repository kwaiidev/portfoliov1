import Timeline from '@/app/components/timeline';

export default function Projects() {
  const projects = [
    {
      title: "swaghack",
      tech: ["c++", "java", "ida pro"],
      description: [
        "Engineered a proof-of-concept kernel-mode driver to simulate undetected memory modifications in the Lunar Client Anticheat on Minecraft, reproducing techniques real cheats use to evade anti-cheat detection and stress-test server security controls.",
        "Conducted controlled testing in a private environment, identifying weaknesses in detection logic and recommending enhanced telemetry and validation mechanisms to strengthen overall anti-cheat effectiveness."
      ]
    },
    {
      title: "essayAmplifier",
      tech: ["python", "django", "bootstrap", "aws", "sqlite", "docker", "git"],
      description: [
        "Django-based web platform integrated with the OpenAI API, enabling users to enhance essays through dynamically generated NLP prompts tailored for grammar, style, and clarity improvements.",
        "Implemented a MongoDB-backed data pipeline for storing user submissions, prompt-response mappings, and usage analytics, optimizing query performance and ensuring scalable handling of high-volume API interactions."
      ]
    },
    {
      title: "face2learn",
      tech: ["python", "opencv", "face-recognition", "dlib", "tkinter"],
      description: [
        "Developed a facial recognition system using OpenCV and Dlib to track face movements and gestures in real-time, enabling users to interact with virtual objects and control them using facial expressions.",
        "Implemented a real-time face tracking algorithm that continuously analyzes video input, identifying and tracking faces in real-time, allowing for smooth and accurate interaction with virtual environments."
      ]
    }
  ];

  return <Timeline title="projects" items={projects} />;
}
