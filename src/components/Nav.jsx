import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Library, Gamepad2, FileText, Settings, Leaf } from 'lucide-react';
import { s } from '../styles.js';

const items = [
  { path: '/',        label: 'Home',    icon: Home },
  { path: '/parent',  label: 'Parent',  icon: Users },
  { path: '/library', label: 'Library', icon: Library },
  { path: '/games',   label: 'Games',   icon: Gamepad2 },
  { path: '/records', label: 'Records', icon: FileText },
  { path: '/admin',   label: 'Admin',   icon: Settings },
];

function isActive(pathname, path) {
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(path + '/');
}

export default function Nav({ region, onChangeRegion, onSignOut }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav style={{
      background: '#FFFDF7', borderBottom: '1px solid #E8DCC4', padding: '16px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #4A5D3A, #6B8E5A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5F0E6' }}>
          <Leaf size={20} strokeWidth={1.5} />
        </div>
        <div>
          <div style={{ ...s.serif, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: '#2B2416' }}>Homestead</div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#8B7D5B', textTransform: 'uppercase' }}>Home Education</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {items.map(item => {
          const active = isActive(pathname, item.path);
          const Icon = item.icon;
          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              background: active ? '#4A5D3A' : 'transparent',
              color: active ? '#F5F0E6' : '#5D4E2A',
              border: 'none', padding: '10px 14px', borderRadius: 8,
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'inherit', transition: 'all 0.15s ease',
            }}>
              <Icon size={15} strokeWidth={1.8} />
              {item.label}
            </button>
          );
        })}
        {region && onChangeRegion && (
          <button onClick={onChangeRegion} title={`${region.label} · ${region.qualification}`} style={{
            background: '#F5F0E6', color: '#5D4E2A', border: '1px solid #E8DCC4',
            padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', marginLeft: 8,
          }}>
            <span style={{ fontSize: 15 }}>{region.flag}</span>
            <span style={{ fontSize: 12 }}>{region.id}</span>
          </button>
        )}
        {onSignOut && (
          <button onClick={onSignOut} style={{
            background: 'transparent', color: '#8B7D5B', border: '1px solid #E8DCC4',
            padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'inherit', marginLeft: 6,
          }}>Sign out</button>
        )}
      </div>
    </nav>
  );
}
