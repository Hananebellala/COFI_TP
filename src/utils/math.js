export const DA = (v) => new Intl.NumberFormat('fr-DZ').format(Math.round(v));
export const pct = (v) => (v * 100).toFixed(1) + '%';

export const compute = (p) => {
  const amortInvest = p.montantInvest / p.duree;
  
  // ===== COMPTE DE RÉSULTAT =====
  const cv = p.chiffreAffaires * (p.chargesVariablesPct / 100);
  const mcv = p.chiffreAffaires - cv;
  const ebitda = mcv - p.chargesFixesHorsAmort;
  const ebit = ebitda - amortInvest;

  // ===== TABLEAU AMORTISSEMENT EMPRUNT =====
  const amortCap = p.montantEmprunt / p.dureeEmprunt;
  let cap = p.montantEmprunt;
  const empruntRows = [];
  for (let a = 1; a <= p.dureeEmprunt; a++) {
    const int = cap * (p.tauxEmprunt / 100);
    const ann = amortCap + int;
    empruntRows.push({ a, capDebut: cap, amortCap, int, ann, capFin: Math.max(0, cap - amortCap) });
    cap -= amortCap;
  }
  const totalInt = empruntRows.reduce((s, r) => s + r.int, 0);
  const totalAnn = empruntRows.reduce((s, r) => s + r.ann, 0);

  // ===== CAF =====
  const intAn1 = empruntRows[0]?.int || 0;
  const ebitAn1 = ebit - intAn1;
  const is = Math.max(0, ebitAn1) * (p.tauxIS / 100);
  const resultatNet = ebitAn1 - is;
  const caf = resultatNet + amortInvest;

  // ===== PLAN DE FINANCEMENT PLURIANNUEL =====
  const planRows = Array.from({ length: p.duree }, (_, i) => {
    const yr = i + 1;
    
    // RESSOURCES - CORRECTION ANNÉE 1
    let ressources = 0;
    if (i === 0) {
      // Année 1: SANS CAF (pas encore générée)
      ressources = p.apportCapital + p.montantEmprunt + p.autoFinancement;
    } else {
      // Années 2+: CAF devient la ressource principale
      ressources = caf;
    }

    // BESOINS
    let besoins = 0;
    if (i === 0) {
      // Année 1: Investissement + BFR initial
      besoins = p.montantInvest + (p.bfrInitial || 0);
    } else {
      // Années 2+: Remboursement emprunt (annuité)
      besoins = empruntRows[i - 1]?.ann || 0;
    }

    const solde = ressources - besoins;
    
    return { 
      yr, 
      caf: i === 0 ? 0 : caf,  // CAF = 0 an 1
      apportCapital: i === 0 ? p.apportCapital : 0, 
      empruntRessource: i === 0 ? p.montantEmprunt : 0, 
      autoFin: i === 0 ? p.autoFinancement : 0, 
      ressources, 
      investissement: i === 0 ? p.montantInvest : 0,
      bfr: i === 0 ? (p.bfrInitial || 0) : 0,
      annuite: i === 0 ? 0 : (empruntRows[i - 1]?.ann || 0),
      besoins, 
      solde 
    };
  });

  // Trésorerie cumulée
  let cumul = 0;
  const planWithCumul = planRows.map(r => { 
    cumul += r.solde; 
    return { ...r, cumulatif: cumul }; 
  });

  // VIABILITÉ
  const viable = planWithCumul.every(r => r.cumulatif >= 0);
  const soldeNeg = planWithCumul.filter(r => r.solde < 0).length;
  const cumulNeg = planWithCumul.filter(r => r.cumulatif < 0).length;

  return { 
    amortInvest, cv, mcv, ebitda, ebit, intAn1, ebitAn1, is, resultatNet, caf, 
    empruntRows, totalInt, totalAnn, planWithCumul, viable, soldeNeg, cumulNeg 
  };
};
