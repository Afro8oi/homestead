import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, Target, Feather, CheckCircle2, Heart, Trophy, ArrowUpRight } from 'lucide-react';
import { useData } from '../App.jsx';
import { findLessonById } from '../data/mathGrade3.js';
import { s } from '../styles.js';

export default function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { students, recordGrade } = useData();
  const lesson = findLessonById(id);
  const subjectName = location.state?.subjectName || 'Mathematics';
  const fromPath = location.state?.from || '/library';

  const [section, setSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id);
  const [completed, setCompleted] = useState(false);
  const sections = ['opening', 'teach', 'example', 'practice', 'reflect'];

  if (!lesson) {
    return (
      <div className="fade-in" style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px' }}>
        <button onClick={() => navigate(fromPath)} style={{ background: 'transparent', border: 'none', color: '#5D4E2A', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginBottom: 24 }}>
          <ChevronLeft size={16} /> Close lesson
        </button>
        <div>Lesson not found.</div>
      </div>
    );
  }

  const progress = ((section + 1) / sections.length) * 100;

  const checkAnswer = (idx) => {
    const user = (answers[idx] || '').trim().toLowerCase().replace(/\s+/g, '');
    const correct = String(lesson.practice[idx].a).toLowerCase().replace(/\s+/g, '');
    setChecked({ ...checked, [idx]: user === correct ? 'correct' : 'incorrect' });
  };

  const completeLesson = () => {
    const correctCount = lesson.practice.filter((_, i) => checked[i] === 'correct').length;
    const score = Math.round((correctCount / lesson.practice.length) * 100);
    if (selectedStudent) {
      recordGrade(selectedStudent, subjectName, score);
    }
    setCompleted(true);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px' }}>
      <button onClick={() => navigate(fromPath)} style={{ background: 'transparent', border: 'none', color: '#5D4E2A', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginBottom: 24 }}>
        <ChevronLeft size={16} /> Close lesson
      </button>

      <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid #E8DCC4' }}>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#8B7D5B', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
          <span>Mathematics</span><span>·</span><span>Grade 3</span><span>·</span><span>{lesson.duration}</span>
        </div>
        <h1 style={{ ...s.serif, fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 20px', color: '#2B2416' }}>
          {lesson.title}
        </h1>
        <div style={{ marginTop: 20, padding: 16, background: '#F5F0E6', borderRadius: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Objective</div>
          <div style={{ fontSize: 15, color: '#2B2416', lineHeight: 1.5 }}>{lesson.objective}</div>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: '#8B7D5B', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Recording score for</div>
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #E8DCC4', borderRadius: 8, background: '#FFFDF7', fontSize: 14, fontFamily: 'inherit', color: '#2B2416' }}>
            {students.map(st => <option key={st.id} value={st.id}>{st.name} ({st.grade})</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8B7D5B', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          <span>Section {section + 1} of {sections.length}: {sections[section]}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 4, background: '#E8DCC4', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, #4A5D3A, #6B8E5A)', width: `${progress}%`, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {section === 0 && (
        <div key="opening" className="fade-in" style={{ background: '#FFF8E7', borderRadius: 16, padding: 40, border: '1px solid #E8D5A0', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Sparkles size={20} color="#B8860B" strokeWidth={1.5} />
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase', fontWeight: 600 }}>Opening scripture</div>
          </div>
          <p style={{ ...s.serif, fontSize: 26, fontStyle: 'italic', color: '#2B2416', margin: 0, lineHeight: 1.5 }}>{lesson.openingVerse}</p>
        </div>
      )}
      {section === 1 && (
        <div key="teach" className="fade-in" style={{ background: '#FFFDF7', borderRadius: 16, padding: 40, border: '1px solid #E8DCC4', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <BookOpen size={20} color="#4A5D3A" strokeWidth={1.5} />
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase', fontWeight: 600 }}>The teaching</div>
          </div>
          <p style={{ ...s.serif, fontSize: 19, lineHeight: 1.7, color: '#2B2416', margin: 0 }}>{lesson.teaching}</p>
        </div>
      )}
      {section === 2 && (
        <div key="example" className="fade-in" style={{ background: '#FFFDF7', borderRadius: 16, padding: 40, border: '1px solid #E8DCC4', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Target size={20} color="#6B4E71" strokeWidth={1.5} />
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase', fontWeight: 600 }}>Worked example</div>
          </div>
          <pre style={{ ...s.serif, fontSize: 18, lineHeight: 1.7, color: '#2B2416', margin: 0, whiteSpace: 'pre-wrap', fontFamily: '"Fraunces", serif' }}>{lesson.example}</pre>
        </div>
      )}
      {section === 3 && (
        <div key="practice" className="fade-in" style={{ background: '#FFFDF7', borderRadius: 16, padding: 40, border: '1px solid #E8DCC4', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Feather size={20} color="#8B6F47" strokeWidth={1.5} />
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase', fontWeight: 600 }}>Your turn · {lesson.practice.length} problems</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lesson.practice.map((p, i) => (
              <div key={i} className={checked[i] === 'incorrect' ? 'shake' : ''} style={{
                padding: 20, background: '#F5F0E6', borderRadius: 12,
                border: checked[i] === 'correct' ? '2px solid #4A5D3A' : checked[i] === 'incorrect' ? '2px solid #8B3A3A' : '1px solid #E8DCC4',
                transition: 'border-color 0.2s',
              }}>
                <div style={{ ...s.serif, fontSize: 17, color: '#2B2416', marginBottom: 12, lineHeight: 1.4 }}>
                  <strong style={{ color: '#8B7D5B', marginRight: 8 }}>{i + 1}.</strong>{p.q}
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input value={answers[i] || ''} onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                    disabled={checked[i] === 'correct'}
                    placeholder="Your answer"
                    style={{ flex: 1, padding: '10px 14px', border: '1px solid #E8DCC4', borderRadius: 8, background: '#FFFDF7', fontSize: 15, fontFamily: 'inherit', color: '#2B2416' }} />
                  <button onClick={() => checkAnswer(i)} disabled={checked[i] === 'correct'} className="btn-primary"
                    style={{ background: checked[i] === 'correct' ? '#4A5D3A' : '#B8860B', color: '#FFFDF7', border: 'none', padding: '10px 18px', borderRadius: 8, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: checked[i] === 'correct' ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {checked[i] === 'correct' ? <><CheckCircle2 size={14} /> Correct</> : 'Check'}
                  </button>
                </div>
                {checked[i] === 'incorrect' && (
                  <div style={{ marginTop: 10, fontSize: 13, color: '#8B3A3A', fontStyle: 'italic' }}>Not quite — try again. The answer was {p.a}.</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: 14, background: '#F5F0E6', borderRadius: 8, fontSize: 13, color: '#5D4E2A', textAlign: 'center' }}>
            Score so far: {lesson.practice.filter((_, i) => checked[i] === 'correct').length} / {lesson.practice.length}
          </div>
        </div>
      )}
      {section === 4 && !completed && (
        <div key="reflect" className="fade-in" style={{ background: 'linear-gradient(135deg, #4A5D3A 0%, #3a4d2a 100%)', borderRadius: 16, padding: 40, color: '#F5F0E6', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Heart size={20} strokeWidth={1.5} />
            <div style={{ fontSize: 11, letterSpacing: '0.2em', opacity: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>Reflection</div>
          </div>
          <p style={{ ...s.serif, fontSize: 20, lineHeight: 1.6, margin: '0 0 24px', fontStyle: 'italic' }}>
            Mathematics shows us the ordered beauty of creation. Every pattern you master is a small glimpse of the Creator's wisdom. Well done today.
          </p>
        </div>
      )}
      {completed && (
        <div className="pulse" style={{ background: '#B8860B', borderRadius: 16, padding: 40, color: '#FFFDF7', marginBottom: 24, textAlign: 'center' }}>
          <Trophy size={48} strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
          <h2 style={{ ...s.serif, fontSize: 32, fontWeight: 500, margin: '0 0 12px' }}>Lesson complete!</h2>
          <p style={{ fontSize: 16, opacity: 0.95, margin: 0 }}>
            Score: {Math.round((lesson.practice.filter((_, i) => checked[i] === 'correct').length / lesson.practice.length) * 100)}%
            {' '}· Recorded to {students.find(st => st.id === selectedStudent)?.name}'s gradebook.
          </p>
        </div>
      )}

      {!completed && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <button onClick={() => setSection(Math.max(0, section - 1))} disabled={section === 0}
            style={{ background: '#FFFDF7', color: '#5D4E2A', border: '1px solid #E8DCC4', padding: '14px 24px', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: section === 0 ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: section === 0 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChevronLeft size={16} /> Previous
          </button>
          {section < sections.length - 1 ? (
            <button onClick={() => setSection(section + 1)} className="btn-primary"
              style={{ background: '#4A5D3A', color: '#F5F0E6', border: 'none', padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={completeLesson} className="btn-primary"
              style={{ background: '#B8860B', color: '#FFFDF7', border: 'none', padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} /> Complete & record grade
            </button>
          )}
        </div>
      )}
      {completed && (
        <button onClick={() => navigate(fromPath)} className="btn-primary" style={{ background: '#4A5D3A', color: '#F5F0E6', border: 'none', padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto' }}>
          Return to lessons <ArrowUpRight size={16} />
        </button>
      )}
    </div>
  );
}
