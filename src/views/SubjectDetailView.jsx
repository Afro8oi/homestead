import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { findSubjectBySlug, ICON_MAP } from '../data/subjectLibrary.js';
import { MATH_GRADE_3 } from '../data/mathGrade3.js';
import { s } from '../styles.js';

export default function SubjectDetailView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const subject = findSubjectBySlug(slug);
  const [openLevel, setOpenLevel] = useState(null);

  if (!subject) {
    return (
      <div className="fade-in page-pad" style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px' }}>
        <button onClick={() => navigate('/library')} style={{ background: 'transparent', border: 'none', color: '#5D4E2A', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginBottom: 24 }}>
          <ChevronLeft size={16} /> Back to library
        </button>
        <div>Subject not found.</div>
      </div>
    );
  }

  const Icon = ICON_MAP[subject.icon];
  const isMathG3Available = subject.name === 'Mathematics';

  const openLesson = (lesson) => {
    navigate(`/lesson/${lesson.id}`, { state: { subjectName: subject.name, from: `/library/${slug}` } });
  };

  return (
    <div className="fade-in page-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
      <button onClick={() => navigate('/library')} style={{ background: 'transparent', border: 'none', color: '#5D4E2A', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginBottom: 24 }}>
        <ChevronLeft size={16} /> Back to library
      </button>
      <div style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}dd)`, borderRadius: 20, padding: 48, color: '#F5F0E6', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,253,247,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'start', gap: 28 }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(255,253,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
            <Icon size={40} color="#F5F0E6" strokeWidth={1.3} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.25em', opacity: 0.85, textTransform: 'uppercase', marginBottom: 8 }}>Subject</div>
            <h1 style={{ ...s.serif, fontSize: 52, fontWeight: 500, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.05 }}>{subject.name}</h1>
            <p style={{ fontSize: 17, opacity: 0.9, margin: '16px 0 0', lineHeight: 1.5, maxWidth: 600 }}>{subject.description}</p>
          </div>
        </div>
      </div>

      <h2 style={{ ...s.serif, fontSize: 28, fontWeight: 500, margin: '0 0 20px', color: '#2B2416' }}>Levels</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {subject.levels.map((level, i) => {
          const hasFullContent = isMathG3Available && level.age === '7-10';
          return (
            <div key={i}>
              <div onClick={() => setOpenLevel(openLevel === i ? null : i)} className="hover-lift"
                style={{ background: '#FFFDF7', borderRadius: 16, padding: 28, border: '1px solid #E8DCC4', cursor: 'pointer', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 24, alignItems: 'center' }}>
                <div style={{ width: 76, height: 76, borderRadius: 14, background: `${subject.color}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 10, letterSpacing: '0.15em', color: subject.color, textTransform: 'uppercase', fontWeight: 600 }}>Age</div>
                  <div style={{ ...s.serif, fontSize: 20, fontWeight: 600, color: subject.color }}>{level.age}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h3 style={{ ...s.serif, fontSize: 22, fontWeight: 500, margin: 0, color: '#2B2416' }}>{level.title}</h3>
                    {hasFullContent && (
                      <span style={{ background: '#4A5D3A', color: '#F5F0E6', fontSize: 10, padding: '3px 8px', borderRadius: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                        Content Ready
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: '#8B7D5B', marginBottom: 10 }}>{level.lessons} lessons</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {level.topics.map((t, j) => (
                      <span key={j} style={{ background: '#F5F0E6', color: '#5D4E2A', fontSize: 12, padding: '4px 10px', borderRadius: 12, border: '1px solid #E8DCC4' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#8B7D5B' }}>{openLevel === i ? 'Hide' : 'Explore'}</div>
                <ChevronRight size={22} color={subject.color} style={{ transform: openLevel === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>

              {openLevel === i && hasFullContent && (
                <div className="fade-in" style={{ marginTop: 12, marginLeft: 32, background: '#FFFDF7', borderRadius: 16, padding: 28, border: '1px solid #E8DCC4' }}>
                  <div style={{ fontSize: 12, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>
                    {MATH_GRADE_3.gradeLevel} · {MATH_GRADE_3.totalLessons} lessons · 7 units
                  </div>
                  {MATH_GRADE_3.units.map((unit, ui) => (
                    <div key={ui} style={{ marginBottom: 20 }}>
                      <div style={{ ...s.serif, fontSize: 16, fontWeight: 600, color: '#4A5D3A', marginBottom: 10 }}>{unit.unitName}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {unit.lessons.map((lesson) => (
                          <div key={lesson.id} onClick={() => openLesson(lesson)} className="hover-lift"
                            style={{ padding: '12px 14px', borderRadius: 8, background: '#F5F0E6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: subject.color, color: '#F5F0E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
                              {lesson.id.split('-')[1]}
                            </div>
                            <div style={{ flex: 1, fontSize: 14, color: '#2B2416', fontWeight: 500 }}>{lesson.title}</div>
                            <div style={{ fontSize: 12, color: '#8B7D5B' }}>{lesson.duration}</div>
                            <ChevronRight size={14} color={subject.color} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {openLevel === i && !hasFullContent && (
                <div className="fade-in" style={{ marginTop: 12, marginLeft: 32, background: '#FFF8E7', borderRadius: 16, padding: 24, border: '1px solid #E8D5A0' }}>
                  <div style={{ fontSize: 14, color: '#5D4E2A', lineHeight: 1.6 }}>
                    <strong>Content in production.</strong> The full {level.lessons}-lesson sequence for <em>{level.title}</em> is being built out with the same depth as the Mathematics Grade 3 set — teaching pages, examples, interactive practice with auto-grading, and scripture integration. The Math Grade 3 level is available as a complete working example today.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
