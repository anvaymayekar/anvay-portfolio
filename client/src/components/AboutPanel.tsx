import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Education } from "@shared/schema";

export function AboutPanel() {
  const { data: education, isLoading } = useQuery<Education[]>({
    queryKey: ["/api/education"],
  });

  const currentEducation = education?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="glass rounded-2xl p-6 space-y-4"
      data-testid="about-panel"
    >
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2" data-testid="text-about-heading">
        <GraduationCap className="w-5 h-5 text-primary" />
        About
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-about-bio">
        Passionate B.Tech student specializing in Electronics & Computer Science with focus on 
        Robotics, IoT, and Embedded Systems. Active in research and development of innovative 
        hardware-software solutions.
      </p>

      {!isLoading && currentEducation && (
        <div className="pt-3 border-t border-white/20 dark:border-white/10 space-y-2" data-testid="education-details">
          <div className="flex items-start gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground" data-testid="text-current-degree">{currentEducation.degree}</p>
              <p className="text-muted-foreground text-xs" data-testid="text-current-institution">{currentEducation.institution}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span data-testid="text-current-duration">{currentEducation.duration}</span>
          </div>
          
          {currentEducation.grade && (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-foreground">CGPA:</span>
              <span className="text-primary font-semibold" data-testid="text-current-cgpa">{currentEducation.grade}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
        <MapPin className="w-3 h-3" />
        <span data-testid="text-location">Mumbai, India</span>
      </div>
    </motion.div>
  );
}
