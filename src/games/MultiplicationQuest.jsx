import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Swords, Zap, Trophy, Shield } from 'lucide-react';
import { useData } from '../App.jsx';
import { s } from '../styles.js';

export default function MultiplicationQuest() {
  const navigate = useNavigate();
  const { students, recordGrade } = useData();
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id);
  const [phase, setPhase] = useState('start');
  const [round, setRound] = useState(0);
  const [dragonHP, setDragonHP] = useState(100);
  const [playerHP, setPlayerHP] = useState(100);
  const [correct, setCorrect] = useState(0);
  const [question, setQuestion] = useState({ a: 0, b: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const TOTAL_ROUNDS = 10;

  const newQuestion = () => {
    const difficulty = round < 3 ? 'easy' : round < 7 ? 'medium' : 'hard';
    let a, b;
    if (difficulty === 'easy') { a = Math.floor(Math.random() * 5) + 2; b = Math.floor(Math.random() * 5) + 2; }
    else if (difficulty === 'medium') { a = Math.floor(Math.random() * 8) + 3; b = Math.floor(Math.random() * 8) + 3; }
    else { a = Math.floor(Math.random() * 9) + 4; b = Math.floor(Math.random() * 9) + 4; }
    setQuestion({ a, b });
    setUserAnswer('');
    setFeedback(null);
  };

  const startGame = () => {
    setRound(0); setDragonHP(100); setPlayerHP(100); setCorrect(0); setStreak(0);
    setPhase('playing');
    setTimeout(() => newQuestion(), 50);
  };

  const endGame = (finalCorrect, victory) => {
    const score = Math.round((finalCorrect / TOTAL_ROUNDS) * 100);
    if (selectedStudent) recordGrade(selectedStudent, 'Mathematics', score);
    setPhase('done');
    setFeedback({ victory, score, correct: finalCorrect });
  };

  const submitAnswer = () => {
    const user = parseInt(userAnswer, 10);
    const truth = question.a * question.b;
    if (user === truth) {
      const damage = 10 + streak * 2;
      const newDragonHP = Math.max(0, dragonHP - damage);
      setDragonHP(newDragonHP);
      setCorrect(correct + 1);
      setStreak(streak + 1);
      setFeedback({ type: 'hit', damage, text: streak >= 2 ? `Critical! ${damage} damage` : `${damage} damage!` });
      setTimeout(() => {
        if (newDragonHP === 0 || round + 1 >= TOTAL_ROUNDS) {
          endGame(correct + 1, newDragonHP === 0);
        } else {
          setRound(round + 1);
          newQuestion();
        }
      }, 1100);
    } else {
      const newPlayerHP = Math.max(0, playerHP - 15);
      setPlayerHP(newPlayerHP);
      setStreak(0);
      setFeedback({ type: 'miss', text: `Miss! The answer was ${truth}` });
      setTimeout(() => {
        if (newPlayerHP === 0) endGame(correct, false);
        else if (round + 1 >= TOTAL_ROUNDS) endGame(correct, false);
        else { setRound(round + 1); newQuestion(); }
      }, 1400);
    }
  };

  if (phase === 'start') {
    return (
      <div className="fade-in page-pad" style={{ maxWidth: 700, margin: '0 auto', padding: '48px 32px' }}>
        <button onClick={() => navigate('/games')} style={{ background: 'transparent', border: 'none', color: '#5D4E2A', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginBottom: 24 }}>
          <ChevronLeft size={16} /> Back to games
        </button>
        <div style={{ background: 'linear-gradient(135deg, #8B3A3A 0%, #6B2a2a 100%)', borderRadius: 20, padding: 48, color: '#F5F0E6', textAlign: 'center' }}>
          <Swords size={64} strokeWidth={1.3} style={{ margin: '0 auto 20px' }} />
          <h1 style={{ ...s.serif, fontSize: 44, fontWeight: 500, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Multiplication Quest</h1>
          <p style={{ fontSize: 17, opacity: 0.95, lineHeight: 1.6, maxWidth: 500, margin: '0 auto 32px' }}>
            A fearsome dragon guards the treasure. Defeat it with 10 rounds of multiplication. Get streaks for critical hits. Wrong answers cost health!
          </p>
          <div style={{ background: 'rgba(255,253,247,0.1)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', opacity: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Playing as</div>
            <select value={selectedStudent} onChange={(e) => setSelectedStudent(Number(e.target.value))}
              style={{ padding: '10px 14px', border: 'none', borderRadius: 8, background: '#FFFDF7', fontSize: 15, fontFamily: 'inherit', color: '#2B2416', minWidth: 200 }}>
              {students.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>
          <button onClick={startGame} className="btn-primary"
            style={{ background: '#B8860B', color: '#FFFDF7', border: 'none', padding: '16px 40px', borderRadius: 10, fontSize: 17, fontWeight: 600, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <Zap size={18} /> Begin the Quest
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="fade-in page-pad" style={{ maxWidth: 700, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ background: feedback.victory ? 'linear-gradient(135deg, #B8860B, #a67a0a)' : 'linear-gradient(135deg, #6B4E71, #5a4160)', borderRadius: 20, padding: 48, color: '#FFFDF7', textAlign: 'center' }}>
          <div className="pulse">
            {feedback.victory ? <Trophy size={80} strokeWidth={1.3} style={{ margin: '0 auto 20px' }} /> : <Shield size={80} strokeWidth={1.3} style={{ margin: '0 auto 20px' }} />}
          </div>
          <h1 style={{ ...s.serif, fontSize: 44, fontWeight: 500, margin: '0 0 12px', letterSpacing: '-0.02em' }}>{feedback.victory ? 'Victory!' : 'Quest Complete'}</h1>
          <p style={{ fontSize: 18, opacity: 0.95, margin: '0 0 32px' }}>
            {feedback.correct} of {TOTAL_ROUNDS} correct · Score: {feedback.score}%
          </p>
          <div style={{ background: 'rgba(255,253,247,0.15)', borderRadius: 12, padding: 20, marginBottom: 24, fontSize: 14 }}>
            Score saved to {students.find(st => st.id === selectedStudent)?.name}'s gradebook under Mathematics.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={startGame} style={{ background: '#FFFDF7', color: '#8B3A3A', border: 'none', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Play again</button>
            <button onClick={() => navigate('/games')} style={{ background: 'rgba(255,253,247,0.2)', color: '#FFFDF7', border: '1px solid rgba(255,253,247,0.3)', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Exit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in page-pad" style={{ maxWidth: 700, margin: '0 auto', padding: '48px 32px' }}>
      <div style={{ background: '#2B2416', borderRadius: 20, padding: 40, color: '#F5F0E6', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.2em', opacity: 0.7, textTransform: 'uppercase' }}>Round {round + 1} of {TOTAL_ROUNDS}</div>
          {streak >= 2 && <div style={{ fontSize: 12, color: '#B8860B', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>🔥 {streak}x streak</div>}
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, opacity: 0.9 }}>
            <span>🐉 Dragon</span>
            <span>{dragonHP} / 100</span>
          </div>
          <div style={{ height: 12, background: 'rgba(139,58,58,0.3)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${dragonHP}%`, background: 'linear-gradient(90deg, #8B3A3A, #c94a4a)', transition: 'width 0.5s ease' }} />
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, opacity: 0.9 }}>
            <span>⚔️ You</span>
            <span>{playerHP} / 100</span>
          </div>
          <div style={{ height: 12, background: 'rgba(74,93,58,0.3)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${playerHP}%`, background: 'linear-gradient(90deg, #4A5D3A, #6B8E5A)', transition: 'width 0.5s ease' }} />
          </div>
        </div>

        <div style={{ background: '#F5F0E6', color: '#2B2416', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 16 }}>Solve to strike</div>
          <div style={{ ...s.serif, fontSize: 64, fontWeight: 600, color: '#2B2416', marginBottom: 24, letterSpacing: '-0.02em' }}>
            {question.a} × {question.b} = ?
          </div>
          {!feedback ? (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <input autoFocus type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && userAnswer && submitAnswer()}
                placeholder="?"
                style={{ ...s.serif, fontSize: 28, fontWeight: 600, width: 120, padding: '12px', textAlign: 'center', border: '2px solid #E8DCC4', borderRadius: 10, background: '#FFFDF7', color: '#2B2416' }} />
              <button onClick={submitAnswer} disabled={!userAnswer} className="btn-primary"
                style={{ background: '#8B3A3A', color: '#FFFDF7', border: 'none', padding: '12px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: !userAnswer ? 'not-allowed' : 'pointer', opacity: !userAnswer ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Swords size={18} /> Strike
              </button>
            </div>
          ) : (
            <div className={feedback.type === 'hit' ? 'pulse' : 'shake'} style={{
              padding: 16, borderRadius: 10,
              background: feedback.type === 'hit' ? '#4A5D3A' : '#8B3A3A',
              color: '#FFFDF7', fontSize: 18, fontWeight: 600,
            }}>
              {feedback.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
