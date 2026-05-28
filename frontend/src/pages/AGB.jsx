import { Helmet } from 'react-helmet-async'

const sections = [
  {
    title: '1. Geltungsbereich',
    paragraphs: [
      'Diese Allgemeinen Geschäftsbedingungen gelten für alle Lieferungen und Leistungen der Griesbeck & Preissler GbR gegenüber Verbrauchern und Unternehmern.',
      'Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.',
    ],
  },
  {
    title: '2. Vertragsgegenstand',
    paragraphs: [
      'Die Griesbeck & Preissler GbR vertreibt Duschkabinen sowie Sanitärgegenstände. Zusätzlich können Montageleistungen vermittelt oder organisiert werden.',
      'Die Montage erfolgt gegebenenfalls durch externe Subunternehmer.',
    ],
  },
  {
    title: '3. Angebote und Vertragsschluss',
    paragraphs: [
      'Unsere Angebote sind freibleibend und unverbindlich.',
      'Ein Vertrag kommt erst durch schriftliche Bestätigung, Auftragsbestätigung oder Lieferung der Ware zustande.',
    ],
  },
  {
    title: '4. Preise und Zahlungsbedingungen',
    paragraphs: [
      'Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer, sofern nicht anders angegeben.',
      'Die Zahlung ist unmittelbar nach Rechnungsstellung ohne Abzug fällig, sofern keine abweichende Vereinbarung getroffen wurde.',
    ],
  },
  {
    title: '5. Lieferzeiten',
    paragraphs: [
      'Lieferzeiten sind unverbindlich, sofern sie nicht ausdrücklich schriftlich als verbindlich vereinbart wurden.',
      'Da es sich teilweise um individuell angefertigte Produkte handelt und die Bestellung beim Hersteller erfolgt, kann es zu Lieferverzögerungen kommen.',
    ],
  },
  {
    title: '6. Maßanfertigungen',
    paragraphs: [
      'Bei individuell angefertigten oder speziell bestellten Produkten sind Änderungen oder Rückgaben ausgeschlossen, sofern kein gesetzlicher Gewährleistungsfall vorliegt.',
      'Für Maßabweichungen aufgrund bauseitiger Gegebenheiten übernimmt die Griesbeck & Preissler GbR keine Haftung, sofern die Maße vom Kunden bereitgestellt wurden.',
    ],
  },
  {
    title: '7. Widerrufsrecht',
    paragraphs: [
      'Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu.',
      'Das Widerrufsrecht besteht jedoch nicht bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Kunden maßgeblich ist (§ 312g Abs. 2 Nr. 1 BGB).',
      'Dies betrifft individuell angefertigte Duschkabinen und Sonderbestellungen.',
    ],
  },
  {
    title: '8. Montageleistungen',
    paragraphs: [
      'Montageleistungen können durch externe Partnerunternehmen durchgeführt werden.',
      'Die Griesbeck & Preissler GbR haftet nicht für Verzögerungen oder Schäden, die durch eigenständige Leistungen des Subunternehmers verursacht werden, soweit gesetzlich zulässig.',
    ],
  },
  {
    title: '9. Gewährleistung',
    paragraphs: [
      'Es gelten die gesetzlichen Gewährleistungsrechte.',
      'Offensichtliche Mängel sind vom Unternehmer unverzüglich nach Erhalt der Ware schriftlich anzuzeigen.',
    ],
  },
  {
    title: '10. Haftung',
    paragraphs: [
      'Die Haftung der Griesbeck & Preissler GbR ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, soweit gesetzlich zulässig.',
      'Die Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit bleibt unberührt.',
    ],
  },
  {
    title: '11. Gerichtsstand',
    paragraphs: [
      'Sofern der Kunde Kaufmann oder juristische Person des öffentlichen Rechts ist, ist Gerichtsstand Regensburg.',
    ],
  },
  {
    title: '12. Schlussbestimmungen',
    paragraphs: [
      'Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
      'Es gilt deutsches Recht.',
    ],
  },
]

export default function AGB() {
  return (
    <>
      <Helmet>
        <title>AGB | Duschwerk Bayern Regensburg</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://www.duschwerk-bayern.de/agb" />
      </Helmet>

      <div className="page-hero">
        <div className="container-max">
          <p className="eyebrow mb-3">Rechtliches</p>
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4" style={{ letterSpacing: '-0.03em' }}>
            AGB.
          </h1>
        </div>
      </div>

      <main className="section-padding" style={{ background: '#ECEEF2' }}>
        <div className="container-max">
          <div
            style={{
              maxWidth: '640px',
              background: 'white',
              borderRadius: '16px',
              padding: '40px 48px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                fontWeight: 500,
                marginBottom: '28px',
              }}
            >
              Allgemeine Geschäftsbedingungen
            </p>

            {sections.map((section, i) => (
              <div
                key={i}
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid #E5E7EB',
                  paddingTop: i === 0 ? 0 : '24px',
                  marginBottom: '24px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-headline, Georgia, serif)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#1F2E4A',
                    letterSpacing: '-0.01em',
                    marginBottom: '10px',
                  }}
                >
                  {section.title}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} style={s.text}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

const s = {
  text: {
    fontSize: '14px',
    color: '#374151',
    fontWeight: 300,
    lineHeight: '1.7',
    margin: '0 0 8px',
  },
}
