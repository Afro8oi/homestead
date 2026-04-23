import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { createHousehold, seedHousehold } from '../lib/api.js';
import { AuthShell } from './Login.jsx';

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    const { data, error } = await signUp(email, password);
    if (error) { setBusy(false); return setError(error.message); }
    const user = data.user;
    if (!user) {
      setBusy(false);
      return setError('Check your email to confirm your account, then sign in.');
    }
    try {
      const hh = await createHousehold(user.id, { name: name || 'Our Household' });
      await seedHousehold(hh.id);
    } catch (e2) {
      setBusy(false);
      return setError(e2.message || 'Could not create household');
    }
    setBusy(false);
    navigate('/', { replace: true, state: { needsRegionSetup: true } });
  };

  return (
    <AuthShell title="Start your academy" subtitle="Create an account for your household">
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Household name">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="The Whitfield Household" style={inputStyle} />
        </Field>
        <Field label="Email">
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        </Field>
        <Field label="Password">
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        </Field>
        {error && <div style={{ color: '#8B3A3A', fontSize: 13 }}>{error}</div>}
        <button type="submit" disabled={busy} className="btn-primary" style={btnStyle}>
          {busy ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <div style={{ marginTop: 18, fontSize: 14, color: '#5D4E2A' }}>
        Already have an account? <Link to="/login" style={{ color: '#4A5D3A', fontWeight: 600 }}>Sign in</Link>
      </div>
    </AuthShell>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase' }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  padding: '10px 12px', border: '1px solid #E8DCC4', borderRadius: 8,
  fontSize: 15, fontFamily: 'inherit', background: '#FFFDF7', color: '#2B2416',
};

const btnStyle = {
  background: '#4A5D3A', color: '#F5F0E6', border: 'none',
  padding: '12px 18px', borderRadius: 8, fontSize: 15, fontWeight: 600,
  fontFamily: 'inherit', cursor: 'pointer', marginTop: 4,
};
