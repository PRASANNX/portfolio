"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const STICKER_FILES = [
  "/stickers/1.jpg",
  "/stickers/2.jpg",
  "/stickers/3.png",
  "/stickers/4.jpg",
  "/stickers/5.jpg",
  "/stickers/6.jpg",
  "/stickers/7.jpg",
  "/stickers/8.jpg",
  "/stickers/9.jpg",
];

const INSTANCES_PER_MESH = 60; // ~540 total stickers across 9 textures

function StickerCloud({ texture, count }: { texture: THREE.Texture; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { mouse, viewport } = useThree();

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 20,
        z: -Math.random() * 15,
        speed: 0.005 + Math.random() * 0.015,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        scale: 0.4 + Math.random() * 0.6,
        // smooth displacement
        dx: 0,
        dy: 0,
      });
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;

    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // gentle drift downward
      p.y -= p.speed;
      if (p.y < -12) {
        p.y = 12;
        p.x = (Math.random() - 0.5) * 30;
        p.z = -Math.random() * 15;
      }

      // slow rotation
      p.rotZ += p.rotSpeed;

      // mouse repulsion (damped)
      const ddx = p.x - mx;
      const ddy = p.y - my;
      const dist = Math.sqrt(ddx * ddx + ddy * ddy);
      const repelRadius = 4;

      if (dist < repelRadius && dist > 0.01) {
        const force = ((repelRadius - dist) / repelRadius) * 0.15;
        p.dx += (ddx / dist) * force;
        p.dy += (ddy / dist) * force;
      }

      // dampen displacement
      p.dx *= 0.92;
      p.dy *= 0.92;

      dummy.position.set(p.x + p.dx, p.y + p.dy, p.z);
      dummy.rotation.set(0, 0, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        side={THREE.DoubleSide}
        depthWrite={false}
        opacity={0.85}
      />
    </instancedMesh>
  );
}

function Scene() {
  const textures = useTexture(STICKER_FILES);

  return (
    <>
      {textures.map((tex, i) => (
        <StickerCloud key={i} texture={tex} count={INSTANCES_PER_MESH} />
      ))}
    </>
  );
}

export function StickerSwarm() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
        style={{ pointerEvents: "auto", width: "100%", height: "100%" }}
      >
        {/* No background — fully transparent canvas */}
        <Scene />
      </Canvas>
    </div>
  );
}
