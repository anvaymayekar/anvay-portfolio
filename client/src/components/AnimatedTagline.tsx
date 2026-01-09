import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ENGLISH_TAGLINE = "robots, code & circuits";
const MARATHI_TAGLINE = "रोबोट्स, कोड आणि सर्किट्स";

interface AnimatedTaglineProps {
    currentLanguage: "en" | "mr";
}

export function AnimatedTagline({ currentLanguage }: AnimatedTaglineProps) {
    const tagline =
        currentLanguage === "en" ? ENGLISH_TAGLINE : MARATHI_TAGLINE;

    return (
        <div className="relative h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentLanguage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                    }}
                    className="
                        text-xl md:text-2xl max-w-2xl mx-auto
                        font-semibold tracking-wide text-center select-none
                        font-sans
                        bg-gradient-to-r 
                        from-neutral-600 via-neutral-800 to-neutral-600
                        dark:from-gray-200 dark:via-gray-100 dark:to-gray-200
                        bg-clip-text text-transparent
                        animate-shimmer dark:drop-shadow-[0_0_12px_rgba(200,200,200,0.25)]
                        absolute inset-0 flex items-center justify-center
                    "
                    data-testid="text-subtitle"
                >
                    {tagline}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}
