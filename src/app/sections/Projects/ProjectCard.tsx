"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Project } from "@/types/Project";
import { Card, Tag, Button } from "@/components/ui";

export default function ProjectCard({
  project,
  isEven,
}: {
  project: Project;
  isEven: boolean;
}) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, x: isEven ? "-20px" : "20px" }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Card className="h-full w-full" disableHover={true} hoverEffect={false}>
        <Card.Content className="p-0! grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 h-full">
          <div className="relative">
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={500}
              loading="lazy"
              priority={false}
              aria-hidden="true"
              className="absolute size-full object-cover object-left-top rounded-tl-md rounded-bl-md"
            />
          </div>
          <div className="h-full bg-card-dark">
            <Card.Header>{project.title}</Card.Header>
            <Card.Content>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map((tech: string) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
              {project.description}
            </Card.Content>
            <Card.Footer>
              {project.link && (
                <div className="flex items-center">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      ariaLabel={`Visit ${project.title}`}
                      rightIcon={<FaArrowUpRightFromSquare />}
                    >
                      Visit {project.title}
                    </Button>
                  </Link>
                </div>
              )}
            </Card.Footer>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
}
