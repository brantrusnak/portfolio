"use client";

import { Skill } from "@/types";
import { Work } from "@/types/Work";
import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";

const initialWorks: readonly Work[] = [
  {
    title: "Lionhart Imaging",
    position: "Software Engineer",
    image: "/img/websites/lionhart.webp",
    stack: [
      Skill.Python,
      Skill.Flask,
      Skill.HTML5,
      Skill.CSS3,
      Skill.SCSS,
      Skill.Angular,
      Skill.TypeScript,
      Skill.PrimeNG,
      Skill.NgRx,
      Skill.AWS,
      Skill.Netlify,
      Skill.GoogleCloud,
      Skill.MySQL,
      Skill.Electron,
      Skill.WebWorker,
      Skill.IndexedDB,
      Skill.SocketIO,
      Skill.WebRTC,
    ],
    time: { from: new Date("2023-08-01"), to: null },
    type: "Contract",
    current: true,
    responsibilities: [
      "Led the architecture and launch of a full-stack radiology reporting platform using Angular, NgRx, Python, and MySQL, hosted via AWS and Netlify with deployment pipelines-scaling from a single-user prototype to a foundation capable of supporting multiple teams and clinics.",
      "Increased reporting efficiency by 85% for a small clinical team processing 2,400+ reports over 3 months-designing intuitive workflows, reducing cognitive load, and streamlining PACS-driven interactions.",
      "Improved transcription clarity and editorial confidence, reducing reporting errors by integrating Deepgram for speech-to-text and ChatGPT for real-time quality assurance.",
      "Collaborated directly with radiologists to design modular report structuring tools, enabling flexible workflows and reducing editing friction - resulting in faster turnaround times and improved usability.",
      "Authored technical documentation including backend API specifications, database diagrams, and annotated Angular services to support integration, maintenance, and decoupling.",
    ],
  },
  {
    title: "Omadeus",
    position: "Senior Frontend Engineer, Team Lead",
    image: "/img/websites/omadeus.webp",
    stack: [
      Skill.HTML5,
      Skill.CSS3,
      Skill.SCSS,
      Skill.Vue,
      Skill.TypeScript,
      Skill.Vuex,
      Skill.IndexedDB,
      Skill.Electron,
      Skill.WebWorker,
      Skill.WebRTC,
      Skill.WebSockets,
      Skill.Vite,
    ],
    time: { from: new Date("2020-09-01"), to: null },
    link: "https://omadeus.com/",
    type: "Full Time",
    current: true,
    responsibilities: [
      "Reduced login time by 63% for a ~100-user platform by refactoring store methods and optimizing state updates and UI rendering, accelerating product development through immediate feedback and tight iteration loops.",
      "Improved UI responsiveness by over 70% and cut Largest Contentful Paint (LCP) from 6s to 0.5s by offloading compute-heavy state-saving operations to a Web Worker thread, eliminating main thread blocking and enabling smooth animations and near instant UI rendering from cached data.",
      "Drove frontend roadmap and mentored junior developers, leading a 5+ person team and supporting two additional teams.",
      "Managed sprint planning and onboarding across a growing team, improving delivery consistency and reducing new engineer ramp-up time through structured coordination and cross-functional alignment.",
      "Shaped product direction through engineering-led feedback, translating daily usage pain points into prioritized feature requests and quick-turnaround fixes that improved user experience and internal workflow efficiency.",
    ],
  },
  {
    title: "LIO",
    position: "Mid Software Engineer, Consultant",
    image: "/img/websites/lio.webp",
    stack: [
      Skill.HTML5,
      Skill.CSS3,
      Skill.SCSS,
      Skill.Bulma,
      Skill.TypeScript,
      Skill.Threejs,
      Skill.Tweenjs,
      Skill.Webpack,
      Skill.Gulp,
      Skill.NodeJS,
      Skill.Apache,
      Skill.React,
      Skill.NextJS,
    ],
    link: "https://lio.agency/",
    time: { from: new Date("2019-04-01"), to: new Date("2019-09-01") },
    type: "Full Time",
    current: false,
    responsibilities: [
      "Architected SEO-optimized React and Next.js applications with server-side rendering (SSR), improving campaign load performance and increasing search engine visibility for clients.",
      "Implemented CI/CD pipelines with GitHub Actions, cutting deployment time by 75% and enabling safer, more frequent releases with improved developer confidence.",
      "Led client-facing project scoping and technical strategy, ensuring dev alignment with business goals and improving delivery outcomes across campaign implementations.",
    ],
  },
  {
    title: "theLandscape",
    position: "Software Engineer",
    image: "/img/websites/tls.webp",
    stack: [
      Skill.HTML5,
      Skill.CSS3,
      Skill.AngularJS,
      Skill.JavaScript,
      Skill.Angular,
      Skill.TypeScript,
      Skill.Java,
      Skill.Kotlin,
      Skill.PHP,
      Skill.ApacheThrift,
      Skill.MySQL,
      Skill.MongoDB,
    ],
    time: { from: new Date("2016-01-01"), to: new Date("2019-04-01") },
    type: "Full Time",
    current: false,
    responsibilities: [
      "Developed and maintained a reusable Angular component library adopted across 5+ internal applications, standardizing UI patterns and reducing frontend defects and implementation time.",
      "Migrated legacy AngularJS apps to modern Angular, improving performance, security, and maintainability-cutting technical debt and reducing bug reports by 30%.",
      "Contributed to full-stack feature development using Angular, Java, MySQL, and MongoDB-bridging frontend and backend tasks while collaborating with designers to ensure responsive, design-aligned UIs and accelerating delivery of cross-functional features.",
    ],
  },
];

type WorksContextType = {
  works: readonly Work[];
};

const WorksContext = createContext<WorksContextType | undefined>(undefined);

export function WorksProvider({ children }: { children: ReactNode }) {
  const [works] = useState<readonly Work[]>(initialWorks);
  const value = useMemo(() => ({ works }), [works]);

  return (
    <WorksContext.Provider value={value}>{children}</WorksContext.Provider>
  );
}

export function useWorks() {
  const context = useContext(WorksContext);
  if (context === undefined) {
    throw new Error("useWorks must be used within a WorksProvider");
  }
  return context;
}
