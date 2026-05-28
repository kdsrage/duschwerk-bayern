import { Helmet } from 'react-helmet-async'

export default function Impressum() {
  return (
    <>
      <Helmet>
        <title>Impressum | Duschwerk Bayern Regensburg</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://www.duschwerk-bayern.de/impressum" />
      </Helmet>

      <div className="page-hero">
        <div className="container-max">
          <p className="eyebrow mb-3">Rechtliches</p>
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4" style={{ letterSpacing: '-0.03em' }}>
            Impressum.
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
                marginBottom: '20px',
              }}
            >
              Angaben gemäß § 5 DDG
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-headline, Georgia, serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#1F2E4A',
                letterSpacing: '-0.02em',
                marginBottom: '6px',
              }}
            >
              Griesbeck &amp; Preissler GbR
            </h2>

            <p style={s.sub}>Vertreten durch die Gesellschafter:</p>
            <p style={s.text}>Benedikt Preissler</p>
            <p style={{ ...s.text, marginBottom: '20px' }}>Dieter Griesbeck</p>

            <p style={s.text}>Prüfeninger Straße 73</p>
            <p style={s.text}>93049 Regensburg</p>
            <p style={{ ...s.text, marginBottom: '20px' }}>Deutschland</p>

            <p style={s.text}>
              Telefon:{' '}
              <a href="tel:+4915163373563" style={s.link}>+49 151 63373563</a>
            </p>
            <p style={s.text}>
              E-Mail:{' '}
              <a href="mailto:info@duschwerk-bayern.de" style={s.link}>info@duschwerk-bayern.de</a>
            </p>
            <p style={{ ...s.text, marginBottom: '32px' }}>
              Website:{' '}
              <a href="https://www.duschwerk-bayern.de" style={s.link}>www.duschwerk-bayern.de</a>
            </p>

            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '24px', marginBottom: '24px' }}>
              <p style={s.label}>Umsatzsteuer-Identifikationsnummer</p>
              <p style={s.sub}>gemäß § 27a Umsatzsteuergesetz</p>
              <p style={s.text}>DE461268534</p>
            </div>

            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '24px' }}>
              <p style={s.label}>Unternehmensgegenstand</p>
              <p style={s.text}>Verkauf von Duschkabinen und Sanitärgegenständen</p>
            </div>
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
    margin: '0 0 2px',
  },
  sub: {
    fontSize: '12px',
    color: '#9CA3AF',
    fontWeight: 400,
    margin: '0 0 4px',
  },
  label: {
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#9CA3AF',
    fontWeight: 500,
    marginBottom: '4px',
  },
  link: {
    color: '#C62828',
    textDecoration: 'none',
  },
}
