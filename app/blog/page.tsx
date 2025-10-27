'use client';
import CSSWaves from '../components/CSSWaves';
import TextContentCard from '../components/TextContentCard';

export default function Blog() {
  return (
    <CSSWaves className="relative min-h-screen">
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#e0e1dd] mb-8">
            blog
          </h1>
          <p className="text-[#e0e1dd] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            i like to think and write about it
          </p>
        </div>

        <div className="space-y-8">
          {/* Blog Post 1 */}
          <TextContentCard
            title="tbd"
            date="Dec 2024"
            tags={[""]}
            description=""
            expandedDescription=""
            expandable={true}
          />
        </div>
        </div>
      </div>
    </CSSWaves>
  );
}
