import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Calculator } from 'lucide-react';
import { c, Card, Metric, Btn } from './Shared';
import { DA, pct } from '../utils/math';

export const StepCAF = ({ params, res, onPrev, onNext }) => {
  const rows = [
    { label: 'Chiffre d\'affaires (CA)', val: params.chiffreAffaires, sign: '+', bold: false },
    { label: `Charges variables (${params.chargesVariablesPct}% du CA)`, val: -res.cv, sign: '-', color: c.red },
    { label: 'Marge sur coût variable', val: res.mcv, sign: '=', bold: true, color: c.green },
    { label: 'Charges fixes (hors amort.)', val: -res.chargesFixesHorsAmort, sign: '-', color: c.red },
    { label: 'EBITDA', val: res.ebitda, sign: '=', bold: true },
    { label: 'Dotation aux amortissements', val: -res.amortInvest, sign: '-', color: c.red },
    { label: 'Résultat d\'exploitation (EBIT)', val: res.ebit, sign: '=', bold: true },
    { label: 'Intérêts emprunt (an 1)', val: -res.intAn1, sign: '-', color: c.red },
    { label: 'Résultat avant impôt', val: res.ebitAn1, sign: '=', bold: false },
    { label: `Impôt sur société (${params.tauxIS}%)`, val: -res.is, sign: '-', color: c.red },
    { label: 'Résultat net', val: res.resultatNet, sign: '=', bold: true, color: c.green },
    { label: '+ Dotations aux amortissements', val: res.amortInvest, sign: '+', color: c.inkMuted },
    { label: '= CAF annuelle', val: res.caf, sign: '=', bold: true, color: res.caf > 0 ? c.green : c.red, big: true },
  ];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem' }} className="fade-up delay-100">
      <h2 style={{ fontSize: '2rem', color: c.ink, marginBottom: '0.5rem' }}>Capacité d'Autofinancement</h2>
      <p style={{ fontSize: '0.95rem', color: c.inkMuted, marginBottom: '2.5rem' }}>CAF = Résultat net + Dotations aux amortissements (charges non décaissées)</p>

      <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr', gap: '2rem' }}>
        <Card>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.green, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={18} /> Compte de résultat simplifié
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: r.big ? c.greenLight : i % 2 === 0 ? c.sand : 'transparent', borderRadius: 8, marginBottom: 4, border: r.big ? `1.5px solid ${c.greenMid}` : 'none' }}>
              <span style={{ fontSize: r.big ? '0.95rem' : '0.85rem', fontWeight: r.bold ? 600 : 400, color: r.color || c.inkSoft }}>{r.label}</span>
              <span style={{ fontSize: r.big ? '1.1rem' : '0.9rem', fontWeight: r.bold ? 700 : 500, color: r.color || c.ink, fontVariantNumeric: 'tabular-nums' }}>
                {DA(Math.abs(r.val))} DA
              </span>
            </div>
          ))}
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Metric label="CAF annuelle" value={`${DA(res.caf)} DA`} color={res.caf > 0 ? c.green : c.red} big sub="Ressource interne principale" />
          <Metric label="Résultat net" value={`${DA(res.resultatNet)} DA`} color={res.resultatNet > 0 ? c.green : c.red} />
          <Metric label="Amort. annuel" value={`${DA(res.amortInvest)} DA`} />
          <Metric label="Taux de marge nette" value={pct(res.resultatNet / params.chiffreAffaires)} color={res.resultatNet > 0 ? c.green : c.red} />

          <Card style={{ background: c.goldLight, border: 'none', color: c.ink }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: c.goldDark, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lightbulb size={16} /> Pourquoi réintégrer l'amortissement ?
            </div>
            <div style={{ fontSize: '0.8rem', color: c.inkSoft, lineHeight: 1.6 }}>L'amortissement est une charge <strong>comptable</strong> mais <strong>non décaissée</strong> — aucun argent ne sort réellement. La CAF mesure donc les flux complets de trésorerie.</div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
        <Btn variant="outline" onClick={onPrev}><ArrowLeft size={16}/> Retour</Btn>
        <Btn onClick={onNext}>Tableau Emprunt <ArrowRight size={16}/></Btn>
      </div>
    </div>
  );
};
