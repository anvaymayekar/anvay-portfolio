import { useState, useEffect } from "react";
import {
    Menu,
    X,
    Home,
    User,
    GraduationCap,
    Award,
    Briefcase,
    MailOpen,
    FolderOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
    { id: "hero", label: "Home", href: "#hero", icon: Home },
    // { id: "about", label: "About", href: "#about", icon: User },
    {
        id: "education",
        label: "Education",
        href: "#education",
        icon: GraduationCap,
    },
    {
        id: "experience",
        label: "Experience",
        href: "#experience",
        icon: Briefcase,
    },
    {
        id: "certifications",
        label: "Certifications",
        href: "#certifications",
        icon: Award,
    },
    { id: "projects", label: "Projects", href: "#projects", icon: FolderOpen },
    { id: "connect", label: "Connect", href: "#connect", icon: MailOpen },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeSection, setActiveSection] = useState("hero");

    const toggleNav = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navigationItems.map((item) => ({
                id: item.id,
                element: document.getElementById(item.id),
            }));

            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.element) {
                    const offsetTop = section.element.offsetTop;
                    if (scrollPosition >= offsetTop) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Background Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 backdrop-blur-lg z-40"
                        onClick={toggleNav}
                    />
                )}
            </AnimatePresence>

            <div className="fixed top-6 left-6 z-50">
                {/* Toggle Button */}
                <motion.button
                    onClick={toggleNav}
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center glass-subtle cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        {!isOpen ? (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="w-6 h-6 text-gray-800 dark:text-gray-100" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="close"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6 text-gray-800 dark:text-gray-100" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Navigation Icons */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-20 left-0 flex flex-col gap-5 justify-between"
                        >
                            {navigationItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <motion.a
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        onMouseEnter={() =>
                                            setHoveredIndex(index)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredIndex(null)
                                        }
                                        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer group overflow-hidden ${
                                            isActive ? "" : "glass"
                                        }`}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {/* Active gradient background layers (matching education card style) */}
                                        {isActive && (
                                            <>
                                                {/* Main gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-300 dark:from-violet-600 dark:via-purple-600 dark:to-cyan-400" />

                                                {/* Glow layer */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/50 via-purple-500/50 to-cyan-300/50 dark:from-violet-600/50 dark:via-purple-600/50 dark:to-cyan-400/50 blur-2xl" />

                                                {/* Dot pattern overlay */}
                                                <div className="absolute inset-0 opacity-10">
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            backgroundImage:
                                                                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                                                            backgroundSize:
                                                                "32px 32px",
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <Icon
                                            className={`w-6 h-6 relative z-10 ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-purple-600 dark:text-purple-400"
                                            }`}
                                        />

                                        {/* Tooltip */}
                                        <AnimatePresence>
                                            {hoveredIndex === index && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    className="absolute left-full ml-4 px-4 py-2 rounded-xl glass-subtle whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-100"
                                                >
                                                    {item.label}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
