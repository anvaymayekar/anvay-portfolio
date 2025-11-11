import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ y: -8 }}
      data-testid={`card-project-${project.id}`}
      className="group relative rounded-2xl glass overflow-hidden hover-elevate active-elevate-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 dark:from-purple-500/5 dark:via-pink-500/5 dark:to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 space-y-4">
        <h3
          className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 dark:group-hover:from-purple-400 dark:group-hover:to-cyan-400 transition-all duration-300"
          data-testid={`text-project-title-${project.id}`}
        >
          {project.title}
        </h3>

        <p
          className="text-base text-muted-foreground leading-relaxed"
          data-testid={`text-project-description-${project.id}`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2" data-testid={`tech-stack-${project.id}`}>
          {project.techStack.map((tech, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="glass-subtle text-xs font-medium"
              data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          {project.demoLink && (
            <Button
              asChild
              size="sm"
              variant="default"
              data-testid={`button-demo-${project.id}`}
            >
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
          {project.liveLink && (
            <Button
              asChild
              size="sm"
              variant="outline"
              data-testid={`button-live-${project.id}`}
            >
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
