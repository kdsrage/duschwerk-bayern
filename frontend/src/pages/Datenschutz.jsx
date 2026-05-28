import { Helmet } from 'react-helmet-async'

function Section({ title, children }) {
  return (
    <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '28px', marginBottom: '28px' }}>
      <h2 style={{
        fontFamily: 'var(--font-headline, Georgia, serif)',
        fontSize: '1.05rem',
        fontWeight: 600,
        color: '#1F2E4A',
        letterSpacing: '-0.01em',
        marginBottom: '12px',
      }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function P({ children, style }) {
  return (
    <p style={{ fontSize: '14px', color: '#374151', fontWeight: 300, lineHeight: '1.75', margin: '0 0 10px', ...style }}>
      {children}
    </p>
  )
}

function UL({ items }) {
  return (
    <ul style={{ paddingLeft: '18px', margin: '0 0 10px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '14px', color: '#374151', fontWeight: 300, lineHeight: '1.75', marginBottom: '4px' }}>
          {item}
        </li>
      ))}
    </ul>
  )
}

const link = { color: '#C62828', textDecoration: 'none' }

export default function Datenschutz() {
  return (
    <>
      <Helmet>
        <title>Datenschutz | Duschwerk Bayern Regensburg</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://www.duschwerk-bayern.de/datenschutz" />
      </Helmet>

      <div className="page-hero">
        <div className="container-max">
          <p className="eyebrow mb-3">Rechtliches</p>
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4" style={{ letterSpacing: '-0.03em' }}>
            Datenschutzerklärung.
          </h1>
          <p className="text-gray-500 max-w-lg text-base font-light leading-relaxed">
            Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.
          </p>
        </div>
      </div>

      <main className="section-padding" style={{ background: '#ECEEF2' }}>
        <div className="container-max">
          <div style={{
            maxWidth: '720px',
            background: 'white',
            borderRadius: '16px',
            padding: '40px 48px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}>

            {/* Intro */}
            <P>
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten
              daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, DSG). In dieser
              Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung
              im Rahmen unserer Website.
            </P>

            <Section title="1. Verantwortlicher">
              <P>Verantwortlich für die Datenverarbeitung auf dieser Website:</P>
              <P>
                Griesbeck &amp; Preissler GbR<br />
                Prüfeninger Straße 73<br />
                93049 Regensburg<br />
                Deutschland
              </P>
              <P>
                Telefon: <a href="tel:+4915163373563" style={link}>+49 151 63373563</a><br />
                E-Mail: <a href="mailto:info@duschwerk-bayern.de" style={link}>info@duschwerk-bayern.de</a>
              </P>
            </Section>

            <Section title="2. Datenerfassung auf dieser Website">
              <P style={{ fontWeight: 500, color: '#1F2E4A' }}>Server-Log-Dateien</P>
              <P>
                Der Hostinganbieter dieser Website erhebt und speichert automatisch Informationen in
                sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
              </P>
              <UL items={[
                'Browsertyp und Browserversion',
                'Verwendetes Betriebssystem',
                'Referrer-URL',
                'Hostname des zugreifenden Rechners',
                'Uhrzeit der Serveranfrage',
                'IP-Adresse',
              ]} />
              <P>
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
                Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung
                und Optimierung seiner Website.
              </P>
            </Section>

            <Section title="3. Kontaktformular und Kontaktaufnahme">
              <P>
                Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben
                aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
                Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </P>
              <P>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
                sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
                auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
                Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
              </P>
              <P>
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
                Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
                Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen — insbesondere
                Aufbewahrungsfristen — bleiben unberührt.
              </P>
            </Section>

            <Section title="4. Cookies">
              <P>
                Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf
                Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher,
                effektiver und sicherer zu machen.
              </P>
              <P>
                Einige Cookies sind „Session-Cookies". Solche Cookies werden nach Ende Ihrer
                Browser-Sitzung von selbst gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert,
                bis Sie diese löschen. Diese Cookies helfen uns, Sie beim nächsten Besuch
                wiederzuerkennen.
              </P>
              <P>
                Durch einen modernen Webbrowser können Sie das Setzen von Cookies überwachen, einschränken
                oder unterbinden. Viele Webbrowser lassen sich so konfigurieren, dass Cookies mit dem
                Schließen des Programms von selbst gelöscht werden. Die Deaktivierung von Cookies kann
                eine eingeschränkte Funktionalität unserer Website zur Folge haben.
              </P>
              <P>
                Das Setzen von Cookies, die zur Ausübung elektronischer Kommunikationsvorgänge oder der
                Bereitstellung bestimmter, von Ihnen erwünschter Funktionen notwendig sind, erfolgt auf
                Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </P>
            </Section>

            <Section title="5. Ihre Rechte">
              <P>Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich folgende Rechte zu:</P>
              <UL items={[
                'Recht auf Auskunft (Art. 15 DSGVO)',
                'Recht auf Berichtigung (Art. 16 DSGVO)',
                'Recht auf Löschung (Art. 17 DSGVO)',
                'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
                'Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO)',
              ]} />
              <P>
                Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt
                oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind,
                können Sie sich bei der Aufsichtsbehörde beschweren. In Bayern ist dies das Bayerische
                Landesamt für Datenschutzaufsicht (BayLDA),{' '}
                <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" style={link}>
                  www.lda.bayern.de
                </a>.
              </P>
            </Section>

            <Section title="6. Datensicherheit">
              <P>
                Wir sichern unsere Website und sonstigen Systeme durch technische und organisatorische
                Maßnahmen gegen Verlust, Zerstörung, Zugriff, Veränderung oder Verbreitung Ihrer Daten
                durch unbefugte Personen. Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
                Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung.
              </P>
            </Section>

            <Section title="7. Aktualität und Änderung dieser Datenschutzerklärung">
              <P>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2025. Durch die
                Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher
                Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils
                aktuelle Datenschutzerklärung kann jederzeit auf dieser Seite abgerufen werden.
              </P>
            </Section>

          </div>
        </div>
      </main>
    </>
  )
}
