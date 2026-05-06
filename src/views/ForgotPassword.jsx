import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { AuthShell } from './Login.jsx';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    const { error } = await resetPassword(email);
    setBusy(false);
    if (error) return setError(error.message);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthShell title="Check your email" subtitle="We sent a reset link">
        <p style={{ fontSize: 15, color: '#5D4E2A', lineHeight: 1.6, margin: '0 0 16px' }}>
          If an account exists for <strong>{email}</strong>, you'll get an email with a
          link to reset your password.
        </p>
        <Link to="/login" style={{ color: '#4A5D3A', fontWeight: 600, fontSize: 14 }}>
          Back to sign in
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a recovery link">
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase' }}>Email</span>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            style={{ padding: '10px 12px', border: '1px solid #E8DCC4', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: '#FFFDF7', color: '#2B2416' }} />
        </label>
        {error && <div style={{ color: '#8B3A3A', fontSize: 13 }}>{error}</div>}
        <button type="submit" disabled={busy} className="btn-primary"
          style={{ background: '#4A5D3A', color: '#F5F0E6', border: 'none', padding: '12px 18px', borderRadius: 8, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', marginTop: 4 }}>
          {busy ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
      <div style={{ marginTop: 18, fontSize: 14, color: '#5D4E2A' }}>
        Remembered it? <Link to="/login" style={{ color: '#4A5D3A', fontWeight: 600 }}>Sign in</Link>
      </div>
    </AuthShell>
  );
}
