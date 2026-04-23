import { useContext } from 'react';
import { DataContext } from '../App.jsx';

export function useGrades() {
  const ctx = useContext(DataContext);
  return { grades: ctx.grades, setGrades: ctx.setGrades, recordGrade: ctx.recordGrade };
}
