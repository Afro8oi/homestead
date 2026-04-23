import { useState } from 'react';
import { Printer } from 'lucide-react';
import { useData } from '../App.jsx';
import { avgGrade, gpaPointsUS, gcseGrade, cambridgeGrade, ibPoint } from '../lib/gradeConversion.js';
import { s } from '../styles.js';

export default function RecordsView() {
  const { students, grades, region } = useData();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id);
  const [tab, setTab] = useState('transcript');
  const student = students.find(st => st.id === selectedStudentId);
  if (!student) return <div style={{ padding: 48 }}>No students yet.</div>;

  const studentGrades = grades[student.id] || {};
  const courses = Object.entries(studentGrades).map(([subject, arr]) => ({
    subject,
    grade: avgGrade(arr),
    credits: 1.0,
  }));

  let headlineValue, headlineLabel, regionalNote;
  if (region.id === 'US') {
    const totalCredits = courses.reduce((a, c) => a + c.credits, 0);
    const gpa = totalCredits > 0 ? (courses.reduce((a, c) => a + gpaPointsUS(c.grade) * c.credits, 0) / totalCredits).toFixed(2) : '0.00';
    headlineValue = gpa; headlineLabel = 'Cumulative GPA (4.0 scale)';
    regionalNote = 'Colleges in the United States welcome homeschooled applicants. A parent-issued transcript paired with SAT/ACT scores and 2–3 letters of recommendation is the standard package.';
  } else if (region.id === 'UK') {
    const avg = courses.length ? Math.round(courses.reduce((a, c) => a + c.grade, 0) / courses.length) : 0;
    headlineValue = gcseGrade(avg); headlineLabel = 'Predicted mean grade (9–1 scale)';
    regionalNote = 'UK universities (via UCAS) accept private candidate IGCSEs and A-Levels. Entries must be sat at a registered examination centre such as Pearson Edexcel or Cambridge International. Predicted grades below are parent-issued and should be supported by tutor references.';
  } else if (region.id === 'EU') {
    const ibPoints = courses.reduce((a, c) => a + ibPoint(c.grade), 0);
    headlineValue = `${ibPoints} / ${courses.length * 7}`; headlineLabel = 'IB points (sum across subjects)';
    regionalNote = 'The IB Diploma is accepted by virtually every European university. Homeschooled candidates typically sit exams as private candidates at an authorised IB school. The total possible score is 45 (6 subjects × 7 + 3 bonus from EE/TOK).';
  } else if (region.id === 'ASIA') {
    const avg = courses.length ? Math.round(courses.reduce((a, c) => a + c.grade, 0) / courses.length) : 0;
    headlineValue = cambridgeGrade(avg); headlineLabel = 'Predicted mean grade (Cambridge)';
    regionalNote = 'Cambridge International IGCSEs and A-Levels are accepted by universities across Asia and worldwide. Exams are sat via the British Council or authorised test centres. Certificates are identical whether earned as a private candidate or in school.';
  }

  return (
    <div className="fade-in" style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase' }}>Records & Transcripts</div>
          <div style={{ fontSize: 11, padding: '2px 8px', background: '#F5F0E6', border: '1px solid #E8DCC4', borderRadius: 10, color: '#5D4E2A', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>{region.flag}</span><span>{region.qualification}</span>
          </div>
        </div>
        <h1 style={{ ...s.serif, fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 12px', color: '#2B2416' }}>
          University-ready <span style={{ fontStyle: 'italic', color: '#6B4E71' }}>documentation</span>
        </h1>
        <p style={{ fontSize: 15, color: '#5D4E2A', maxWidth: 820, lineHeight: 1.6, margin: 0 }}>
          {regionalNote}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '1px solid #E8DCC4' }}>
        {students.map(st => (
          <button key={st.id} onClick={() => setSelectedStudentId(st.id)} style={{
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

      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {['transcript', 'portfolio', 'attendance'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? '#4A5D3A' : '#FFFDF7', color: tab === t ? '#F5F0E6' : '#5D4E2A',
            border: '1px solid #E8DCC4', padding: '10px 18px', borderRadius: 8,
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
          }}>{t}</button>
        ))}
      </div>

      {tab === 'transcript' && (
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 40, border: '1px solid #E8DCC4' }}>
          <div style={{ borderBottom: '2px solid #2B2416', paddingBottom: 20, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <div style={{ ...s.serif, fontSize: 28, fontWeight: 600, color: '#2B2416', letterSpacing: '-0.01em' }}>
                {region.id === 'US' ? 'Official Transcript' : region.id === 'UK' ? 'Academic Record & Predicted Grades' : region.id === 'EU' ? 'IB Diploma Academic Record' : 'Cambridge International Record'}
              </div>
              <div style={{ fontSize: 13, color: '#5D4E2A', marginTop: 4 }}>{region.academyName}</div>
              <div style={{ fontSize: 12, color: '#8B7D5B', marginTop: 2 }}>
                {region.id === 'US' ? 'Parent-administered · Home Education Program' : 'Home education · Parent-supervised programme'}
              </div>
            </div>
            <button className="btn-primary" style={{ background: '#4A5D3A', color: '#F5F0E6', border: 'none', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Printer size={14} /> Print / PDF
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32, padding: 20, background: '#F5F0E6', borderRadius: 10 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 4 }}>Student</div>
              <div style={{ ...s.serif, fontSize: 16, fontWeight: 600, color: '#2B2416' }}>{student.name} Whitfield</div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 4 }}>
                {region.id === 'UK' || region.id === 'ASIA' ? 'Year Group' : 'Grade Level'}
              </div>
              <div style={{ ...s.serif, fontSize: 16, fontWeight: 600, color: '#2B2416' }}>
                {region.gradeLevelLabel(student.gradeLevel)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 4 }}>Academic Year</div>
              <div style={{ ...s.serif, fontSize: 16, fontWeight: 600, color: '#2B2416' }}>2025 – 2026</div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 4 }}>Date of Birth</div>
              <div style={{ ...s.serif, fontSize: 16, fontWeight: 600, color: '#2B2416' }}>{student.birthYear}</div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #2B2416' }}>
                {region.scale.columns.map((col, i) => (
                  <th key={i} style={{ textAlign: i === 0 ? 'left' : 'center', padding: '10px 12px', fontSize: 11, letterSpacing: '0.15em', color: '#5D4E2A', textTransform: 'uppercase', fontFamily: 'inherit' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F0E8D6' }}>
                  {region.scale.rowCells(c).map((cell, j) => (
                    <td key={j} style={{ padding: '14px 12px', fontSize: 15, color: '#2B2416', textAlign: j === 0 ? 'left' : 'center', ...(j === 0 ? s.serif : {}), fontWeight: j === 0 ? 500 : (j === region.scale.columns.length - 1 ? 600 : 400) }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid #2B2416' }}>
                <td style={{ padding: '16px 12px', ...s.serif, fontSize: 15, fontWeight: 600, color: '#2B2416' }}>{region.scale.cumulativeLabel}</td>
                <td colSpan={region.scale.columns.length - 2}></td>
                <td style={{ padding: '16px 12px', ...s.serif, fontSize: 20, fontWeight: 700, color: '#4A5D3A', textAlign: 'center' }}>{headlineValue}</td>
              </tr>
              <tr>
                <td colSpan={region.scale.columns.length} style={{ padding: '4px 12px 12px', fontSize: 11, color: '#8B7D5B', textAlign: 'right', fontStyle: 'italic' }}>{headlineLabel}</td>
              </tr>
            </tfoot>
          </table>

          <div style={{ marginTop: 32, padding: 20, background: '#FFF8E7', borderRadius: 10, border: '1px solid #E8D5A0' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
              {region.id === 'US' ? 'Parent Certification' : 'Parent Reference Statement'}
            </div>
            <div style={{ fontSize: 13, color: '#5D4E2A', lineHeight: 1.6, fontStyle: 'italic', ...s.serif }}>
              {region.id === 'US' && 'I certify that the grades recorded above reflect the actual work completed by the student during the academic year. This transcript is issued by the parent as the chief administrator of the home education program, in accordance with applicable state law.'}
              {region.id === 'UK' && 'The grades shown are predicted grades based on ongoing assessment of the student\'s work. Official results will be issued directly by the examination board (Pearson Edexcel / Cambridge International) upon completion of external examinations. This document is provided as supporting context for UCAS applications.'}
              {region.id === 'EU' && 'The grades shown are based on ongoing assessment aligned with IB Diploma Programme criteria. Official results will be issued by the International Baccalaureate Organization upon examination. This record is provided as supporting evidence of progression.'}
              {region.id === 'ASIA' && 'The grades shown are predicted grades aligned with the Cambridge Assessment International Education marking scheme. Official certificates will be issued by Cambridge Assessment upon external examination. This document is provided as supporting evidence for university applications.'}
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 40, fontSize: 13, color: '#2B2416' }}>
              <div><span style={{ color: '#8B7D5B' }}>Parent signature:</span> _______________________</div>
              <div><span style={{ color: '#8B7D5B' }}>Date:</span> _____________</div>
            </div>
          </div>

          <div style={{ marginTop: 20, padding: 20, background: '#F5F0E6', borderRadius: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>Next Steps for Official Qualification</div>
            <div style={{ fontSize: 13, color: '#2B2416', lineHeight: 1.6 }}>
              {region.id === 'US' && (
                <>Register for the <strong>SAT</strong> or <strong>ACT</strong> through the respective websites. Consider <strong>AP exams</strong> (College Board) for subjects at an advanced level — AP scores 3+ are widely accepted for college credit. The CLT (Classic Learning Test) is also accepted by many Christian and classical colleges.</>
              )}
              {region.id === 'UK' && (
                <>Book IGCSE or A-Level exams as a <strong>private candidate</strong> through Pearson Edexcel International or Cambridge International via a registered examination centre. Centres can be found on the <strong>Edexcel</strong> and <strong>Cambridge International</strong> websites. Most students take 6–10 IGCSEs at age 15–16, followed by 3 A-Levels at 17–18. Register at least 3 months before the exam series (May/June or October/November).</>
              )}
              {region.id === 'EU' && (
                <>The IB Diploma requires registration through an <strong>authorised IB school</strong>. Many IB schools accept private candidates for a fee. Alternatively, consider the <strong>European Baccalaureate</strong> (for children of EU staff) or country-specific qualifications (Abitur in Germany, Bac in France, Matura in Italy/Austria/Poland). The IB is usually the most portable option for homeschoolers.</>
              )}
              {region.id === 'ASIA' && (
                <>Register for Cambridge IGCSE or A-Level through the <strong>British Council</strong> (available in most major Asian cities) or an authorised Cambridge International test centre. Exams are held twice yearly (May/June and October/November). For science subjects, look into the <strong>Alternative to Practical (ATP)</strong> papers, which allow private candidates to sit without laboratory access. Results are accepted by universities across Asia, Europe, North America, and Australia.</>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === 'portfolio' && (
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 40, border: '1px solid #E8DCC4' }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ ...s.serif, fontSize: 28, fontWeight: 500, margin: '0 0 8px', color: '#2B2416' }}>Course Descriptions</h2>
            <p style={{ fontSize: 14, color: '#5D4E2A', margin: 0, lineHeight: 1.5 }}>
              {region.id === 'US' && 'College admissions reviewers value detailed course descriptions alongside transcripts — these answer "what did they actually study?"'}
              {region.id === 'UK' && 'UCAS personal statements and university admissions tutors look for subject depth. These descriptions give context alongside predicted grades.'}
              {region.id === 'EU' && 'IB Extended Essay and TOK connections should be highlighted here as context for the Diploma programme.'}
              {region.id === 'ASIA' && 'Course descriptions support university applications, especially for competitive institutions like NUS, HKU, and Asian IITs.'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {courses.map((c, i) => (
              <div key={i} style={{ padding: 24, background: '#F5F0E6', borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 10 }}>
                  <h3 style={{ ...s.serif, fontSize: 20, fontWeight: 600, color: '#2B2416', margin: 0 }}>{c.subject}</h3>
                  <div style={{ fontSize: 13, color: '#8B7D5B' }}>{region.scale.displayScore(c.grade)}</div>
                </div>
                <div style={{ fontSize: 14, color: '#5D4E2A', lineHeight: 1.6 }}>
                  {c.subject === 'Mathematics' && 'Comprehensive study covering place value through four digits, four-operation mastery with regrouping, introduction to fractions and equivalent fractions, measurement (customary and metric), geometry of plane and solid figures, elementary data analysis. Text: Homestead Grade 3 Math curriculum. 20 graded assessments.'}
                  {c.subject === 'Reading' && 'Structured reading programme emphasising classical literature, biblical narratives, and historical fiction. Includes reading comprehension, vocabulary development, and oral narration. Selections include The Pilgrim\'s Progress (adapted), Little House series, and scripture memorisation.'}
                  {c.subject === 'Writing' && 'Composition foundations: copywork from classical sources, dictation exercises, sentence construction, paragraph development, and early narrative writing. Weekly portfolio entries retained.'}
                  {c.subject === 'Science' && 'Integrated science with emphasis on natural observation and classical science. Units include botany, anatomy, weather and seasons, and astronomy. Includes field journals and nature-study notebooks.'}
                  {c.subject === 'History' && 'Chronological study with biblical framework. Topics include creation narrative, Old Testament history, ancient civilisations (Egypt, Greece, Rome), and foundational civic history.'}
                  {c.subject === 'Scripture' && 'Systematic study of the Bible with age-appropriate catechism. Scripture memorisation (minimum 20 passages), Bible survey, and character formation readings.'}
                  {!['Mathematics','Reading','Writing','Science','History','Scripture'].includes(c.subject) && `Full-year study in ${c.subject} with graded assessments, portfolio samples retained, and weekly instruction of at least 3 hours.`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'attendance' && (
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 40, border: '1px solid #E8DCC4' }}>
          <h2 style={{ ...s.serif, fontSize: 28, fontWeight: 500, margin: '0 0 8px', color: '#2B2416' }}>
            {region.attendance.required ? 'Attendance & Hours' : 'Learning Log'}
          </h2>
          <p style={{ fontSize: 14, color: '#5D4E2A', margin: '0 0 24px', lineHeight: 1.5 }}>
            {region.attendance.required
              ? `Typical requirement in your region: ${region.attendance.days} school days / ${region.attendance.hours} instructional hours annually.`
              : `Your region does not mandate specific hours. ${region.attendance.note} This log is kept as supporting evidence for university applications and any local authority review.`}
          </p>

          {region.attendance.required && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Days completed', value: '142', total: String(region.attendance.days) },
                { label: 'Hours logged', value: '742', total: String(region.attendance.hours) },
                { label: 'Days remaining', value: String(region.attendance.days - 142) },
                { label: 'Avg hours/day', value: '5.2' },
              ].map((stat, i) => (
                <div key={i} style={{ padding: 20, background: '#F5F0E6', borderRadius: 10 }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8 }}>{stat.label}</div>
                  <div style={{ ...s.serif, fontSize: 28, fontWeight: 600, color: '#2B2416' }}>{stat.value}{stat.total && <span style={{ fontSize: 14, color: '#8B7D5B', fontWeight: 400 }}> / {stat.total}</span>}</div>
                </div>
              ))}
            </div>
          )}

          {!region.attendance.required && (
            <div style={{ padding: 20, background: '#FFF8E7', borderRadius: 10, border: '1px solid #E8D5A0', marginBottom: 32, fontSize: 14, color: '#5D4E2A', lineHeight: 1.6 }}>
              <strong>{region.label}:</strong> {region.attendance.note}. In the UK specifically, parents have a duty under s.7 of the Education Act 1996 to provide "efficient full-time education suitable to the age, ability and aptitude of the child" — but no specific days, hours, or curriculum are mandated. Local authorities may make informal enquiries.
            </div>
          )}

          <div>
            <h3 style={{ ...s.serif, fontSize: 18, fontWeight: 600, margin: '0 0 16px', color: '#2B2416' }}>Monthly summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { month: 'September', days: 18, hours: 94 }, { month: 'October', days: 22, hours: 114 },
                { month: 'November', days: 16, hours: 83 }, { month: 'December', days: 14, hours: 71 },
                { month: 'January', days: 19, hours: 99 }, { month: 'February', days: 18, hours: 96 },
                { month: 'March', days: 21, hours: 110 }, { month: 'April (in progress)', days: 14, hours: 75 },
              ].map((m, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr', alignItems: 'center', gap: 20, padding: '12px 0', borderBottom: '1px solid #F0E8D6' }}>
                  <div style={{ ...s.serif, fontSize: 15, color: '#2B2416', fontWeight: 500 }}>{m.month}</div>
                  <div style={{ fontSize: 14, color: '#5D4E2A' }}>{m.days} days</div>
                  <div style={{ fontSize: 14, color: '#5D4E2A' }}>{m.hours} hrs</div>
                  <div style={{ height: 6, background: '#E8DCC4', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${Math.min(100, (m.hours / 115) * 100)}%`, background: '#4A5D3A', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
