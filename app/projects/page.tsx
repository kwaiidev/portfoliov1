export default function Projects() {
  return (
      <div className="min-h-screen bg-[#ede8d0] flex flex-col items-center justify-start relative">
        <div className="text-center max-w-4xl mt-25">
          <h1 className="text-3xl font-bold text-[#1e3b24] mb-4">
              experience
          </h1>
          <h2 className="text-[#1e3b24] text-2xl font-bold text-left max-w-4xl">swaghack</h2>
          <p className="text-black italic text-left text-sm">c++, java, ida pro</p>
          <p className="text-black text-left text-md">
              - Engineered a proof-of-concept kernel-mode driver to simulate undetected memory modifications in the Lunar
              Client Anticheat on Minecraft, reproducing techniques real cheats use to evade anti-cheat detection and stress-test
              server security controls. <br />
              - Conducted controlled testing in a private environment, identifying weaknesses in detection logic and recommending
              enhanced telemetry and validation mechanisms to strengthen overall anti-cheat effectiveness.
          </p>
          <h2 className="text-[#1e3b24] text-2xl font-bold text-left max-w-4xl">essayAmplifier</h2>
            <p className="text-black italic text-left text-sm">python, django, bootstrap, aws, sqlite, docker, git</p>
            <p className="text-black text-left text-md">
              - Django-based web platform integrated with the OpenAI API, enabling users to enhance essays through
              dynamically generated NLP prompts tailored for grammar, style, and clarity improvements.<br />
              - Implemented a MongoDB-backed data pipeline for storing user submissions, prompt-response mappings, and
              usage analytics, optimizing query performance and ensuring scalable handling of high-volume API interactions.
            </p>
        </div>
      </div>
  );
}
