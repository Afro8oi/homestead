import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, XCircle, Clock, Sun, RotateCcw } from 'lucide-react';
import { useData } from '../App.jsx';
import { listAttendance, setAttendance } from '../lib/api.js';
import { s } from '../styles.js';

const STATUSES = [
  { id: 'present', label: 'Present', color: '#4A5D3A', icon: CheckCircle2 },
  { id: 'absent',  label: 'Absent',  color: '#8B3A3A', icon: XCircle },
  { id: 'half',    label: 'Half day', color: '#B8860B', icon: Clock },
  { id: 'holiday', label: 'Holiday',  color: '#6B4E71', icon: Sun },
];
const STATUS_BY_ID = Object.fromEntries(STATUSES.map(st => [st.id, st]));

// 4 weeks × 5 weekdays grid, ending today.
function buildDateGrid() {
  const days = [];
  const today = new Date();
  // Walk back ~4 weeks of weekdays.
  let d = new Date(today);
  while (days.length < 20) {
    const dow = d.getDay();
    if (dow >= 1 && dow <= 5) days.unshift(new Date(d));
    d.setDate(d.getDate() - 1);
  }
  return days;
}
function ymd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}
function dayLabel(date) {
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}
function dateLabel(date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function AttendanceView() {
  const { students, householdId } = useData();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(null); // `${studentId}:${date}` while writing

  const grid = useMemo(() => buildDateGrid(), []);
  const earliest = grid[0];
  const earliestStr = ymd(earliest);

  useEffect(() => {
    if (!householdId) return;
    let cancelled = false;
    listAttendance(householdId, earliestStr)
      .then(d => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [householdId, earliestStr]);

  const cycleStatus = async (studentId, dateStr) => {
    const current = data[studentId]?.[dateStr]?.status;
    const idx = STATUSES.findIndex(s => s.id === current);
    // Cycle: undefined → present → absent → half → holiday → undefined
    const next = idx === -1 ? 'present'
              : idx === STATUSES.length - 1 ? null
              : STATUSES[idx + 1].id;
    const key = `${studentId}:${dateStr}`;
    setSaving(key);
    // Optimistic update
    setData(prev => {
      const sg = { ...(prev[studentId] || {}) };
      if (next) sg[dateStr] = { status: next, note: null };
      else delete sg[dateStr];
      return { ...prev, [studentId]: sg };
    });
    try {
      await setAttendance(householdId, studentId, dateStr, next);
    } catch (e) {
      console.error('Attendance save failed', e);
      setError(`Save failed: ${e.message}`);
    } finally {
      setSaving(s => s === key ? null : s);
    }
  };

  return (
    <div className="fade-in page-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8 }}>Attendance</div>
        <h1 className="h-display" style={{ ...s.serif, fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 12px', color: '#2B2416' }}>
          Daily <span style={{ fontStyle: 'italic', color: '#4A5D3A' }}>register</span>
        </h1>
        <p style={{ fontSize: 16, color: '#5D4E2A', maxWidth: 700, lineHeight: 1.6, margin: 0 }}>
          Tap a cell to cycle: present → absent → half day → holiday → clear.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        {STATUSES.map(st => {
          const Icon = st.icon;
          return (
            <div key={st.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#5D4E2A' }}>
              <span style={{ width: 18, height: 18, background: st.color, borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#F5F0E6' }}>
                <Icon size={11} />
              </span>
              {st.label}
            </div>
          );
        })}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#8B7D5B' }}>
          <span style={{ width: 18, height: 18, background: '#FFFDF7', border: '1px dashed #E8DCC4', borderRadius: 4 }} />
          Not recorded
        </div>
      </div>

      {error && (
        <div style={{ background: '#FFE8E0', border: '1px solid #8B3A3A', color: '#8B3A3A', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: 'transparent', border: 'none', color: '#8B3A3A', cursor: 'pointer' }}>
            <RotateCcw size={14} />
          </button>
        </div>
      )}

      <div style={{ background: '#FFFDF7', border: '1px solid #E8DCC4', borderRadius: 16, padding: 16, overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: 24, color: '#8B7D5B', fontSize: 14 }}>Loading attendance…</div>
        ) : students.length === 0 ? (
          <div style={{ padding: 24, color: '#8B7D5B', fontSize: 14 }}>No students yet. Add one in the Admin panel.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 600 }}>
            <thead>
              <tr>
                <th style={th}>Student</th>
                {grid.map(d => (
                  <th key={ymd(d)} style={{ ...th, textAlign: 'center', minWidth: 56 }}>
                    <div>{dayLabel(d)}</div>
                    <div style={{ fontWeight: 400, color: '#8B7D5B' }}>{dateLabel(d)}</div>
                  </th>
                ))}
                <th style={{ ...th, textAlign: 'right' }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {students.map(st => {
                const recorded = grid.filter(d => data[st.id]?.[ymd(d)]?.status);
                const present = recorded.filter(d => {
                  const s = data[st.id][ymd(d)].status;
                  return s === 'present' || s === 'half';
                });
                const rate = recorded.length === 0 ? null : Math.round((present.length / recorded.length) * 100);
                return (
                  <tr key={st.id}>
                    <td style={{ ...td, fontWeight: 600, color: '#2B2416' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: st.color, color: '#F5F0E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>{st.avatar}</div>
                        <span>{st.name}</span>
                      </div>
                    </td>
                    {grid.map(d => {
                      const dateStr = ymd(d);
                      const status = data[st.id]?.[dateStr]?.status;
                      const meta = status ? STATUS_BY_ID[status] : null;
                      const Icon = meta?.icon;
                      const key = `${st.id}:${dateStr}`;
                      const busy = saving === key;
                      return (
                        <td key={dateStr} style={{ ...td, textAlign: 'center', padding: 4 }}>
                          <button onClick={() => cycleStatus(st.id, dateStr)}
                            title={meta ? `${meta.label} — click to change` : 'Not recorded — click to mark present'}
                            style={{
                              width: 36, height: 36, borderRadius: 8,
                              background: meta ? meta.color : '#FFFDF7',
                              border: meta ? 'none' : '1px dashed #E8DCC4',
                              color: '#F5F0E6',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', opacity: busy ? 0.5 : 1, transition: 'all 0.15s',
                            }}>
                            {Icon && <Icon size={16} strokeWidth={2} />}
                          </button>
                        </td>
                      );
                    })}
                    <td style={{ ...td, textAlign: 'right', fontWeight: 600, color: rate === null ? '#8B7D5B' : rate >= 90 ? '#4A5D3A' : rate >= 75 ? '#B8860B' : '#8B3A3A' }}>
                      {rate === null ? '—' : `${rate}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const th = {
  padding: '10px 12px', fontSize: 11, letterSpacing: '0.15em', color: '#8B7D5B',
  textTransform: 'uppercase', fontFamily: 'inherit', fontWeight: 600,
  borderBottom: '1px solid #E8DCC4', textAlign: 'left', whiteSpace: 'nowrap',
};
const td = {
  padding: '10px 12px', fontSize: 14, color: '#5D4E2A',
  borderBottom: '1px solid #F0E8D6',
};
