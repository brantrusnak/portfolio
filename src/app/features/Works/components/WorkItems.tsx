import { Timeline } from "@/components/ui";
import WorkItem from "./WorkItem";
import { useWorks } from "../hooks/useWorks";

export default function WorkItems() {
    const { works } = useWorks();

    return (
        <Timeline>
            {works.map((work) => (
                <Timeline.Item
                    key={work.title}
                    dotColor={
                        work.current
                            ? "from-gradient-from via-gradient-via to-gradient-to"
                            : "from-gray-500 to-gray-500"
                    }
                >
                    <WorkItem work={work} />
                </Timeline.Item>
            ))}
        </Timeline>
    );
}