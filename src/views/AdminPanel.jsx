import { useState } from 'react';
import { Users, BookOpen, Calendar, Plus, Edit3, Trash2, Save, Download } from 'lucide-react';
import { useData } from '../App.jsx';
import { SUBJECT_LIBRARY, ICON_MAP } from '../data/subjectLibrary.js';
import StudentForm from '../components/StudentForm.jsx';
import { s } from '../styles.js';

export default function AdminPanel() {
  const { students, setStudents, grades, setGrades } = useData();
  const [tab, setTab] = useState('students');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const addStudent = (newSt) => {
    const id = (crypto.randomUUID && crypto.randomUUID()) || `tmp-${Date.now()}`;
    setStudents([...students, { ...newSt, id }]);
    setShowAdd(false);
  };

  const saveStudent = (updated) => {
    setStudents(students.map(st => st.id === updated.id ? updated : st));
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    if (confirm('Remove this student? This will also delete their grade records.')) {
      setStudents(students.filter(st => st.id !== id));
      const newGrades = { ...grades };
      delete newGrades[id];
      setGrades(newGrades);
    }
  };

  return (
    <div className="fade-in page-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8 }}>Administration</div>
        <h1 className="h-display" style={{ ...s.serif, fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', margin: 0, color: '#2B2416' }}>
          Manage your <span style={{ fontStyle: 'italic', color: '#4A5D3A' }}>home academy</span>
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {[
          { id: 'students', label: 'Students', icon: Users },
          { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
          { id: 'planner', label: 'Weekly Planner', icon: Calendar },
        ].map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: tab === t.id ? '#4A5D3A' : '#FFFDF7', color: tab === t.id ? '#F5F0E6' : '#5D4E2A',
              border: '1px solid #E8DCC4', padding: '10px 18px', borderRadius: 8,
              fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'students' && (
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 32, border: '1px solid #E8DCC4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ ...s.serif, fontSize: 26, fontWeight: 500, margin: 0, color: '#2B2416' }}>Students ({students.length})</h2>
            <button onClick={() => setShowAdd(true)} className="btn-primary"
              style={{ background: '#4A5D3A', color: '#F5F0E6', border: 'none', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Plus size={14} /> Add student
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {students.map(st => (
              <div key={st.id} style={{ padding: 16, background: '#F5F0E6', borderRadius: 10, display: 'grid', gridTemplateColumns: 'auto 2fr 1fr 1fr auto', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: st.color, color: '#F5F0E6', display: 'flex', alignItems: 'center', justifyContent: 'center', ...s.serif, fontSize: 20, fontWeight: 600 }}>{st.avatar}</div>
                <div>
                  <div style={{ ...s.serif, fontSize: 18, fontWeight: 600, color: '#2B2416' }}>{st.name}</div>
                  <div style={{ fontSize: 12, color: '#8B7D5B' }}>Age {st.age} · Born {st.birthYear || '—'}</div>
                </div>
                <div style={{ fontSize: 14, color: '#5D4E2A' }}>{st.grade}</div>
                <div style={{ fontSize: 13, color: '#8B7D5B' }}>{Object.keys(grades[st.id] || {}).length} subjects</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => setEditingStudent(st)} style={{ background: 'transparent', border: '1px solid #E8DCC4', borderRadius: 6, padding: 8, cursor: 'pointer', display: 'flex' }}>
                    <Edit3 size={14} color="#5D4E2A" />
                  </button>
                  <button onClick={() => deleteStudent(st.id)} style={{ background: 'transparent', border: '1px solid #E8DCC4', borderRadius: 6, padding: 8, cursor: 'pointer', display: 'flex' }}>
                    <Trash2 size={14} color="#8B3A3A" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {(showAdd || editingStudent) && (
            <StudentForm
              student={editingStudent}
              onSave={editingStudent ? saveStudent : addStudent}
              onCancel={() => { setShowAdd(false); setEditingStudent(null); }}
            />
          )}
        </div>
      )}

      {tab === 'curriculum' && (
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 32, border: '1px solid #E8DCC4' }}>
          <h2 style={{ ...s.serif, fontSize: 26, fontWeight: 500, margin: '0 0 20px', color: '#2B2416' }}>Curriculum Library</h2>
          <p style={{ fontSize: 14, color: '#5D4E2A', margin: '0 0 24px', lineHeight: 1.5 }}>
            Master catalog of all subjects and levels. Toggle availability, track what is complete, and plan what to build next.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SUBJECT_LIBRARY.flatMap(subj =>
              subj.levels.map(level => ({
                subject: subj.name, color: subj.color, icon: subj.icon,
                age: level.age, title: level.title, lessons: level.lessons,
                complete: subj.name === 'Mathematics' && level.age === '7-10',
              }))
            ).map((row, i) => {
              const Icon = ICON_MAP[row.icon];
              return (
                <div key={i} style={{ padding: 14, background: '#F5F0E6', borderRadius: 8, display: 'grid', gridTemplateColumns: 'auto 2fr 1fr 1fr auto auto', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${row.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={row.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#2B2416' }}>{row.subject}</div>
                    <div style={{ fontSize: 12, color: '#8B7D5B' }}>{row.title}</div>
                  </div>
                  <div style={{ fontSize: 13, color: '#5D4E2A' }}>Ages {row.age}</div>
                  <div style={{ fontSize: 13, color: '#5D4E2A' }}>{row.lessons} lessons</div>
                  <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: row.complete ? '#4A5D3A' : '#B8860B', fontWeight: 600 }}>
                    {row.complete ? '● Published' : '○ Outline only'}
                  </div>
                  <button style={{ background: 'transparent', border: '1px solid #E8DCC4', borderRadius: 6, padding: 8, cursor: 'pointer', display: 'flex' }}>
                    <Edit3 size={14} color="#5D4E2A" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'planner' && (
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 32, border: '1px solid #E8DCC4' }}>
          <h2 style={{ ...s.serif, fontSize: 26, fontWeight: 500, margin: '0 0 20px', color: '#2B2416' }}>Weekly Planner</h2>
          <p style={{ fontSize: 14, color: '#5D4E2A', margin: '0 0 24px', lineHeight: 1.5 }}>Assign lessons to each child for the coming week.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', fontFamily: 'inherit', fontWeight: 600 }}></th>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
                    <th key={d} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', fontFamily: 'inherit', fontWeight: 600, borderBottom: '1px solid #E8DCC4' }}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(st => (
                  <tr key={st.id}>
                    <td style={{ padding: 12, borderBottom: '1px solid #F0E8D6' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: st.color, color: '#F5F0E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>{st.avatar}</div>
                        <div style={{ ...s.serif, fontSize: 15, fontWeight: 600, color: '#2B2416' }}>{st.name}</div>
                      </div>
                    </td>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
                      <td key={d} style={{ padding: 8, borderBottom: '1px solid #F0E8D6', verticalAlign: 'top' }}>
                        <div style={{ padding: 10, background: '#F5F0E6', borderRadius: 8, minHeight: 80, fontSize: 12, color: '#5D4E2A', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                          {st.gradeLevel <= 3 ? 'Math: Place Value\nReading: Ch. 4\nScripture: Ps. 23' :
                           st.gradeLevel <= 8 ? 'Math: Fractions\nLatin: Ch. 12\nHistory: Rome' :
                           'Chemistry\nLit: Hamlet\nTheology'}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button className="btn-primary" style={{ background: '#4A5D3A', color: '#F5F0E6', border: 'none', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Save size={14} /> Save plan
            </button>
            <button style={{ background: '#FFFDF7', color: '#5D4E2A', border: '1px solid #E8DCC4', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Download size={14} /> Export to PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
