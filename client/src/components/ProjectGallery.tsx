import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Masonry from "react-masonry-css";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "@shared/schema";

const breakpointColumns = {
  default: 3,
  1024: 2,
  640: 1,
};

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20" data-testid="loading-projects">
        <div className="glass-strong rounded-xl p-8">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-20" data-testid="empty-projects">
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
        {projects.map((project) => (
          <div key={project.id} className="mb-6">
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          </div>
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
