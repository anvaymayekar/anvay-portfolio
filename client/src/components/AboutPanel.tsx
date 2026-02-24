import { motion } from "framer-motion";
import {
    GraduationCap,
    MapPin,
    Calendar,
    ChartNoAxesGantt,
    ScrollText,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Education } from "@shared/schema";

const ABOUT =
    "I’m an engineering student specializing in Electronics and Computer Science, driven by curiosity and an enduring appetite to learn beyond the classroom. I explore robotics, embedded systems, IoT, computing, and mathematics, constantly seeking knowledge across disciplines, while building hardware–software solutions that are practical, impactful, and designed to solve real-world challenges.";
export function AboutPanel() {
    const { data: education, isLoading } = useQuery<Education[]>({
        queryKey: ["/api/education"],
    });

    const currentEducation = education?.[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass rounded-2xl p-6 space-y-4"
            data-testid="about-panel"
        >
            <h3
                className="text-lg font-bold text-foreground flex items-center gap-2"
                data-testid="text-about-heading"
            >
                <ChartNoAxesGantt className="w-5 h-5 text-primary self-center mr-1" />
                About
            </h3>

            <p
                className="text-sm text-muted-foreground leading-7"
                data-testid="text-about-bio"
            >
                {ABOUT}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <MapPin className="w-3 h-3" />
                <span data-testid="text-location">Mumbai, India</span>
            </div>
        </motion.div>
    );
}
