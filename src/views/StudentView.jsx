import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Sparkles, Star, Target } from 'lucide-react';
import { useData } from '../App.jsx';
import { MATH_GRADE_3 } from '../data/mathGrade3.js';
import { s } from '../styles.js';

export default function StudentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useData();
  const student = students.find(st => String(st.id) === String(id));
  if (!student) return <div style={{ padding: 48 }}>Student not found.</div>;

  const todaysLessons = [
    { subject: 'Scripture', title: 'Memory Verse: Psalm 23', done: true, duration: '15 min' },
    { subject: 'Mathematics', title: MATH_GRADE_3.units[0].lessons[0].title, done: true, duration: '30 min', lesson: MATH_GRADE_3.units[0].lessons[0] },
    { subject: 'Reading', title: "Read-aloud: Little Pilgrim's Progress", done: true, duration: '25 min' },
    { subject: 'Mathematics', title: MATH_GRADE_3.units[2].lessons[0].title, done: false, duration: '30 min', lesson: MATH_GRADE_3.units[2].lessons[0] },
    { subject: 'Writing', title: 'Copywork: Psalm 23, verse 1', done: false, duration: '20 min' },
  ];

  const openLesson = (lesson, subject) => {
    navigate(`/lesson/${lesson.id}`, { state: { subjectName: subject, from: `/student/${student.id}` } });
  };

  return (
    <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ background: `linear-gradient(135deg, ${student.color} 0%, ${student.color}dd 100%)`, borderRadius: 20, padding: 40, color: '#F5F0E6', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,253,247,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#FFFDF7', display: 'flex', alignItems: 'center', justifyContent: 'center', ...s.serif, fontSize: 48, fontWeight: 500, color: student.color }}>{student.avatar}</div>
          <div>
            <div style={{ fontSize: 13, letterSpacing: '0.2em', opacity: 0.85, textTransform: 'uppercase' }}>Hello</div>
            <h1 style={{ ...s.serif, fontSize: 56, fontWeight: 500, margin: '4px 0', letterSpacing: '-0.02em', lineHeight: 1 }}>{student.name}</h1>
            <div style={{ fontSize: 15, opacity: 0.9 }}>{student.grade} · Age {student.age}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 32, border: '1px solid #E8DCC4' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ ...s.serif, fontSize: 28, fontWeight: 500, margin: 0, color: '#2B2416' }}>Today's lessons</h2>
            <span style={{ fontSize: 13, color: '#8B7D5B', background: '#F5F0E6', padding: '6px 12px', borderRadius: 20 }}>
              {todaysLessons.filter(l => l.done).length} of {todaysLessons.length}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {todaysLessons.map((l, i) => (
              <div key={i} onClick={() => { if (!l.done && l.lesson) openLesson(l.lesson, l.subject); }}
                className={!l.done && l.lesson ? 'hover-lift' : ''}
                style={{
                  padding: 18, borderRadius: 12,
                  background: l.done ? '#F5F0E6' : '#FFFDF7',
                  border: l.done ? '1px solid #E8DCC4' : `2px solid ${student.color}`,
                  cursor: (l.done || !l.lesson) ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 16, opacity: l.done ? 0.7 : 1,
                }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: l.done ? student.color : 'transparent',
                  border: l.done ? 'none' : `2px solid ${student.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {l.done && <CheckCircle2 size={20} color="#FFFDF7" strokeWidth={2} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.15em', color: student.color, textTransform: 'uppercase', fontWeight: 600 }}>{l.subject}</div>
                  <div style={{ ...s.serif, fontSize: 18, fontWeight: 500, color: '#2B2416', marginTop: 2, textDecoration: l.done ? 'line-through' : 'none' }}>{l.title}</div>
                </div>
                <div style={{ fontSize: 13, color: '#8B7D5B' }}>{l.duration}</div>
                {!l.done && l.lesson && <ChevronRight size={18} color={student.color} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 24, border: '1px solid #E8DCC4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Sparkles size={18} color="#B8860B" strokeWidth={1.5} />
              <h3 style={{ ...s.serif, fontSize: 18, fontWeight: 500, margin: 0, color: '#2B2416' }}>Encouragement</h3>
            </div>
            <p style={{ ...s.serif, fontSize: 16, fontStyle: 'italic', color: '#5D4E2A', margin: 0, lineHeight: 1.5 }}>
              "Whatsoever thy hand findeth to do, do it with thy might."
            </p>
            <div style={{ fontSize: 12, color: '#8B7D5B', marginTop: 8 }}>— Ecclesiastes 9:10</div>
          </div>

          <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 24, border: '1px solid #E8DCC4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Star size={18} color="#B8860B" strokeWidth={1.5} fill="#B8860B" />
              <h3 style={{ ...s.serif, fontSize: 18, fontWeight: 500, margin: 0, color: '#2B2416' }}>Your badges</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['7-day streak', 'Math whiz', 'Scripture scholar', 'Kind helper', 'Bookworm'].map((b, i) => (
                <div key={i} style={{ background: '#F5F0E6', border: '1px solid #E8DCC4', padding: '6px 12px', borderRadius: 20, fontSize: 12, color: '#5D4E2A' }}>{b}</div>
              ))}
            </div>
          </div>

          <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 24, border: '1px solid #E8DCC4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Target size={18} color="#4A5D3A" strokeWidth={1.5} />
              <h3 style={{ ...s.serif, fontSize: 18, fontWeight: 500, margin: 0, color: '#2B2416' }}>This week's goal</h3>
            </div>
            <div style={{ fontSize: 14, color: '#5D4E2A', lineHeight: 1.5 }}>Finish the unit on fractions and memorize Psalm 23 (verses 1–4).</div>
          </div>
        </div>
      </div>
    </div>
  );
}
