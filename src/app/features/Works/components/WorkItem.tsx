"use client";

import { Button, Card } from "@/components/ui";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Work } from "@/types";
import { useTranslations, useFormatter } from "next-intl";
import { Badge } from "@/components/ui/badge";

interface WorkItemProps {
  work: Work;
}

export default function WorkItem({ work }: WorkItemProps) {
  const format = useFormatter();
  const actions = useTranslations("actions");
  const workHistory = useTranslations(`Work.history.${work.title}`);
  const expandedContent = workHistory.raw('expandedContent');

  const formatDate = (date: Date) => {
    return format.dateTime(date, {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card>
      <Card.Header className="mt-6 md:mt-0">
        <h3 className="text-2xl font-semibold mb-1">
          {workHistory('position')}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <h4 className="text-lg font-semibold">{work.title}</h4>
          <Badge variant="default">{workHistory('type')}</Badge>
        </div>
        {work.time && (
          <div className="text-sm text-muted-foreground">
            {formatDate(work.time.from)} -{" "}
            {work.time.to
              ? formatDate(work.time.to)
              : "Present"}
          </div>
        )}
      </Card.Header>
      <Card.Content>
        {work.stack?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {work.stack.map((tech) => (
              <Badge variant="secondary" key={tech}>{tech}</Badge>
            ))}
          </div>
        )}
      </Card.Content>
      <Card.Footer>
        {work.link && (
          <div className="flex items-center">
            <Link href={work.link} target="_blank" rel="noopener noreferrer">
              <Button
                aria-label={`Visit ${work.title} website`}
                variant="default"
              >
                <span className="sr-only">Visit Website</span>
                <span>{actions("visit")} {work.title}</span>
                <FaArrowUpRightFromSquare />
              </Button>
            </Link>
          </div>
        )}
      </Card.Footer>
      <Card.ExpandedContent>
        <ul className="list-inside list-disc leading-relaxed">
          {expandedContent?.map((item: string) => (
            <li key={item} className="text-sm text-muted-foreground mb-2">
              {item}
            </li>
          ))}
        </ul>
      </Card.ExpandedContent>
    </Card>
  );
}
