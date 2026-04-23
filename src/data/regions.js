import { letterGradeUS, gpaPointsUS, gcseGrade, cambridgeGrade, ibPoint } from '../lib/gradeConversion.js';

export const REGIONS = {
  US: {
    id: 'US', label: 'United States', flag: '🇺🇸', locale: 'en-US',
    qualification: 'US High School Diploma',
    pathway: 'Parent-issued transcript + SAT/ACT + AP exams',
    dateFormat: 'MM/DD/YYYY',
    academyName: 'The Whitfield Home Academy',
    gradeLevelLabel: (n) => {
      if (n <= 0) return 'Kindergarten';
      const suffix = n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
      return `${n}${suffix} Grade`;
    },
    attendance: { required: true, days: 180, hours: 900, note: 'Typical state requirement — varies by state' },
    scale: {
      type: 'gpa',
      displayScore: (avg) => `${avg} (${letterGradeUS(avg)})`,
      pointValue: (avg) => gpaPointsUS(avg),
      maxPoint: 4.0,
      cumulativeLabel: 'Cumulative GPA',
      columns: ['Course', 'Credits', 'Grade', 'Letter', 'GPA'],
      rowCells: (c) => [c.subject, c.credits.toFixed(1), c.grade, letterGradeUS(c.grade), gpaPointsUS(c.grade).toFixed(1)],
    },
  },
  UK: {
    id: 'UK', label: 'United Kingdom', flag: '🇬🇧', locale: 'en-GB',
    qualification: 'GCSE / A-Level (private candidate)',
    pathway: 'IGCSE + A-Level via Pearson Edexcel or Cambridge International — parent reference + predicted grades',
    dateFormat: 'DD/MM/YYYY',
    academyName: 'The Whitfield Home Education',
    gradeLevelLabel: (n) => {
      if (n <= 0) return 'Reception';
      return `Year ${n + 1}`;
    },
    attendance: { required: false, note: 'No statutory hours in England/Wales — "suitable education" duty under s.7 Education Act 1996' },
    scale: {
      type: 'gcse',
      displayScore: (avg) => `${avg}% (${gcseGrade(avg)})`,
      pointValue: (avg) => gcseGrade(avg),
      maxPoint: '9 / A*',
      cumulativeLabel: 'Predicted Grades',
      columns: ['Subject', 'Percentage', 'GCSE Grade', 'Predicted'],
      rowCells: (c) => [c.subject, `${c.grade}%`, gcseGrade(c.grade), gcseGrade(c.grade)],
    },
  },
  EU: {
    id: 'EU', label: 'European Union (IB)', flag: '🇪🇺', locale: 'en-GB',
    qualification: 'International Baccalaureate (IB Diploma)',
    pathway: 'IB Diploma Programme — recognised by virtually all EU universities',
    dateFormat: 'DD/MM/YYYY',
    academyName: 'The Whitfield Home Education',
    gradeLevelLabel: (n) => {
      if (n <= 0) return 'Early Years';
      if (n <= 5) return `Primary ${n}`;
      if (n <= 10) return `Secondary ${n - 5}`;
      return `DP Year ${n - 10}`;
    },
    attendance: { required: false, note: 'Homeschooling legality varies by EU country — Germany prohibits, France/Spain permit with oversight' },
    scale: {
      type: 'ib',
      displayScore: (avg) => `${ibPoint(avg)} / 7`,
      pointValue: (avg) => ibPoint(avg),
      maxPoint: 45,
      cumulativeLabel: 'Total IB Points (of 45)',
      columns: ['Subject', 'Level', 'Percentage', 'IB Score'],
      rowCells: (c) => [c.subject, 'SL', `${c.grade}%`, `${ibPoint(c.grade)} / 7`],
    },
  },
  ASIA: {
    id: 'ASIA', label: 'Asia (Cambridge Int\'l)', flag: '🌏', locale: 'en-GB',
    qualification: 'Cambridge IGCSE + A-Level',
    pathway: 'Cambridge International exams via British Council or local test centres — accepted across Asia, Middle East, and worldwide',
    dateFormat: 'DD/MM/YYYY',
    academyName: 'The Whitfield Home Education',
    gradeLevelLabel: (n) => {
      if (n <= 0) return 'Early Years';
      if (n <= 6) return `Primary ${n}`;
      if (n <= 9) return `Lower Secondary ${n - 6}`;
      if (n <= 11) return `IGCSE Year ${n - 9}`;
      return `AS/A-Level Year ${n - 11}`;
    },
    attendance: { required: false, note: 'Homeschooling regulations vary widely across Asia — Singapore, Philippines, and India permit; Japan/China restrictive' },
    scale: {
      type: 'cambridge',
      displayScore: (avg) => `${avg}% (${cambridgeGrade(avg)})`,
      pointValue: (avg) => cambridgeGrade(avg),
      maxPoint: 'A*',
      cumulativeLabel: 'Predicted Cambridge Grades',
      columns: ['Subject', 'Percentage', 'Cambridge Grade', 'Status'],
      rowCells: (c) => [c.subject, `${c.grade}%`, cambridgeGrade(c.grade), 'Predicted'],
    },
  },
};
