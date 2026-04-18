import React, { useState, useMemo } from 'react';
import { compute } from './utils/math';
import { Nav } from './components/Shared';
import { StepParams } from './components/StepParams';
import { StepCAF } from './components/StepCAF';
import { StepEmprunt } from './components/StepEmprunt';
import { StepPlan } from './components/StepPlan';
import { StepDecision } from './components/StepDecision';
import './styles.css';

const defaultParams = {
  // Projet
  nomSociete: 'SARL DattesOr Algérie',
  montantInvest: 4500000,
  duree: 5,
  amortType: 'lineaire',
  // Financement
  apportCapital: 1500000,
  autoFinancement: 750000,
  // Emprunt
  montantEmprunt: 2250000,
  tauxEmprunt: 7,
  dureeEmprunt: 5,
  // Exploitation
  chiffreAffaires: 18000000,
  chargesVariablesPct: 55,
  chargesFixesHorsAmort: 3600000,
  tauxIS: 26,
};

function App() {
  const [step, setStep] = useState(0);
  const [params, setParams] = useState(defaultParams);

  const res = useMemo(() => compute(params), [params]);

  const canProceed = step; // allow going back to any visited step

  const handleNext = () => window.scrollTo({ top: 0, behavior: 'smooth' }) || setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => window.scrollTo({ top: 0, behavior: 'smooth' }) || setStep(s => Math.max(s - 1, 0));
  const handleReset = () => { setStep(0); setParams(defaultParams); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav step={step} setStep={setStep} canProceed={step} />

      <main style={{ flex: 1 }}>
        {step === 0 && <StepParams params={params} setParams={setParams} onNext={handleNext} />}
        {step === 1 && <StepCAF params={params} res={res} onPrev={handlePrev} onNext={handleNext} />}
        {step === 2 && <StepEmprunt params={params} res={res} onPrev={handlePrev} onNext={handleNext} />}
        {step === 3 && <StepPlan params={params} res={res} onPrev={handlePrev} onNext={handleNext} />}
        {step === 4 && <StepDecision params={params} res={res} onPrev={handlePrev} onReset={handleReset} />}
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2.5rem', fontSize: '0.8rem', color: 'var(--ink-muted)', borderTop: '1px solid var(--sand-dark)', background: 'var(--white)' }}>
        <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Bellala & Mezdour</span> · Plan de Financement · ESI 2024/2025 · COFI 2CS SI
      </footer>
    </div>
  );
}

export default App;
