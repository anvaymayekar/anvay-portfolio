import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-glass bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0.8 : 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-purple-200" />
        ) : (
          <Sun className="w-5 h-5 text-purple-600" />
        )}
      </motion.div>
      <motion.span
        className="text-sm font-medium"
        initial={false}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {isDark ? "Dark" : "Light"}
      </motion.span>
    </button>
  );
}
