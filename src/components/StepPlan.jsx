import React from 'react';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';
import { c, Card, Btn } from './Shared';
import { DA } from '../utils/math';

export const StepPlan = ({ params, res, onPrev, onNext }) => {
  const plan = res.planWithCumul;
  const maxSolde = Math.max(...plan.map(r => Math.abs(r.solde)), 1);

  const colStyle = (i) => ({
    padding: '0.8rem 1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums',
    borderLeft: `1px solid ${c.sandDark}`,
    background: i % 2 === 0 ? c.sand : c.white
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem' }} className="fade-up delay-100">
      <h2 style={{ fontSize: '2rem', color: c.ink, marginBottom: '0.5rem' }}>Plan de Financement</h2>
      <p style={{ fontSize: '0.95rem', color: c.inkMuted, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Horizon {params.duree} ans · Régle d'or: <strong style={{ color: c.green }}>Ressources ≥ Besoins</strong>
      </p>

      <Card style={{ marginBottom: '2rem', overflowX: 'auto', padding: '0', borderRadius: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: c.ink, color: '#fff' }}>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.05em', minWidth: 240 }}>Éléments</th>
              {plan.map(r => <th key={r.yr} style={{ padding: '1rem 1.25rem', textAlign: 'right', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.05em', minWidth: 140 }}>Année {r.yr}</th>)}
            </tr>
          </thead>
          <tbody>
            {/* RESSOURCES */}
            <tr style={{ background: c.greenLight }}>
              <td colSpan={plan.length + 1} style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, color: c.greenMid, textTransform: 'uppercase', letterSpacing: '0.1em' }}>▲ RESSOURCES</td>
            </tr>
            {[
              { label: 'CAF annuelle', key: 'caf', color: c.greenMid },
              { label: 'Apport en capital', key: 'apportCapital' },
              { label: 'Emprunt bancaire', key: 'empruntRessource' },
              { label: 'Autofinancement', key: 'autoFin' },
            ].map(item => (
              <tr key={item.key}>
                <td style={{ padding: '0.75rem 1.5rem 0.75rem 2rem', color: c.inkSoft, fontWeight: 500 }}>{item.label}</td>
                {plan.map((r, i) => (
                  <td key={r.yr} style={{ ...colStyle(i), color: item.color || c.inkMuted, fontWeight: r[item.key] ? 500 : 400 }}>
                    {r[item.key] ? `${DA(r[item.key])}` : '—'}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ background: '#f0fdf4', borderTop: `1px solid ${c.greenLight}` }}>
              <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: c.green }}>TOTAL RESSOURCES</td>
              {plan.map((r, i) => <td key={r.yr} style={{ ...colStyle(i), fontWeight: 700, color: c.green, background: i % 2 === 0 ? '#eefbf2' : '#f0fdf4' }}>{DA(r.ressources)} DA</td>)}
            </tr>

            {/* BESOINS */}
            <tr style={{ background: c.redLight }}>
              <td colSpan={plan.length + 1} style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, color: c.red, textTransform: 'uppercase', letterSpacing: '0.1em' }}>▼ BESOINS</td>
            </tr>
            {[
              { label: 'Investissement', key: 'investissement' },
              { label: 'Remboursement emprunt (annuité)', key: 'annuite' },
            ].map(item => (
              <tr key={item.key}>
                <td style={{ padding: '0.75rem 1.5rem 0.75rem 2rem', color: c.inkSoft, fontWeight: 500 }}>{item.label}</td>
                {plan.map((r, i) => (
                  <td key={r.yr} style={{ ...colStyle(i), color: r[item.key] ? c.red : c.inkMuted }}>
                    {r[item.key] ? `${DA(r[item.key])}` : '—'}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ background: '#fef2f2', borderTop: `1px solid ${c.redLight}` }}>
              <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: c.red }}>TOTAL BESOINS</td>
              {plan.map((r, i) => <td key={r.yr} style={{ ...colStyle(i), fontWeight: 700, color: c.red, background: i % 2 === 0 ? '#fdf0f0' : '#fef2f2' }}>{DA(r.besoins)} DA</td>)}
            </tr>

            {/* SOLDE */}
            <tr style={{ background: res.viable ? c.greenLight : c.redLight, borderTop: `3px solid ${res.viable ? c.green : c.red}` }}>
              <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, fontSize: '0.95rem', color: res.viable ? c.green : c.red }}>SOLDE ANNUEL (R − B)</td>
              {plan.map((r, i) => (
                <td key={r.yr} style={{ padding: '1.25rem 1.25rem', textAlign: 'right', fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: r.solde >= 0 ? c.green : c.red, background: r.solde >= 0 ? c.greenLight : c.redLight, borderLeft: `1px solid rgba(0,0,0,0.05)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    {r.solde >= 0 ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                    {r.solde >= 0 ? '+' : ''}{DA(r.solde)} DA
                  </div>
                </td>
              ))}
            </tr>
            <tr style={{ borderBottom: `1px solid ${c.sandDark}`, background: c.ink, color: '#fff' }}>
              <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>TRESORERIE CUMULÉE</td>
              {plan.map((r, i) => (
                <td key={r.yr} style={{ padding: '1rem 1.25rem', textAlign: 'right', fontSize: '0.9rem', fontWeight: 700, color: r.cumulatif >= 0 ? c.goldLight : '#fda4af', fontVariantNumeric: 'tabular-nums', borderLeft: `1px solid rgba(255,255,255,0.1)` }}>
                  {r.cumulatif >= 0 ? '+' : ''}{DA(r.cumulatif)} DA
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Bar chart */}
      <Card style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.ink, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 size={18} color={c.green} /> Solde annuel - Visualisation
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {plan.map(r => (
            <div key={r.yr} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: '0.85rem', color: c.inkSoft, width: 70, textAlign: 'right', flexShrink: 0, fontWeight: 500 }}>Année {r.yr}</span>
              <div style={{ flex: 1, height: 24, background: c.sandDark, borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.abs(r.solde) / maxSolde * 100}%`, background: r.solde >= 0 ? c.greenMid : c.red, borderRadius: 6, transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>
              <span style={{ fontSize: '0.9rem', minWidth: 160, fontVariantNumeric: 'tabular-nums', color: r.solde >= 0 ? c.green : c.red, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                {r.solde >= 0 ? '+' : ''}{DA(r.solde)} DA
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Btn variant="outline" onClick={onPrev}><ArrowLeft size={16}/> Retour</Btn>
        <Btn onClick={onNext}>Voir la Décision <ArrowRight size={16}/></Btn>
      </div>
    </div>
  );
};
