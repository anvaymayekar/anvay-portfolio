import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Award, ExternalLink } from "lucide-react";
import type { Certification } from "@shared/schema";

// Hook to determine grid configuration based on screen size
function useGridConfig() {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = dimensions.width < 768;
    const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
    const itemsPerRow = isMobile ? 2 : 4;
    const rowsPerPage = isMobile ? 3 : isTablet ? 3 : 2;
    const itemsPerPage = rowsPerPage * itemsPerRow;

    return { rowsPerPage, itemsPerPage, isMobile, itemsPerRow };
}

// Calculate exact grid position for true masonry
function getMasonryPosition(index: number, isMobile: boolean) {
    if (isMobile) {
        // Mobile: 2 columns
        const col = index % 2;
        const itemInCol = Math.floor(index / 2);

        // Column 0 starts tall, Column 1 starts short
        const isTall = col === 0 ? itemInCol % 2 === 0 : itemInCol % 2 === 1;

        // Calculate row start based on previous items in this column
        let rowStart = 1;
        for (let i = 0; i < itemInCol; i++) {
            const prevWasTall = col === 0 ? i % 2 === 0 : i % 2 === 1;
            rowStart += prevWasTall ? 3 : 2;
        }

        return {
            gridColumn: col === 0 ? "1 / 7" : "7 / 13",
            gridRow: isTall
                ? `${rowStart} / ${rowStart + 3}`
                : `${rowStart} / ${rowStart + 2}`,
        };
    }

    // Desktop: 4 columns
    const col = index % 4;
    const itemInCol = Math.floor(index / 4);

    // Columns 0,2 start tall; Columns 1,3 start short
    const isTall = col % 2 === 0 ? itemInCol % 2 === 0 : itemInCol % 2 === 1;

    // Calculate row start
    let rowStart = 1;
    for (let i = 0; i < itemInCol; i++) {
        const prevWasTall = col % 2 === 0 ? i % 2 === 0 : i % 2 === 1;
        rowStart += prevWasTall ? 3 : 2;
    }

    const colStart = col * 3 + 1;
    const colEnd = colStart + 3;

    return {
        gridColumn: `${colStart} / ${colEnd}`,
        gridRow: isTall
            ? `${rowStart} / ${rowStart + 3}`
            : `${rowStart} / ${rowStart + 2}`,
        isTall: isTall,
    };
}

const tileVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.25 },
    },
};

export function CertificationStack() {
    const { data: certifications, isLoading } = useQuery<Certification[]>({
        queryKey: ["/api/certifications"],
    });

    const [currentPage, setCurrentPage] = useState(0);
    const { rowsPerPage, itemsPerPage, isMobile } = useGridConfig();

    const totalPages = useMemo(
        () =>
            certifications
                ? Math.ceil(certifications.length / itemsPerPage)
                : 0,
        [certifications, itemsPerPage]
    );

    const currentCertifications = useMemo(() => {
        if (!certifications) return [];
        const start = currentPage * itemsPerPage;
        return certifications.slice(start, start + itemsPerPage);
    }, [certifications, currentPage, itemsPerPage]);

    if (isLoading || !certifications || certifications.length === 0) {
        return null;
    }

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div
            className="w-full max-w-7xl mx-auto px-4"
            data-testid="certification-stack"
        >
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        className="grid grid-cols-12 auto-rows-[102px] gap-3 md:gap-4"
                    >
                        {currentCertifications.map((cert, index) => {
                            const { gridColumn, gridRow, isTall } =
                                getMasonryPosition(index, isMobile);

                            return (
                                <motion.div
                                    key={cert.id}
                                    custom={index}
                                    variants={tileVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    exit="exit"
                                    style={{
                                        gridColumn,
                                        gridRow,
                                    }}
                                    className="relative group"
                                    data-testid={`certification-card-${cert.id}`}
                                >
                                    <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden glass hover:scale-[1.02] transition-all duration-700 ease-out">
                                        {/* Gradient Background (appears on hover) */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                                            <div className="absolute inset-0 education-gradient-main" />
                                            <div className="absolute inset-0 education-gradient-glow" />
                                        </div>

                                        {/* Border */}
                                        <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-60 dark:education-card-border" />

                                        {/* Content */}
                                        <div className="relative h-full p-3 md:p-4 flex flex-col justify-between pb-4 md:pb-6">
                                            <div className="space-y-2">
                                                <div className="p-1.5 rounded-lg education-icon-badge w-fit">
                                                    <Award className="w-3.5 h-3.5 md:w-4 md:h-4 education-badge-text transition-colors duration-700 ease-out group-hover:text-white" />
                                                </div>

                                                <h3
                                                    className="text-xs md:text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight line-clamp-2 transition-colors duration-700 ease-out group-hover:text-white"
                                                    data-testid="text-cert-title"
                                                >
                                                    {cert.title}
                                                </h3>

                                                <p
                                                    className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400 line-clamp-1 transition-colors duration-700 ease-out group-hover:text-white/90"
                                                    data-testid="text-cert-issuer"
                                                >
                                                    {cert.issuer}
                                                </p>

                                                {cert.description && (
                                                    <p
                                                        className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 line-clamp-2 leading-relaxed transition-colors duration-700 ease-out group-hover:text-white/80"
                                                        data-testid="text-cert-description"
                                                    >
                                                        {cert.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-row items-center justify-between">
                                                {cert.date && (
                                                    <p
                                                        className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 transition-colors duration-700 ease-out group-hover:text-white/75"
                                                        data-testid="text-cert-date"
                                                    >
                                                        {cert.date}
                                                    </p>
                                                )}

                                                {cert.credentialUrl && (
                                                    <a
                                                        href={
                                                            cert.credentialUrl
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg glass-subtle opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-700 ease-out"
                                                        data-testid="button-cert-verify"
                                                        title="View Certificate"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 transition-colors duration-700 ease-out group-hover:text-white" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Page Indicators */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentPage
                                        ? "bg-primary w-8"
                                        : "bg-slate-300 dark:bg-slate-600 w-2"
                                }`}
                                data-testid={`button-cert-page-${index}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
