import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "@shared/schema";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      emblaApi?.scrollTo(0);
    }
  }, [open, emblaApi]);

  if (!project) return null;

  const mediaImages = project.images || [];
  const hasMedia = mediaImages.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto glass-strong border-white/20 dark:border-white/10"
        data-testid={`dialog-project-${project.id}`}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
            data-testid={`text-modal-title-${project.id}`}
          >
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {hasMedia && (
            <div className="relative" data-testid={`carousel-container-${project.id}`}>
              <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                  {mediaImages.map((url: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex-[0_0_100%] min-w-0"
                      data-testid={`carousel-slide-${index}-${project.id}`}
                    >
                      <img
                        src={url}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-auto object-contain max-h-[400px] bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg"
                        data-testid={`img-carousel-${index}-${project.id}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {mediaImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 glass-subtle"
                    onClick={scrollPrev}
                    data-testid={`button-carousel-prev-${project.id}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 glass-subtle"
                    onClick={scrollNext}
                    data-testid={`button-carousel-next-${project.id}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  <div className="flex justify-center gap-2 mt-3" data-testid={`carousel-indicators-${project.id}`}>
                    {mediaImages.map((_: string, index: number) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === selectedIndex
                            ? 'bg-purple-500 dark:bg-purple-400 w-6'
                            : 'bg-muted-foreground/30'
                        }`}
                        onClick={() => emblaApi?.scrollTo(index)}
                        data-testid={`button-carousel-indicator-${index}-${project.id}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {(project.role || project.duration) && (
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground" data-testid={`metadata-${project.id}`}>
              {project.role && (
                <div data-testid={`text-role-${project.id}`}>
                  <span className="font-semibold">Role:</span> {project.role}
                </div>
              )}
              {project.duration && (
                <div data-testid={`text-duration-${project.id}`}>
                  <span className="font-semibold">Duration:</span> {project.duration}
                </div>
              )}
            </div>
          )}

          <div data-testid={`description-${project.id}`}>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div data-testid={`highlights-${project.id}`}>
              <h4 className="font-semibold mb-2">Key Highlights</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li 
                    key={idx} 
                    className="text-sm text-muted-foreground flex gap-2"
                    data-testid={`text-highlight-${idx}-${project.id}`}
                  >
                    <span className="text-purple-500 dark:text-purple-400">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div data-testid={`technologies-list-${project.id}`}>
            <h4 className="font-semibold mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string, idx: number) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="glass-subtle"
                  data-testid={`badge-tech-detail-${tech.toLowerCase().replace(/\s+/g, '-')}-${project.id}`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4" data-testid={`links-${project.id}`}>
            {project.demoLink && (
              <Button
                asChild
                variant="default"
                data-testid={`button-demo-link-${project.id}`}
              >
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Demo
                </a>
              </Button>
            )}
            {project.liveLink && (
              <Button
                asChild
                variant="outline"
                data-testid={`button-live-link-${project.id}`}
              >
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
