"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

export function ImmersiveRig({
  children,
  paused,
}: {
  children: ReactNode;
  paused: boolean;
}) {
  const rig = useRef<THREE.Group>(null);
  const camera = useThree(state => state.camera);
  useEffect(() => {
    if (paused || !rig.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const group = rig.current;
    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        })
        .to(group.position, { z: 0.9, y: 0.25, duration: 1, ease: "none" }, 0)
        .to(camera.position, { z: 6.8, duration: 1, ease: "none" }, 0)
        .to(
          group.rotation,
          { x: 0.32, z: -0.28, duration: 1, ease: "none" },
          0,
        );
    });
    return () => context.revert();
  }, [paused, camera]);
  return <group ref={rig}>{children}</group>;
}

export function Atmosphere({ paused }: { paused: boolean }) {
  const dots = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);
  useEffect(() => {
    if (!dots.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const palette = ["#7438bd", "#ffe064", "#71ecdc", "#ed5d8e"];
    for (let i = 0; i < 20; i++) {
      const angle = i * 2.39996;
      const radius = 2.5 + (i % 4) * 0.23;
      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.75,
        -1.5 + Math.sin(i * 1.7) * 1.4,
      );
      dummy.scale.setScalar(0.035 + (i % 3) * 0.017);
      dummy.updateMatrix();
      dots.current.setMatrixAt(i, dummy.matrix);
      dots.current.setColorAt(i, color.set(palette[i % palette.length]));
    }
    dots.current.instanceMatrix.needsUpdate = true;
    if (dots.current.instanceColor)
      dots.current.instanceColor.needsUpdate = true;
  }, []);
  useFrame((state, delta) => {
    if (paused) return;
    const step = Math.min(delta, 0.05);
    if (dots.current) dots.current.rotation.z += step * 0.035;
    if (light.current) {
      light.current.position.x = THREE.MathUtils.damp(
        light.current.position.x,
        state.pointer.x * 4,
        4,
        step,
      );
      light.current.position.y = THREE.MathUtils.damp(
        light.current.position.y,
        state.pointer.y * 3,
        4,
        step,
      );
    }
  });
  return (
    <>
      <instancedMesh
        ref={dots}
        args={[undefined, undefined, 20]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial roughness={0.35} metalness={0.15} />
      </instancedMesh>
      <pointLight
        ref={light}
        position={[0, 0, 4]}
        intensity={14}
        color="#c6f8ff"
        distance={10}
      />
    </>
  );
}
