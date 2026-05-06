import { useNavigate } from 'react-router-dom';
import { Flame, Users, BookOpen, Award, Calendar, Heart, Clock, Gamepad2, FileText, Library } from 'lucide-react';
import { useData } from '../App.jsx';
import { s } from '../styles.js';

export default function HomeView() {
  const navigate = useNavigate();
  const { household, students, buildSubjects } = useData();
  const todaysSchedule = [
    { time: '8:00', subject: 'Morning Scripture', duration: '20 min', type: 'family' },
    { time: '8:30', subject: 'Mathematics', duration: '45 min', type: 'individual' },
    { time: '9:30', subject: 'Reading & Writing', duration: '60 min', type: 'individual' },
    { time: '10:45', subject: 'Nature Walk & Science', duration: '45 min', type: 'family' },
    { time: '11:45', subject: 'History Read-Aloud', duration: '30 min', type: 'family' },
    { time: '1:30', subject: 'Latin / Music', duration: '30 min', type: 'individual' },
    { time: '2:15', subject: 'Art & Project Work', duration: '45 min', type: 'individual' },
  ];
  return (
    <div className="fade-in page-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ marginBottom: 64, position: 'relative' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, background: 'radial-gradient(circle, rgba(184,134,11,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 12, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 16 }}>Tuesday · April 21</div>
        <h1 className="h-display" style={{ ...s.serif, fontSize: 56, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 20px', color: '#2B2416' }}>
          Welcome home,<br />
          <span style={{ fontStyle: 'italic', color: '#4A5D3A' }}>the Whitfields.</span>
        </h1>
        <p style={{ ...s.serif, fontSize: 20, fontStyle: 'italic', color: '#5D4E2A', margin: 0, maxWidth: 600, lineHeight: 1.5 }}>{household.verse}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
        {[
          { icon: Flame, label: 'Day streak', value: household.streakDays, suffix: 'days', color: '#B8860B' },
          { icon: Users, label: 'Students', value: students.length, suffix: 'children', color: '#4A5D3A' },
          { icon: BookOpen, label: 'Lessons today', value: 12, suffix: 'of 18', color: '#6B4E71' },
          { icon: Award, label: 'This week', value: 47, suffix: 'completed', color: '#8B3A3A' },
        ].map((stat, i) => (
          <div key={i} className="slide-up" style={{ background: '#FFFDF7', padding: '24px', borderRadius: 12, border: '1px solid #E8DCC4', animationDelay: `${i * 0.05}s` }}>
            <stat.icon size={20} color={stat.color} strokeWidth={1.5} />
            <div style={{ ...s.serif, fontSize: 36, fontWeight: 500, color: '#2B2416', marginTop: 12, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: '#8B7D5B', marginTop: 4 }}>{stat.suffix}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#5D4E2A', textTransform: 'uppercase', marginTop: 8 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ ...s.serif, fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', margin: 0, color: '#2B2416' }}>The children</h2>
          <span style={{ fontSize: 13, color: '#8B7D5B' }}>Tap a child to enter their classroom</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(students.length, 3)}, 1fr)`, gap: 20 }}>
          {students.map((st, i) => {
            const subj = buildSubjects(st.id);
            const avgAll = Object.values(subj).length ? Math.round(Object.values(subj).reduce((a, b) => a + b.grade, 0) / Object.values(subj).length) : 0;
            return (
              <div key={st.id} onClick={() => navigate(`/student/${st.id}`)} className="hover-lift slide-up"
                style={{ background: '#FFFDF7', borderRadius: 16, overflow: 'hidden', border: '1px solid #E8DCC4', cursor: 'pointer', animationDelay: `${i * 0.1}s` }}>
                <div style={{ height: 120, background: `linear-gradient(135deg, ${st.color}, ${st.color}cc)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#FFFDF7', display: 'flex', alignItems: 'center', justifyContent: 'center', ...s.serif, fontSize: 36, fontWeight: 500, color: st.color }}>{st.avatar}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ ...s.serif, fontSize: 26, fontWeight: 500, color: '#2B2416', margin: 0 }}>{st.name}</div>
                  <div style={{ fontSize: 13, color: '#8B7D5B', marginTop: 4 }}>Age {st.age} · {st.grade}</div>
                  <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #F0E8D6' }}>
                    <span style={{ fontSize: 12, color: '#8B7D5B' }}>Overall avg.</span>
                    <span style={{ ...s.serif, fontSize: 20, fontWeight: 600, color: st.color }}>{avgAll || '—'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        <div style={{ background: '#FFFDF7', borderRadius: 16, padding: 32, border: '1px solid #E8DCC4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Calendar size={18} color="#4A5D3A" strokeWidth={1.5} />
            <h3 style={{ ...s.serif, fontSize: 22, fontWeight: 500, margin: 0, color: '#2B2416' }}>Today's rhythm</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {todaysSchedule.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: i < todaysSchedule.length - 1 ? '1px solid #F0E8D6' : 'none' }}>
                <div style={{ ...s.serif, fontSize: 15, fontWeight: 500, color: '#5D4E2A', width: 52 }}>{item.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: '#2B2416' }}>{item.subject}</div>
                  <div style={{ fontSize: 12, color: '#8B7D5B' }}>{item.duration} · {item.type === 'family' ? 'Together' : 'Individual'}</div>
                </div>
                {item.type === 'family' ? <Heart size={14} color="#8B3A3A" strokeWidth={1.5} /> : <Clock size={14} color="#8B7D5B" strokeWidth={1.5} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div onClick={() => navigate('/games')} className="hover-lift" style={{ background: 'linear-gradient(135deg, #B8860B 0%, #a67a0a 100%)', borderRadius: 16, padding: 24, color: '#FFFDF7', cursor: 'pointer' }}>
            <Gamepad2 size={22} strokeWidth={1.5} />
            <div style={{ ...s.serif, fontSize: 20, fontWeight: 500, marginTop: 12 }}>Learning Games</div>
            <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4, lineHeight: 1.4 }}>Interactive practice that feels like play</div>
          </div>
          <div onClick={() => navigate('/records')} className="hover-lift" style={{ background: 'linear-gradient(135deg, #6B4E71 0%, #5a4160 100%)', borderRadius: 16, padding: 24, color: '#FFFDF7', cursor: 'pointer' }}>
            <FileText size={22} strokeWidth={1.5} />
            <div style={{ ...s.serif, fontSize: 20, fontWeight: 500, marginTop: 12 }}>Records & Transcripts</div>
            <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4, lineHeight: 1.4 }}>College-ready documentation</div>
          </div>
          <div onClick={() => navigate('/library')} className="hover-lift" style={{ background: '#FFFDF7', borderRadius: 16, padding: 24, border: '1px solid #E8DCC4', cursor: 'pointer' }}>
            <Library size={22} color="#8B6F47" strokeWidth={1.5} />
            <div style={{ ...s.serif, fontSize: 20, fontWeight: 500, marginTop: 12, color: '#2B2416' }}>Resource Library</div>
            <div style={{ fontSize: 13, color: '#5D4E2A', marginTop: 4, lineHeight: 1.4 }}>8 subjects · ages 4 to 18</div>
          </div>
        </div>
      </div>
    </div>
  );
}
