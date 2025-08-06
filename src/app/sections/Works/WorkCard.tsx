"use client";

import { Button, Card, Tag } from "@/components/ui";
import { formatDateToMonthYear } from "@/utils/date";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Work } from "@/types/Work";
import { useClientLocale } from "@/hooks/useClientLocale";

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  const locale = useClientLocale();
  return (
    <Card>
      <Card.Header className="mt-6 md:mt-0">
        <h3 className="text-2xl font-semibold text-white mb-1">
          {work.position}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <h4 className="text-lg font-semibold text-white">{work.title}</h4>
          <Tag>{work.type}</Tag>
        </div>
        {work.time && (
          <div className="text-sm text-gray-400">
            {formatDateToMonthYear(work.time.from, locale)} -{" "}
            {work.time.to
              ? formatDateToMonthYear(work.time.to, locale)
              : "Present"}
          </div>
        )}
      </Card.Header>
      <Card.Content>
        {work.stack?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {work.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}
      </Card.Content>
      <Card.Footer>
        {work.link && (
          <div className="flex items-center">
            <Link href={work.link} target="_blank" rel="noopener noreferrer">
              <Button
                ariaLabel={`Visit ${work.title} website`}
                variant="default"
                rightIcon={<FaArrowUpRightFromSquare />}
              >
                <span className="sr-only">Visit Website</span>
                <span>Visit {work.title}</span>
              </Button>
            </Link>
          </div>
        )}
      </Card.Footer>
      <Card.ExpandedContent>
        <ul className="list-inside list-disc leading-relaxed">
          {work.responsibilities?.map((responsibility) => (
            <li key={responsibility} className="text-sm text-gray-400 mb-2">
              {responsibility}
            </li>
          ))}
        </ul>
      </Card.ExpandedContent>
    </Card>
  );
}
