import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "@shared/schema";

const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

interface ProjectGalleryProps {
    onLoadMoreChange?: (hasMore: boolean, handleShowMore: () => void) => void;
}

export function ProjectGallery({ onLoadMoreChange }: ProjectGalleryProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(9);

    const { data: projects = [], isLoading } = useQuery<Project[]>({
        queryKey: ["/api/projects"],
    });

    const visibleProjects = projects.slice(0, visibleCount);
    const hasMore = visibleCount < projects.length;

    const handleShowMore = () => {
        setVisibleCount((prev) => Math.min(prev + 6, projects.length));
    };

    // Notify parent component when hasMore or handleShowMore changes
    useEffect(() => {
        if (onLoadMoreChange && !isLoading) {
            onLoadMoreChange(hasMore, handleShowMore);
        }
    }, [hasMore, isLoading, onLoadMoreChange]);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    if (isLoading) {
        return (
            <div
                className="flex items-center justify-center py-20"
                data-testid="loading-projects"
            >
                <div className="glass-strong rounded-xl p-8">
                    <p className="text-muted-foreground">Loading projects...</p>
                </div>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div
                className="flex items-center justify-center py-20"
                data-testid="empty-projects"
            >
                <div className="glass-strong rounded-xl p-8">
                    <p className="text-muted-foreground">No projects found.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumns}
                className="flex -ml-6 w-auto"
                columnClassName="pl-6 bg-clip-padding"
                data-testid="masonry-gallery"
            >
                {visibleProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="mb-6"
                    >
                        <ProjectCard
                            project={project}
                            onClick={() => handleProjectClick(project)}
                        />
                    </motion.div>
                ))}
            </Masonry>

            <ProjectModal
                project={selectedProject}
                open={modalOpen}
                onOpenChange={setModalOpen}
            />
        </>
    );
}

// Separate ShowMoreButton component to be used outside ProjectGallery
const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export function ShowMoreButton({ onClick }: { onClick: () => void }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={buttonVariants}
            className="flex justify-center mt-8 mb-12"
        >
            <button
                onClick={onClick}
                className="relative rounded-full overflow-hidden group hover:scale-[1.02] transition-transform duration-300 glass"
            >
                {/* Background Layers */}
                <div className="absolute inset-0 education-card-overlay" />

                {/* Hover Glow */}
                <div className="absolute -inset-1 education-card-hover-glow" />

                {/* Border */}
                <div className="absolute inset-0 rounded-2xl opacity-60 dark:education-card-border" />

                {/* Content */}
                <div className="relative px-7 py-3">
                    <span className="text-foreground font-medium flex items-center gap-2">
                        show more
                        <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ y: [0, 4, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </motion.svg>
                    </span>
                </div>
            </button>
        </motion.div>
    );
}
