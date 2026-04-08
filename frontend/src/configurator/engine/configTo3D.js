/**
 * Bridge: Konfigurator-State → 3D-Rendering-Daten
 */

import { GLASTYPEN, PROFILFARBEN, GLASSTAERKEN } from '../data/productCatalog';

const SHOWCASE_DEFAULT = {
  typ:     'Walk-in',
  glas:    'Klarglas',
  staerke: '8mm',
  profil:  'Metall hochglanz',
  breite:  90,
  hoehe:   200,
  extras:  [],
};

export function configTo3D(wizardConfig) {
  if (!wizardConfig.einbausituation) return SHOWCASE_DEFAULT;

  const glas    = GLASTYPEN.find(g => g.id === wizardConfig.glastyp);
  const profil  = PROFILFARBEN.find(p => p.id === wizardConfig.profilfarbe);
  const staerke = GLASSTAERKEN.find(gs => gs.id === wizardConfig.glasstaerke);

  const typ = mapToLegacyTyp(wizardConfig);

  return {
    typ,
    glas:    glas?.name    || 'Klarglas',
    staerke: staerke?.id   || '8mm',
    profil:  profil?.name  || 'Metall hochglanz',
    breite:  wizardConfig.breite || 90,
    hoehe:   wizardConfig.hoehe  || 200,
    extras:  [],
  };
}

function mapToLegacyTyp({ einbausituation, tuersystem }) {
  if (einbausituation === 'walkin')    return 'Walk-in';
  if (einbausituation === 'glaswand')  return 'Walk-in';
  if (einbausituation === 'badewanne') return 'Nische';
  return mapTuersystem(tuersystem);
}

function mapTuersystem(id) {
  switch (id) {
    case 'schiebe': return 'Schiebetür';
    case 'schwenk': return 'Drehtür';
    case 'pendel':  return 'Drehtür';
    case 'falt':    return 'Schiebetür';
    default:        return 'Walk-in';
  }
}
