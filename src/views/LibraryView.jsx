import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SUBJECT_LIBRARY, ICON_MAP, slugifySubject } from '../data/subjectLibrary.js';
import { s } from '../styles.js';

export default function LibraryView() {
  const navigate = useNavigate();
  return (
    <div className="fade-in page-pad" style={{ maxWidth: 1300, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8 }}>Resource Library</div>
        <h1 className="h-display" style={{ ...s.serif, fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 12px', color: '#2B2416' }}>
          The full <span style={{ fontStyle: 'italic', color: '#4A5D3A' }}>curriculum</span>
        </h1>
        <p style={{ fontSize: 17, color: '#5D4E2A', maxWidth: 700, lineHeight: 1.6, margin: 0 }}>
          Eight subject areas spanning ages 4 through 18 — grounded in a classical, faith-affirming tradition. Grade 3 Mathematics is fully built with 20 interactive lessons; click in to try it.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {SUBJECT_LIBRARY.map((subj, i) => {
          const Icon = ICON_MAP[subj.icon];
          return (
            <div key={subj.name} onClick={() => navigate(`/library/${slugifySubject(subj.name)}`)} className="hover-lift slide-up"
              style={{ background: '#FFFDF7', borderRadius: 16, padding: 28, border: '1px solid #E8DCC4', cursor: 'pointer', animationDelay: `${i * 0.05}s`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle, ${subj.color}15 0%, transparent 70%)` }} />
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${subj.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
                <Icon size={24} color={subj.color} strokeWidth={1.5} />
              </div>
              <h3 style={{ ...s.serif, fontSize: 24, fontWeight: 500, margin: '0 0 8px', color: '#2B2416' }}>{subj.name}</h3>
              <p style={{ fontSize: 14, color: '#5D4E2A', lineHeight: 1.5, margin: '0 0 20px', minHeight: 42 }}>{subj.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #F0E8D6' }}>
                <span style={{ fontSize: 13, color: '#8B7D5B' }}>
                  {subj.levels.reduce((a, l) => a + l.lessons, 0)} lessons · {subj.levels.length} levels
                </span>
                <ChevronRight size={18} color={subj.color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
