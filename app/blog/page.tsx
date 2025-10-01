export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0e8] to-[#ede8d0] py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3b24] mb-8">
            blog
          </h1>
          <p className="text-black text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Thoughts on software engineering, systems development, and technology.
          </p>
        </div>

        <div className="space-y-8">
          {/* Blog Post 1 */}
          <article className="bg-[#1e3b24]/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#1e3b24]/30 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#1e3b24]">
                Building Efficient Systems with Low-Level Programming
              </h2>
              <span className="text-[#1e3b24]/70 text-sm font-medium">
                Dec 2024
              </span>
            </div>
            <p className="text-black text-md leading-relaxed mb-4">
              Exploring the fundamentals of systems programming and how understanding low-level concepts can make you a better software engineer. From memory management to performance optimization, we'll dive into the core principles that drive efficient software development.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                Systems Programming
              </span>
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                C/C++
              </span>
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                Performance
              </span>
            </div>
          </article>

          {/* Blog Post 2 */}
          <article className="bg-[#1e3b24]/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#1e3b24]/30 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#1e3b24]">
                The Art of Debugging Complex Systems
              </h2>
              <span className="text-[#1e3b24]/70 text-sm font-medium">
                Nov 2024
              </span>
            </div>
            <p className="text-black text-md leading-relaxed mb-4">
              Debugging is more than just fixing bugs - it's about understanding how systems work and fail. Learn effective debugging strategies, tools, and mindset approaches that can help you solve even the most challenging problems in software development.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                Debugging
              </span>
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                Problem Solving
              </span>
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                Tools
              </span>
            </div>
          </article>

          {/* Blog Post 3 */}
          <article className="bg-[#1e3b24]/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#1e3b24]/30 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#1e3b24]">
                From Student to Software Engineer: My Journey
              </h2>
              <span className="text-[#1e3b24]/70 text-sm font-medium">
                Oct 2024
              </span>
            </div>
            <p className="text-black text-md leading-relaxed mb-4">
              Reflecting on the transition from computer science student to professional software engineer. The challenges, lessons learned, and advice for others starting their journey in the tech industry.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                Career
              </span>
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                Learning
              </span>
              <span className="px-3 py-1 bg-[#1e3b24]/10 text-[#1e3b24] text-xs rounded-full border border-[#1e3b24]/20">
                Advice
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
