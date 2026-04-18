import React from 'react';
import { ArrowLeft, ArrowRight, TrendingDown } from 'lucide-react';
import { c, Card, Metric, Btn } from './Shared';
import { DA } from '../utils/math';

export const StepEmprunt = ({ params, res, onPrev, onNext }) => {
  const maxAnn = Math.max(...res.empruntRows.map(r => r.ann));

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem' }} className="fade-up delay-100">
      <h2 style={{ fontSize: '2rem', color: c.ink, marginBottom: '0.5rem' }}>Tableau d'Amortissement de l'Emprunt</h2>
      <p style={{ fontSize: '0.95rem', color: c.inkMuted, marginBottom: '2.5rem' }}>
        Emprunt : <strong>{DA(params.montantEmprunt)} DA</strong> · Taux : <strong>{params.tauxEmprunt}%</strong> · Durée : <strong>{params.dureeEmprunt} ans</strong> · Méthode : amortissement constant
      </p>

      <Card style={{ marginBottom: '2rem', overflowX: 'auto', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: c.ink, color: '#fff' }}>
              {['Année', 'Capital dû (début)', 'Amort. capital', 'Intérêts', 'Annuité totale', 'Capital dû (fin)'].map(h => (
                <th key={h} style={{ padding: '1rem', textAlign: h === 'Année' ? 'left' : 'right', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {res.empruntRows.map((r, i) => (
              <tr key={r.a} style={{ background: i % 2 === 0 ? c.sand : c.white, borderBottom: `1px solid ${c.sandDark}`, transition: 'background 0.2s' }}>
                <td style={{ padding: '1rem', color: c.inkSoft, fontWeight: 500 }}>Année {r.a}</td>
                <td style={{ padding: '1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{DA(r.capDebut)} DA</td>
                <td style={{ padding: '1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: c.green }}>{DA(r.amortCap)} DA</td>
                <td style={{ padding: '1rem', textAlign: 'right', color: c.red, fontVariantNumeric: 'tabular-nums' }}>{DA(r.int)} DA</td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{DA(r.ann)} DA</td>
                <td style={{ padding: '1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: c.inkMuted }}>{DA(r.capFin)} DA</td>
              </tr>
            ))}
            <tr style={{ background: c.greenLight, color: c.green, borderTop: `2px solid ${c.greenMid}` }}>
              <td style={{ padding: '1rem', fontWeight: 700 }}>TOTAL</td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>—</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{DA(params.montantEmprunt)} DA</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 700, color: c.red }}>{DA(res.totalInt)} DA</td>
              <td style={{ padding: '1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{DA(res.totalAnn)} DA</td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>0 DA</td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Bar chart */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.ink, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingDown size={18} color={c.green} /> Évolution des annuités et des intérêts
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {res.empruntRows.map(r => (
            <div key={r.a} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: '0.85rem', color: c.inkSoft, width: 60, textAlign: 'right', flexShrink: 0, fontWeight: 500 }}>Année {r.a}</span>
              <div style={{ flex: 1, height: 28, background: c.sandDark, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${r.ann / maxAnn * 100}%`, background: c.gold, borderRadius: 6, transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${r.amortCap / maxAnn * 100}%`, background: c.greenMid, borderRadius: 6 }} />
              </div>
              <span style={{ fontSize: '0.85rem', color: c.ink, minWidth: 160, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                {DA(r.ann)} DA <span style={{ color: c.inkMuted, fontSize: '0.75rem', fontWeight: 400 }}> (int. {DA(r.int)})</span>
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', fontSize: '0.8rem', color: c.inkSoft, fontWeight: 500 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 14, height: 14, background: c.greenMid, borderRadius: 3, display: 'inline-block' }} /> Capital amorti</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 14, height: 14, background: c.gold, borderRadius: 3, display: 'inline-block' }} /> Intérêts</span>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <Metric label="Capital emprunté" value={`${DA(params.montantEmprunt)} DA`} color={c.green} />
        <Metric label="Total intérêts payés" value={`${DA(res.totalInt)} DA`} color={c.red} />
        <Metric label="Coût total du crédit" value={`${DA(res.totalAnn)} DA`} />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Btn variant="outline" onClick={onPrev}><ArrowLeft size={16}/> Retour</Btn>
        <Btn onClick={onNext}>Plan de Financement <ArrowRight size={16}/></Btn>
      </div>
    </div>
  );
};
