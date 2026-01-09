import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Calendar, Award } from "lucide-react";

interface Education {
    id: number;
    degree: string;
    field: string;
    institution: string;
    duration: string;
    grade?: string;
    description?: string;
    current?: boolean;
}

// Animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" },
    }),
};

// Reusable Info Item Component
const InfoItem = ({
    icon: Icon,
    text,
    testId,
}: {
    icon: typeof GraduationCap;
    text: string;
    testId?: string;
}) => (
    <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span data-testid={testId}>{text}</span>
    </div>
);

// Current Education Card Component
const CurrentEducationCard = ({ education }: { education: Education }) => (
    <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
        className="lg:col-span-2 lg:row-span-2"
        data-testid={`education-card-${education.id}`}
    >
        <div className="relative h-full min-h-[320px] rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
            {/* Gradient Backgrounds */}
            <div className="absolute inset-0 education-gradient-main" />
            <div className="absolute inset-0 education-gradient-glow" />

            {/* Hover Glow */}
            <div className="absolute -inset-1 education-card-hover-glow" />

            {/* Dot Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 education-dot-pattern" />
            </div>

            {/* Content */}
            <div className="relative h-full p-6 lg:p-8 flex flex-col justify-between text-white">
                <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Currently Pursuing
                    </div>

                    {/* Title and Field */}
                    <div>
                        <h3
                            className="text-2xl lg:text-3xl font-bold mb-1"
                            data-testid="text-education-degree"
                        >
                            {education.degree}
                        </h3>
                        <p
                            className="text-lg lg:text-xl text-white/90 font-medium"
                            data-testid="text-education-field"
                        >
                            {education.field}
                        </p>
                    </div>

                    {/* Info Items */}
                    <div className="flex flex-col flex-wrap gap-4 text-sm pb-5">
                        <InfoItem
                            icon={GraduationCap}
                            text={education.institution}
                            testId="text-education-institution"
                        />
                        <InfoItem
                            icon={Calendar}
                            text={education.duration}
                            testId="text-education-duration"
                        />
                        {education.grade && (
                            <InfoItem
                                icon={Award}
                                text={education.grade}
                                testId="text-education-grade"
                            />
                        )}
                    </div>
                </div>

                {/* Description */}
                {education.description && (
                    <p
                        className="text-sm text-white/85 leading-relaxed"
                        data-testid="text-education-description"
                    >
                        {education.description}
                    </p>
                )}
            </div>
        </div>
    </motion.div>
);

// Past Education Card Component
const PastEducationCard = ({
    education,
    index,
}: {
    education: Education;
    index: number;
}) => {
    const showCETBadge =
        education.degree === "Higher Secondary School Certificate (HSC)";

    return (
        <motion.div
            custom={0.6 + index * 0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            className="lg:col-span-1"
            data-testid={`education-card-${education.id}`}
        >
            <div className="relative h-full min-h-[150px] rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 glass">
                {/* Background Layers */}
                {/* <div className="absolute inset-0 education-card-bg" /> */}
                <div className="absolute inset-0 education-card-overlay" />

                {/* Hover Glow */}
                <div className="absolute -inset-1 education-card-hover-glow" />

                {/* Border */}
                <div className="absolute inset-0 rounded-2xl opacity-60 dark:education-card-border" />

                {/* Content */}
                <div className="relative h-full p-5 flex flex-col justify-between">
                    {/* Header */}
                    <div>
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 rounded-lg education-icon-badge">
                                <GraduationCap className="w-4 h-4 education-badge-text" />
                            </div>
                            {showCETBadge && (
                                <span
                                    className="text-xs py-1 px-2 rounded-lg education-icon-badge education-badge-text"
                                    data-testid="text-education-percentile"
                                >
                                    <span className="font-bold">CET: </span>
                                    <span className="font-medium">
                                        92.33%ile
                                    </span>
                                </span>
                            )}
                        </div>

                        <h4
                            className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 leading-tight"
                            data-testid="text-education-degree"
                        >
                            {education.degree}
                        </h4>
                        <p
                            className="text-xs text-slate-600 dark:text-slate-400 mb-2 line-clamp-1"
                            data-testid="text-education-field"
                        >
                            {education.field}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="space-y-1.5">
                        <p
                            className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-1"
                            data-testid="text-education-institution"
                        >
                            {education.institution}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span data-testid="text-education-duration">
                                {education.duration}
                            </span>
                            {education.grade && (
                                <span
                                    className="font-semibold education-badge-text"
                                    data-testid="text-education-grade"
                                >
                                    {education.grade}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Main Component
export function EducationStack() {
    const { data: education, isLoading } = useQuery<Education[]>({
        queryKey: ["/api/education"],
    });

    if (isLoading) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!education || education.length === 0) return null;

    const currentEducation =
        education.find((edu) => edu.current) || education[0];
    const pastEducation = education.filter(
        (edu) => edu.id !== currentEducation.id
    );

    return (
        <div
            className="w-full max-w-7xl mx-auto px-4"
            data-testid="education-grid"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <CurrentEducationCard education={currentEducation} />

                {pastEducation.map((edu, index) => (
                    <PastEducationCard
                        key={edu.id}
                        education={edu}
                        index={index}
                    />
                ))}

                {/* Empty State */}
                {pastEducation.length === 0 && (
                    <div className="lg:col-span-1 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center min-h-[180px]">
                        <p className="text-sm text-slate-400 dark:text-slate-600">
                            More coming soon
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
