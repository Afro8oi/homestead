import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { s } from '../styles.js';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) return setError(error.message);
    const dest = location.state?.from?.pathname || '/';
    navigate(dest, { replace: true });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your home academy">
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Email">
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        </Field>
        <Field label="Password">
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        </Field>
        {error && <div style={{ color: '#8B3A3A', fontSize: 13 }}>{error}</div>}
        <button type="submit" disabled={busy} className="btn-primary" style={btnStyle}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <div style={{ marginTop: 18, fontSize: 14, color: '#5D4E2A' }}>
        New here? <Link to="/signup" style={{ color: '#4A5D3A', fontWeight: 600 }}>Create an account</Link>
      </div>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="fade-in" style={{ maxWidth: 440, margin: '0 auto', padding: '80px 32px' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8 }}>Homestead Academy</div>
      <h1 style={{ ...s.serif, fontSize: 40, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 8px', color: '#2B2416' }}>{title}</h1>
      <p style={{ fontSize: 15, color: '#5D4E2A', margin: '0 0 28px' }}>{subtitle}</p>
      <div style={{ background: '#FFFDF7', border: '1px solid #E8DCC4', borderRadius: 16, padding: 28 }}>
        {children}
      </div>
    </div>
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
