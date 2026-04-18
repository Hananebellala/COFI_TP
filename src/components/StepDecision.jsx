import React from 'react';
import { ArrowLeft, RefreshCw, Printer, CheckCircle, XCircle, FileWarning, TrendingUp, ShieldAlert, PiggyBank, BadgePercent, Target, MoveUpRight, Scissors } from 'lucide-react';
import { c, Card, Metric, Btn, Tag } from './Shared';
import { DA } from '../utils/math';

export const StepDecision = ({ params, res, onPrev, onReset }) => {
  const plan = res.planWithCumul;
  const cumulFinal = plan[plan.length - 1]?.cumulatif || 0;
  const viable = res.viable;

  const verdictRecs = viable ? [
    { icon: <Target size={24} color={c.gold}/>, title: 'Maintenir le CA cible', text: `Le CA de ${DA(params.chiffreAffaires)} DA doit être atteint dès l'an 1 pour garantir la CAF projetée.` },
    { icon: <ShieldAlert size={24} color={c.gold}/>, title: 'Surveiller la première année', text: 'Elle cumule investissement + 1er remboursement. Prévoir une ligne de crédit court terme en sécurité.' },
    { icon: <PiggyBank size={24} color={c.gold}/>, title: 'Réinvestir l\'excédent', text: `La CAF excède les besoins. Alimenter un fonds de réserve pour de futurs lancements ou imprévus.` },
    { icon: <BadgePercent size={24} color={c.gold}/>, title: 'Optimiser le taux d\'emprunt', text: 'Négocier avec la banque ou explorer les dispositifs publics d\'aide pour bonifier encore le taux.' },
  ] : [
    { icon: <FileWarning size={24} color={c.red}/>, title: 'Revoir le montage financier', text: 'Augmenter l\'apport en capital ou réduire le montant emprunté pour alléger considérablement les annuités.' },
    { icon: <TrendingUp size={24} color={c.red}/>, title: 'Augmenter le CA cible', text: 'Trouver de nouveaux marchés pour améliorer la CAF et rééquilibrer structurellement le plan.' },
    { icon: <MoveUpRight size={24} color={c.red}/>, title: 'Allonger la durée de l\'emprunt', text: 'Un emprunt sur une durée plus longue permet de réduire la pression sur les liquidités annuelles.' },
    { icon: <Scissors size={24} color={c.red}/>, title: 'Réduire les charges fixes', text: 'Toute économie sur ces charges améliore directement le résultat net et la capacité d\'autofinancement.' },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 1.5rem' }} className="fade-up delay-100">
      {/* VERDICT CARD */}
      <div style={{
        background: viable ? `linear-gradient(135deg, ${c.green}, ${c.greenMid})` : `linear-gradient(135deg, ${c.red}, #7B1212)`,
        borderRadius: 24, padding: '3.5rem 3rem', color: '#fff', marginBottom: '2.5rem',
        display: 'flex', gap: '2rem', alignItems: 'center', position: 'relative', overflow: 'hidden',
        boxShadow: viable ? '0 20px 40px -10px rgba(15,76,58,0.4)' : '0 20px 40px -10px rgba(153,27,27,0.4)'
      }}>
        <div style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}>
          {viable ? <CheckCircle size={300} /> : <XCircle size={300} />}
        </div>
        <div style={{ flexShrink: 0, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', padding: '1rem', backdropFilter: 'blur(10px)' }}>
          {viable ? <CheckCircle size={64} color="#fff" strokeWidth={1.5} /> : <XCircle size={64} color="#fff" strokeWidth={1.5} />}
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.75rem', fontWeight: 600 }}>Verdict du modèle</div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>
            {viable ? 'Projet VIABLE' : 'Projet À RISQUE'}
          </h2>
          <p style={{ fontSize: '1rem', opacity: 0.95, lineHeight: 1.6, maxWidth: 600 }}>
            {viable
              ? `Le plan de financement de ${params.nomSociete} est équilibré. La CAF de ${DA(res.caf)} DA couvre entièrement les annuités et permet de dégager une trésorerie cumulée positive de ${DA(cumulFinal)} DA sur ${params.duree} ans.`
              : `Le plan présente ${res.soldeNeg} année(s) en déficit. La CAF de ${DA(res.caf)} DA est trop faible face au poids des remboursements. Le projet nécessitera une injection de liquidités.`
            }
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <Metric label="CAF annuelle" value={`${DA(res.caf)} DA`} color={res.caf > 0 ? c.green : c.red} sub="Source de valeur" />
        <Metric label="Trésorerie finale" value={`${cumulFinal >= 0 ? '+' : ''}${DA(cumulFinal)} DA`} color={cumulFinal >= 0 ? c.green : c.red} sub="Solde cumulé (5 ans)" />
        <Metric label="Équilibre" value={viable ? 'Validé' : 'Déséquilibré'} sub={viable ? 'Toutes années positives' : `${res.soldeNeg} année(s) dans le rouge`} color={viable ? c.green : c.red} />
        <Metric label="Charge Intérêts" value={`${DA(res.totalInt)} DA`} color={c.ink} sub="Coût du crédit" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        {/* Synthèse */}
        <Card highlight={c.sandDark}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: c.ink, marginBottom: '1.5rem' }}>Synthèse par année</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {plan.map(r => (
              <div key={r.yr} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', background: r.solde >= 0 ? c.greenLight : c.redLight, borderRadius: 12, border: `1px solid ${r.solde >= 0 ? 'rgba(37,121,93,0.1)' : 'rgba(153,27,27,0.1)'}` }}>
                <span style={{ fontWeight: 700, color: r.solde >= 0 ? c.green : c.red, minWidth: 65, fontSize: '0.9rem' }}>Année {r.yr}</span>
                <span style={{ flex: 1, fontSize: '0.8rem', color: c.inkSoft, lineHeight: 1.4 }}>
                  <div>R: {DA(r.ressources)} DA</div>
                  <div style={{ color: r.solde >= 0 ? c.inkSoft : c.red, marginTop: 2 }}>B: {DA(r.besoins)} DA</div>
                </span>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: r.solde >= 0 ? c.green : c.red, fontVariantNumeric: 'tabular-nums' }}>{r.solde >= 0 ? '+' : ''}{DA(r.solde)}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommandations */}
        <Card highlight={viable ? c.goldLight : c.redLight}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: c.ink, marginBottom: '1.5rem' }}>
            {viable ? 'Recommandations stratégiques' : 'Actions correctives urgentes'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {verdictRecs.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ background: viable ? c.sand : c.redLight, padding: '0.6rem', borderRadius: 10, alignSelf: 'flex-start', flexShrink: 0 }}>
                  {r.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.ink, marginBottom: '0.3rem' }}>{r.title}</div>
                  <div style={{ fontSize: '0.85rem', color: c.inkSoft, lineHeight: 1.6 }}>{r.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Btn variant="outline" onClick={onPrev}><ArrowLeft size={16}/> Revoir le plan</Btn>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Btn variant="outline" onClick={() => window.print()}><Printer size={16}/> Imprimer le rapport</Btn>
          <Btn variant="gold" onClick={onReset}><RefreshCw size={16}/> Nouveau calcul</Btn>
        </div>
      </div>
    </div>
  );
};
