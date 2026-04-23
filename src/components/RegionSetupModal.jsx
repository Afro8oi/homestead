import { REGIONS } from '../data/regions.js';
import { s } from '../styles.js';

export default function RegionSetupModal({ current, onSelect, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(43,36,22,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
      <div className="fade-in" style={{ background: '#FFFDF7', borderRadius: 20, padding: 40, maxWidth: 720, width: '100%', boxShadow: '0 24px 70px rgba(0,0,0,0.25)', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.25em', color: '#8B7D5B', textTransform: 'uppercase', marginBottom: 8 }}>One-time setup</div>
        <h2 style={{ ...s.serif, fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 8px', color: '#2B2416' }}>
          Where are you <span style={{ fontStyle: 'italic', color: '#4A5D3A' }}>schooling from?</span>
        </h2>
        <p style={{ fontSize: 15, color: '#5D4E2A', margin: '0 0 28px', lineHeight: 1.5 }}>
          This sets your qualification pathway, grade scale, and transcript format. You can change it later from the navigation bar.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {Object.values(REGIONS).map(r => (
            <div key={r.id} onClick={() => onSelect(r.id)} className="hover-lift"
              style={{
                padding: 22, borderRadius: 12, cursor: 'pointer',
                border: current === r.id ? '2px solid #4A5D3A' : '1px solid #E8DCC4',
                background: current === r.id ? '#F5F0E6' : '#FFFDF7',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{r.flag}</span>
                <div>
                  <div style={{ ...s.serif, fontSize: 18, fontWeight: 600, color: '#2B2416' }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: '#8B7D5B' }}>{r.qualification}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#5D4E2A', lineHeight: 1.5, marginTop: 8 }}>{r.pathway}</div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F0E8D6', display: 'flex', gap: 12, fontSize: 12, color: '#8B7D5B' }}>
                <span><strong style={{ color: '#5D4E2A' }}>Scale:</strong> {r.scale.maxPoint}</span>
                <span><strong style={{ color: '#5D4E2A' }}>Attendance:</strong> {r.attendance.required ? `${r.attendance.days} days` : 'Flexible'}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#FFF8E7', borderRadius: 10, border: '1px solid #E8D5A0', fontSize: 13, color: '#5D4E2A', lineHeight: 1.5 }}>
          <strong>A note on coverage:</strong> Homeschooling legality and grading conventions differ by country. Check your local regulations — Homestead helps you document a programme, but compliance with your country's laws is your responsibility.
        </div>

        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'transparent', color: '#8B7D5B', border: 'none', padding: '10px 18px', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}
