"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimate, useReducedMotion } from "framer-motion";

export default function WavingEmoji() {
  const [scope, animate] = useAnimate();
  const sequenceIdRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const WAVE_ROTATION = 45;
  const DURATION_PER_DEGREE = 4;
  const MIN_DURATION = 100;
  const EASE = "easeInOut";

  const getDuration = (from: number, to: number) => {
    const ms = Math.max(
      MIN_DURATION,
      Math.abs(to - from) * DURATION_PER_DEGREE,
    );
    return ms / 1000;
  };

  const startWave = async () => {
    if (prefersReducedMotion) return;

    const seq = ++sequenceIdRef.current;
    const from = scope.current?.style?.rotate
      ? parseFloat(scope.current.style.rotate)
      : 0;

    await animate(
      scope.current,
      {
        rotateZ: WAVE_ROTATION,
      },
      {
        duration: getDuration(from, WAVE_ROTATION),
        ease: EASE,
      },
    );

    if (sequenceIdRef.current !== seq) return;

    await animate(
      scope.current,
      {
        rotateZ: 0,
      },
      {
        duration: getDuration(WAVE_ROTATION, 0),
        ease: EASE,
      },
    );

    if (sequenceIdRef.current !== seq) return;

    animate(
      scope.current,
      {
        rotateZ: [0, WAVE_ROTATION],
      },
      {
        duration: getDuration(0, WAVE_ROTATION),
        ease: EASE,
        repeat: Infinity,
        repeatType: "reverse",
      },
    );
  };

  const resetWave = () => {
    sequenceIdRef.current++;
    animate(
      scope.current,
      {
        rotateZ: 0,
      },
      {
        duration: getDuration(WAVE_ROTATION, 0),
        ease: EASE,
      },
    );
  };

  const waveOnce = () => {
    if (prefersReducedMotion) return;
  
    const controls = animate(
      scope.current,
      { rotateZ: [0, WAVE_ROTATION] },
      {
        duration: getDuration(0, WAVE_ROTATION),
        ease: EASE,
        repeat: 3,
        repeatType: "reverse",
        delay: 1,
      },
    );
  
    return () => controls.stop();
  };

  return (
    <motion.svg
      ref={scope}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      onViewportEnter={waveOnce}
      onMouseEnter={startWave}
      onMouseLeave={resetWave}
      className="inline-flex cursor-default origin-[70%_70%] rotate-0"
      aria-hidden="true"
    >
      <title>Waving hand</title>
      <text x="50" y="58" textAnchor="middle" fontSize="72">
        👋
      </text>
    </motion.svg>
  );
}
