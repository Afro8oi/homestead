import { useContext } from 'react';
import { DataContext } from '../App.jsx';

// Step 9 swaps the App-level storage impl for Supabase without changing this shape.
export function useStudents() {
  const ctx = useContext(DataContext);
  return { students: ctx.students, setStudents: ctx.setStudents };
}
