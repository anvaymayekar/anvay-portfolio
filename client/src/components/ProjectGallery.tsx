import { useState } from "react";
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
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export function ProjectGallery() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const [modalOpen, setModalOpen] = useState(false);

    const { data: projects = [], isLoading } = useQuery<Project[]>({
        queryKey: ["/api/projects"],
    });

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
                {projects.map((project, index) => (
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
