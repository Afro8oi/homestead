import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { s } from '../styles.js';

export default function StudentForm({ student, onSave, onCancel }) {
  const [form, setForm] = useState(student || { name: '', age: '', grade: '', gradeLevel: 1, avatar: '', color: '#8B6F47', birthYear: new Date().getFullYear() - 7 });
  const colors = ['#8B6F47', '#4A5D3A', '#6B4E71', '#8B3A3A', '#B8860B', '#2C5F5D', '#5D4037'];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(43,36,22,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFDF7', borderRadius: 16, padding: 32, maxWidth: 500, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ ...s.serif, fontSize: 24, fontWeight: 500, margin: 0, color: '#2B2416' }}>{student ? 'Edit' : 'Add'} Student</h3>
          <button onClick={onCancel} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}><X size={20} color="#5D4E2A" /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: '#8B7D5B', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, avatar: e.target.value[0]?.toUpperCase() || '' })} style={{ width: '100%', padding: 10, border: '1px solid #E8DCC4', borderRadius: 8, fontSize: 15, fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: '#8B7D5B', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Age</label>
              <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} style={{ width: '100%', padding: 10, border: '1px solid #E8DCC4', borderRadius: 8, fontSize: 15, fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8B7D5B', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Grade Level</label>
              <input type="number" value={form.gradeLevel} onChange={(e) => setForm({ ...form, gradeLevel: Number(e.target.value) })} style={{ width: '100%', padding: 10, border: '1px solid #E8DCC4', borderRadius: 8, fontSize: 15, fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8B7D5B', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Birth Year</label>
              <input type="number" value={form.birthYear} onChange={(e) => setForm({ ...form, birthYear: Number(e.target.value) })} style={{ width: '100%', padding: 10, border: '1px solid #E8DCC4', borderRadius: 8, fontSize: 15, fontFamily: 'inherit' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#8B7D5B', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 6 }}>Grade Label</label>
            <input value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} placeholder="e.g. 3rd Grade" style={{ width: '100%', padding: 10, border: '1px solid #E8DCC4', borderRadius: 8, fontSize: 15, fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#8B7D5B', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 8 }}>Color</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {colors.map(c => (
                <button key={c} onClick={() => setForm({ ...form, color: c })} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: form.color === c ? '3px solid #2B2416' : '3px solid transparent', cursor: 'pointer' }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
          <button onClick={() => onSave(form)} className="btn-primary" style={{ background: '#4A5D3A', color: '#F5F0E6', border: 'none', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flex: 1, justifyContent: 'center' }}>
            <Save size={14} /> Save
          </button>
          <button onClick={onCancel} style={{ background: '#FFFDF7', color: '#5D4E2A', border: '1px solid #E8DCC4', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
