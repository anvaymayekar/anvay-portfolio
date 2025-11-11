import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ENGLISH_NAME = "Anvay Mayekar";
const MARATHI_NAME = "अन्वय मायेकर";
const TYPING_SPEED = 120;
const BACKSPACE_SPEED = 80;
const PAUSE_DURATION = 2000;

export function AnimatedName() {
  const [displayText, setDisplayText] = useState("");
  const [isBackspacing, setIsBackspacing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "mr">("en");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const targetText = currentLanguage === "en" ? ENGLISH_NAME : MARATHI_NAME;

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
    <div className="relative min-h-[4rem] flex items-center justify-center md:justify-start">
      <motion.h1
        className="font-display text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-300 dark:to-cyan-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        data-testid="text-animated-name"
      >
        {displayText}
        <AnimatePresence>
          {showCursor && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-block w-1 h-[0.9em] ml-1 bg-gradient-to-b from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300"
            />
          )}
        </AnimatePresence>
      </motion.h1>
    </div>
  );
}
