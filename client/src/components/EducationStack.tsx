import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Calendar, Award, ChevronRight, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Education } from "@shared/schema";

export function EducationStack() {
  const { data: education, isLoading } = useQuery<Education[]>({
    queryKey: ["/api/education"],
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading || !education || education.length === 0) {
    return null;
  }

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % education.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + education.length) % education.length);
  };

  return (
    <div className="relative min-h-[400px] flex items-center justify-center" data-testid="education-stack">
      <div className="relative w-full max-w-2xl">
        {/* Stack Effect - Background Cards */}
        {education.map((_, index) => {
          const offset = Math.abs(index - currentIndex);
          if (offset > 2) return null;
          
          return (
            <motion.div
              key={`stack-${index}`}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: education.length - offset,
              }}
              initial={false}
              animate={{
                y: offset * 12,
                scale: 1 - offset * 0.05,
                opacity: offset === 0 ? 1 : 0.5 - offset * 0.2,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card className="glass-strong h-full" />
            </motion.div>
          );
        })}

        {/* Active Card Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            exit={{ opacity: 0, y: -20, rotateY: 10 }}
            transition={{ duration: 0.4 }}
            className="relative z-50"
            data-testid={`education-card-${education[currentIndex].id}`}
          >
            <Card className="glass-strong p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-3 rounded-lg glass-subtle">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-1" data-testid="text-education-degree">
                      {education[currentIndex].degree}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-2" data-testid="text-education-field">
                      {education[currentIndex].field}
                    </p>
                    <p className="text-sm font-medium text-foreground" data-testid="text-education-institution">
                      {education[currentIndex].institution}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span data-testid="text-education-duration">{education[currentIndex].duration}</span>
                </div>
                {education[currentIndex].grade && (
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground" data-testid="text-education-grade">
                      {education[currentIndex].grade}
                    </span>
                  </div>
                )}
              </div>

              {education[currentIndex].description && (
                <p className="text-sm text-muted-foreground leading-relaxed border-t border-white/10 pt-4" data-testid="text-education-description">
                  {education[currentIndex].description}
                </p>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {education.length > 1 && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
            <Button
              onClick={prevCard}
              size="icon"
              variant="outline"
              className="glass-subtle"
              data-testid="button-education-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {education.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-education-indicator-${index}`}
                />
              ))}
            </div>
            <Button
              onClick={nextCard}
              size="icon"
              variant="outline"
              className="glass-subtle"
              data-testid="button-education-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
