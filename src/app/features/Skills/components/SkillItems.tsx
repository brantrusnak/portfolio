import { motion, AnimatePresence } from "motion/react";
import { Card } from "@/components/ui";
import SkillsFilter from "./SkillsFilter";
import SkillItem from "./SkillItem";
import { useSkills } from "../hooks/useSkills";

export default function SkillItems() {
    const { filteredSkills } = useSkills();
    return (
        <Card disableHover hoverEffect={false}>
            <Card.Content className="p-4! sm:p-6!">
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8"
                >
                    <SkillsFilter />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <AnimatePresence mode="wait">
                        <ul
                            role="list"
                            aria-label="Skills grid"
                            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-6 justify-items-center"
                        >
                            {filteredSkills.map((skill) => (
                                <motion.li
                                    key={skill.title}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center justify-center relative"
                                >
                                    <SkillItem skill={skill} />
                                </motion.li>
                            ))}
                        </ul>
                    </AnimatePresence>
                </motion.div>
            </Card.Content>
        </Card>
    );
}