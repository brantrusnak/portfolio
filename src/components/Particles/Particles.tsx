"use client";

import { Canvas } from "@react-three/fiber";
import { ParticlesLogic } from "@/components/Particles/ParticlesLogic";
import { BlurEffect } from "@/components/Particles/BlurEffect";
import { useReducedMotion } from "framer-motion";

export interface ParticlesProps {
  particleCount?: number;
  baseHue?: number;
  rangeHue?: number;
  baseRadius?: number;
  rangeRadius?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseTTL?: number;
  rangeTTL?: number;
  noiseSteps?: number;
  rangeY?: number;
  className?: string;
  mouseForce?: number;
  mouseRadius?: number;
  enabled?: boolean;
}

export default function Particles(props: ParticlesProps) {
  const isReducedMotion = useReducedMotion();

  if (props.enabled === false || isReducedMotion) {
    return (
      <div className={`fixed inset-0 -z-10 bg-black ${props.className ?? ""}`} />
    );
  }

  return (
    <div className={`fixed inset-0 -z-10 ${props.className ?? ""}`}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 600], fov: 75 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        frameloop="always"
      >
        <ParticlesLogic enabled {...props} />
        <BlurEffect />
      </Canvas>
    </div>
  );
}
