import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
// @ts-expect-error TypeScript complains it cannot find this module
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import { useFrame, useThree } from "@react-three/fiber";
import { ParticlesProps } from "@/components/Particles/Particles";

const TAU = Math.PI * 2;
const OFFSETS = { x: 0.00125, y: 0.00125, z: 0.0005 };
const fadeInOut = (t: number, m: number) =>
  Math.abs(((t + 0.5 * m) % m) - 0.5 * m) / (0.5 * m);
const interpolateLinear = THREE.MathUtils.lerp;
const rand = (max: number) => Math.random() * max;
const randRange = (max: number) => max - Math.random() * (2 * max);

export function ParticlesLogic(props: ParticlesProps) {
  const {
    particleCount = 250,
    baseHue = 220,
    rangeHue = 100,
    baseRadius = 1,
    rangeRadius = 2,
    baseSpeed = 0.05,
    rangeSpeed = 1.5,
    baseTTL = 100,
    rangeTTL = 500,
    noiseSteps = 8,
    rangeY = 500,
    mouseForce = 1,
    mouseRadius = 300,
    enabled = true,
  } = props;

  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const linesGeo = useMemo(
    () => new THREE.CylinderGeometry(0.5, 0.5, 1, 4, 1),
    []
  );

  const linesMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const noise = useMemo(() => new ImprovedNoise(), []);
  const totalProps = particleCount * 9;
  const propsBuf = useRef<Float32Array>(new Float32Array(totalProps));
  const lifeBuf = useRef<Float32Array>(new Float32Array(particleCount));
  const frame = useRef(0);
  const mouse = useRef(new THREE.Vector2(-Infinity, -Infinity));
  const { size, viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const initParticle = useCallback(
    (idx: number) => {
      const off = idx * 9;
      const w = viewport.width;
      propsBuf.current.set(
        [
          rand(w) - w / 2,
          randRange(rangeY),
          0,
          0,
          0,
          baseTTL + rand(rangeTTL),
          baseSpeed + rand(rangeSpeed),
          baseRadius + rand(rangeRadius),
          baseHue + rand(rangeHue),
        ],
        off
      );
    },
    [
      viewport.width,
      rangeY,
      baseTTL,
      rangeTTL,
      baseSpeed,
      rangeSpeed,
      baseRadius,
      rangeRadius,
      baseHue,
      rangeHue,
    ]
  );

  const resetIfNeeded = useCallback(
    (off: number, life: number, x: number, y: number) => {
      const w = viewport.width / 2;
      const h = viewport.height / 2;
      if (
        life > propsBuf.current[off + 5] ||
        x < -w ||
        x > w ||
        y < -h ||
        y > h
      ) {
        initParticle(off / 9);
        return true;
      }
      return false;
    },
    [viewport.width, viewport.height, initParticle]
  );

  useEffect(() => {
    for (let i = 0; i < particleCount; i++) initParticle(i);
  }, [particleCount, initParticle]);

  useEffect(() => {
    const move = (e: MouseEvent | Touch) => {
      const x = (e.clientX / size.width) * viewport.width - viewport.width / 2;
      const y =
        -(e.clientY / size.height) * viewport.height +
        viewport.height / 2;
      mouse.current.set(x, y);
    };

    const leave = () => mouse.current.set(-Infinity, -Infinity);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("touchmove", (evt) => move(evt.touches[0]));
    window.addEventListener("touchend", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("touchmove", (evt) => move(evt.touches[0]));
      window.removeEventListener("touchend", leave);
    };
  }, [size, viewport]);

  useEffect(() => {
    return () => {
      linesGeo.dispose();
      linesMat.dispose();
    };
  }, [linesGeo, linesMat]);

  useFrame(() => {
    if (!enabled) return;

    frame.current++;

    for (let i = 0; i < totalProps; i += 9) {
      const [x, y, vx, vy, life, ttl, speed, radius, hue] =
        propsBuf.current.subarray(i, i + 9);

      const n =
        noise.noise(x * OFFSETS.x, y * OFFSETS.y, frame.current * OFFSETS.z) *
        noiseSteps *
        TAU;

      let vx2 = interpolateLinear(vx, Math.cos(n), 0.5);
      let vy2 = interpolateLinear(vy, Math.sin(n), 0.5);

      const dx = x - mouse.current.x;
      const dy = y - mouse.current.y;
      const d2 = dx * dx + dy * dy;

      if (d2 < mouseRadius * mouseRadius) {
        const dist = Math.sqrt(d2) || 1;
        const f = mouseForce * (1 - dist / mouseRadius);
        vx2 += (dx / dist) * f;
        vy2 += (dy / dist) * f;
      }

      const x2 = x + vx2 * speed;
      const y2 = y + vy2 * speed;

      propsBuf.current.set([x2, y2, vx2, vy2, life + 1], i);

      const alpha = fadeInOut(life, ttl);
      lifeBuf.current[i / 9] = alpha;

      dummy.position.set(x, y, 0);
      dummy.lookAt(x2, y2, 0);
      dummy.scale.set(radius, radius, new THREE.Vector2(x2 - x, y2 - y).length());
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i / 9, dummy.matrix);

      color.set(`hsl(${hue},100%,60%)`);
      color.multiplyScalar(alpha);
      meshRef.current.setColorAt(i / 9, color);

      resetIfNeeded(i, life, x, y);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[linesGeo, linesMat, particleCount]}
      frustumCulled={false}
    />
  );
}
