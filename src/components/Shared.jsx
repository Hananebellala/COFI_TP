import React from 'react';

export const c = {
  green: 'var(--green)', greenMid: 'var(--green-mid)', greenLight: 'var(--green-light)',
  gold: 'var(--gold)', goldLight: 'var(--gold-light)', goldDark: 'var(--gold-dark)',
  sand: 'var(--sand)', sandDark: 'var(--sand-dark)',
  ink: 'var(--ink)', inkSoft: 'var(--ink-soft)', inkMuted: 'var(--ink-muted)',
  red: 'var(--red)', redLight: 'var(--red-light)',
  white: 'var(--white)',
};

export const Label = ({ children, hint }) => (
  <div style={{ marginBottom: 6 }}>
    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: c.inkSoft, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{children}</div>
    {hint && <div style={{ fontSize: '0.72rem', color: c.inkMuted, marginTop: 2 }}>{hint}</div>}
  </div>
);

export const Field = ({ label, hint, value, onChange, prefix, suffix, type = 'number', min, max, step = '1' }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <Label hint={hint}>{label}</Label>
    <div className="field-container" style={{ display: 'flex', alignItems: 'center', background: c.white, border: `1.5px solid ${c.sandDark}`, borderRadius: 10, overflow: 'hidden', transition: 'box-shadow 0.2s, border-color 0.2s' }}>
      {prefix && <span style={{ padding: '0 0.8rem', color: c.inkMuted, fontSize: '0.85rem', borderRight: `1px solid ${c.sandDark}`, background: c.sand, alignSelf: 'stretch', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{prefix}</span>}
      <input
        type={type} value={value} min={min} max={max} step={step}
        onChange={e => onChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
        onFocus={e => {
          e.target.parentElement.style.borderColor = c.greenMid;
          e.target.parentElement.style.boxShadow = `0 0 0 3px ${c.greenLight}`;
        }}
        onBlur={e => {
          e.target.parentElement.style.borderColor = c.sandDark;
          e.target.parentElement.style.boxShadow = 'none';
        }}
        style={{ flex: 1, padding: '0.65rem 0.8rem', border: 'none', background: 'transparent', color: c.ink, outline: 'none', minWidth: 0, fontWeight: 500 }}
      />
      {suffix && <span style={{ padding: '0 0.8rem', color: c.inkMuted, fontSize: '0.85rem', borderLeft: `1px solid ${c.sandDark}`, background: c.sand, alignSelf: 'stretch', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{suffix}</span>}
    </div>
  </div>
);

export const Btn = ({ children, onClick, variant = 'green', size = 'md', style: s = {} }) => {
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', ...s };
  const sz = size === 'sm' ? { padding: '0.5rem 1rem', fontSize: '0.8rem' } : { padding: '0.75rem 1.75rem', fontSize: '0.9rem' };
  
  const v = variant === 'green'
    ? { background: c.green, color: '#fff', boxShadow: 'var(--shadow-sm)' }
    : variant === 'gold'
    ? { background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#fff', boxShadow: 'var(--shadow-gold)' }
    : { background: 'transparent', color: c.green, border: `1.5px solid ${c.green}` };
    
  return (
    <button 
      style={{ ...base, ...sz, ...v }} 
      onClick={onClick}
      onMouseOver={e => {
        if(variant === 'outline') e.currentTarget.style.background = c.greenLight;
        else e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseOut={e => {
        if(variant === 'outline') e.currentTarget.style.background = 'transparent';
        else e.currentTarget.style.transform = 'none';
      }}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, style: s = {}, highlight }) => (
  <div className="glass-card" style={{ borderRadius: 16, padding: '1.5rem', boxShadow: 'var(--shadow-sm)', border: highlight ? `2px solid ${highlight}` : undefined, ...s }}>
    {children}
  </div>
);

export const Metric = ({ label, value, sub, color, big }) => (
  <Card style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ fontSize: '0.75rem', color: c.inkSoft, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', fontWeight: 600 }}>{label}</div>
    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: big ? '1.8rem' : '1.4rem', color: color || c.ink, lineHeight: 1.1, fontWeight: 700 }}>{value}</div>
    {sub && <div style={{ fontSize: '0.75rem', color: c.inkMuted, marginTop: 'auto', paddingTop: '0.5rem' }}>{sub}</div>}
  </Card>
);

export const Tag = ({ children, color = 'green' }) => {
  const bg = color === 'green' ? c.greenLight : color === 'gold' ? c.goldLight : c.redLight;
  const fg = color === 'green' ? c.green : color === 'gold' ? c.goldDark : c.red;
  return <span style={{ display: 'inline-flex', alignItems: 'center', background: bg, color: fg, borderRadius: 24, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600 }}>{children}</span>;
};

export const Divider = () => <div style={{ borderTop: `1px solid ${c.sandDark}`, margin: '1.5rem 0' }} />;

/* ─── NAV ───────────────────────────────────────────── */
const STEPS = ['Paramètres', 'Résultats CAF', 'Tableau Emprunt', 'Plan Financement', 'Décision'];

export const Nav = ({ step, setStep, canProceed }) => (
  <nav style={{ background: c.ink, padding: '0 2rem', display: 'flex', alignItems: 'stretch', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
    <div style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.2rem', padding: '0 1.5rem 0 0', marginRight: '1rem', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
      <div style={{width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))'}}></div>
      <span style={{ color: c.white }}>CO<span style={{color: c.gold}}>FI</span></span>
    </div>
    <div style={{ display: 'flex', gap: 0, overflowX: 'auto', flex: 1 }}>
      {STEPS.map((s, i) => (
        <button key={i} onClick={() => (i <= canProceed) && setStep(i)} style={{
          padding: '0 1.25rem', height: 60, border: 'none', background: 'transparent',
          color: step === i ? '#fff' : 'rgba(255,255,255,0.5)',
          borderBottom: step === i ? `3px solid ${c.gold}` : '3px solid transparent',
          fontWeight: step === i ? 600 : 500, fontSize: '0.85rem', whiteSpace: 'nowrap',
          cursor: i <= canProceed ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
        }}>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: step === i ? c.gold : 'rgba(255,255,255,0.1)', color: step === i ? c.ink : '#fff', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
          {s}
        </button>
      ))}
    </div>
  </nav>
);
