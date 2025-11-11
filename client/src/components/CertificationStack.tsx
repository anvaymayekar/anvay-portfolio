import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Award, Calendar, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Certification } from "@shared/schema";

export function CertificationStack() {
  const { data: certifications, isLoading } = useQuery<Certification[]>({
    queryKey: ["/api/certifications"],
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading || !certifications || certifications.length === 0) {
    return null;
  }

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % certifications.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  return (
    <div className="relative min-h-[400px] flex items-center justify-center" data-testid="certification-stack">
      <div className="relative w-full max-w-2xl">
        {/* Stack Effect - Background Cards */}
        {certifications.map((_, index) => {
          const offset = Math.abs(index - currentIndex);
          if (offset > 2) return null;
          
          return (
            <motion.div
              key={`stack-${index}`}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: certifications.length - offset,
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
            data-testid={`certification-card-${certifications[currentIndex].id}`}
          >
            <Card className="glass-strong p-8 space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg glass-subtle">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-cert-title">
                    {certifications[currentIndex].title}
                  </h3>
                  <p className="text-lg text-muted-foreground" data-testid="text-cert-issuer">
                    {certifications[currentIndex].issuer}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground" data-testid="text-cert-date">
                    {certifications[currentIndex].date}
                  </span>
                </div>
                {certifications[currentIndex].credentialId && (
                  <Badge variant="secondary" className="glass-subtle" data-testid="badge-cert-id">
                    ID: {certifications[currentIndex].credentialId}
                  </Badge>
                )}
              </div>

              {certifications[currentIndex].description && (
                <p className="text-sm text-muted-foreground leading-relaxed border-t border-white/10 pt-4" data-testid="text-cert-description">
                  {certifications[currentIndex].description}
                </p>
              )}

              {certifications[currentIndex].credentialUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="glass-subtle"
                  data-testid="button-cert-verify"
                >
                  <a
                    href={certifications[currentIndex].credentialUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify Certificate
                  </a>
                </Button>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {certifications.length > 1 && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
            <Button
              onClick={prevCard}
              size="icon"
              variant="outline"
              className="glass-subtle"
              data-testid="button-cert-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-cert-indicator-${index}`}
                />
              ))}
            </div>
            <Button
              onClick={nextCard}
              size="icon"
              variant="outline"
              className="glass-subtle"
              data-testid="button-cert-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
