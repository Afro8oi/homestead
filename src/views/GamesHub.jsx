import { useNavigate } from 'react-router-dom';
import { Swords, Cross, Scroll, Globe2, ArrowUpRight } from 'lucide-react';
import { s } from '../styles.js';

const games = [
  { id: 'mult-quest', name: 'Multiplication Quest', subject: 'Mathematics', ages: '7-10', icon: Swords, color: '#8B3A3A', description: 'Defeat the dragon with swift multiplication! 10 rounds of increasing difficulty.', path: '/games/mult-quest' },
  { id: 'verse-match', name: 'Verse Memory Match', subject: 'Scripture', ages: '4-10', icon: Cross, color: '#5D4037', description: 'Match scripture references to their verses. 6 pairs to find.', path: '/games/verse-match' },
  { id: 'latin-roots', name: 'Latin Roots Quest', subject: 'Classical Languages', ages: '11-14', icon: Scroll, color: '#2C5F5D', description: 'Unlock English words by decoding their Latin origins. Coming soon.' },
  { id: 'capital-rush', name: 'Capitals Rush', subject: 'Geography', ages: '7-14', icon: Globe2, color: '#8B3A3A', description: 'Match countries to capitals as fast as you can. Coming soon.' },
];

export default function GamesHub() {
  const navigate = useNavigate();
  return (
    <div className="fade-in page-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8 }}>Learning Games</div>
        <h1 style={{ ...s.serif, fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 12px', color: '#2B2416' }}>
          Practice that feels like <span style={{ fontStyle: 'italic', color: '#B8860B' }}>play</span>
        </h1>
        <p style={{ fontSize: 17, color: '#5D4E2A', maxWidth: 700, lineHeight: 1.6, margin: 0 }}>
          Interactive games reinforce skills through repetition dressed as adventure. Scores auto-save to the gradebook.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {games.map((g, i) => {
          const Icon = g.icon;
          return (
            <div key={g.id} onClick={() => g.path && navigate(g.path)} className="hover-lift slide-up"
              style={{ background: '#FFFDF7', borderRadius: 16, padding: 28, border: '1px solid #E8DCC4', cursor: g.path ? 'pointer' : 'default', animationDelay: `${i * 0.08}s`, position: 'relative', overflow: 'hidden', opacity: g.path ? 1 : 0.7 }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, background: `radial-gradient(circle, ${g.color}20 0%, transparent 70%)` }} />
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `${g.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
                <Icon size={28} color={g.color} strokeWidth={1.5} />
              </div>
              <h3 style={{ ...s.serif, fontSize: 22, fontWeight: 500, margin: '0 0 6px', color: '#2B2416' }}>{g.name}</h3>
              <div style={{ fontSize: 12, color: '#8B7D5B', marginBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{g.subject} · Ages {g.ages}</div>
              <p style={{ fontSize: 14, color: '#5D4E2A', lineHeight: 1.5, margin: 0, minHeight: 60 }}>{g.description}</p>
              {g.path ? (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F0E8D6', display: 'flex', alignItems: 'center', gap: 6, color: g.color, fontSize: 13, fontWeight: 500 }}>
                  Play now <ArrowUpRight size={14} />
                </div>
              ) : (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F0E8D6', fontSize: 12, color: '#8B7D5B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Coming soon
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
