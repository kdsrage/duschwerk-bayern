import React from 'react';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="#1F2E4A" strokeWidth="1.4"/>
        <path d="M3 9h16M9 9v10" stroke="#1F2E4A" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="6" cy="6" r="1" fill="#1F2E4A"/>
      </svg>
    ),
    title: '3D-Echtzeit-Vorschau',
    desc: 'Sehen Sie Ihre Konfiguration live im 3D-Viewer',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 18L18 4M4 4l14 14" stroke="#1F2E4A" strokeWidth="1.4" strokeLinecap="round" opacity="0.2"/>
        <path d="M4 11h14M11 4v14" stroke="#1F2E4A" strokeWidth="1.4" strokeLinecap="round"/>
        <rect x="8" y="8" width="6" height="6" rx="1" stroke="#1F2E4A" strokeWidth="1.2"/>
      </svg>
    ),
    title: 'Millimetergenau',
    desc: 'Individuelle Maße für Ihre genaue Einbausituation',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke="#1F2E4A" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Nur valide Optionen',
    desc: 'Nur technisch mögliche Kombinationen sind wählbar',
  },
];

export default function StepEinstieg({ onNext }) {
  return (
    <div className="step-einstieg">
      <div className="einstieg-header">
        <div className="einstieg-eyebrow">Duschkonfigurator</div>
        <h2 className="einstieg-title">Planen Sie Ihre<br />individuelle Dusche.</h2>
        <p className="einstieg-sub">
          In wenigen Schritten zur maßgefertigten Duschabtrennung – mit Echtzeit-Vorschau und persönlicher Beratung am Ende.
        </p>
      </div>

      <div className="einstieg-features">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="einstieg-feature">
            <div className="einstieg-feature-icon">{icon}</div>
            <div>
              <div className="einstieg-feature-title">{title}</div>
              <div className="einstieg-feature-desc">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="einstieg-cta" onClick={onNext}>
        Konfiguration starten
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <p className="einstieg-note">
        Kostenlos & unverbindlich · Das finale Aufmaß durch unser Fachpersonal
      </p>
    </div>
  );
}
