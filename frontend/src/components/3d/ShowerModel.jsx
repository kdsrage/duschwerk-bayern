import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { mapConfig } from './configurator/useShowerConfig';
import { useModelAnimation } from './configurator/useModelAnimation';
import { useGlassMaterial, updateGlassMaterial } from './materials/GlassMaterial';
import { useMetalMaterial, updateMetalMaterial } from './materials/MetalMaterial';

// ── Dimensionen ─────────────────────────────────────────────
const P   = 0.022;   // Profilbreite  22 mm
const PH  = 0.016;   // Profiltiefe   16 mm
const D   = 0.90;    // Duschtiefe front→back
const WT  = 0.14;    // Wandstärke
const TH  = 0.055;   // Wanenhöhe

// ── Textur-Hilfsfunktionen (Value Noise + fBM) ───────────────
function _vn(x, y) {
  const ix = x|0, iy = y|0, fx = x-ix, fy = y-iy;
  const ux = fx*fx*(3-2*fx), uy = fy*fy*(3-2*fy);
  const h = (a,b) => { const s = Math.sin(a*127.1+b*311.7)*43758.545; return s-Math.floor(s); };
  return h(ix,iy)*(1-ux)*(1-uy)+h(ix+1,iy)*ux*(1-uy)+h(ix,iy+1)*(1-ux)*uy+h(ix+1,iy+1)*ux*uy;
}
function _fbm(x, y, o=4) {
  let v=0, a=0.5, f=1;
  for(let i=0;i<o;i++){v+=_vn(x*f,y*f)*a;a*=0.52;f*=2.18;}
  return v;
}

// ── Calacatta-Marmor (Wände) ─────────────────────────────────
let _wallTex = null;
function getWallTex() {
  if (_wallTex) return _wallTex;
  const W = 512, H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(W, H);
  const d = img.data;
  const clamp = (v,lo=80,hi=248) => v<lo?lo:v>hi?hi:v;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const nx = x/W * 2.2, ny = y/H * 3.0;

      // Domain-Warp: organische Adernführung
      const wx = nx + 1.5 * (_fbm(nx+0.15, ny+0.30) - 0.5);
      const wy = ny + 1.5 * (_fbm(nx+0.85, ny+0.75) - 0.5);

      // Hauptadern (scharf, fließend)
      const t1  = Math.sin(wx * 4.2 + wy * 3.5);
      const v1  = Math.pow(Math.max(0, 1 - Math.abs(t1)), 3.2);
      // Feinadern
      const t2  = Math.sin(wx * 9.5 + wy * 7.1 + _fbm(wx, wy)*3.8);
      const v2  = Math.pow(Math.max(0, 1 - Math.abs(t2)), 6.0);

      // Farbvariation (leichte Warmtöne im Stein)
      const cv  = (_fbm(nx*0.7, ny*0.5) - 0.5) * 18;

      // Calacatta: helles Creme-Weiß, dunkelgraue Adern
      const base = 232 + cv * 0.6;
      const v    = base - v1 * 82 - v2 * 40;

      const i = (y*W+x)*4;
      d[i]   = clamp(v + cv*0.8)  | 0;  // R: leicht warm
      d[i+1] = clamp(v + cv*0.3)  | 0;  // G: neutral
      d[i+2] = clamp(v - cv*0.6)  | 0;  // B: minimal kühler
      d[i+3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.0, 0.85);
  tex.anisotropy = 16;
  return (_wallTex = tex);
}

// ── Dunkler Anthrazit-Stein (Duschwanne) ─────────────────────
let _trayTex = null;
function getTrayTex() {
  if (_trayTex) return _trayTex;
  const W = 256;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = W;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(W, W);
  const d = img.data;

  for (let y = 0; y < W; y++) {
    for (let x = 0; x < W; x++) {
      const nx = x/W*3, ny = y/W*3;
      // Feine Mineralstruktur (Basalt/Anthrazit)
      const grain = _fbm(nx*4, ny*4, 5) * 22;
      const base  = 34;
      const v     = Math.max(18, Math.min(62, base + grain - 11));
      const i = (y*W+x)*4;
      d[i]   = v       | 0;
      d[i+1] = v       | 0;
      d[i+2] = (v+3)   | 0;  // winziger Blaustich = moderner Anthrazit
      d[i+3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.anisotropy = 8;
  return (_trayTex = tex);
}

// Legacy alias (wird nicht mehr für Wände benötigt)
const getFloorTex = getTrayTex;

// ── Statische Materialien ────────────────────────────────────
let _wMat = null, _tMat = null, _drainMat = null, _rainMat = null;
const getWMat = () => _wMat || (_wMat = new THREE.MeshStandardMaterial({
  map: getWallTex(), roughness: 0.12, metalness: 0.02, envMapIntensity: 0.55,
}));
// Polierter Anthrazit-Stein für Duschwanne
const getTMat = () => _tMat || (_tMat = new THREE.MeshStandardMaterial({
  map: getTrayTex(), roughness: 0.06, metalness: 0.08, envMapIntensity: 0.70,
}));
const getDrainMat = () => _drainMat || (_drainMat = new THREE.MeshStandardMaterial({
  color: '#888888', metalness: 0.95, roughness: 0.08, envMapIntensity: 1.2,
}));
// Schwarzes Metall für Regendusche
const getRainMat = () => _rainMat || (_rainMat = new THREE.MeshStandardMaterial({
  color: '#141414', metalness: 0.82, roughness: 0.22, envMapIntensity: 0.8,
}));

// ── Decken-Regendusche (schwarzes Design) ────────────────────
function RainShower({ w, h }) {
  const headW  = Math.min(w * 0.42, 0.38);  // Kopfbreite max 38cm
  const headD  = Math.min(D * 0.44, 0.28);  // Kopftiefe max 28cm
  const armLen = 0.28;                        // Arm-Länge an Rückwand
  const topY   = h / 2;                       // Deckenebene (lokal)
  const backZ  = -(D + WT / 2) + WT / 2 + armLen / 2;

  return (
    <group>
      {/* Deckenarm (von Rückwand nach vorne) */}
      <mesh position={[0, topY - 0.018, -(D - armLen / 2)]}>
        <boxGeometry args={[0.020, 0.020, armLen]} />
        <primitive object={getRainMat()} attach="material" />
      </mesh>
      {/* Verbindungsstück Arm → Kopf */}
      <mesh position={[0, topY - 0.055, -(D - armLen) + 0.01]}>
        <boxGeometry args={[0.020, 0.074, 0.020]} />
        <primitive object={getRainMat()} attach="material" />
      </mesh>
      {/* Regenbrause-Kopf (flach, rechteckig) */}
      <mesh castShadow position={[0, topY - 0.094, -(D - armLen) + 0.01]}>
        <boxGeometry args={[headW, 0.016, headD]} />
        <primitive object={getRainMat()} attach="material" />
      </mesh>
      {/* Düsengitter — leicht dunklere Unterseite */}
      <mesh position={[0, topY - 0.103, -(D - armLen) + 0.01]}>
        <boxGeometry args={[headW - 0.012, 0.002, headD - 0.012]} />
        <primitive object={getDrainMat()} attach="material" />
      </mesh>
    </group>
  );
}

// ── Duschnische (Wände + Boden) ──────────────────────────────
function ShowerEnclosure({ w, h }) {
  const backZ  = -(D + WT / 2);
  const sideZ  = -(D / 2);
  const leftX  = -w / 2 - WT / 2;
  const rightX =  w / 2 + WT / 2;
  const floorY = -h / 2 - TH / 2;

  return (
    <group>
      {/* Rückwand */}
      <mesh receiveShadow position={[0, 0, backZ]}>
        <boxGeometry args={[w + WT * 2, h, WT]} />
        <primitive object={getWMat()} attach="material" />
      </mesh>
      {/* Linke Wand */}
      <mesh receiveShadow position={[leftX, 0, sideZ]}>
        <boxGeometry args={[WT, h, D]} />
        <primitive object={getWMat()} attach="material" />
      </mesh>
      {/* Rechte Wand */}
      <mesh receiveShadow position={[rightX, 0, sideZ]}>
        <boxGeometry args={[WT, h, D]} />
        <primitive object={getWMat()} attach="material" />
      </mesh>
      {/* ── Moderne Duschwanne (polierter Anthrazit-Stein) ── */}
      {/* Wannenkörper */}
      <mesh receiveShadow position={[0, floorY, sideZ]}>
        <boxGeometry args={[w + WT * 2 + 0.01, TH, D + WT + 0.01]} />
        <primitive object={getTMat()} attach="material" />
      </mesh>
      {/* Vordere Lippe / Stufe (sichtbare Kante zur Glasfront) */}
      <mesh position={[0, -h / 2 + 0.008, -0.006]}>
        <boxGeometry args={[w + WT * 2 + 0.01, 0.016, 0.012]} />
        <primitive object={getTMat()} attach="material" />
      </mesh>
      {/* ── Rinnenablauf (Rinne an Rückwand) ── */}
      {/* Rinnen-Schlitz */}
      <mesh position={[0, -h / 2 + 0.004, -(D - 0.032)]}>
        <boxGeometry args={[w * 0.90, 0.008, 0.038]} />
        <primitive object={getTMat()} attach="material" />
      </mesh>
      {/* Edelstahl-Abdeckrost */}
      <mesh position={[0, -h / 2 + 0.008, -(D - 0.032)]}>
        <boxGeometry args={[w * 0.90, 0.002, 0.036]} />
        <primitive object={getDrainMat()} attach="material" />
      </mesh>
      {/* Rost-Stäbe (dekorativ) */}
      {Array.from({ length: Math.floor(w * 9) }, (_, i, arr) => {
        const x = -w * 0.45 + i * (w * 0.90 / (arr.length - 1));
        return (
          <mesh key={i} position={[x, -h / 2 + 0.009, -(D - 0.032)]}>
            <boxGeometry args={[0.004, 0.002, 0.030]} />
            <primitive object={getDrainMat()} attach="material" />
          </mesh>
        );
      })}
      {/* Decken-Regendusche */}
      <RainShower w={w} h={h} />
    </group>
  );
}

// ── Hilfsfunktion: Profile bedingt rendern ───────────────────
// vollgerahmt = kräftige Profile rundum; teilgerahmt = schmale Profile oben+seiten; rahmenlos = null
function FrameProfiles({ w, h, rahmentyp, metalMat, noLeft = false, noRight = false }) {
  if (rahmentyp === 'rahmenlos') return null;
  const partial = rahmentyp === 'teilgerahmt';
  // vollgerahmt: deutlich breitere Profile für sichtbaren Unterschied
  const pw  = partial ? P       : P * 1.7;   // Profilbreite
  const phe = partial ? PH      : PH * 1.5;  // Profiltiefe

  return (
    <>
      {/* Oben */}
      <mesh position={[0, h / 2 - pw / 2, 0]}>
        <boxGeometry args={[w, pw, phe]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Unten – nur vollgerahmt */}
      {!partial && (
        <mesh position={[0, -h / 2 + pw / 2, 0]}>
          <boxGeometry args={[w, pw, phe]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      )}
      {/* Links */}
      {!noLeft && (
        <mesh position={[-w / 2 + pw / 2, 0, 0]}>
          <boxGeometry args={[pw, h, phe]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      )}
      {/* Rechts */}
      {!noRight && (
        <mesh position={[w / 2 - pw / 2, 0, 0]}>
          <boxGeometry args={[pw, h, phe]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      )}
    </>
  );
}

// ── Walk-In ──────────────────────────────────────────────────
function WalkIn({ w, h, t, glassMat, metalMat, rahmentyp }) {
  const rahmenlos  = rahmentyp === 'rahmenlos' || !rahmentyp;
  const voll       = rahmentyp === 'vollgerahmt';
  const pw         = voll ? P * 1.7 : P;
  const phe        = voll ? PH * 1.5 : PH;

  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[w - (rahmenlos ? 0 : pw * 2), h - (voll ? pw * 2 : 0), t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Seiten- und Querprofile je nach rahmentyp */}
      {!rahmenlos && (
        <>
          {/* Linkes Seitenprofil (Wandseite) */}
          <mesh position={[-w / 2 + pw / 2, 0, 0]}>
            <boxGeometry args={[pw, h, phe]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
          {/* Oberes Querprofil */}
          <mesh position={[0, h / 2 - pw / 2, 0]}>
            <boxGeometry args={[w, pw, phe]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
          {/* Unteres Querprofil – nur vollgerahmt */}
          {voll && (
            <mesh position={[0, -h / 2 + pw / 2, 0]}>
              <boxGeometry args={[w, pw, phe]} />
              <primitive object={metalMat} attach="material" />
            </mesh>
          )}
        </>
      )}

      {/* Wandklemmen (rahmenlos) */}
      {rahmenlos && [h / 2 - 0.08, -h / 2 + 0.08].map((y, i) => (
        <mesh key={i} position={[-w / 2 - 0.008, y, 0]}>
          <boxGeometry args={[0.018, 0.06, 0.048]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

// ── Drehtür ──────────────────────────────────────────────────
function Drehtuer({ w, h, t, glassMat, metalMat, rahmentyp }) {
  const fixW  = w * 0.26;
  const doorW = w - fixW - P * 3;

  return (
    <group>
      {/* Festes Seitenteil (links) */}
      <mesh castShadow position={[-w / 2 + fixW / 2 + P, 0, 0]}>
        <boxGeometry args={[fixW, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Türblatt */}
      <mesh castShadow position={[w / 2 - doorW / 2 - P, 0, 0]}>
        <boxGeometry args={[doorW, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Rahmen */}
      <FrameProfiles w={w} h={h} rahmentyp={rahmentyp} metalMat={metalMat} />

      {/* Mittelprofil Türanschlag */}
      <mesh position={[-w / 2 + fixW + P * 1.5, 0, 0]}>
        <boxGeometry args={[P, h - (rahmentyp === 'rahmenlos' ? 0 : P * 2), PH * 1.5]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* Scharniere */}
      {[h / 2 - 0.13, -h / 2 + 0.13].map((y, i) => (
        <mesh key={i} position={[-w / 2 + fixW + P * 1.5 + 0.001, y, t / 2 + 0.011]}>
          <cylinderGeometry args={[0.013, 0.013, 0.055, 10]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}

      {/* Griff */}
      <mesh position={[w / 2 - doorW - P * 2 + 0.055, 0, t / 2 + 0.024]}>
        <cylinderGeometry args={[0.009, 0.009, 0.28, 10]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {[0.145, -0.145].map((y, i) => (
        <mesh key={i} position={[w / 2 - doorW - P * 2 + 0.055, y, t / 2 + 0.024]}>
          <sphereGeometry args={[0.011, 8, 8]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

// ── Schiebetür ───────────────────────────────────────────────
function Schiebetuer({ w, h, t, glassMat, metalMat, rahmentyp }) {
  const pW  = w * 0.57;
  const ovl = pW * 0.13;

  return (
    <group>
      {/* Führungsschienen (immer vorhanden – funktional) */}
      {[h / 2 + P * 0.4, -h / 2 - P * 0.4].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[w, P * 0.6, P * 2.0]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}

      {/* Panel vorne (links) */}
      <mesh castShadow position={[-(w / 2 - pW / 2 - ovl), 0, t * 0.55]}>
        <boxGeometry args={[pW, h - P * 1.4, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Panel hinten (rechts) */}
      <mesh castShadow position={[(w / 2 - pW / 2 - ovl), 0, -t * 0.55]}>
        <boxGeometry args={[pW, h - P * 1.4, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Seitenprofile – abhängig von rahmentyp */}
      {rahmentyp !== 'rahmenlos' && (
        <>
          <mesh position={[-w / 2 + P / 2, 0, 0]}>
            <boxGeometry args={[P, h, PH]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
          <mesh position={[w / 2 - P / 2, 0, 0]}>
            <boxGeometry args={[P, h, PH]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
        </>
      )}

      {/* Griffe */}
      {[
        [-(w / 2 - pW / 2 - ovl) + pW * 0.28, t * 0.55 + t / 2 + 0.018],
        [ (w / 2 - pW / 2 - ovl) - pW * 0.28, -t * 0.55 - t / 2 - 0.018],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <cylinderGeometry args={[0.008, 0.008, 0.22, 10]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

// ── Falttür ──────────────────────────────────────────────────
function Falttuer({ w, h, t, glassMat, metalMat, rahmentyp }) {
  // 2 Paneele: linkes (fest an Wand), rechtes (Tür)
  const panelW = (w - P * 3) / 2;

  return (
    <group>
      {/* Festes Paneel (links) */}
      <mesh castShadow position={[-w / 2 + P + panelW / 2, 0, 0]}>
        <boxGeometry args={[panelW, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Türpaneel (rechts, leicht vorgezogen) */}
      <mesh castShadow position={[w / 2 - P - panelW / 2, 0, t * 0.4]}>
        <boxGeometry args={[panelW, h - P * 2, t]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Rahmen */}
      <FrameProfiles w={w} h={h} rahmentyp={rahmentyp} metalMat={metalMat} />

      {/* Mittelprofil (Faltgelenk) */}
      <mesh position={[0, 0, t * 0.2]}>
        <boxGeometry args={[P, h - (rahmentyp === 'rahmenlos' ? 0 : P * 2), PH * 1.2]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* Faltgelenk-Zylinder */}
      {[h * 0.25, 0, -h * 0.25].map((y, i) => (
        <mesh key={i} position={[0, y, t * 0.2 + PH * 0.6]}>
          <cylinderGeometry args={[0.010, 0.010, 0.04, 8]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}

      {/* Griff am Türpaneel */}
      <mesh position={[w / 2 - P - 0.04, 0, t * 0.4 + t / 2 + 0.020]}>
        <cylinderGeometry args={[0.008, 0.008, 0.20, 10]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
    </group>
  );
}

const TYPE_COMPONENTS = {
  'Walk-in':    WalkIn,
  'Drehtür':    Drehtuer,
  'Schiebetür': Schiebetuer,
  'Nische':     Schiebetuer,
  'Falttür':    Falttuer,
};

// ── Hauptkomponente ──────────────────────────────────────────
export default function ShowerModel({ config, canvasRef }) {
  const groupRef   = useRef();
  const prevConfig = useRef(null);
  const prevBreite = useRef(config?.breite ?? 90);
  const prevHoehe  = useRef(config?.hoehe  ?? 200);

  const isDragging = useRef(false);
  const dragStart  = useRef({ x: 0, y: 0 });
  const rotStart   = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0.06, y: -0.28 });

  const glassMat = useGlassMaterial();
  const metalMat = useMetalMaterial();
  const { animScale, animOpacity, triggerTransition, tickAnimation } = useModelAnimation();

  const mapped = useMemo(() => mapConfig(config ?? {}), [config]);
  const { w, h, t, glass, metal, typ } = mapped;

  // Transitions
  useEffect(() => {
    if (!prevConfig.current) { prevConfig.current = config; return; }
    const prev = prevConfig.current;
    const dB = Math.abs((config?.breite ?? 90)  - prevBreite.current);
    const dH = Math.abs((config?.hoehe  ?? 200) - prevHoehe.current);
    if (config?.typ !== prev?.typ) triggerTransition('crossfade');
    else if (config?.glas !== prev?.glas || config?.profil !== prev?.profil) triggerTransition('morph');
    else if (config?.staerke !== prev?.staerke) triggerTransition('pulse');
    else if ((dB > 5 || dH > 5) && dB > 2 && dH > 2) triggerTransition('pulse');
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
      rotStart.current  = { ...currentRot.current };
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      currentRot.current.y = rotStart.current.y + (e.clientX - dragStart.current.x) * 0.007;
      currentRot.current.x = Math.max(-0.30, Math.min(0.30,
        rotStart.current.x + (e.clientY - dragStart.current.y) * 0.007));
    };
    const onUp = () => { isDragging.current = false; };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup',   onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup',   onUp);
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
      groupRef.current.rotation.y += (currentRot.current.y - groupRef.current.rotation.y) * 0.18;
      groupRef.current.rotation.x += (currentRot.current.x - groupRef.current.rotation.x) * 0.18;
    }
    updateGlassMaterial(glassMat.current, glass, t, animOpacity.current);
    updateMetalMaterial(metalMat.current, metal);
  });

  const TypeComponent = TYPE_COMPONENTS[typ] ?? WalkIn;

  return (
    <group ref={groupRef} position={[0, -h / 2, 0]}>
      <ShowerEnclosure w={w} h={h} />
      <TypeComponent
        w={w} h={h} t={t}
        glassMat={glassMat.current}
        metalMat={metalMat.current}
        rahmentyp={config?.rahmentyp ?? 'teilgerahmt'}
      />
    </group>
  );
}
