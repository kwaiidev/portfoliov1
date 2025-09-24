'use client';

import React from 'react';
import { FaJava, FaReact } from 'react-icons/fa'
import {
    SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus, SiSharp, SiHtml5, SiCss3,
    SiNextdotjs, SiNodedotjs, SiTailwindcss, SiTrpc, SiPrisma, SiOpencv,
    SiGit, SiPostgresql, SiDocker, SiVercel, SiSupabase, SiUnity, SiLinux,
    SiDrizzle
} from 'react-icons/si'
import { BsGithub } from 'react-icons/bs'
import { Code, Database, Server, Globe } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

function IconWithTooltip({children, label}: {children: React.ReactElement, label: string}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent><p className="lowercase">{label}</p></TooltipContent>
        </Tooltip>
    );
}

const TechGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border border-white rounded-md p-3 sm:p-4 bg-black bg-opacity-100">
        <h3 className="text-sm sm:text-base font-medium mb-3 text-white lowercase flex items-center">
            {title === "Languages" && <Code className="inline mr-2 text-purple-400" size={18} />}
            {title === "Frontend" && <Globe className="inline mr-2 text-purple-400" size={18} />}
            {title === "Backend" && <Server className="inline mr-2 text-purple-400" size={18} />}
            {title === "Tools & Platforms" && <Database className="inline mr-2 text-purple-400" size={18} />}
            {title}
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
            {children}
        </div>
    </div>
);

export default function Tech() {
    return (
        <div className="my-4 sm:my-6 animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <TechGroup title="Languages">
                <IconWithTooltip label="Python"><SiPython size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="JavaScript"><SiJavascript size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="TypeScript"><SiTypescript size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="C"><SiC size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="C++"><SiCplusplus size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="C#"><SiSharp size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Java"><FaJava size={20} className="text-purple-500" /></IconWithTooltip>
            </TechGroup>

            <TechGroup title="Frontend">
                <IconWithTooltip label="React"><FaReact size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Next.js"><SiNextdotjs size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Tailwind CSS"><SiTailwindcss size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="HTML5"><SiHtml5 size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="CSS3"><SiCss3 size={20} className="text-purple-500" /></IconWithTooltip>
            </TechGroup>

            <TechGroup title="Backend">
                <IconWithTooltip label="Node.js"><SiNodedotjs size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="tRPC"><SiTrpc size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Prisma"><SiPrisma size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="OpenCV"><SiOpencv size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Drizzle"><SiDrizzle size={20} className="text-purple-500" /></IconWithTooltip>
            </TechGroup>

            <TechGroup title="Tools & Platforms">
                <IconWithTooltip label="Git"><SiGit size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="GitHub"><BsGithub size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="PostgreSQL"><SiPostgresql size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Docker"><SiDocker size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Vercel"><SiVercel size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Supabase"><SiSupabase size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Unity"><SiUnity size={20} className="text-purple-500" /></IconWithTooltip>
                <IconWithTooltip label="Linux"><SiLinux size={20} className="text-purple-500" /></IconWithTooltip>
            </TechGroup>
        </div>
    )
}