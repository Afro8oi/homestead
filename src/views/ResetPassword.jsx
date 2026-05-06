import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { AuthShell } from './Login.jsx';

export default function ResetPassword() {
  const { updatePassword, session } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  // Supabase auto-detects the recovery hash in the URL and signs the user in.
  // If we have no session by the time this view mounts, the link was bad/expired.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!session) setError('This reset link is invalid or has expired. Request a new one.');
    }, 1500);
    return () => clearTimeout(t);
  }, [session]);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setError('Passwords do not match');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    setBusy(true); setError('');
    const { error } = await updatePassword(password);
    setBusy(false);
    if (error) return setError(error.message);
    setDone(true);
    setTimeout(() => navigate('/', { replace: true }), 1200);
  };

  if (done) {
    return (
      <AuthShell title="Password updated" subtitle="You're signed in — taking you home…">
        <div style={{ fontSize: 14, color: '#5D4E2A' }}>Redirecting…</div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Set a new password" subtitle="Enter and confirm your new password">
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase' }}>New password</span>
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
            style={inputStyle} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase' }}>Confirm password</span>
          <input type="password" required minLength={6} value={confirm} onChange={e => setConfirm(e.target.value)}
            style={inputStyle} />
        </label>
        {error && <div style={{ color: '#8B3A3A', fontSize: 13 }}>{error}</div>}
        <button type="submit" disabled={busy || !session} className="btn-primary"
          style={{ background: '#4A5D3A', color: '#F5F0E6', border: 'none', padding: '12px 18px', borderRadius: 8, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: busy || !session ? 'not-allowed' : 'pointer', opacity: busy || !session ? 0.6 : 1, marginTop: 4 }}>
          {busy ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </AuthShell>
  );
}

const inputStyle = {
  padding: '10px 12px', border: '1px solid #E8DCC4', borderRadius: 8,
  fontSize: 15, fontFamily: 'inherit', background: '#FFFDF7', color: '#2B2416',
};
