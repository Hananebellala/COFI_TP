export const DA = (v) => new Intl.NumberFormat('fr-DZ').format(Math.round(v));
export const pct = (v) => (v * 100).toFixed(1) + '%';

export const compute = (p) => {
  const amortInvest = p.montantInvest / p.duree;
  // Exploitation
  const cv = p.chiffreAffaires * (p.chargesVariablesPct / 100);
  const mcv = p.chiffreAffaires - cv;
  const ebitda = mcv - p.chargesFixesHorsAmort;
  const ebit = ebitda - amortInvest;

  // Emprunt schedule
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

  // CAF
  const intAn1 = empruntRows[0]?.int || 0;
  const ebitAn1 = ebit - intAn1;
  const is = Math.max(0, ebitAn1) * (p.tauxIS / 100);
  const resultatNet = ebitAn1 - is;
  const caf = resultatNet + amortInvest;

  // Plan de financement
  const planRows = Array.from({ length: p.duree }, (_, i) => {
    const yr = i + 1;
    const annuite = empruntRows[i] ? empruntRows[i].ann : 0;
    const ressources = caf + (i === 0 ? p.apportCapital + p.montantEmprunt + p.autoFinancement : 0);
    const besoins = annuite + (i === 0 ? p.montantInvest : 0);
    const solde = ressources - besoins;
    return { 
      yr, 
      caf, 
      apportCapital: i === 0 ? p.apportCapital : 0, 
      empruntRessource: i === 0 ? p.montantEmprunt : 0, 
      autoFin: i === 0 ? p.autoFinancement : 0, 
      ressources, 
      investissement: i === 0 ? p.montantInvest : 0, 
      annuite, 
      besoins, 
      solde 
    };
  });

  let cumul = 0;
  const planWithCumul = planRows.map(r => { 
    cumul += r.solde; 
    return { ...r, cumulatif: cumul }; 
  });

  const viable = planWithCumul.every(r => r.solde >= 0);
  const soldeNeg = planWithCumul.filter(r => r.solde < 0).length;

  return { amortInvest, cv, mcv, ebitda, ebit, intAn1, ebitAn1, is, resultatNet, caf, empruntRows, totalInt, totalAnn, planWithCumul, viable, soldeNeg };
};
