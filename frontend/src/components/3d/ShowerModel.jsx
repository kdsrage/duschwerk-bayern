import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { mapConfig } from './configurator/useShowerConfig';
import { useModelAnimation } from './configurator/useModelAnimation';
import { useGlassMaterial, updateGlassMaterial } from './materials/GlassMaterial';
import { useMetalMaterial, updateMetalMaterial } from './materials/MetalMaterial';

// ── Dimensionen ─────────────────────────────────────────────
const P   = 0.022;   // Profilbreite
const PH  = 0.016;   // Profiltiefe
const D   = 0.90;    // Duschwannen-Tiefe (front→back)
const WT  = 0.12;    // Wandstärke
const TH  = 0.055;   // Bodenhohe (Duschwanne)

// ── Statische Materialien ────────────────────────────────────
let _wallMat = null;
function wallMat() {
  if (_wallMat) return _wallMat;
  _wallMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b0ada6'),
    roughness: 0.80,
    metalness: 0.01,
    envMapIntensity: 0.10,
  });
  return _wallMat;
}

let _trayMat = null;
function trayMat() {
  if (_trayMat) return _trayMat;
  _trayMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#dedad3'),
    roughness: 0.38,
    metalness: 0.02,
    envMapIntensity: 0.20,
  });
  return _trayMat;
}

// ── Duschnische (Wände + Boden) ──────────────────────────────
// Koordinaten: Glas vorne bei z=0, Wände gehen nach z=-(D+WT)
// Y-Ursprung ist Mitte des Glases (Gruppe sitzt bei y=-h/2)
function ShowerEnclosure({ w, h }) {
  // Wand-Zentren
  const backZ   = -(D + WT / 2);         // Rückwand-Mitte
  const sideZ   = -(D / 2);              // Seitenwand-Mitte Z
  const leftX   = -w / 2 - WT / 2;
  const rightX  =  w / 2 + WT / 2;

  return (
    <group>
      {/* Rückwand */}
      <mesh position={[0, 0, backZ]}>
        <boxGeometry args={[w + WT * 2, h, WT]} />
        <primitive object={wallMat()} attach="material" />
      </mesh>

      {/* Linke Wand */}
      <mesh position={[leftX, 0, sideZ]}>
        <boxGeometry args={[WT, h, D]} />
        <primitive object={wallMat()} attach="material" />
      </mesh>

      {/* Rechte Wand */}
      <mesh position={[rightX, 0, sideZ]}>
        <boxGeometry args={[WT, h, D]} />
        <primitive object={wallMat()} attach="material" />
      </mesh>

      {/* Duschwanne (Boden) */}
      <mesh position={[0, -h / 2 - TH / 2, -(D / 2)]}>
        <boxGeometry args={[w + WT * 2 + 0.02, TH, D + WT + 0.02]} />
        <primitive object={trayMat()} attach="material" />
      </mesh>

      {/* Drainstreifen */}
      <mesh position={[0, -h / 2 + 0.002, -D * 0.12]}>
        <boxGeometry args={[w * 0.72, 0.004, 0.055]} />
        <meshStandardMaterial color="#a8a8a8" metalness={0.90} roughness={0.12} />
      </mesh>
    </group>
  );
}

// ── Glasfront: Walk-In ───────────────────────────────────────
function WalkIn({ w, h, t, glassMat, metalMat, rahmentyp }) {
  const rahmenlos = rahmentyp === 'rahmenlos' || !rahmentyp;

  return (
    <group>
      {/* Glasscheibe */}
      <mesh>
        <boxGeometry args={[w, h, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Wandprofil links */}
      {!rahmenlos && (
        <mesh position={[-w / 2 - P / 2, 0, 0]}>
          <boxGeometry args={[P, h + P, PH]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      )}

      {/* Wandhalter oben */}
      <mesh position={[-w / 2 - 0.008, h / 2 - 0.07, 0]}>
        <boxGeometry args={[0.018, 0.07, 0.05]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Wandhalter unten */}
      <mesh position={[-w / 2 - 0.008, -h / 2 + 0.07, 0]}>
        <boxGeometry args={[0.018, 0.07, 0.05]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
    </group>
  );
}

// ── Glasfront: Drehtür ───────────────────────────────────────
function Drehtuer({ w, h, t, glassMat, metalMat }) {
  const fixW  = w * 0.28;   // festes Seitenteil
  const doorW = w - fixW - P * 2;

  return (
    <group>
      {/* Festes Seitenteil (links) */}
      <mesh position={[-w / 2 + fixW / 2, 0, 0]}>
        <boxGeometry args={[fixW, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Türblatt (rechts) */}
      <mesh position={[w / 2 - doorW / 2, 0, 0]}>
        <boxGeometry args={[doorW, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Rahmen oben */}
      <mesh position={[0, h / 2 - P / 2, 0]}>
        <boxGeometry args={[w, P, PH]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Rahmen unten */}
      <mesh position={[0, -h / 2 + P / 2, 0]}>
        <boxGeometry args={[w, P, PH]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Rahmen links */}
      <mesh position={[-w / 2 + P / 2, 0, 0]}>
        <boxGeometry args={[P, h, PH]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Rahmen rechts */}
      <mesh position={[w / 2 - P / 2, 0, 0]}>
        <boxGeometry args={[P, h, PH]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Mittelprofil (Türanschlag) */}
      <mesh position={[-w / 2 + fixW + P / 2, 0, 0]}>
        <boxGeometry args={[P, h, PH * 1.4]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* Scharnier oben */}
      <mesh position={[-w / 2 + fixW + P, h / 2 - 0.12, t / 2 + 0.010]}>
        <cylinderGeometry args={[0.012, 0.012, 0.06, 10]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Scharnier unten */}
      <mesh position={[-w / 2 + fixW + P, -h / 2 + 0.12, t / 2 + 0.010]}>
        <cylinderGeometry args={[0.012, 0.012, 0.06, 10]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* Griff */}
      <mesh position={[w / 2 - 0.06, 0, t / 2 + 0.022]}>
        <cylinderGeometry args={[0.008, 0.008, 0.26, 10]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      <mesh position={[w / 2 - 0.06,  0.13, t / 2 + 0.022]}>
        <sphereGeometry args={[0.010, 8, 8]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      <mesh position={[w / 2 - 0.06, -0.13, t / 2 + 0.022]}>
        <sphereGeometry args={[0.010, 8, 8]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
    </group>
  );
}

// ── Glasfront: Schiebetür ────────────────────────────────────
function Schiebetuer({ w, h, t, glassMat, metalMat }) {
  const panelW  = w * 0.58;
  const overlap = panelW * 0.14;

  return (
    <group>
      {/* Obere Schiene */}
      <mesh position={[0, h / 2 + P / 2, 0]}>
        <boxGeometry args={[w, P * 0.65, P * 2.2]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Untere Schiene */}
      <mesh position={[0, -h / 2 - P / 2, 0]}>
        <boxGeometry args={[w, P * 0.65, P * 2.2]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* Panel 1 (vorne) */}
      <mesh position={[-(w / 2 - panelW / 2 - overlap), 0, t * 0.6]}>
        <boxGeometry args={[panelW, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Panel 2 (hinten) */}
      <mesh position={[(w / 2 - panelW / 2 - overlap), 0, -t * 0.6]}>
        <boxGeometry args={[panelW, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Griff 1 */}
      <mesh position={[-(w / 2 - panelW / 2 - overlap) + panelW * 0.28, 0, t * 0.6 + t / 2 + 0.018]}>
        <cylinderGeometry args={[0.007, 0.007, 0.20, 10]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Griff 2 */}
      <mesh position={[(w / 2 - panelW / 2 - overlap) - panelW * 0.28, 0, -t * 0.6 - t / 2 - 0.018]}>
        <cylinderGeometry args={[0.007, 0.007, 0.20, 10]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
    </group>
  );
}

// ── Glasfront: Falttür ───────────────────────────────────────
function Falttuer({ w, h, t, glassMat, metalMat }) {
  const segW = w / 3;

  return (
    <group>
      {/* Rahmen */}
      <mesh position={[-w / 2 + P / 2, 0, 0]}>
        <boxGeometry args={[P, h, PH]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      <mesh position={[w / 2 - P / 2, 0, 0]}>
        <boxGeometry args={[P, h, PH]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      <mesh position={[0, h / 2 - P / 2, 0]}>
        <boxGeometry args={[w, P, PH]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      <mesh position={[0, -h / 2 + P / 2, 0]}>
        <boxGeometry args={[w, P, PH]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* Segment 1 */}
      <mesh position={[-w / 2 + segW / 2 + P, 0, 0]}>
        <boxGeometry args={[segW - P, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Segment 2 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[segW - P, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Segment 3 */}
      <mesh position={[w / 2 - segW / 2 - P, 0, 0]}>
        <boxGeometry args={[segW - P, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Faltgelenke */}
      {[-w / 2 + segW + P, -P / 2, w / 2 - segW - P].map((x, i) => (
        <mesh key={i} position={[x, 0, t / 2 + 0.008]}>
          <cylinderGeometry args={[0.009, 0.009, h * 0.4, 8]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

const TYPE_COMPONENTS = {
  'Walk-in':    WalkIn,
  'Drehtür':    Drehtuer,
  'Schiebetür': Schiebetuer,
  'Nische':     Schiebetuer,  // Nische = Schiebetür in der Nische
  'Falttür':    Falttuer,
};

export default function ShowerModel({ config, canvasRef }) {
  const groupRef   = useRef();
  const prevConfig = useRef(null);
  const prevBreite = useRef(config?.breite ?? 90);
  const prevHoehe  = useRef(config?.hoehe  ?? 200);

  const isDragging = useRef(false);
  const dragStart  = useRef({ x: 0, y: 0 });
  const rotStart   = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0.08, y: -0.30 });  // leichte Startdrehung für 3/4-Ansicht

  const glassMat = useGlassMaterial();
  const metalMat = useMetalMaterial();

  const { animScale, animOpacity, triggerTransition, tickAnimation } = useModelAnimation();

  const mapped = useMemo(() => mapConfig(config ?? {}), [config]);
  const { w, h, t, glass, metal, typ } = mapped;

  useEffect(() => {
    if (!prevConfig.current) { prevConfig.current = config; return; }
    const prev = prevConfig.current;
    const deltaBreite = Math.abs((config?.breite ?? 90)  - prevBreite.current);
    const deltaHoehe  = Math.abs((config?.hoehe  ?? 200) - prevHoehe.current);
    const sliderOnly  = deltaBreite <= 5 || deltaHoehe <= 5;

    if (config?.typ !== prev?.typ) {
      triggerTransition('crossfade');
    } else if (config?.glas !== prev?.glas || config?.profil !== prev?.profil) {
      triggerTransition('morph');
    } else if (config?.staerke !== prev?.staerke) {
      triggerTransition('pulse');
    } else if (!sliderOnly && (deltaBreite > 5 || deltaHoehe > 5)) {
      triggerTransition('pulse');
    }

    prevBreite.current = config?.breite ?? 90;
    prevHoehe.current  = config?.hoehe  ?? 200;
    prevConfig.current = config;
  }, [config]);

  // Drag-Rotate
  useEffect(() => {
    if (!canvasRef?.current) return;
    const el = canvasRef.current;

    const onDown = (e) => {
      isDragging.current = true;
      el.setPointerCapture(e.pointerId);
      dragStart.current = { x: e.clientX, y: e.clientY };
      rotStart.current  = { x: currentRot.current.x, y: currentRot.current.y };
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      currentRot.current.y = rotStart.current.y + dx * 0.007;
      currentRot.current.x = Math.max(-0.28, Math.min(0.28, rotStart.current.x + dy * 0.007));
    };
    const onUp = () => { isDragging.current = false; };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, [canvasRef]);

  useEffect(() => () => {
    glassMat.current.dispose();
    metalMat.current.dispose();
  }, []);

  useFrame(() => {
    tickAnimation();

    if (groupRef.current) {
      const s = animScale.current;
      groupRef.current.scale.set(s, s, s);
      groupRef.current.rotation.y += (currentRot.current.y - groupRef.current.rotation.y) * 0.07;
      groupRef.current.rotation.x += (currentRot.current.x - groupRef.current.rotation.x) * 0.07;
    }

    updateGlassMaterial(glassMat.current, glass, t, animOpacity.current);
    updateMetalMaterial(metalMat.current, metal);
  });

  const TypeComponent = TYPE_COMPONENTS[typ] ?? WalkIn;
  const rahmentyp = config?.rahmentyp || null;

  return (
    <group ref={groupRef} position={[0, -h / 2, 0]}>
      {/* Wände + Boden */}
      <ShowerEnclosure w={w} h={h} />

      {/* Glasfront */}
      <TypeComponent
        w={w} h={h} t={t}
        glassMat={glassMat.current}
        metalMat={metalMat.current}
        rahmentyp={rahmentyp}
      />
    </group>
  );
}
