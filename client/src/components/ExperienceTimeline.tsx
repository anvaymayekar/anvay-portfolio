import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
    Briefcase,
    Code,
    Rocket,
    Trophy,
    Star,
    Zap,
    Award,
    Target,
    Crown,
    Flame,
} from "lucide-react";
import React from "react";

interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    duration: string;
    current?: string;
    icon?: string;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
    {
        briefcase: Briefcase,
        code: Code,
        rocket: Rocket,
        trophy: Trophy,
        star: Star,
        zap: Zap,
        award: Award,
        target: Target,
        crown: Crown,
        flame: Flame,
    };

const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
            delay: delay,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const ActiveDot = () => {
    return (
        <div
            className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 rounded-full bg-green-500 
                   dark:shadow-[0_0_10px_4px_rgba(34,197,94,0.7)] 
                   shadow-[0_0_6px_2px_rgba(34,197,94,0.4)]"
            style={{
                animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
        >
            <div
                className="absolute inset-0 rounded-full bg-green-400 dark:opacity-80 opacity-50"
                style={{
                    animation: "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
            />
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-green-200 blur-[2px] opacity-80 translate-x-[3px] translate-y-[2px] dark:opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="w-1.5 h-1.5 rounded-full bg-green-300 
                           shadow-[0_0_3px_1px_rgba(110,231,183,0.9)] dark:shadow-[0_0_4px_2px_rgba(110,231,183,0.9)]"
                    style={{
                        animation:
                            "innerPulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                />
            </div>
        </div>
    );
};

const DesktopNode = ({
    experience,
    index,
}: {
    experience: Experience;
    index: number;
}) => {
    const delay = index * 0.15; // Simplified delay calculation
    const IconComponent =
        experience.icon && iconMap[experience.icon]
            ? iconMap[experience.icon]
            : Briefcase;

    return (
        <motion.div
            custom={delay}
            variants={nodeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-center relative z-20"
            data-testid={`experience-node-${experience.id}`}
        >
            <div className="relative group mb-4">
                <div className="absolute inset-0 w-20 h-20 rounded-full education-gradient-main opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-700" />
                <div className="relative w-20 h-20 rounded-full overflow-visible glass hover:scale-110 transition-all duration-500 shadow-xl">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-0 education-gradient-main opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                        <div className="absolute inset-0 education-gradient-glow opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
                        <div className="absolute inset-0 rounded-full opacity-60 dark:education-card-border" />
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 education-badge-text transition-all duration-700 group-hover:text-white group-hover:scale-110" />
                    </div>
                    {experience.current === "true" && <ActiveDot />}
                </div>
            </div>
            <div className="text-center space-y-1 max-w-[240px]">
                <h4
                    className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight tracking-tight"
                    data-testid="text-exp-role"
                >
                    {experience.role}
                </h4>
                <p
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    data-testid="text-exp-company"
                >
                    {experience.company}
                </p>
                <p
                    className="text-xs text-slate-600 dark:text-slate-400 font-medium"
                    data-testid="text-exp-duration"
                >
                    {experience.duration}
                </p>
            </div>
        </motion.div>
    );
};

const MobileNode = ({
    experience,
    index,
    isLeft,
}: {
    experience: Experience;
    index: number;
    isLeft: boolean;
}) => {
    const delay = index * 0.15; // Simplified delay calculation
    const IconComponent =
        experience.icon && iconMap[experience.icon]
            ? iconMap[experience.icon]
            : Briefcase;

    return (
        <motion.div
            custom={delay}
            variants={nodeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative flex items-start justify-center w-full z-20"
            data-testid={`experience-node-mobile-${experience.id}`}
        >
            <div
                className={`flex items-start gap-6 w-full max-w-2xl ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                }`}
            >
                <div
                    className={`flex-1 space-y-1 ${
                        isLeft ? "text-right" : "text-left"
                    }`}
                >
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                        {experience.role}
                    </h4>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {experience.company}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        {experience.duration}
                    </p>
                </div>
                <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 w-16 h-16 rounded-full education-gradient-main opacity-30 blur-xl" />
                    <div className="relative w-16 h-16 rounded-full overflow-visible glass shadow-lg">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute inset-0 education-gradient-main opacity-20" />
                            <div className="absolute inset-0 education-gradient-glow opacity-10" />
                            <div className="absolute inset-0 rounded-full opacity-60 dark:education-card-border" />
                        </div>
                        <div className="relative h-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 education-badge-text" />
                        </div>
                        {experience.current === "true" && <ActiveDot />}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export function ExperienceTimeline() {
    const { data: experiences, isLoading } = useQuery<Experience[]>({
        queryKey: ["/api/experience"],
    });

    if (isLoading) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!experiences || experiences.length === 0) return null;

    const totalRows = Math.ceil(experiences.length / 4);
    const desktopHeight = totalRows * 180;

    return (
        <div
            className="w-full max-w-7xl mx-auto px-4 py-12"
            data-testid="experience-timeline"
        >
            <div className="hidden lg:block">
                <div className="relative">
                    <div
                        className="flex flex-wrap justify-center gap-x-8"
                        style={{
                            rowGap: "3em",
                            columnGap: "3em",
                        }}
                    >
                        {experiences.map((exp, index) => {
                            return (
                                <div
                                    key={exp.id}
                                    style={{ width: "230px" }}
                                    className="flex items-start justify-center pt-3"
                                >
                                    <DesktopNode
                                        experience={exp}
                                        index={index}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="lg:hidden relative min-h-screen">
                <div className="flex flex-col gap-16 py-8 relative">
                    {experiences.map((exp, index) => (
                        <MobileNode
                            key={exp.id}
                            experience={exp}
                            index={index}
                            isLeft={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
