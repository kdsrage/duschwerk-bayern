import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import imgArtwall from '../assets/products/artweger-artwall.jpg'
import imgArtstone from '../assets/products/artweger-duschwanne.jpg'
import imgJoice from '../assets/products/artweger-joice.jpg'
import imgMove from '../assets/products/artweger-move.jpg'
import imgRadawayWannen from '../assets/products/radaway-duschwanne.jpg'
import imgPrestige from '../assets/products/artweger-prestige.jpg'
import imgDynamic from '../assets/products/artweger-dynamic.jpg'
import imgOne from '../assets/products/artweger-one.jpg'
import imgNes6 from '../assets/products/radaway-nes6.jpg'
import imgZubehoer from '../assets/products/artweger-zubehoer.jpg'
import imgBadewanne from '../assets/products/artweger-badewanne.jpg'
import imgModo from '../assets/products/radaway-modo.jpg'

// Produktbild-Komponenten — schlichte SVG-Line-Icons je Kategorie
function ImgNische() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      <rect x="30" y="20" width="140" height="95" rx="2" fill="#E4E8EF" />
      <line x1="30" y1="20" x2="30" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="170" y1="20" x2="170" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="30" y1="115" x2="170" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="30" y1="20" x2="170" y2="20" stroke="#2E7FBF" strokeWidth="4" strokeLinecap="round"/>
      <line x1="100" y1="20" x2="100" y2="38" stroke="#2E7FBF" strokeWidth="2" strokeDasharray="4 3" opacity="0.6"/>
      <circle cx="100" cy="70" r="10" fill="none" stroke="#2E7FBF" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  )
}
function ImgPrestige() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      <rect x="28" y="20" width="120" height="95" rx="2" fill="#E4E8EF" />
      <line x1="28" y1="20" x2="28" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="28" y1="115" x2="148" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="28" y1="20" x2="118" y2="20" stroke="#2E7FBF" strokeWidth="4" strokeLinecap="round"/>
      <line x1="118" y1="20" x2="118" y2="105" stroke="#2E7FBF" strokeWidth="4" strokeLinecap="round"/>
      {/* Elegantes Profil-Detail */}
      <rect x="30" y="22" width="86" height="81" fill="none" stroke="#2E7FBF" strokeWidth="1" opacity="0.25"/>
      <line x1="118" y1="52" x2="148" y2="52" stroke="#2E7FBF" strokeWidth="2" strokeDasharray="5 4" opacity="0.5"/>
      <text x="145" y="34" textAnchor="middle" fontSize="9" fill="#1F2E4A" opacity="0.5" fontFamily="sans-serif">PRESTIGE</text>
    </svg>
  )
}
function ImgDynamic() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      <line x1="30" y1="20" x2="30" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="30" y1="115" x2="170" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      {/* Schwingflügel offen */}
      <line x1="30" y1="20" x2="90" y2="20" stroke="#2E7FBF" strokeWidth="4" strokeLinecap="round"/>
      <path d="M 90 20 Q 120 50 90 80" stroke="#2E7FBF" strokeWidth="2.5" strokeDasharray="5 4" fill="none" opacity="0.6"/>
      <line x1="90" y1="80" x2="90" y2="115" stroke="#2E7FBF" strokeWidth="4" strokeLinecap="round"/>
      {/* Pfeil Öffnungsrichtung */}
      <path d="M 108 44 L 118 50 L 108 56" fill="none" stroke="#2E7FBF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
    </svg>
  )
}
function ImgMove() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      <rect x="28" y="20" width="128" height="95" rx="2" fill="#E4E8EF" />
      <line x1="28" y1="20" x2="28" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="28" y1="115" x2="156" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="156" y1="20" x2="156" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      {/* Schiebetür */}
      <rect x="78" y="20" width="50" height="90" fill="none" stroke="#2E7FBF" strokeWidth="3" rx="1"/>
      <line x1="28" y1="20" x2="78" y2="20" stroke="#2E7FBF" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
      {/* Schieberichtungs-Pfeil */}
      <path d="M 62 63 L 50 70 L 62 77" fill="none" stroke="#2E7FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      <line x1="50" y1="70" x2="76" y2="70" stroke="#2E7FBF" strokeWidth="1.8" opacity="0.6"/>
    </svg>
  )
}
function ImgWalkIn() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      <line x1="30" y1="20" x2="30" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="30" y1="115" x2="160" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      {/* Feststehende Glaswand */}
      <line x1="30" y1="20" x2="100" y2="20" stroke="#2E7FBF" strokeWidth="4" strokeLinecap="round"/>
      <line x1="100" y1="20" x2="100" y2="115" stroke="#2E7FBF" strokeWidth="3" strokeLinecap="round"/>
      {/* Offener Eingang — Pfeile */}
      <path d="M 116 55 L 130 65 L 116 75" fill="none" stroke="#2E7FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <path d="M 144 55 L 130 65 L 144 75" fill="none" stroke="#2E7FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    </svg>
  )
}
function ImgDuschwanne() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      <rect x="25" y="55" width="150" height="52" rx="6" fill="#E4E8EF" stroke="#1F2E4A" strokeWidth="3"/>
      <line x1="25" y1="55" x2="175" y2="55" stroke="#2E7FBF" strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="100" cy="83" rx="36" ry="14" fill="none" stroke="#2E7FBF" strokeWidth="1.5" opacity="0.35"/>
      {/* Abfluss */}
      <circle cx="155" cy="90" r="5" fill="none" stroke="#1F2E4A" strokeWidth="1.5" opacity="0.5"/>
      {/* Regen-Duschkopf */}
      <rect x="70" y="18" width="60" height="8" rx="4" fill="#2E7FBF" opacity="0.5"/>
      <line x1="80" y1="26" x2="80" y2="52" stroke="#2E7FBF" strokeWidth="1.5" opacity="0.4"/>
      <line x1="100" y1="26" x2="100" y2="52" stroke="#2E7FBF" strokeWidth="1.5" opacity="0.4"/>
      <line x1="120" y1="26" x2="120" y2="52" stroke="#2E7FBF" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  )
}
function ImgDuschbadewanne() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      {/* Badewanne */}
      <rect x="22" y="50" width="156" height="60" rx="10" fill="#E4E8EF" stroke="#1F2E4A" strokeWidth="3"/>
      <ellipse cx="100" cy="82" rx="46" ry="16" fill="none" stroke="#2E7FBF" strokeWidth="1.5" opacity="0.3"/>
      {/* Glasscheibe oben (Duschabtrennung) */}
      <line x1="22" y1="50" x2="100" y2="50" stroke="#2E7FBF" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="100" y1="20" x2="100" y2="50" stroke="#2E7FBF" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.7"/>
      {/* Armaturen */}
      <circle cx="158" cy="66" r="5" fill="none" stroke="#1F2E4A" strokeWidth="1.8" opacity="0.5"/>
      <line x1="158" y1="50" x2="158" y2="61" stroke="#1F2E4A" strokeWidth="1.5" opacity="0.4"/>
      {/* Duschkopf */}
      <rect x="62" y="14" width="44" height="7" rx="3.5" fill="#2E7FBF" opacity="0.5"/>
    </svg>
  )
}
function ImgArtwall() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      {/* Wandpaneel-Raster */}
      {[22, 62, 102, 142].map((x, i) => (
        <rect key={i} x={x} y="18" width="38" height="94" rx="2" fill="#E2E6ED" stroke="#C0C8D4" strokeWidth="1.2"/>
      ))}
      <rect x="22" y="18" width="156" height="94" rx="2" fill="none" stroke="#2E7FBF" strokeWidth="2" opacity="0.4"/>
      {/* Horizontale Fuge */}
      <line x1="22" y1="65" x2="178" y2="65" stroke="#C0C8D4" strokeWidth="1.2"/>
      <text x="100" y="75" textAnchor="middle" fontSize="9" fill="#1F2E4A" opacity="0.4" fontFamily="sans-serif">ARTWALL</text>
    </svg>
  )
}

const TABS = [
  { id: 'duschkabinen', label: 'Duschkabinen' },
  { id: 'badewannen',   label: 'Badewannen'   },
  { id: 'duschwannen',  label: 'Duschwannen'  },
  { id: 'zubehoer',     label: 'Zubehör'      },
]

function ProductCard({ id, name, desc, url, img, Img, hersteller, imgPosition }) {
  const open = () => window.open(url, '_blank', 'noopener,noreferrer')
  return (
    <article
      className="card-3d flex flex-col overflow-hidden"
      style={{ cursor: 'pointer' }}
      onClick={open}
      role="link"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && open()}
    >
      <div style={{ height: '180px', background: '#F0F2F5', overflow: 'hidden' }}>
        {img
          ? <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: imgPosition || 'center' }} />
          : <Img />
        }
      </div>
      <div className="p-6 flex flex-col flex-1">
        {hersteller && (
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>{hersteller}</span>
        )}
        <h3 className="font-headline text-base text-primary font-semibold tracking-tight mb-2">{name}</h3>
        <p className="text-gray-500 text-sm font-light leading-relaxed mb-4">{desc}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="mt-auto text-xs font-medium transition-colors duration-200"
          style={{ color: '#C62828' }}
        >
          Zum Hersteller →
        </a>
      </div>
    </article>
  )
}

const ALL_PRODUCTS = [
  // ── Duschkabinen ──────────────────────────────────────────
  {
    id: 'artweger-one',
    name: 'Artweger ONE',
    hersteller: 'Artweger',
    desc: 'Vielseitige Duschlösung für unterschiedlichste Einbausituationen mit modernem Design, stabiler Konstruktion und langlebiger Technik. Ideal für Neubau sowie Renovierung.',
    url: 'https://www.artweger.at/de/product-line/artweger-one_70714',
    img: imgOne,
    Img: ImgNische,
    cat: 'duschkabinen',
  },
  {
    id: 'artweger-prestige',
    name: 'Artweger PRESTIGE',
    hersteller: 'Artweger',
    desc: 'Designorientierte Duschabtrennungen mit eleganter Profilgestaltung und hochwertigen Glasflächen. Entwickelt in Zusammenarbeit mit Studio F. A. Porsche für gehobene Badkonzepte.',
    url: 'https://www.artweger.at/de/product-line/prestige_69623',
    img: imgPrestige,
    Img: ImgPrestige,
    cat: 'duschkabinen',
  },
  {
    id: 'artweger-dynamic',
    name: 'Artweger DYNAMIC',
    hersteller: 'Artweger',
    desc: 'Flexible Pendeltür- und Walk-In-Lösungen mit robuster Technik, moderner Optik und vielseitigen Anpassungsmöglichkeiten an unterschiedliche Raumgrößen.',
    url: 'https://www.artweger.at/de/product-line/dynamic_18671',
    img: imgDynamic,
    Img: ImgDynamic,
    cat: 'duschkabinen',
  },
  {
    id: 'artweger-move',
    name: 'Artweger MOVE',
    hersteller: 'Artweger',
    desc: 'Platzsparende Schiebetürsysteme mit leichtgängiger Lauftechnik. Besonders geeignet für kleinere Badezimmer oder schwierige Grundrisse.',
    url: 'https://www.artweger.at/de/product-line/artweger-move_37352',
    img: imgMove,
    Img: ImgMove,
    cat: 'duschkabinen',
  },
  {
    id: 'artweger-joice',
    name: 'Artweger JOICE Walk-In',
    hersteller: 'Artweger',
    desc: 'Offene und großzügige Duschlösungen mit reduzierter Formensprache. Unterstützt moderne, barrierearme und minimalistische Badgestaltung.',
    url: 'https://www.artweger.at/de/product-line/joice_59822',
    img: imgJoice,
    Img: ImgWalkIn,
    cat: 'duschkabinen',
  },
  // ── Badewannen ────────────────────────────────────────────
  {
    id: 'artweger-duschwannen',
    name: 'Artweger Duschbadewannen',
    hersteller: 'Artweger',
    desc: 'Kombilösungen aus Badewanne und Dusche — ideal für Bäder, in denen beides gewünscht ist. Verschiedene Formen und Glasaufsatz-Varianten verfügbar.',
    url: 'https://www.artweger.at/de/product-group/duschbadewannen_37',
    img: imgBadewanne,
    imgPosition: 'top',
    Img: ImgDuschbadewanne,
    cat: 'badewannen',
  },
  // ── Duschwannen ───────────────────────────────────────────
  {
    id: 'artstone',
    name: 'ARTSTONE Duschwannen',
    hersteller: 'Artweger',
    desc: 'Hochwertige Mineralguss-Duschwannen mit angenehmer Oberfläche, hoher Stabilität und moderner flacher Bauweise für bodennahe Einbaulösungen.',
    url: 'https://www.artweger.at/de/produkte/duschwannen-acryl-undmineralguss/artstone-duschwannen-aus-mineralguss',
    img: imgArtstone,
    Img: ImgDuschwanne,
    cat: 'duschwannen',
  },
  // ── Zubehör ───────────────────────────────────────────────
  {
    id: 'artwall',
    name: 'Artwall Wandpaneele',
    hersteller: 'Artweger',
    desc: 'Pflegeleichte Wandverkleidungssysteme zur schnellen und sauberen Renovierung von Duschbereichen. Häufig können bestehende Fliesen überdeckt werden.',
    url: 'https://www.artweger.at/de/product-line/artwall-neu_70780',
    img: imgArtwall,
    Img: ImgArtwall,
    cat: 'zubehoer',
  },
  {
    id: 'artweger-zubehoer',
    name: 'Sonstiges Zubehör',
    hersteller: 'Artweger',
    desc: 'Ergänzendes Zubehör für Dusche und Bad: verschiedene Sitze, Ablaufdeckel, Nackenstützen, Rückenlehnen und Handtuchhalter — passend zu den Artweger-Serien.',
    url: 'https://www.artweger.at/de/care-group/zubehoer_992',
    img: imgZubehoer,
    Img: ImgArtwall,
    cat: 'zubehoer',
  },
]

function ImgRadawayModo() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      <line x1="30" y1="20" x2="30" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="30" y1="115" x2="170" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      {/* Feststehende Glasfläche + seitliche Glaswand */}
      <line x1="30" y1="20" x2="110" y2="20" stroke="#C62828" strokeWidth="4" strokeLinecap="round"/>
      <line x1="110" y1="20" x2="110" y2="115" stroke="#C62828" strokeWidth="3" strokeLinecap="round"/>
      {/* Zweite parallele Glasplatte */}
      <line x1="30" y1="32" x2="108" y2="32" stroke="#C62828" strokeWidth="1.5" opacity="0.3" strokeDasharray="5 4"/>
      {/* Offener Eingang */}
      <path d="M 124 55 L 138 65 L 124 75" fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <path d="M 152 55 L 138 65 L 152 75" fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <text x="100" y="102" textAnchor="middle" fontSize="8" fill="#C62828" opacity="0.5" fontFamily="sans-serif" fontWeight="600">MODO NEW II</text>
    </svg>
  )
}
function ImgRadawayNes6() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      <rect x="28" y="20" width="120" height="95" rx="2" fill="#E4E8EF" />
      <line x1="28" y1="20" x2="28" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="28" y1="115" x2="148" y2="115" stroke="#1F2E4A" strokeWidth="5" strokeLinecap="round"/>
      {/* Rahmentür */}
      <rect x="28" y="20" width="60" height="95" fill="none" stroke="#C62828" strokeWidth="3" rx="1"/>
      <line x1="148" y1="20" x2="148" y2="115" stroke="#C62828" strokeWidth="3" strokeLinecap="round"/>
      {/* Griff */}
      <line x1="82" y1="60" x2="82" y2="78" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Öffnungspfeil */}
      <path d="M 96 62 L 108 68 L 96 74" fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <text x="100" y="102" textAnchor="middle" fontSize="8" fill="#C62828" opacity="0.5" fontFamily="sans-serif" fontWeight="600">NES 6</text>
    </svg>
  )
}
function ImgRadawayWannen() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="200" height="130" fill="#F0F2F5" rx="4" />
      {/* Duschwanne quadratisch */}
      <rect x="28" y="38" width="144" height="70" rx="5" fill="#E4E8EF" stroke="#1F2E4A" strokeWidth="2.5"/>
      {/* Innenschale */}
      <rect x="38" y="48" width="124" height="50" rx="3" fill="none" stroke="#C62828" strokeWidth="1.5" opacity="0.5"/>
      {/* Abfluss mittig */}
      <circle cx="100" cy="73" r="7" fill="none" stroke="#1F2E4A" strokeWidth="1.8" opacity="0.5"/>
      <circle cx="100" cy="73" r="3" fill="#C0C8D4"/>
      {/* Bodengleicher Look — Schräge */}
      <line x1="28" y1="38" x2="38" y2="48" stroke="#C62828" strokeWidth="1.2" opacity="0.4"/>
      <line x1="172" y1="38" x2="162" y2="48" stroke="#C62828" strokeWidth="1.2" opacity="0.4"/>
      <text x="100" y="26" textAnchor="middle" fontSize="8" fill="#C62828" opacity="0.5" fontFamily="sans-serif" fontWeight="600">DUSCHWANNEN</text>
    </svg>
  )
}

// Radaway Produkte — in ALL_PRODUCTS eingebaut weiter unten
ALL_PRODUCTS.push(
  {
    id: 'radaway-modo',
    name: 'Radaway Modo New II',
    hersteller: 'Radaway',
    desc: 'Moderne Walk-In- und Rahmendusch­lösungen mit klarer Linienführung und stabiler Bauweise für stilvolle Badkonzepte.',
    url: 'https://www.radaway.de/kategoria/modo-new-ii/',
    img: imgModo,
    Img: ImgRadawayModo,
    cat: 'duschkabinen',
  },
  {
    id: 'radaway-nes6',
    name: 'Radaway Nes 6',
    hersteller: 'Radaway',
    desc: 'Zeitlose Duschabtrennungen mit vielfältigen Einbaumöglichkeiten und funktionalen Türvarianten für individuelle Raumlösungen. In mehreren Farben erhältlich (u.a. Chrom und Schwarz).',
    url: 'https://www.radaway.de/typ/prostokatne-wejscie-z-boku/',
    img: imgNes6,
    Img: ImgRadawayNes6,
    cat: 'duschkabinen',
  },
  {
    id: 'radaway-wannen',
    name: 'Radaway Duschwannen',
    hersteller: 'Radaway',
    desc: 'Breites Sortiment an Duschwannen in verschiedenen Materialien, Formen und Einbauhöhen zur Umsetzung klassischer oder bodengleicher Duschen.',
    url: 'https://www.radaway.de/typ/brodziki-kwadratowe/',
    img: imgRadawayWannen,
    Img: ImgRadawayWannen,
    cat: 'duschwannen',
  },
)

const partners = [
  { name: 'Artweger', url: 'https://www.artweger.at/de', desc: 'Österreichischer Hersteller hochwertiger Duschsysteme' },
  { name: 'Radaway', url: 'https://www.radaway.de', desc: 'Europäischer Anbieter moderner Duschabtrennungen' },
  { name: 'Haustechnik Preissler', url: 'https://www.haustechnik-preissler.de', desc: 'Regionaler Partner im Bereich Sanitärtechnik' },
]

export default function Products() {
  const [activeTab, setActiveTab] = useState('duschkabinen')
  const visible = ALL_PRODUCTS.filter(p => p.cat === activeTab)

  return (
    <>
      <Helmet>
        <title>Produkte unserer Partnerfirmen | Duschwerk Bayern</title>
        <meta name="description" content="Hochwertige Duschabtrennungen und Duschwannen von Artweger und Radaway – erhältlich bei Duschwerk Bayern in Regensburg." />
        <link rel="canonical" href="https://www.duschwerk-bayern.de/produkte" />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="container-max">
          <p className="eyebrow mb-3">Produkte</p>
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4" style={{ letterSpacing: '-0.03em' }}>
            Produkte unserer Partnerfirmen.
          </h1>
          <p className="text-gray-500 max-w-lg text-base font-light leading-relaxed">
            Durch die Zusammenarbeit mit ausgewählten Herstellern können für nahezu jede Einbausituation passende, hochwertige und langlebige Lösungen realisiert werden.
          </p>
        </div>
      </div>

      <main>

        {/* Tab-Navigation + Produktgitter */}
        <section className="section-padding" style={{ background: '#ECEEF2' }}>
          <div className="container-max">

            {/* Reiter */}
            <div style={{ display: 'flex', borderBottom: '1px solid #D1D5DB', marginBottom: '2.5rem', gap: 0 }}>
              {TABS.map(tab => {
                const count = ALL_PRODUCTS.filter(p => p.cat === tab.id).length
                const active = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.82rem',
                      fontWeight: active ? 600 : 400,
                      letterSpacing: '0.02em',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: active ? '2px solid #C62828' : '2px solid transparent',
                      marginBottom: '-1px',
                      color: active ? '#1F2E4A' : '#6B7280',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      transition: 'color 0.22s ease, border-color 0.22s ease',
                      whiteSpace: 'nowrap',
                      animation: active ? 'tab-activate 0.28s ease' : 'none',
                    }}
                  >
                    {tab.label}
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '999px',
                      background: active ? '#C62828' : '#E5E7EB',
                      color: active ? 'white' : '#6B7280',
                      lineHeight: 1.6,
                      transition: 'background 0.22s ease, color 0.22s ease',
                    }}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
            <style>{`
              @keyframes tab-activate {
                0%   { opacity: 0.55; transform: translateY(2px); }
                100% { opacity: 1;    transform: translateY(0);   }
              }
            `}</style>

            {/* Produktkarten */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map(p => <ProductCard key={p.id} {...p} />)}
            </div>

            {visible.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-12">
                Noch keine Produkte in dieser Kategorie — Bilder folgen in Kürze.
              </p>
            )}
          </div>
        </section>

        {/* Hinweise */}
        <section className="section-padding bg-white">
          <div className="container-max space-y-4">
            <div className="card-3d p-7">
              <p className="font-semibold text-primary text-sm mb-2">Ausstellungsprodukte & Verfügbarkeit</p>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Die aufgelisteten Produkte sind die Modelle, die in unserer Ausstellung ausgestellt sind. Selbstverständlich sind alle weiteren Kabinen, Wannen, Wandpaneele und anderes Zubehör, die auf den jeweiligen Herstellerseiten aufgeführt sind, ebenfalls über uns erhältlich – allerdings nicht zum Live-Anschauen.
              </p>
            </div>
            <div className="card-3d p-7">
              <p className="font-semibold text-primary text-sm mb-2">Integrierter Handtuchhalter</p>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Einige ausgewählte Modelle sind mit einem integrierten Handtuchhalter im Glas erhältlich. Sprechen Sie uns gerne darauf an.
              </p>
            </div>
          </div>
        </section>

        {/* Partnerlinks */}
        <section className="section-padding" style={{ background: '#ECEEF2' }}>
          <div className="container-max">
            <header className="mb-10">
              <p className="eyebrow mb-3">Partner</p>
              <h2 className="font-headline text-3xl text-primary" style={{ letterSpacing: '-0.03em' }}>
                Unsere Partnerlinks.
              </h2>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {partners.map(({ name, url, desc }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-3d p-7 block group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-headline text-base text-primary font-semibold tracking-tight">{name}</h3>
                    <svg
                      className="w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-200"
                      style={{ color: '#8892A4' }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-4">{desc}</p>
                  <p
                    className="text-xs font-medium tracking-wide transition-colors duration-200"
                    style={{ color: '#C62828' }}
                  >
                    {url.replace('https://', '')} →
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <section
        className="section-padding text-center"
        style={{ background: 'linear-gradient(135deg, #1F2E4A 0%, #2E4C7D 100%)' }}
      >
        <div className="container-max">
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-3">Beratung</p>
          <h2 className="font-headline text-3xl text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
            Welches Produkt passt zu Ihnen?
          </h2>
          <p className="text-white/50 mb-10 max-w-md mx-auto font-light text-sm">
            Wir beraten Sie persönlich – in unserer Ausstellung oder direkt bei Ihnen vor Ort.
          </p>
          <Link to="/kontakt" className="btn-silver px-10 py-4 text-sm">Beratung anfragen</Link>
        </div>
      </section>
    </>
  )
}
