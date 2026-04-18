import React from 'react';
import { Building2, Settings2, Wallet, Banknote, LineChart, ArrowRight } from 'lucide-react';
import { c, Field, Card, Btn } from './Shared';
import { DA } from '../utils/math';

export const StepParams = ({ params, setParams, onNext }) => {
  const set = (k, v) => setParams(p => ({ ...p, [k]: v }));
  const totalFinancement = params.apportCapital + params.autoFinancement + params.montantEmprunt;
  const ok = Math.abs(totalFinancement - params.montantInvest) < 1;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }} className="fade-up delay-100">
      {/* Hero */}
      <div style={{ background: c.ink, borderRadius: 20, padding: '3rem', color: '#fff', marginBottom: '2rem', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.05, transform: 'scale(2.5)' }}>
          <LineChart size={200} />
        </div>
        <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: c.gold, marginBottom: '0.75rem', fontWeight: 600 }}>TP COFI · Thème II.2</div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem', lineHeight: 1.1 }}>Plan de <span style={{ color: c.gold }}>Financement</span></h1>
        <p style={{ fontSize: '0.95rem', color: c.inkMuted, maxWidth: 540, lineHeight: 1.6 }}>Saisissez les paramètres du projet pour générer automatiquement le compte de résultat, le tableau d'emprunt et la décision de viabilité finale.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Identité */}
        <Card style={{ gridColumn: '1/-1' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.green, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={18} /> Identité de la société
          </div>
          <div style={{ maxWidth: '50%' }}>
            <Field label="Nom de la société" type="text" value={params.nomSociete} onChange={v => set('nomSociete', v)} />
          </div>
        </Card>

        {/* Investissement */}
        <Card>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.green, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings2 size={18} /> Projet d'investissement
          </div>
          <Field label="Montant de l'investissement" value={params.montantInvest} onChange={v => set('montantInvest', v)} suffix="DA" min={0} />
          <Field label="Durée d'amortissement" value={params.duree} onChange={v => set('duree', v)} suffix="ans" min={1} />
        </Card>

        {/* Financement de l'invest */}
        <Card highlight={ok ? c.greenMid : c.red}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.green, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wallet size={18} /> Sources de financement
          </div>
          <Field label="Apport en capital" value={params.apportCapital} onChange={v => set('apportCapital', v)} suffix="DA" min={0} />
          <Field label="Autofinancement" value={params.autoFinancement} onChange={v => set('autoFinancement', v)} suffix="DA" min={0} />
          <Field label="Emprunt bancaire" value={params.montantEmprunt} onChange={v => set('montantEmprunt', v)} suffix="DA" min={0} />
          <div style={{ background: ok ? c.greenLight : c.redLight, border: `1px solid ${ok ? c.green : c.red}`, borderRadius: 10, padding: '0.75rem 1rem', fontSize: '0.85rem', color: ok ? c.green : c.red, marginTop: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {ok ? `Total = ${DA(totalFinancement)} DA — équilibré` : `Total = ${DA(totalFinancement)} DA ≠ ${DA(params.montantInvest)} DA — déséquilibré`}
          </div>
        </Card>

        {/* Emprunt */}
        <Card>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.green, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Banknote size={18} /> Conditions de l'emprunt
          </div>
          <Field label="Taux d'intérêt" value={params.tauxEmprunt} onChange={v => set('tauxEmprunt', v)} suffix="%" min={0} step="0.1" />
          <Field label="Durée de remboursement" value={params.dureeEmprunt} onChange={v => set('dureeEmprunt', v)} suffix="ans" min={1} />
        </Card>

        {/* Exploitation */}
        <Card>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: c.green, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LineChart size={18} /> Données d'exploitation
          </div>
          <Field label="Chiffre d'affaires annuel" value={params.chiffreAffaires} onChange={v => set('chiffreAffaires', v)} suffix="DA" min={0} />
          <Field label="Charges variables" value={params.chargesVariablesPct} onChange={v => set('chargesVariablesPct', v)} suffix="% du CA" min={0} max={100} step="0.1" />
          <Field label="Charges fixes (hors amort.)" value={params.chargesFixesHorsAmort} onChange={v => set('chargesFixesHorsAmort', v)} suffix="DA" min={0} />
          <Field label="Taux d'imposition (IS)" value={params.tauxIS} onChange={v => set('tauxIS', v)} suffix="%" min={0} max={100} step="0.1" />
        </Card>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Btn onClick={onNext} variant="green" style={{ padding: '0.85rem 2.5rem', fontSize: '1rem' }}>
          Calculer <ArrowRight size={18} />
        </Btn>
      </div>
    </div>
  );
};
