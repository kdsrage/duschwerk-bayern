import * as THREE from 'three';

/**
 * Studio-Boden für den Shower-Konfigurator.
 * Polierter dunkler Stein mit Schattenempfang und Soft-Reflexion.
 */
export default function BathroomScene({ showerWidth = 1.2, showerHeight = 2.0 }) {
  const h      = showerHeight;
  const floorY = -h - 0.40; // tief genug für ±22° Rotation auch bei max. Höhe

  return (
    <group>
      {/* Polierter heller Marmorboden — weißer Stein mit feinen Reflexionen */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, -1.0]}>
        <planeGeometry args={[20, 14]} />
        <meshStandardMaterial
          color="#e8e6e2"
          roughness={0.14}
          metalness={0.04}
          envMapIntensity={0.45}
        />
      </mesh>

      {/* Helle Rückwand — neutrales Weiß für saubere Produktdarstellung */}
      <mesh position={[0, floorY + (h + 3) / 2, -4.5]}>
        <planeGeometry args={[16, h + 6]} />
        <meshStandardMaterial
          color="#f0f1f4"
          roughness={0.92}
          metalness={0.0}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}
