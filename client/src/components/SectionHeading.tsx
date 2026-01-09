import { motion } from "framer-motion";

interface SectionHeadingProps {
    children: React.ReactNode;
    testId?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    children,
    testId = "section-heading",
}) => {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-br from-indigo-800 via-purple-500 to-cyan-400 dark:from-indigo-500 dark:via-purple-400 dark:to-cyan-300  bg-[length:100%_auto]"
            data-testid={testId}
        >
            {children}
        </motion.h2>
    );
};
