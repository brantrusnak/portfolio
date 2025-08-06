"use client";

import { Skill } from "@/types";
import { Project } from "@/types/Project";
import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";

const initialProjects: readonly Project[] = [
  {
    title: "Portfolio",
    image: "/img/websites/portfolio.webp",
    description:
      "Personal site to showcase my work and frontend thinking, built with Next.js and Tailwind for fast load times, clean design, and a smooth UX.",
    stack: [
      Skill.NextJS,
      Skill.React,
      Skill.Netlify,
      Skill.HTML5,
      Skill.CSS3,
      Skill.SCSS,
      Skill.TypeScript,
      Skill.TailwindCSS,
      Skill.Motion,
    ],
    link: "https://github.com/brantrusnak/portfolio",
  },
  {
    title: "Les Pelotines",
    image: "/img/websites/les_pelotines.webp",
    description:
      "Ecommerce site for a countryside crochet business in France, built with Next.js, Storyblok, and Stripe to enable flexible content and seamless checkout.",
    stack: [
      Skill.NextJS,
      Skill.React,
      Skill.ShadcnUI,
      Skill.Vercel,
      Skill.HTML5,
      Skill.CSS3,
      Skill.SCSS,
      Skill.TypeScript,
      Skill.TailwindCSS,
      Skill.Storyblok,
      Skill.Stripe,
    ],
    link: "https://mojii.net/",
  },
  {
    title: "ICD Code Lookup",
    image: "/img/websites/icd.webp",
    description:
      "Search tool for ICD-10 codes, built with Angular Universal for SEO and SSR. Focused on accessibility and fast lookup for clinicians.",
    stack: [
      Skill.HTML5,
      Skill.CSS3,
      Skill.SCSS,
      Skill.Angular,
      Skill.TypeScript,
      Skill.AngularUniversal,
      Skill.Apache,
    ],
    link: "https://icdcodelookup.com/",
  },
  {
    title: "Innovative Extracts",
    image: "/img/websites/ie.webp",
    description:
      "Ecommerce site for a veteran-owned CBD company, migrated from Shopify to BigCommerce to support custom storefront features and full seed-to-sale transparency.",
    stack: [
      Skill.BigCommerce,
      Skill.HTML5,
      Skill.CSS3,
      Skill.SCSS,
      Skill.StencilCLI,
      Skill.JavaScript,
      Skill.jQuery,
    ],
    link: "https://ie-cbd.com/",
  },
  {
    title: "R. Jeffrey Kimball",
    image: "/img/websites/rjk.webp",
    description:
      "Redesigned the website for a business leadership coach using Grav with PHP, Twig, and Webpack to deliver a fast, modern site with clean structure and focused messaging.",
    stack: [
      Skill.HTML5,
      Skill.Twig,
      Skill.CSS3,
      Skill.SCSS,
      Skill.SpectreCSS,
      Skill.JavaScript,
      Skill.jQuery,
      Skill.PHP,
      Skill.Composer,
      Skill.YAML,
      Skill.Apache,
      Skill.Grav,
      Skill.Webpack,
    ],
    link: "https://www.rjeffreykimball.com/",
  },
  {
    title: "Topics",
    image: "/img/websites/topics.webp",
    description:
      "Content analysis tool that scored and optimized writing in real time using keyword density and SEO signals. Built with Angular and Java for fast feedback and structured evaluation.",
    stack: [
      Skill.HTML5,
      Skill.CSS3,
      Skill.Angular,
      Skill.Java,
      Skill.MySQL,
      Skill.MongoDB,
    ],
  },
  {
    title: "Pong",
    image: "/img/websites/pong.webp",
    description:
      "A simple Pong clone built with HTML, CSS, and JavaScript to explore game logic, animation timing, and vanilla canvas rendering.",
    stack: [
      Skill.HTML5,
      Skill.CSS3,
      Skill.TypeScript,
      Skill.Webpack,
      Skill.Netlify,
    ],
    link: "https://github.com/brantrusnak/pong",
  },
  {
    title: "jaTracker",
    image: "/img/websites/jaTracker.webp",
    wip: true,
    description:
      "A job app tracker built with React and Flask to keep tabs on applications, interviews, and progress during the job hunt.",
    stack: [
      Skill.HTML5,
      Skill.CSS3,
      Skill.React,
      Skill.TypeScript,
      Skill.Python,
      Skill.Flask,
      Skill.MongoDB,
      Skill.Webpack,
    ],
    link: "https://github.com/brantrusnak/jaTracker-ui",
  },
  {
    title: "Portfolio (Old)",
    image: "/img/websites/portfolio_old.webp",
    description:
      "Retired portfolio built with HTML, SCSS, Mustache, and TypeScript, deployed with Apache on DigitalOcean.",
    stack: [
      Skill.HTML5,
      Skill.Mustache,
      Skill.CSS3,
      Skill.SCSS,
      Skill.TypeScript,
      Skill.Gulp,
      Skill.Webpack,
      Skill.Apache,
      Skill.DigitalOcean,
    ],
    link: "https://github.com/brantrusnak/portfolio/tree/old",
  },
  {
    title: "tlkr.",
    image: "/img/websites/tlkr.webp",
    wip: true,
    description:
      "Prototype for a social media platform, built with Angular, Node.js, and MySQL using Passport.js for authentication. Focused on user posts, sessions, and full-stack integration.",
    stack: [
      Skill.HTML5,
      Skill.CSS3,
      Skill.Angular,
      Skill.NodeJS,
      Skill.Express,
      Skill.PassportJS,
      Skill.MySQL,
      Skill.TypeScript,
      Skill.Sequelize,
      Skill.Netlify,
      Skill.Heroku,
    ],
    link: "https://github.com/brantrusnak/tlkr-api",
  },
  {
    title: "Keyframe Generator",
    image: "/img/websites/keyframe_gen.webp",
    description:
      "Early utility tool built with HTML, CSS, and JavaScript to help generate CSS keyframes with calculated pauses and delays by converting timing into keyframe percentages.",
    stack: [Skill.HTML5, Skill.CSS3, Skill.JavaScript, Skill.Netlify],
    link: "https://github.com/brantrusnak/keyframe-delay-generator",
  },
];

type ProjectsContextType = {
  projects: readonly Project[];
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects] = useState<readonly Project[]>(initialProjects);
  const value = useMemo(() => ({ projects }), [projects]);

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
