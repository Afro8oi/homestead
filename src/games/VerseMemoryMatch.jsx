import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Cross, Sparkles, RotateCcw, Trophy } from 'lucide-react';
import { useData } from '../App.jsx';
import { s } from '../styles.js';

const VERSES = [
  { ref: 'John 3:16',     text: 'For God so loved the world…' },
  { ref: 'Psalm 23:1',    text: 'The Lord is my shepherd; I shall not want.' },
  { ref: 'Prov 3:5',      text: 'Trust in the Lord with all thine heart.' },
  { ref: 'Phil 4:13',     text: 'I can do all things through Christ.' },
  { ref: 'Joshua 1:9',    text: 'Be strong and of a good courage.' },
  { ref: 'Matt 5:16',     text: 'Let your light so shine before men…' },
  { ref: 'Rom 8:28',      text: 'All things work together for good.' },
  { ref: 'Gen 1:1',       text: 'In the beginning God created the heaven and the earth.' },
  { ref: 'Eccl 9:10',     text: 'Whatsoever thy hand findeth to do, do it with thy might.' },
  { ref: 'Prov 22:6',     text: 'Train up a child in the way he should go.' },
  { ref: 'Isaiah 40:31',  text: 'They that wait upon the Lord shall renew their strength.' },
  { ref: 'Matt 6:33',     text: 'Seek ye first the kingdom of God.' },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBoard(pairCount = 6) {
  const picks = shuffle(VERSES).slice(0, pairCount);
  const cards = [];
  picks.forEach((v, i) => {
    cards.push({ id: `r-${i}`, kind: 'ref', pairId: i, content: v.ref });
    cards.push({ id: `t-${i}`, kind: 'text', pairId: i, content: v.text });
  });
  return shuffle(cards);
}

export default function VerseMemoryMatch() {
  const navigate = useNavigate();
  const { students, recordGrade } = useData();
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id || '');
  const [phase, setPhase] = useState('start');
  const [board, setBoard] = useState([]);
  const [flipped, setFlipped] = useState([]);   // ids of currently flipped (not yet matched)
  const [matched, setMatched] = useState([]);   // pairIds matched
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const PAIRS = 6;

  // Tick the clock while playing.
  useEffect(() => {
    if (phase !== 'playing' || !startTime) return;
    const id = setInterval(() => {
      setElapsedSec(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [phase, startTime]);

  const start = () => {
    setBoard(buildBoard(PAIRS));
    setFlipped([]); setMatched([]); setMoves(0);
    setStartTime(Date.now()); setElapsedSec(0);
    setPhase('playing');
  };

  const flip = (card) => {
    if (flipped.length === 2) return;
    if (flipped.includes(card.id)) return;
    if (matched.includes(card.pairId)) return;
    const nextFlipped = [...flipped, card.id];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      setMoves(m => m + 1);
      const [aId, bId] = nextFlipped;
      const a = board.find(c => c.id === aId);
      const b = board.find(c => c.id === bId);
      if (a.pairId === b.pairId && a.kind !== b.kind) {
        setTimeout(() => {
          setMatched(prev => {
            const next = [...prev, a.pairId];
            if (next.length === PAIRS) {
              // Finalise the run inside the same callback, no effect needed.
              const finalElapsed = Math.round((Date.now() - startTime) / 1000);
              const eff = Math.max(0, Math.min(1, PAIRS / (moves + 1)));
              const timeFactor = finalElapsed <= 60 ? 1 : Math.max(0.6, 1 - (finalElapsed - 60) / 300);
              const score = Math.round(eff * timeFactor * 100);
              setElapsedSec(finalElapsed);
              setFinalScore(score);
              setPhase('done');
              if (selectedStudent) recordGrade(selectedStudent, 'Scripture', score);
            }
            return next;
          });
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  if (phase === 'start') {
    return (
      <div className="fade-in page-pad" style={{ maxWidth: 700, margin: '0 auto', padding: '48px 32px' }}>
        <button onClick={() => navigate('/games')} style={backBtn}>
          <ChevronLeft size={16} /> Back to games
        </button>
        <div style={{ background: 'linear-gradient(135deg, #5D4037 0%, #3e2723 100%)', borderRadius: 20, padding: 48, color: '#F5F0E6', textAlign: 'center' }}>
          <Cross size={64} strokeWidth={1.3} style={{ margin: '0 auto 20px' }} />
          <h1 className="h-display" style={{ ...s.serif, fontSize: 44, fontWeight: 500, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Verse Memory Match</h1>
          <p style={{ fontSize: 17, opacity: 0.95, lineHeight: 1.6, maxWidth: 500, margin: '0 auto 28px' }}>
            Flip cards to match each scripture reference with its verse. {PAIRS} pairs to find. Fewer moves and faster times earn higher scores.
          </p>
          <div style={{ background: 'rgba(255,253,247,0.1)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', opacity: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Playing as</div>
            <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}
              style={{ padding: '10px 14px', border: 'none', borderRadius: 8, background: '#FFFDF7', fontSize: 15, fontFamily: 'inherit', color: '#2B2416', minWidth: 200 }}>
              {students.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>
          <button onClick={start} className="btn-primary"
            style={{ background: '#B8860B', color: '#FFFDF7', border: 'none', padding: '16px 40px', borderRadius: 10, fontSize: 17, fontWeight: 600, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <Sparkles size={18} /> Begin
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="fade-in page-pad" style={{ maxWidth: 700, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ background: 'linear-gradient(135deg, #B8860B, #a67a0a)', borderRadius: 20, padding: 48, color: '#FFFDF7', textAlign: 'center' }}>
          <div className="pulse"><Trophy size={80} strokeWidth={1.3} style={{ margin: '0 auto 20px' }} /></div>
          <h1 className="h-display" style={{ ...s.serif, fontSize: 44, fontWeight: 500, margin: '0 0 12px', letterSpacing: '-0.02em' }}>All matched!</h1>
          <p style={{ fontSize: 18, opacity: 0.95, margin: '0 0 24px' }}>
            {moves} moves · {elapsedSec}s · Score: {finalScore}%
          </p>
          <div style={{ background: 'rgba(255,253,247,0.15)', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 14 }}>
            Score saved to {students.find(st => st.id === selectedStudent)?.name}'s gradebook under Scripture.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={start} style={{ background: '#FFFDF7', color: '#5D4037', border: 'none', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <RotateCcw size={16} /> Play again
            </button>
            <button onClick={() => navigate('/games')} style={{ background: 'rgba(255,253,247,0.2)', color: '#FFFDF7', border: '1px solid rgba(255,253,247,0.3)', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Exit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in page-pad" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 32px' }}>
      <button onClick={() => navigate('/games')} style={backBtn}>
        <ChevronLeft size={16} /> Quit
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, fontSize: 13, color: '#5D4E2A' }}>
        <div>Matched: <strong>{matched.length}</strong> / {PAIRS}</div>
        <div>Moves: <strong>{moves}</strong></div>
        <div>{elapsedSec}s</div>
      </div>
      <div className="grid-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {board.map(card => {
          const isFaceUp = flipped.includes(card.id) || matched.includes(card.pairId);
          const isMatched = matched.includes(card.pairId);
          return (
            <button key={card.id} onClick={() => flip(card)} disabled={isMatched}
              style={{
                aspectRatio: '3 / 4', minHeight: 120,
                borderRadius: 12, padding: 12,
                border: isMatched ? '2px solid #4A5D3A' : '1px solid #E8DCC4',
                background: isFaceUp ? (isMatched ? '#E8F0DD' : '#FFFDF7') : '#5D4037',
                color: isFaceUp ? '#2B2416' : 'transparent',
                cursor: isMatched ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', fontFamily: 'inherit',
                transition: 'all 0.25s',
              }}>
              {isFaceUp ? (
                <span style={{ ...s.serif, fontSize: card.kind === 'ref' ? 18 : 14, fontWeight: card.kind === 'ref' ? 600 : 500, lineHeight: 1.3 }}>
                  {card.content}
                </span>
              ) : (
                <Cross size={28} color="#FFFDF7" strokeWidth={1.3} style={{ opacity: 0.5 }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const backBtn = {
  background: 'transparent', border: 'none', color: '#5D4E2A',
  cursor: 'pointer', fontFamily: 'inherit', fontSize: 14,
  display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginBottom: 24,
};
