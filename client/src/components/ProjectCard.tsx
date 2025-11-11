import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const previewImage = project.coverImage || project.images?.[0];
  const isGif = previewImage?.toLowerCase().endsWith('.gif');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      data-testid={`card-project-${project.id}`}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="glass-strong rounded-xl overflow-hidden hover-elevate active-elevate-2">
        {previewImage ? (
          <div className="relative w-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
            <img
              src={previewImage}
              alt={project.title}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              data-testid={`img-project-preview-${project.id}`}
              loading="lazy"
            />
            {isGif && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 glass-subtle"
                data-testid={`badge-gif-${project.id}`}
              >
                GIF
              </Badge>
            )}
          </div>
        ) : (
          <div className="relative w-full h-48 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-cyan-500/10" data-testid={`placeholder-image-${project.id}`} />
        )}

        <div className="p-5 space-y-3">
          <h3
            className="text-lg font-semibold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 dark:group-hover:from-purple-400 dark:group-hover:to-cyan-400 transition-all duration-300"
            data-testid={`text-project-title-${project.id}`}
          >
            {project.title}
          </h3>

          <p
            className="text-sm text-muted-foreground line-clamp-2"
            data-testid={`text-project-description-${project.id}`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2" data-testid={`container-technologies-${project.id}`}>
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs"
                data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}-${project.id}`}
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="secondary" className="text-xs" data-testid={`badge-more-techs-${project.id}`}>
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
