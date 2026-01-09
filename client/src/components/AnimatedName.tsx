import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ENGLISH_NAME = "Anvay Mayekar";
const MARATHI_NAME = "अन्वय मयेकर";
const ENGLISH_TAGLINE = "robots, code & circuits";
const MARATHI_TAGLINE = "रोबोट्स, कोड आणि सर्किट्स";
const TYPING_SPEED = 120;
const BACKSPACE_SPEED = 80;
// const PAUSE_DURATION = 2000;
const SKETCH_DURATION = 3000; // Time to sketch the name
const PAUSE_DURATION = 2500; // Pause before fade out
const FADE_OUT_DURATION = 800; // Fade out duration

// Calculate cycle duration
const getTypingDuration = (text: string) => text.length * TYPING_SPEED;
const getBackspacingDuration = (text: string) => text.length * BACKSPACE_SPEED;
const ENGLISH_CYCLE =
    getTypingDuration(ENGLISH_NAME) +
    PAUSE_DURATION +
    getBackspacingDuration(ENGLISH_NAME);
const MARATHI_CYCLE =
    getTypingDuration(MARATHI_NAME) +
    PAUSE_DURATION +
    getBackspacingDuration(MARATHI_NAME);
const FULL_CYCLE = ENGLISH_CYCLE + MARATHI_CYCLE;

export function AnimatedName() {
    const [displayText, setDisplayText] = useState("");
    const [isBackspacing, setIsBackspacing] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState<"en" | "mr">("en");
    const [showCursor, setShowCursor] = useState(true);

    // Broadcast language changes via custom event
    useEffect(() => {
        const event = new CustomEvent("nameLanguageChange", {
            detail: { language: currentLanguage },
        });
        window.dispatchEvent(event);
    }, [currentLanguage]);

    useEffect(() => {
        const targetText =
            currentLanguage === "en" ? ENGLISH_NAME : MARATHI_NAME;

        if (isBackspacing) {
            if (displayText.length > 0) {
                const timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, BACKSPACE_SPEED);
                return () => clearTimeout(timeout);
            } else {
                setIsBackspacing(false);
                setCurrentLanguage((prev) => (prev === "en" ? "mr" : "en"));
            }
        } else {
            if (displayText.length < targetText.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(targetText.slice(0, displayText.length + 1));
                }, TYPING_SPEED);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setIsBackspacing(true);
                }, PAUSE_DURATION);
                return () => clearTimeout(timeout);
            }
        }
    }, [displayText, isBackspacing, currentLanguage]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div
            lang={currentLanguage}
            className="relative pt-10 pb-4 flex items-center justify-start overflow-visible w-11/12 md:w-8/12 2xl:w-10/12"
        >
            <motion.h1
                className="font-display text-5xl ml-1 md:text-5xl lg:text-8xl 2xl:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-300 dark:to-cyan-300 whitespace-nowrap"
                style={{
                    lineHeight: "1.3",
                    paddingTop: "0.25em",
                    paddingBottom: "0.1em",
                    marginLeft: currentLanguage === "mr" ? "9%" : "4%",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                data-testid="text-animated-name"
            >
                <span className="inline-block" style={{ minHeight: "1.3em" }}>
                    {displayText || "\u00A0"}
                </span>
                <AnimatePresence>
                    {showCursor && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="inline-block w-1 ml-2 bg-gradient-to-b from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300 align-middle"
                            style={{
                                height: "1em",
                                transform: "translateY(-0.05em)",
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.h1>
        </div>
    );
}

export function AnimatedTagline() {
    const [currentLanguage, setCurrentLanguage] = useState<"en" | "mr">("en");

    useEffect(() => {
        // Listen for language changes from AnimatedName
        const handleLanguageChange = (event: CustomEvent) => {
            setCurrentLanguage(event.detail.language);
        };

        window.addEventListener(
            "nameLanguageChange",
            handleLanguageChange as EventListener
        );

        return () => {
            window.removeEventListener(
                "nameLanguageChange",
                handleLanguageChange as EventListener
            );
        };
    }, []);

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
