import { useState } from 'react';
import { GraduationCap, TrendingUp, Compass, Award, Brain, ChevronRight } from 'lucide-react';
import { useData } from '../App.jsx';
import SubjectDetailPane from '../components/SubjectDetailPane.jsx';
import { s } from '../styles.js';

function getImprovementPlan(subjectName) {
  const plans = {
    Writing: { diagnosis: 'Recent compositions show hesitation with sentence variety and paragraph structure.',
      steps: ['Add 15 minutes of daily copywork from classical texts', 'Work through 2 narration exercises per week using favorite read-alouds', 'Review the 4 sentence types with hands-on sorting activity', 'Celebrate one polished paragraph each Friday as a keepsake'],
      resources: ['Copywork: Little House Passages', 'Narration Guide', 'Sentence Builder Cards'] },
    Mathematics: { diagnosis: 'Concepts need reinforcement before moving forward.',
      steps: ['Pause current lesson sequence for 1 week of focused review', 'Use manipulatives to make abstract concepts concrete', 'Daily 10-minute drill with the Multiplication Quest game', 'Re-take checkpoint quiz once scores stabilize above 85'],
      resources: ['Multiplication Quest', 'Concept Review Videos', 'Fact-Family Flashcards'] },
    Chemistry: { diagnosis: 'Stoichiometry calculations are the primary bottleneck; conceptual understanding is strong.',
      steps: ['Slow down: spend 2 weeks on dimensional analysis before new material', 'Work 3 practice problems per day with full unit tracking', 'Create a personal reference sheet of common molar masses', 'Pair with a chemistry-focused read-aloud for context'],
      resources: ['Dimensional Analysis Workbook', 'Molar Mass Reference', 'Problem Sets'] },
  };
  return plans[subjectName] || {
    diagnosis: `Performance in ${subjectName} has room to strengthen with consistent practice.`,
    steps: ['Review recent work together to identify specific gaps', 'Add 15 minutes of targeted practice three times per week', 'Schedule a weekly progress check-in', 'Celebrate improvement milestones'],
    resources: ['Practice Workbook', 'Video Library', 'Reference Guide'],
  };
}

export default function ParentDashboard() {
  const { students, buildSubjects, getStruggleAreas } = useData();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const selected = students.find(st => st.id === selectedStudentId);
  if (!selected) return <div style={{ padding: 48 }}>No students yet. Add one in Admin.</div>;
  const subjects = buildSubjects(selected.id);
  const struggles = getStruggleAreas(subjects);

  return (
    <div className="fade-in page-pad" style={{ maxWidth: 1300, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8 }}>Parent Dashboard</div>
        <h1 className="h-display" style={{ ...s.serif, fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', margin: 0, color: '#2B2416' }}>
          Progress & <span style={{ fontStyle: 'italic', color: '#4A5D3A' }}>oversight</span>
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #E8DCC4' }}>
        {students.map(st => (
          <button key={st.id} onClick={() => { setSelectedStudentId(st.id); setSelectedSubject(null); }} style={{
            background: 'transparent', border: 'none', padding: '14px 22px',
            borderBottom: selectedStudentId === st.id ? `3px solid ${st.color}` : '3px solid transparent',
            fontSize: 15, fontWeight: selectedStudentId === st.id ? 600 : 400,
            color: selectedStudentId === st.id ? '#2B2416' : '#8B7D5B',
            cursor: 'pointer', fontFamily: 'inherit', marginBottom: -1,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: st.color, color: '#F5F0E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>{st.avatar}</div>
            {st.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 32, border: '1px solid #E8DCC4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <GraduationCap size={20} color="#4A5D3A" strokeWidth={1.5} />
            <h2 style={{ ...s.serif, fontSize: 24, fontWeight: 500, margin: 0, color: '#2B2416' }}>Gradebook</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Object.entries(subjects).map(([name, data], i) => {
              const color = data.grade >= 90 ? '#4A5D3A' : data.grade >= 85 ? '#B8860B' : data.grade >= 75 ? '#8B6F47' : '#8B3A3A';
              return (
                <div key={name} onClick={() => setSelectedSubject({ name, data })} className="hover-lift"
                  style={{ padding: '16px 14px', borderRadius: 10, cursor: 'pointer',
                    borderBottom: i < Object.keys(subjects).length - 1 ? '1px solid #F0E8D6' : 'none',
                    display: 'grid', gridTemplateColumns: '1fr auto auto auto', alignItems: 'center', gap: 20,
                    background: selectedSubject?.name === name ? '#F5F0E6' : 'transparent' }}>
                  <div>
                    <div style={{ ...s.serif, fontSize: 17, fontWeight: 500, color: '#2B2416' }}>{name}</div>
                    <div style={{ fontSize: 12, color: '#8B7D5B', marginTop: 2 }}>{data.mastery}</div>
                  </div>
                  <svg width="60" height="24" viewBox="0 0 60 24">
                    <polyline
                      points={data.recent.map((v, idx) => `${(idx / Math.max(1, data.recent.length - 1)) * 60},${24 - ((v - 60) / 40) * 24}`).join(' ')}
                      fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    {data.trend === 'up' && <TrendingUp size={16} color="#4A5D3A" strokeWidth={2} />}
                    {data.trend === 'down' && <TrendingUp size={16} color="#8B3A3A" strokeWidth={2} style={{ transform: 'scaleY(-1)' }} />}
                    {data.trend === 'stable' && <div style={{ width: 16, height: 2, background: '#8B7D5B', borderRadius: 1 }} />}
                  </div>
                  <div style={{ ...s.serif, fontSize: 22, fontWeight: 600, color, width: 50, textAlign: 'right' }}>{data.grade}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {selectedSubject ? (
            <SubjectDetailPane subject={selectedSubject} plan={getImprovementPlan(selectedSubject.name)} />
          ) : struggles.length > 0 ? (
            <>
              <div style={{ background: '#FFF8E7', borderRadius: 16, padding: 24, border: '1px solid #E8D5A0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <Compass size={18} color="#B8860B" strokeWidth={1.5} />
                  <h3 style={{ ...s.serif, fontSize: 18, fontWeight: 500, margin: 0, color: '#2B2416' }}>Areas to strengthen</h3>
                </div>
                <p style={{ fontSize: 14, color: '#5D4E2A', margin: '0 0 16px', lineHeight: 1.5 }}>
                  {selected.name} would benefit from focused attention in these subjects. Click any subject in the gradebook for a tailored improvement plan.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {struggles.slice(0, 3).map(([name, data]) => (
                    <div key={name} onClick={() => setSelectedSubject({ name, data })} className="hover-lift"
                      style={{ background: '#FFFDF7', padding: 16, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', border: '1px solid #E8DCC4' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#8B3A3A15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Brain size={20} color="#8B3A3A" strokeWidth={1.5} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ ...s.serif, fontSize: 16, fontWeight: 500, color: '#2B2416' }}>{name}</div>
                        <div style={{ fontSize: 12, color: '#8B7D5B' }}>Current: {data.grade} · {data.trend === 'down' ? 'Declining' : 'Needs attention'}</div>
                      </div>
                      <ChevronRight size={18} color="#8B7D5B" />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 24, border: '1px solid #E8DCC4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <Award size={18} color="#4A5D3A" strokeWidth={1.5} />
                  <h3 style={{ ...s.serif, fontSize: 18, fontWeight: 500, margin: 0, color: '#2B2416' }}>Celebrate</h3>
                </div>
                <p style={{ fontSize: 14, color: '#5D4E2A', lineHeight: 1.6, margin: 0 }}>
                  {selected.name} is excelling in <strong>{Object.entries(subjects).filter(([, d]) => d.grade >= 90).map(([n]) => n).join(', ') || 'many areas'}</strong>.
                  Consider a small reward — a special outing, a new book, or an afternoon of free reading.
                </p>
              </div>
            </>
          ) : (
            <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 32, border: '1px solid #E8DCC4', textAlign: 'center' }}>
              <Award size={32} color="#4A5D3A" strokeWidth={1.2} style={{ margin: '0 auto 12px' }} />
              <h3 style={{ ...s.serif, fontSize: 22, fontWeight: 500, margin: '0 0 8px', color: '#2B2416' }}>Excellent work</h3>
              <p style={{ fontSize: 14, color: '#5D4E2A', margin: 0, lineHeight: 1.5 }}>
                {selected.name} is performing well across all subjects. Click any subject for detail.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
