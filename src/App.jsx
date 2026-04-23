import { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import RegionSetupModal from './components/RegionSetupModal.jsx';
import HomeView from './views/HomeView.jsx';
import StudentView from './views/StudentView.jsx';
import ParentDashboard from './views/ParentDashboard.jsx';
import LibraryView from './views/LibraryView.jsx';
import SubjectDetailView from './views/SubjectDetailView.jsx';
import LessonView from './views/LessonView.jsx';
import GamesHub from './views/GamesHub.jsx';
import MultiplicationQuest from './games/MultiplicationQuest.jsx';
import RecordsView from './views/RecordsView.jsx';
import AdminPanel from './views/AdminPanel.jsx';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import { REGIONS } from './data/regions.js';
import { avgGrade, getTrend, getMastery } from './lib/gradeConversion.js';
import { AuthProvider, useAuth } from './lib/auth.jsx';
import {
  getHousehold, createHousehold, updateHouseholdRegion,
  listStudents, insertStudent, updateStudent, deleteStudent,
  listGrades, insertGrade,
} from './lib/api.js';
import { s } from './styles.js';

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataContext');
  return ctx;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<ProtectedShell />} />
    </Routes>
  );
}

function ProtectedShell() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <DataProvider />;
}

function DataProvider() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [household, setHousehold] = useState(null);
  const [students, setStudentsState] = useState([]);
  const [grades, setGradesState] = useState({});
  const [needsRegionSetup, setNeedsRegionSetup] = useState(
    Boolean(location.state?.needsRegionSetup)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let hh = await getHousehold(user.id);
        if (!hh) hh = await createHousehold(user.id);
        const [sts, grs] = await Promise.all([
          listStudents(hh.id),
          listGrades(hh.id),
        ]);
        if (cancelled) return;
        setHousehold(hh);
        setStudentsState(sts);
        setGradesState(grs);
        setLoading(false);
      } catch (e) {
        if (!cancelled) { setError(e.message || String(e)); setLoading(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [user.id]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  const regionId = household?.region_id || 'US';
  const region = REGIONS[regionId] || REGIONS.US;

  const setRegionId = async (id) => {
    await updateHouseholdRegion(household.id, id);
    setHousehold({ ...household, region_id: id });
  };

  const setStudents = async (next) => {
    const nextArr = typeof next === 'function' ? next(students) : next;
    const prev = students;
    setStudentsState(nextArr);
    try {
      const prevIds = new Set(prev.map(p => p.id));
      const nextIds = new Set(nextArr.map(n => n.id));
      const toDelete = prev.filter(p => !nextIds.has(p.id));
      const toInsert = nextArr.filter(n => !prevIds.has(n.id));
      const toUpdate = nextArr.filter(n => {
        const p = prev.find(x => x.id === n.id);
        return p && JSON.stringify(p) !== JSON.stringify(n);
      });
      for (const st of toDelete) await deleteStudent(st.id);
      for (const st of toInsert) {
        const saved = await insertStudent(household.id, st);
        setStudentsState(curr => curr.map(c => (c === st || c.id === st.id ? saved : c)));
      }
      for (const st of toUpdate) await updateStudent(st.id, st);
    } catch (e) {
      console.error('Failed to persist students', e);
    }
  };

  const recordGrade = async (studentId, subject, score) => {
    setGradesState(prev => {
      const sg = { ...(prev[studentId] || {}) };
      sg[subject] = [...(sg[subject] || []), score].slice(-10);
      return { ...prev, [studentId]: sg };
    });
    try { await insertGrade(household.id, studentId, subject, score); }
    catch (e) { console.error('Failed to persist grade', e); }
  };

  // setGrades: used only by AdminPanel when deleting a student — prune the local map.
  const setGrades = (next) => {
    const nextVal = typeof next === 'function' ? next(grades) : next;
    setGradesState(nextVal);
  };

  const buildSubjects = (studentId) => {
    const raw = grades[studentId] || {};
    const out = {};
    for (const [subj, arr] of Object.entries(raw)) {
      out[subj] = {
        grade: avgGrade(arr),
        trend: getTrend(arr),
        recent: arr,
        mastery: getMastery(avgGrade(arr)),
      };
    }
    return out;
  };

  const getStruggleAreas = (subjects) =>
    Object.entries(subjects)
      .filter(([, d]) => d.grade < 85 || d.trend === 'down')
      .sort((a, b) => a[1].grade - b[1].grade);

  const value = {
    students, setStudents,
    grades, setGrades,
    recordGrade,
    buildSubjects, getStruggleAreas,
    region, regionId, setRegionId,
    household: {
      name: household?.name || 'Our Household',
      verse: household?.verse || 'Train up a child in the way he should go — Proverbs 22:6',
      streakDays: household?.streak_days || 0,
    },
    needsRegionSetup, setNeedsRegionSetup,
  };

  return (
    <DataContext.Provider value={value}>
      <div style={s.app}>
        <Nav region={region} onChangeRegion={() => setNeedsRegionSetup(true)} onSignOut={signOut} />
        {needsRegionSetup && (
          <RegionSetupModal
            current={regionId}
            onSelect={(id) => { setRegionId(id); setNeedsRegionSetup(false); }}
            onClose={() => setNeedsRegionSetup(false)}
          />
        )}
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/student/:id" element={<StudentView />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/library" element={<LibraryView />} />
          <Route path="/library/:slug" element={<SubjectDetailView />} />
          <Route path="/lesson/:id" element={<LessonView />} />
          <Route path="/games" element={<GamesHub />} />
          <Route path="/games/mult-quest" element={<MultiplicationQuest />} />
          <Route path="/records" element={<RecordsView />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </DataContext.Provider>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5D4E2A', fontSize: 15 }}>
      Loading your household…
    </div>
  );
}

function ErrorScreen({ message }) {
  return (
    <div style={{ minHeight: '100vh', padding: 40, maxWidth: 600, margin: '0 auto', color: '#8B3A3A' }}>
      <h2 style={{ ...s.serif }}>Something went wrong</h2>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{message}</pre>
    </div>
  );
}
