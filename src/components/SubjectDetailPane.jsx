import { Compass, BookOpen } from 'lucide-react';
import { s } from '../styles.js';

export default function SubjectDetailPane({ subject, plan }) {
  const color = subject.data.grade >= 90 ? '#4A5D3A' : subject.data.grade >= 85 ? '#B8860B' : subject.data.grade >= 75 ? '#8B6F47' : '#8B3A3A';
  return (
    <>
      <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 28, border: '1px solid #E8DCC4' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 6 }}>Subject</div>
            <h3 style={{ ...s.serif, fontSize: 26, fontWeight: 500, margin: 0, color: '#2B2416' }}>{subject.name}</h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...s.serif, fontSize: 44, fontWeight: 600, color, lineHeight: 1 }}>{subject.data.grade}</div>
            <div style={{ fontSize: 12, color: '#8B7D5B', marginTop: 2 }}>{subject.data.mastery}</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#8B7D5B', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Recent assessments</div>
          <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`chartFill-${subject.name}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[70, 80, 90, 100].map(y => (
              <line key={y} x1="0" y1={80 - ((y - 60) / 40) * 80} x2="300" y2={80 - ((y - 60) / 40) * 80} stroke="#E8DCC4" strokeWidth="1" strokeDasharray="2,4" />
            ))}
            <polygon
              points={`0,80 ${subject.data.recent.map((v, i) => `${(i / Math.max(1, subject.data.recent.length - 1)) * 300},${80 - ((v - 60) / 40) * 80}`).join(' ')} 300,80`}
              fill={`url(#chartFill-${subject.name})`} />
            <polyline
              points={subject.data.recent.map((v, i) => `${(i / Math.max(1, subject.data.recent.length - 1)) * 300},${80 - ((v - 60) / 40) * 80}`).join(' ')}
              fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {subject.data.recent.map((v, i) => (
              <circle key={i} cx={(i / Math.max(1, subject.data.recent.length - 1)) * 300} cy={80 - ((v - 60) / 40) * 80} r="4" fill={color} stroke="#FFFDF7" strokeWidth="2" />
            ))}
          </svg>
        </div>
      </div>

      <div style={{ background: '#F5F0E6', borderRadius: 16, padding: 28, border: '1px solid #E8DCC4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Compass size={18} color="#4A5D3A" strokeWidth={1.5} />
          <h3 style={{ ...s.serif, fontSize: 20, fontWeight: 500, margin: 0, color: '#2B2416' }}>Improvement plan</h3>
        </div>
        <div style={{ ...s.serif, fontSize: 15, fontStyle: 'italic', color: '#5D4E2A', marginBottom: 20, lineHeight: 1.5, padding: 16, background: '#FFFDF7', borderRadius: 10, borderLeft: `3px solid ${color}` }}>
          {plan.diagnosis}
        </div>
        <div style={{ fontSize: 12, color: '#8B7D5B', marginBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Recommended steps</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {plan.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'start', padding: '2px 0' }}>
              <div style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: '#FFFDF7', border: `1.5px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color }}>{i + 1}</div>
              <div style={{ fontSize: 14, color: '#2B2416', lineHeight: 1.5, paddingTop: 2 }}>{step}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #E8DCC4' }}>
          <div style={{ fontSize: 12, color: '#8B7D5B', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Suggested resources</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {plan.resources.map((r, i) => (
              <div key={i} style={{ background: '#FFFDF7', border: '1px solid #E8DCC4', padding: '8px 14px', borderRadius: 20, fontSize: 13, color: '#5D4E2A', display: 'flex', alignItems: 'center', gap: 6 }}>
                <BookOpen size={12} strokeWidth={1.5} />{r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
