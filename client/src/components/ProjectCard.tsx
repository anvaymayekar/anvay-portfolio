import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { Project } from "@shared/schema";
import { useState, useEffect } from "react";

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

interface OngoingBadgeProps {
    className?: string;
}

export function OngoingBadge({ className = "" }: OngoingBadgeProps) {
    return (
        <div
            className={`
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                education-icon-badge education-badge-text
                
                ${className}
            `}
            style={{
                animation: "gentlePulse 4s ease-in-out infinite",
            }}
        >
            <Clock className="w-3 h-3" />
            <span>Ongoing</span>

            <style>{`
                @keyframes gentlePulse {
                    0%,
                    100% {
                        opacity: 1;
                        box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.2);
                    }
                    50% {
                        opacity: 0.7;
                        box-shadow: 0 0 20px 2px rgba(168, 85, 247, 0.1);
                    }
                }
            `}</style>
        </div>
    );
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const images = project.images || [];
    const displayImages = images.slice(0, 3);

    // Parse duration to check if ongoing
    const isOngoing =
        project.duration?.toLowerCase().includes("present") || false;

    // Shuffle on hover only
    useEffect(() => {
        if (displayImages.length <= 1 || !isHovered) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [displayImages.length, isHovered]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                scale: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImageIndex(0);
            }}
            data-testid={`card-project-${project.id}`}
            className="group cursor-pointer w-full"
            onClick={onClick}
        >
            <div className="relative w-full scale-[0.95] origin-top">
                {/* Stacked Images Container */}
                <div className="relative w-full aspect-[4/3] mb-0">
                    {displayImages.length > 0 ? (
                        <AnimatePresence mode="popLayout">
                            {displayImages.map((image, index) => {
                                const position =
                                    (index -
                                        currentImageIndex +
                                        displayImages.length) %
                                    displayImages.length;
                                const isTop = position === 0;
                                const isSecond = position === 1;
                                const isThird = position === 2;

                                return (
                                    <motion.div
                                        key={`${image}-${index}`}
                                        className="absolute inset-0 rounded-t-xl overflow-hidden border border-white/20 dark:border-white/10 shadow-xl"
                                        initial={{
                                            scale: 0.9,
                                            y: 40,
                                            x: 40,
                                            rotate: 8,
                                            opacity: 0,
                                            zIndex: 0,
                                        }}
                                        animate={{
                                            scale: isTop
                                                ? 1
                                                : isSecond
                                                ? 0.95
                                                : 0.9,
                                            y: isTop ? 0 : isSecond ? 12 : 24,
                                            x: isTop ? 0 : isSecond ? 12 : 24,
                                            rotate: isTop
                                                ? 0
                                                : isSecond
                                                ? 3
                                                : 6,
                                            opacity: isTop
                                                ? 1
                                                : isSecond
                                                ? 0.7
                                                : 0.4,
                                            zIndex: isTop
                                                ? 3
                                                : isSecond
                                                ? 2
                                                : 1,
                                        }}
                                        exit={{
                                            scale: 0.85,
                                            y: -40,
                                            x: -40,
                                            rotate: -8,
                                            opacity: 0,
                                            zIndex: 0,
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        data-testid={`img-stack-${index}-${project.id}`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 z-10" />

                                        <img
                                            src={image}
                                            alt={`${project.title} - ${
                                                index + 1
                                            }`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    ) : (
                        <div
                            className="absolute inset-0 rounded-t-xl border border-white/20 dark:border-white/10 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10"
                            data-testid={`placeholder-image-${project.id}`}
                        />
                    )}
                </div>
                {/* Info Box - Positioned to overlap images */}
                <div className="relative glass rounded-b-xl p-4 -mt-px z-10">
                    <div className="flex items-start justify-between gap-2">
                        <h3
                            className="text-base md:text-lg font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 dark:group-hover:from-purple-400 dark:group-hover:to-cyan-400 transition-all duration-300 line-clamp-2"
                            data-testid={`text-project-title-${project.id}`}
                        >
                            {project.title}
                        </h3>

                        {isOngoing && <OngoingBadge />}
                    </div>
                    <h2 className="text-xs md:text-sm opacity-65 mt-1 line-clamp-1">
                        {project.description}
                    </h2>

                    {project.duration && (
                        <p
                            className="text-xs md:text-sm text-muted-foreground mt-6"
                            data-testid={`text-project-duration-${project.id}`}
                        >
                            {project.duration}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
