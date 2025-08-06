import React from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

export interface BlurEffectProps {
  intensity?: number;
  threshold?: number;
  smoothing?: number;
  kernelSize?: KernelSize;
}

export function BlurEffect({
  intensity = 25,
  threshold = 0.1,
  smoothing = 0.75,
  kernelSize = KernelSize.VERY_SMALL,
}: BlurEffectProps) {
  const { gl } = useThree();

  if (!gl) return null;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={intensity}
        luminanceThreshold={threshold}
        luminanceSmoothing={smoothing}
        kernelSize={kernelSize}
        mipmapBlur
      />
    </EffectComposer>
  );
}
