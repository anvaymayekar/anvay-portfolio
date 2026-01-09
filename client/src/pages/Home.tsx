import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileText, Code } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AnimatedName, AnimatedTagline } from "@/components/AnimatedName";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { AboutPanel } from "@/components/AboutPanel";
import { EducationStack } from "@/components/EducationStack";
import { CertificationStack } from "@/components/CertificationStack";
import { AchievementStack } from "@/components/AchievementStack";
import { useCursorGradient } from "@/hooks/use-cursor-gradient";
import type { Project } from "@shared/schema";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGallery } from "@/components/ProjectGallery";
export default function Home() {
    const { data: projects, isLoading } = useQuery<Project[]>({
        queryKey: ["/api/projects"],
    });

    useCursorGradient();

    return (
        <div className="min-h-screen w-full overflow-x-hidden cursor-gradient">
            {/* Navigation Menu - Upper Left */}
            <div className="fixed top-6 left-6 z-50">
                <Navigation />
            </div>

            {/* Hero Section */}
            <section
                id="hero"
                className="relative min-h-screen flex items-center justify-center px-6 py-16 sm:py-10"
            >
                <div className="w-full max-w-5xl h-full mx-auto space-y-10">
                    {/* Centered Name */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-14"
                        data-testid="hero-name-container"
                    >
                        <div className="flex justify-center items-center mt-2">
                            <AnimatedName />
                        </div>
                        <AnimatedTagline />
                    </motion.div>

                    {/* About and Avatar Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pb-8">
                        {/* About Panel */}
                        <div>
                            <AboutPanel />
                        </div>

                        {/* Avatar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex items-center justify-center"
                            data-testid="avatar-container"
                        >
                            <div className="relative">
                                <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-full glass-strong overflow-hidden">
                                    <img
                                        src="https://github.com/anvaymayekar.png"
                                        alt="Anvay Mayekar"
                                        className="w-full h-full object-cover"
                                        data-testid="img-avatar"
                                    />
                                </div>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-xl"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            asChild
                            size="lg"
                            variant="default"
                            data-testid="button-projects"
                        >
                            <a href="#projects">
                                {" "}
                                <Code className="w-4 h-4 mr-2" />
                                View Projects
                            </a>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            data-testid="button-resume"
                        >
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Resume
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="relative py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading testId="heading-education">
                        Education
                    </SectionHeading>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <EducationStack />
                    </motion.div>
                </div>
            </section>
            <section id="experience" className="relative pt-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading testId="heading-experience">
                        Experience
                    </SectionHeading>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <ExperienceTimeline />
                    </motion.div>
                </div>
            </section>
            {/* Certifications Section */}
            <section id="certifications" className="relative py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading testId="heading-certifications">
                        Certifications
                    </SectionHeading>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <CertificationStack />
                    </motion.div>
                </div>
            </section>

            {/* Achievements Section */}
            {/* <section id="achievements" className="relative py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading testId="heading-achievements">
                        Achievements
                    </SectionHeading>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <AchievementStack />
                    </motion.div>
                </div>
            </section> */}

            {/* Projects Section */}
            <section id="projects" className="relative py-20 px-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-purple-100/30 to-pink-100/30 dark:from-cyan-900/20 dark:via-purple-900/20 dark:to-pink-900/20 transition-colors duration-700" />

                <div className="relative max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="pb-1 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 dark:from-purple-500 dark:via-pink-400 dark:to-cyan-500 mb-4">
                            Project Gallery
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore my work in engineering and computer science
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            data-testid="projects-loading"
                        >
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl backdrop-blur-glass bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 shadow-lg h-64 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : projects && projects.length > 0 ? (
                        <ProjectGallery />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                            data-testid="projects-empty"
                        >
                            <p className="text-xl text-muted-foreground">
                                Projects coming soon...
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer
                id="connect"
                className="relative py-16 bg-gradient-to-t from-purple-100/40 to-transparent dark:from-purple-900/20 dark:to-transparent transition-colors duration-700"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-purple-100/40 to-transparent dark:from-purple-900/20 dark:to-transparent transition-colors duration-700" />

                <div className="relative max-w-4xl mx-auto">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-12" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-6"
                    >
                        <h3 className="text-2xl font-semibold text-foreground">
                            Let's Connect
                        </h3>

                        <div className="flex justify-center gap-6">
                            <a
                                href="mailto:anvaay@gmail.com"
                                className="p-4 rounded-2xl backdrop-blur-sm bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/20 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
                                aria-label="Email"
                                data-testid="link-email"
                            >
                                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </a>
                            <a
                                href="https://github.com/anvaymayekar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-2xl backdrop-blur-sm bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/20 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
                                aria-label="GitHub"
                                data-testid="link-github"
                            >
                                <Github className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </a>
                            <a
                                href="https://linkedin.com/in/anvaymayekar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-2xl backdrop-blur-sm bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/20 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
                                aria-label="LinkedIn"
                                data-testid="link-linkedin"
                            >
                                <Linkedin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </a>
                        </div>

                        <p className="text-sm text-muted-foreground/70 px-3">
                            © 2025 Anvay Mayekar. Built with passion and
                            precision.
                        </p>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}
