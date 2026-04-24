import { motion } from "framer-motion";
import type { Project } from "@shared/schema";
import { useState, useEffect, useRef } from "react";

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

interface OngoingBadgeProps {
    className?: string;
}

export function OngoingBadge({ className = "" }: OngoingBadgeProps) {
    return (
        <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-bold tracking-[0.18em] uppercase education-badge-text ${className}`}
            style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.25)",
                borderRadius: "2px",
            }}
        >
            <span
                className="w-1 h-1 rounded-full bg-violet-400"
                style={{
                    animation:
                        "innerPulse 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
                }}
            />
            Ongoing
        </div>
    );
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [ambientColor, setAmbientColor] = useState<string | null>(null);
    // Track whether we're in dark mode so ambient glow is suppressed in light mode
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains("dark"),
    );
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const images = project.images || [];
    const displayImages = images.slice(0, 3);
    const isOngoing =
        project.duration?.toLowerCase().includes("present") || false;

    // Keep isDark in sync if the user toggles theme mid-session
    useEffect(() => {
        const root = document.documentElement;
        const observer = new MutationObserver(() => {
            setIsDark(root.classList.contains("dark"));
        });
        observer.observe(root, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    const extractAmbient = () => {
        const img = imgRef.current;
        const canvas = canvasRef.current;
        if (!img || !canvas || !img.complete) return;
        try {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            canvas.width = 16;
            canvas.height = 16;
            ctx.drawImage(img, 0, 0, 16, 16);
            const data = ctx.getImageData(0, 0, 16, 16).data;
            let r = 0,
                g = 0,
                b = 0,
                count = 0;
            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }
            if (count > 0) {
                setAmbientColor(
                    `${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)}`,
                );
            }
        } catch {
            // cross-origin — silently fall back
        }
    };

    useEffect(() => {
        if (displayImages.length <= 1 || !isHovered) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [displayImages.length, isHovered]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer w-full relative"
            data-testid={`card-project-${project.id}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImageIndex(0);
            }}
        >
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

            <div
                className="relative rounded-xl overflow-hidden"
                style={{
                    background:
                        "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    border: isHovered
                        ? `1px solid rgba(${ambientColor ?? "139,92,246"}, 0.22)`
                        : "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    transition: "border-color 0.6s ease",
                }}
            >
                {/*
                    Ambient glow — dark mode only.
                    In light mode isDark is false so opacity stays 0,
                    meaning the blurred image layer never shows at all.
                    Dark mode behaviour is completely unchanged.
                */}
                {displayImages.length > 0 && (
                    <div
                        className="absolute left-0 right-0 top-0 pointer-events-none z-0"
                        style={{
                            aspectRatio: "4/3",
                            opacity: isDark && isHovered ? 1 : 0,
                            transition: "opacity 0.8s ease",
                        }}
                    >
                        <img
                            src={displayImages[currentImageIndex]}
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full object-cover"
                            style={{
                                transform: "scale(1.1)",
                                filter: "blur(30px) saturate(1.1) brightness(0.3)",
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(ellipse at 50% 40%, transparent 15%, rgba(8,6,20,0.88) 72%)",
                            }}
                        />
                    </div>
                )}

                {/* Image zone */}
                <div
                    className="relative w-full overflow-hidden z-10"
                    style={{ aspectRatio: "4/3" }}
                >
                    {displayImages.length > 0 ? (
                        displayImages.map((image, index) => {
                            const isActive = index === currentImageIndex;
                            return (
                                <img
                                    ref={isActive ? imgRef : undefined}
                                    key={image}
                                    src={image}
                                    alt={
                                        isActive
                                            ? `${project.title} preview`
                                            : ""
                                    }
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                    crossOrigin="anonymous"
                                    onLoad={
                                        isActive ? extractAmbient : undefined
                                    }
                                    style={{
                                        zIndex: isActive ? 2 : 1,
                                        opacity: isActive ? 1 : 0,
                                        transform: isHovered
                                            ? "scale(1.04)"
                                            : "scale(1)",
                                        transition:
                                            "opacity 800ms ease-in-out, transform 500ms ease-out",
                                    }}
                                    data-testid={`img-stack-${index}-${project.id}`}
                                />
                            );
                        })
                    ) : (
                        <div
                            className="absolute inset-0 education-gradient-main opacity-25"
                            data-testid={`placeholder-image-${project.id}`}
                        />
                    )}

                    {/* Scrim */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            zIndex: 3,
                            background:
                                "linear-gradient(to top, rgba(8,6,20,0.95) 0%, rgba(8,6,20,0.3) 45%, transparent 72%)",
                        }}
                    />

                    {/* Image dots */}
                    {displayImages.length > 1 && (
                        <div
                            className="absolute top-3 right-3 flex gap-1"
                            style={{ zIndex: 4 }}
                        >
                            {displayImages.map((_, i) => (
                                <motion.span
                                    key={i}
                                    className="block rounded-full"
                                    animate={{
                                        width: i === currentImageIndex ? 16 : 5,
                                        background:
                                            i === currentImageIndex
                                                ? "rgba(167,139,250,1)"
                                                : "rgba(255,255,255,0.25)",
                                    }}
                                    style={{ height: 5 }}
                                    transition={{
                                        duration: 0.35,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Title + badge */}
                    <div
                        className="absolute bottom-0 left-0 right-0 px-4 pb-4"
                        style={{ zIndex: 4 }}
                    >
                        {isOngoing && <OngoingBadge className="mb-2" />}
                        <h3
                            className="text-white font-bold text-[15px] leading-snug line-clamp-2"
                            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
                            data-testid={`text-project-title-${project.id}`}
                        >
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative px-4 pt-3 pb-4 z-10">
                    <p
                        className="text-[12px] leading-relaxed overflow-hidden whitespace-nowrap text-ellipsis"
                        style={
                            isHovered
                                ? {
                                      background:
                                          "linear-gradient(90deg, #a855f7, #818cf8, #06b6d4)",
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      backgroundClip: "text",
                                      transition: "all 0.4s ease",
                                  }
                                : {
                                      color: "var(--muted-foreground)",
                                      WebkitTextFillColor: "unset",
                                      transition: "all 0.4s ease",
                                  }
                        }
                    >
                        {project.description}
                    </p>

                    <div
                        className="relative mt-3 pt-3 flex items-center justify-between"
                        style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        {project.duration && (
                            <p
                                className="text-[10px] font-semibold tracking-wide education-badge-text opacity-70"
                                data-testid={`text-project-duration-${project.id}`}
                            >
                                {project.duration}
                            </p>
                        )}

                        <motion.span
                            className="text-[10px] font-bold tracking-widest education-badge-text"
                            animate={
                                isHovered
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -6 }
                            }
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            VIEW →
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
