import * as THREE from 'three';

/**
 * Minimaler Hintergrund-Boden für den Shower-Konfigurator.
 * Die eigentlichen Duschwände werden durch ShowerEnclosure im ShowerModel gerendert.
 */
export default function BathroomScene({ showerWidth = 1.2, showerHeight = 2.0 }) {
  const h      = showerHeight;
  const floorY = -h - 0.055; // unter der Duschwanne

  return (
    <group>
      {/* Hauptboden */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, -0.5]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          color="#ccc8c0"
          roughness={0.70}
          metalness={0.02}
          envMapIntensity={0.10}
        />
      </mesh>

      {/* Rückwand (hinter der Dusche) */}
      <mesh position={[0, floorY + (h + 1) / 2, -2.0]}>
        <planeGeometry args={[10, h + 2]} />
        <meshStandardMaterial
          color="#d4d0ca"
          roughness={0.80}
          metalness={0.01}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}
