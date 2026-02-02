'use client';

import React from 'react';
import { FaJava, FaReact, FaRust } from 'react-icons/fa'
import {
    SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus, SiHtml5, SiCss3,
    SiNextdotjs, SiNodedotjs, SiTailwindcss, SiOpencv, SiTensorflow,
    SiGit, SiSqlite, SiDocker, SiVercel, SiSupabase, SiFlask, SiLinux,
    SiMongodb, SiArduino
} from 'react-icons/si'
import { BsGithub } from 'react-icons/bs'
import { Code, Database, Library } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { DiDjango } from "react-icons/di";

function IconWithTooltip({children, label}: {children: React.ReactElement, label: string}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent><p className="lowercase">{label}</p></TooltipContent>
        </Tooltip>
    );
}

const TechGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border border-[#415a77]/30 rounded-md p-3 sm:p-4 bg-[#e0e1dd]/60 bg-opacity-100">
        <h3 className="text-sm sm:text-base font-medium mb-3 text-[#0d1b2a] lowercase flex items-center">
            {title === "Languages" && <Code className="inline mr-2 text-[#415a77]" size={18} />}
            {title === "Technologies" && <Library className="inline mr-2 text-[#415a77]" size={18} />}
            {title === "Tools & Platforms" && <Database className="inline mr-2 text-[#415a77]" size={18} />}
            {title}
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
            {children}
        </div>
    </div>
);

export default function Tech() {
    return (
        <div className="my-4 sm:my-6 animate-fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <TechGroup title="Languages">
                <IconWithTooltip label="Python"><SiPython size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="JavaScript"><SiJavascript size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="TypeScript"><SiTypescript size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="C"><SiC size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="C++"><SiCplusplus size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Rust"><FaRust size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Java"><FaJava size={20} className="text-[#1b263b]" /></IconWithTooltip>
            </TechGroup>

            <TechGroup title="Technologies">
                <IconWithTooltip label="React"><FaReact size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Next.js"><SiNextdotjs size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Tailwind CSS"><SiTailwindcss size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="HTML5"><SiHtml5 size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="CSS3"><SiCss3 size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Node.js"><SiNodedotjs size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="MongoDB"><SiMongodb size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="OpenCV"><SiOpencv size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="TensorFlow"><SiTensorflow size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Flask"><SiFlask size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Django"><DiDjango size={20} className="text-[#1b263b]" /></IconWithTooltip>
            </TechGroup>

            <TechGroup title="Tools & Platforms">
                <IconWithTooltip label="Git"><SiGit size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="GitHub"><BsGithub size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="SQLite"><SiSqlite size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Docker"><SiDocker size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Vercel"><SiVercel size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Supabase"><SiSupabase size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Linux"><SiLinux size={20} className="text-[#1b263b]" /></IconWithTooltip>
                <IconWithTooltip label="Arduino"><SiArduino size={20} className="text-[#1b263b]" /></IconWithTooltip>
            </TechGroup>
        </div>
    )
}