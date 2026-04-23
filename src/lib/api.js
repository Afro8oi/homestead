import { supabase } from './supabase.js';
import { INITIAL_STUDENTS, INITIAL_GRADES } from '../data/initialStudents.js';

// ---------- households ----------
export async function getHousehold(userId) {
  const { data, error } = await supabase
    .from('households')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createHousehold(userId, { name, regionId } = {}) {
  const { data, error } = await supabase
    .from('households')
    .insert({
      user_id: userId,
      name: name || 'Our Household',
      region_id: regionId || 'US',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateHouseholdRegion(householdId, regionId) {
  const { error } = await supabase
    .from('households')
    .update({ region_id: regionId })
    .eq('id', householdId);
  if (error) throw error;
}

// ---------- students ----------
export async function listStudents(householdId) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('household_id', householdId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data || []).map(fromDbStudent);
}

export async function insertStudent(householdId, student) {
  const { data, error } = await supabase
    .from('students')
    .insert({ household_id: householdId, ...toDbStudent(student) })
    .select()
    .single();
  if (error) throw error;
  return fromDbStudent(data);
}

export async function updateStudent(id, student) {
  const { error } = await supabase
    .from('students')
    .update(toDbStudent(student))
    .eq('id', id);
  if (error) throw error;
}

export async function deleteStudent(id) {
  const { error } = await supabase.from('students').delete().eq('id', id);
  if (error) throw error;
}

function toDbStudent(s) {
  return {
    name: s.name,
    age: s.age,
    grade: s.grade,
    grade_level: s.gradeLevel,
    avatar: s.avatar,
    color: s.color,
    birth_year: s.birthYear,
    start_date: s.startDate || null,
  };
}

function fromDbStudent(r) {
  return {
    id: r.id,
    name: r.name,
    age: r.age,
    grade: r.grade,
    gradeLevel: r.grade_level,
    avatar: r.avatar,
    color: r.color,
    birthYear: r.birth_year,
    startDate: r.start_date,
  };
}

// ---------- grades ----------
// Returns { [studentId]: { [subject]: [scores...] } }
export async function listGrades(householdId) {
  const { data, error } = await supabase
    .from('grades')
    .select('student_id,subject,score,created_at')
    .eq('household_id', householdId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  const out = {};
  for (const row of data || []) {
    const sg = out[row.student_id] || (out[row.student_id] = {});
    const arr = sg[row.subject] || (sg[row.subject] = []);
    arr.push(Number(row.score));
  }
  return out;
}

export async function insertGrade(householdId, studentId, subject, score) {
  const { error } = await supabase
    .from('grades')
    .insert({ household_id: householdId, student_id: studentId, subject, score });
  if (error) throw error;
}

// ---------- seeding ----------
// On signup, populate a household with the same demo data the prototype shipped with.
export async function seedHousehold(householdId) {
  const seedStudents = INITIAL_STUDENTS.map(toDbStudent).map(s => ({
    ...s,
    household_id: householdId,
  }));
  const { data: inserted, error: sErr } = await supabase
    .from('students')
    .insert(seedStudents)
    .select();
  if (sErr) throw sErr;

  const idByName = Object.fromEntries((inserted || []).map(r => [r.name, r.id]));
  const nameById = Object.fromEntries(INITIAL_STUDENTS.map(s => [s.id, s.name]));

  const gradeRows = [];
  for (const [oldId, subjects] of Object.entries(INITIAL_GRADES)) {
    const newId = idByName[nameById[oldId]];
    if (!newId) continue;
    for (const [subject, scores] of Object.entries(subjects)) {
      for (const score of scores) {
        gradeRows.push({ household_id: householdId, student_id: newId, subject, score });
      }
    }
  }
  if (gradeRows.length) {
    const { error: gErr } = await supabase.from('grades').insert(gradeRows);
    if (gErr) throw gErr;
  }
}
