import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Calendar, Building2, ChevronRight, ChevronLeft, Award, Code, Book, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Achievement } from "@shared/schema";

const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  award: Award,
  code: Code,
  book: Book,
  star: Star,
};

export function AchievementStack() {
  const { data: achievements, isLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading || !achievements || achievements.length === 0) {
    return null;
  }

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const getIcon = (iconName: string | null) => {
    const IconComponent = iconName && iconMap[iconName] ? iconMap[iconName] : Trophy;
    return IconComponent;
  };

  return (
    <div className="relative min-h-[400px] flex items-center justify-center" data-testid="achievement-stack">
      <div className="relative w-full max-w-2xl">
        {/* Stack Effect - Background Cards */}
        {achievements.map((_, index) => {
          const offset = Math.abs(index - currentIndex);
          if (offset > 2) return null;
          
          return (
            <motion.div
              key={`stack-${index}`}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: achievements.length - offset,
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
            data-testid={`achievement-card-${achievements[currentIndex].id}`}
          >
            <Card className="glass-strong p-8 space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg glass-subtle">
                  {(() => {
                    const Icon = getIcon(achievements[currentIndex].icon);
                    return <Icon className="w-6 h-6 text-primary" />;
                  })()}
                </div>
                <div className="flex-1">
                  <Badge variant="secondary" className="glass-subtle mb-3" data-testid="badge-achievement-category">
                    {achievements[currentIndex].category}
                  </Badge>
                  <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-achievement-title">
                    {achievements[currentIndex].title}
                  </h3>
                  {achievements[currentIndex].organization && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm" data-testid="text-achievement-org">
                        {achievements[currentIndex].organization}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground" data-testid="text-achievement-date">
                  {achievements[currentIndex].date}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed border-t border-white/10 pt-4" data-testid="text-achievement-description">
                {achievements[currentIndex].description}
              </p>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {achievements.length > 1 && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
            <Button
              onClick={prevCard}
              size="icon"
              variant="outline"
              className="glass-subtle"
              data-testid="button-achievement-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-achievement-indicator-${index}`}
                />
              ))}
            </div>
            <Button
              onClick={nextCard}
              size="icon"
              variant="outline"
              className="glass-subtle"
              data-testid="button-achievement-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
