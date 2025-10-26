# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, React 19, TailwindCSS 4, and Three.js. Features internationalization and theme switching.

## Features

- Modern UI with animations using Motion
- 3D elements and particle effects with Three.js and React Three Fiber
- Responsive design with TailwindCSS
- Fast performance with Next.js 15 and Turbopack
- TypeScript for type safety
- Multi-language support (English/French) with next-intl
- Dark/light theme switching
- Advanced 3D particle effects and post-processing
- Modal system for project details

## Sections

- About: Personal introduction and biography
- Skills: Technical skills and expertise with filtering
- Works: Professional experience and work history
- Projects: Showcase of personal and professional projects

## Tech Stack

- **Framework**: Next.js 15.5.2
- **UI Library**: React 19.0.0
- **Styling**: TailwindCSS 4
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Motion
- **Internationalization**: next-intl
- **Theme Management**: next-themes
- **UI Components**: Radix UI
- **Icons**: Lucide React, React Icons
- **Language**: TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server with Turbopack:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Main application pages and sections
  - `features/`: Individual section components (About, Skills, Works, Projects)
  - `providers/`: React context providers (Theme, Modal, Motion, etc.)
- `src/components`: Reusable UI components
  - `Navigation/`: Navbar, dropdowns, theme switch
  - `Particles/`: 3D particle effects and blur effects
  - `ui/`: Base UI components (Cards, Timeline, etc.)
- `src/hooks`: Custom React hooks
- `src/i18n`: Internationalization configuration
- `src/services`: Service layer (locale management)
- `src/config`: Application configuration
- `src/data`: Static data (projects, skills, works, socials)
- `src/styles`: Global styles and TailwindCSS configuration
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions
- `messages/`: Translation files (en.json, fr.json)

## Deployment

This project is configured for easy deployment on Vercel:

```bash
npm run build
# or
yarn build
```

For more details on deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
