import { Dialog, DialogContent } from "@/components/ui/dialog";

import {
    ExternalLink,
    Github,
    Link,
    Building2,
    Calendar,
    X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OngoingBadge } from "./ProjectCard";

type Project = {
    id: string;
    title: string;
    description: string;
    fullDescription: string | null;
    role: string | null;
    duration: string | null;
    highlights: string[] | null;
    size: string | null;
    images: string[] | null;
    coverImage: string | null;
    demoLink: string | null;
    liveLink: string | null;
    paperLink: string | null;
};

interface ProjectModalProps {
    project: Project | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface CircularLinkButtonProps {
    href: string;
    icon: any;
    label: string;
    testId?: string;
}

function CircularLinkButton({
    href,
    icon: Icon,
    label,
    testId,
}: CircularLinkButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center justify-start w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 hover:w-auto rounded-full hover:rounded-full overflow-hidden transition-all glass duration-700 ease-elastic hover:pr-3 sm:hover:pr-4 md:hover:pr-5"
            data-testid={testId}
            title={label}
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                <div className="absolute inset-0 education-gradient-main" />
                <div className="absolute inset-0 education-gradient-glow" />
            </div>
            <div className="absolute inset-0" />
            <div className="absolute inset-0 rounded-full opacity-60 dark:education-card-border" />
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex-shrink-0 z-10">
                <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-slate-700 dark:text-slate-300 transition-colors duration-700 ease-out group-hover:text-white" />
            </div>
            <span className="relative whitespace-nowrap text-xs sm:text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-white overflow-hidden max-w-0 group-hover:max-w-[100px] transition-all duration-700 ease-out delay-100 z-10">
                {label}
            </span>
        </a>
    );
}

export function ProjectModal({
    project,
    open,
    onOpenChange,
}: ProjectModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const touchStartY = useRef<number>(0);
    const [pullDistance, setPullDistance] = useState(0);

    const images = project?.images || [];
    const displayImages = images.slice(0, 3);
    const isOngoing =
        project?.duration?.toLowerCase().includes("present") || false;
    const hasButtons =
        project?.demoLink || project?.liveLink || project?.paperLink;

    useEffect(() => {
        if (open) {
            setCurrentImageIndex(0);
            setIsHovered(false);
            setScrollProgress(0);
            touchStartY.current = 0;
            setPullDistance(0);
        }
    }, [open]);

    useEffect(() => {
        if (displayImages.length <= 1 || isHovered) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [displayImages.length, isHovered]);

    useEffect(() => {
        if (!open) return;

        const handleScroll = () => {
            if (!scrollContainerRef.current) return;

            const scrollTop = scrollContainerRef.current.scrollTop;
            const clientHeight = scrollContainerRef.current.clientHeight;
            const progress = Math.min(scrollTop / clientHeight, 1);
            setScrollProgress(progress);
        };

        const timer = setTimeout(() => {
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                handleScroll();
                scrollContainer.addEventListener("scroll", handleScroll, {
                    passive: true,
                });
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener(
                    "scroll",
                    handleScroll
                );
            }
        };
    }, [open]);

    // Swipe to close handlers for mobile portrait
    const handleTouchStart = (e: React.TouchEvent) => {
        // Only for mobile portrait
        if (window.innerWidth >= 768) return;

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        // Only track if at top of scroll
        if (scrollContainer.scrollTop <= 5) {
            touchStartY.current = e.touches[0].clientY;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        // Only for mobile portrait
        if (window.innerWidth >= 768) return;

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || touchStartY.current === 0) return;

        // Only if still at top
        if (scrollContainer.scrollTop <= 5) {
            const currentY = e.touches[0].clientY;
            const distance = currentY - touchStartY.current;

            // Only track downward swipes
            if (distance > 0) {
                setPullDistance(distance);
                // Prevent scroll when pulling down
                e.preventDefault();
            }
        } else {
            touchStartY.current = 0;
            setPullDistance(0);
        }
    };

    const handleTouchEnd = () => {
        // Only for mobile portrait
        if (window.innerWidth >= 768) return;

        if (pullDistance > 100) {
            onOpenChange(false);
        }
        touchStartY.current = 0;
        setPullDistance(0);
    };

    if (!project) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                hideCloseButton
                // h-[100vh] md:h-[85vh] lg:h-[85vh] xl:h-[80vh]
                className="max-w-6xl p-0 bg-transparent border-none shadow-none overflow-hidden outline-none"
                data-testid={`dialog-project-${project.id}`}
                onInteractOutside={() => onOpenChange(false)}
                onEscapeKeyDown={() => onOpenChange(false)}
            >
                {/* Custom Close Button - Desktop */}
                {/* <button
                    onClick={() => onOpenChange(false)}
                    className="hidden md:block absolute right-4 top-4 z-[60] rounded-full p-2 glass-subtle hover:glass transition-all duration-300 hover:rotate-90 outline-none"
                    style={{ transform: "scale(1.087)" }}
                    aria-label="Close"
                >
                    <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </button> */}
                <style>{`
                    /* Desktop scaling - accounts for browser chrome */
                    .responsive-dialog-content {
                        @media (min-width: 768px) {
                            transform: scale(0.75);
                            transform-origin: center;
                        }
                    }

                    @media (min-width: 768px) and (min-height: 900px) {
                        .responsive-dialog-content {
                            transform: scale(0.95);
                        }
                    }

                    @media (min-width: 768px) and (min-height: 1200px) {
                        .responsive-dialog-content {
                            transform: scale(0.94);
                        }
                    }

                    @media (min-height: 700px) and (max-height: 800px) and (min-width: 1280px) and (max-width: 1400px) {
                        .responsive-dialog-content {
                            transform: scale(0.90);
                        }
                    }

                    @media (min-width: 768px) and (max-width: 1023px) and (min-aspect-ratio: 3/4) and (max-aspect-ratio: 4/3) {                        .responsive-dialog-content h2 { font-size: 0.95rem !important; line-height: 1.3 !important; }
                        .responsive-dialog-content .text-lg { font-size: 0.95rem !important; }
                        .responsive-dialog-content .text-xl { font-size: 1rem !important; }
                        .responsive-dialog-content .text-2xl { font-size: 1.125rem !important; }
                        .responsive-dialog-content .text-xs { font-size: 0.7rem !important; }
                        .responsive-dialog-content .text-sm { font-size: 0.8rem !important; }
                        .responsive-dialog-content .text-base { font-size: 0.85rem !important; }
                        .responsive-dialog-content .button-container { padding: 0.5rem !important; }
                    }
                    
                    @media (min-width: 1024px) and (min-aspect-ratio: 9/16) and (max-aspect-ratio: 10/16) {
                        .responsive-dialog-content {
                            max-height: 75vh !important;
                        }
                        .responsive-dialog-content .text-xs { font-size: 0.9rem !important; }
                        .responsive-dialog-content .text-sm { font-size: 1rem !important; }
                        .responsive-dialog-content .text-base { font-size: 1.125rem !important; }
                        .responsive-dialog-content .text-lg { font-size: 1.35rem !important; }
                        .responsive-dialog-content .text-xl { font-size: 1.5rem !important; }
                        .responsive-dialog-content .text-2xl { font-size: 1.875rem !important; }
                    }
                    
                    @media (min-width: 1536px) {
                        .card-stack-enhanced .motion-card:nth-child(2) {
                            transform: translateX(70px) scale(0.90) !important;
                        }
                        .card-stack-enhanced .motion-card:nth-child(3) {
                            transform: translateX(140px) scale(0.80) !important;
                        }
                    }
                    
                    /* Mobile Portrait */
                    @media (max-width: 767px) and (orientation: portrait) {
                        .mobile-scroll-container {
                            scroll-snap-type: y proximity;
                            scroll-behavior: smooth;
                            overflow-y: auto;
                            overflow-x: hidden;
                            height: 100vh;
                            -webkit-overflow-scrolling: touch;
                            position: relative;
                        }
                        
                        .image-section-mobile {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 100vh;
                            z-index: 1;
                            transition: transform 0.15s ease-out, opacity 0.15s ease-out;
                            pointer-events: none;
                            will-change: transform, opacity;
                        }
                        
                        .details-section-mobile {
                            position: relative;
                            z-index: 10;
                            min-height: 75vh !important;
                            margin-top: calc(100vh + 12vh) !important;
                            margin-left: 1rem !important;
                            margin-right: 1rem !important;
                            margin-bottom: 12vh !important;
                            padding-top: 0 !important;
                            padding-bottom: 0 !important;
                            background: transparent;
                            scroll-snap-align: center;
                        }
                        
                        .scroll-spacer-top {
                            height: 12vh;
                            pointer-events: none;
                        }
                        
                        .scroll-spacer-bottom {
                            height: 12vh;
                            pointer-events: none;
                        }
                    }

                    /* Mobile Landscape */
                    @media (max-width: 767px) and (orientation: landscape) {
                        .mobile-scroll-container {
                            display: grid;
                            grid-template-columns: 45% 55%;
                            height: 100vh;
                            overflow: hidden;
                        }

                        .image-section-mobile {
                            position: relative !important;
                            height: 100vh !important;
                            transform: none !important;
                            opacity: 1 !important;
                            overflow: hidden;
                            pointer-events: auto !important;
                        }

                        .details-section-mobile {
                            position: relative !important;
                            height: 100vh !important;
                            margin: 0 !important;
                            overflow-y: auto !important;
                            padding: 1rem !important;
                        }

                        .scroll-spacer-top,
                        .scroll-spacer-bottom {
                            display: none !important;
                        }
                    }
                    
                    /* Desktop - disable parallax transforms */
                    @media (min-width: 768px) {
                        .image-section-mobile {
                            transform: none !important;
                            opacity: 1 !important;
                        }
                    }
                    
                    .scrollable-content {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }
                    .scrollable-content::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>

                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    ref={scrollContainerRef}
                    className="flex flex-col md:grid md:grid-cols-2 gap-0 h-full responsive-dialog-content mobile-scroll-container"
                    style={{
                        transform:
                            pullDistance > 0
                                ? `translateY(${Math.min(
                                      pullDistance * 0.4,
                                      50
                                  )}px)`
                                : undefined,
                        transition:
                            pullDistance === 0
                                ? "transform 0.3s ease-out"
                                : undefined,
                    }}
                >
                    {/* Mobile Close Button - Fixed position over image */}
                    <button
                        onClick={() => onOpenChange(false)}
                        className="md:hidden fixed top-4 right-4 z-50 rounded-full p-2 mt-5 sm:mt-0 glass-subtle hover:glass transition-all duration-300 hover:rotate-90 pointer-events-auto outline-none"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    </button>

                    {/* Spacer at top for mobile centering */}
                    <div className="scroll-spacer-top md:hidden"></div>

                    {/* Left/Top Side - Stacked Images */}
                    <div
                        className="image-section-mobile relative p-4 sm:p-6 md:p-8 flex items-center justify-center md:h-full"
                        style={{
                            transform: `scale(${
                                1 - scrollProgress * 0.2
                            }) translateY(${scrollProgress * 50}px)`,
                            opacity: 1 - scrollProgress * 0.7,
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => {
                            setIsHovered(false);
                            setCurrentImageIndex(0);
                        }}
                    >
                        <div className="relative w-full h-full flex items-center justify-center max-h-[calc(100%)] card-stack-enhanced mr-4">
                            {displayImages.length > 0 ? (
                                <AnimatePresence mode="popLayout">
                                    {displayImages.map((image, index) => {
                                        const position =
                                            (index -
                                                currentImageIndex +
                                                displayImages.length) %
                                            displayImages.length;
                                        const isTop = position === 0;
                                        const isSecond = position === 1;

                                        return (
                                            <motion.div
                                                key={`${image}-${index}`}
                                                className="absolute inset-0"
                                                initial={{
                                                    scale: 0.85,
                                                    x: 100,
                                                    opacity: 0,
                                                    zIndex: 0,
                                                }}
                                                animate={{
                                                    scale: isTop
                                                        ? 1.1
                                                        : isSecond
                                                        ? 1
                                                        : 0.88,
                                                    x: isTop
                                                        ? 0
                                                        : isSecond
                                                        ? window.innerWidth <
                                                          768
                                                            ? 30
                                                            : 50
                                                        : window.innerWidth <
                                                          768
                                                        ? 60
                                                        : 100,
                                                    opacity: isTop
                                                        ? 1
                                                        : isSecond
                                                        ? 0.65
                                                        : 0.35,
                                                    zIndex: isTop
                                                        ? 3
                                                        : isSecond
                                                        ? 2
                                                        : 1,
                                                }}
                                                exit={{
                                                    scale: 0.8,
                                                    x: -100,
                                                    opacity: 0,
                                                    zIndex: 0,
                                                }}
                                                transition={{
                                                    duration: 1.2,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }}
                                                data-testid={`modal-img-stack-${index}-${project.id}`}
                                            >
                                                <div className="w-full h-full flex items-center justify-center p-2">
                                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 max-w-[90%] md:max-w-[95%] max-h-[90%] md:max-h-[95%]">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 z-10 pointer-events-none" />
                                                        <img
                                                            src={image}
                                                            alt={`${
                                                                project.title
                                                            } - ${index + 1}`}
                                                            className="object-contain w-full h-full"
                                                            style={{
                                                                maxHeight:
                                                                    window.innerWidth >=
                                                                    768
                                                                        ? window.innerHeight <
                                                                          900
                                                                            ? "85vh"
                                                                            : "80vh"
                                                                        : "65vh",
                                                                maxWidth:
                                                                    "100%",
                                                            }}
                                                            loading="lazy"
                                                        />{" "}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            ) : (
                                <div className="w-4/5 h-4/5 rounded-2xl border border-white/20 dark:border-white/10 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10" />
                            )}
                        </div>
                    </div>

                    {/* Right/Bottom Side - Project Details */}
                    <div className="details-section-mobile relative flex flex-col md:h-full m-2 md:m-0 md:ml-4">
                        {/* Top Glass Section - Metadata */}
                        <div className="z-0 glass-subtle rounded-t-2xl p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-3 md:space-y-4 shrink-0">
                            <div className="flex items-center justify-between gap-2 md:gap-3">
                                <h2
                                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
                                    data-testid={`text-modal-title-${project.id}`}
                                >
                                    {project.title}
                                </h2>
                                <button
                                    onClick={() => onOpenChange(false)}
                                    className="hidden md:block rounded-full p-2 glass-subtle hover:glass transition-all duration-300 hover:rotate-90 outline-none shrink-0"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-[11px] sm:text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium">
                                {project.duration && (
                                    <div
                                        className="flex items-center gap-1.5 sm:gap-2"
                                        data-testid={`text-modal-duration-${project.id}`}
                                    >
                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                        <span>{project.duration}</span>
                                    </div>
                                )}
                                {project.role && (
                                    <div
                                        className="flex items-center gap-1.5 sm:gap-2"
                                        data-testid={`text-modal-role-${project.id}`}
                                    >
                                        <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                        <span>{project.role}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Gradient Section - Description & Highlights */}
                        <div className="relative flex-1 overflow-hidden rounded-b-2xl flex flex-col">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/70 via-pink-50/80 to-cyan-50/85 dark:from-purple-950/25 dark:via-pink-950/20 dark:to-cyan-950/30 backdrop-blur-md" />

                            <div className="relative flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-3 sm:space-y-4 md:space-y-5 scrollable-content">
                                <p className="font-semibold text:xs sm:text-sm md:text-base">
                                    {project.description}
                                </p>
                                <div data-testid={`description-${project.id}`}>
                                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                                        {project.fullDescription}
                                    </p>
                                </div>

                                {project.highlights &&
                                    project.highlights.length > 0 && (
                                        <div
                                            data-testid={`highlights-${project.id}`}
                                        >
                                            <h4 className="font-semibold text-xs sm:text-sm md:text-base mb-2 sm:mb-3 text-slate-800/80 dark:text-slate-200/85">
                                                Key Highlights
                                            </h4>
                                            <ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
                                                {project.highlights.map(
                                                    (highlight, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 flex gap-2 sm:gap-3"
                                                            data-testid={`text-highlight-${idx}-${project.id}`}
                                                        >
                                                            <span className="text-purple-600 dark:text-purple-400 shrink-0 text-base sm:text-lg">
                                                                •
                                                            </span>
                                                            <span>
                                                                {highlight}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                {hasButtons && (
                                    <div className="h-14 sm:h-16 md:h-14 lg:h-16" />
                                )}
                            </div>

                            {hasButtons && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 md:p-4 lg:p-6 pt-2 sm:pt-2.5 md:pt-3 lg:pt-4 bg-transparent button-container rounded-b-2xl backdrop-blur-sm"
                                    data-testid={`links-${project.id}`}
                                >
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                                        {project.demoLink && (
                                            <CircularLinkButton
                                                href={project.demoLink}
                                                icon={ExternalLink}
                                                label="View Demo"
                                                testId={`button-demo-link-${project.id}`}
                                            />
                                        )}
                                        {project.liveLink && (
                                            <CircularLinkButton
                                                href={project.liveLink}
                                                icon={Github}
                                                label="View Code"
                                                testId={`button-live-link-${project.id}`}
                                            />
                                        )}
                                        {project.paperLink && (
                                            <CircularLinkButton
                                                href={project.paperLink}
                                                icon={Link}
                                                label="Attachment"
                                                testId={`button-paper-link-${project.id}`}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                            {isOngoing && (
                                <OngoingBadge className="absolute bottom-0 right-0 m-6" />
                            )}
                        </div>
                    </div>

                    <div className="scroll-spacer-bottom md:hidden"></div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
