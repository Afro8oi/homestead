export function letterGradeUS(g) {
  if (g >= 93) return 'A'; if (g >= 90) return 'A-';
  if (g >= 87) return 'B+'; if (g >= 83) return 'B'; if (g >= 80) return 'B-';
  if (g >= 77) return 'C+'; if (g >= 73) return 'C'; if (g >= 70) return 'C-';
  if (g >= 67) return 'D+'; if (g >= 63) return 'D'; return 'F';
}

export function gpaPointsUS(g) {
  if (g >= 93) return 4.0; if (g >= 90) return 3.7;
  if (g >= 87) return 3.3; if (g >= 83) return 3.0; if (g >= 80) return 2.7;
  if (g >= 77) return 2.3; if (g >= 73) return 2.0; if (g >= 70) return 1.7;
  if (g >= 67) return 1.3; if (g >= 63) return 1.0; return 0.0;
}

export function gcseGrade(g) {
  if (g >= 90) return '9';
  if (g >= 83) return '8';
  if (g >= 76) return '7';
  if (g >= 69) return '6';
  if (g >= 62) return '5';
  if (g >= 55) return '4';
  if (g >= 48) return '3';
  if (g >= 40) return '2';
  if (g >= 30) return '1';
  return 'U';
}

export function cambridgeGrade(g) {
  if (g >= 90) return 'A*';
  if (g >= 80) return 'A';
  if (g >= 70) return 'B';
  if (g >= 60) return 'C';
  if (g >= 50) return 'D';
  if (g >= 40) return 'E';
  if (g >= 30) return 'F';
  if (g >= 20) return 'G';
  return 'U';
}

export function ibPoint(g) {
  if (g >= 93) return 7;
  if (g >= 85) return 6;
  if (g >= 76) return 5;
  if (g >= 67) return 4;
  if (g >= 57) return 3;
  if (g >= 45) return 2;
  return 1;
}

export const letterGrade = letterGradeUS;
export const gpaPoints = gpaPointsUS;

export const avgGrade = (grades) => {
  if (!grades || grades.length === 0) return 0;
  return Math.round(grades.reduce((a, b) => a + b, 0) / grades.length);
};

export const getTrend = (grades) => {
  if (!grades || grades.length < 2) return 'stable';
  const recent = grades.slice(-2);
  if (recent[1] > recent[0] + 1) return 'up';
  if (recent[1] < recent[0] - 1) return 'down';
  return 'stable';
};

export const getMastery = (grade) => {
  if (grade >= 93) return 'Exceptional';
  if (grade >= 87) return 'Strong';
  if (grade >= 80) return 'Progressing';
  if (grade >= 70) return 'Needs Attention';
  return 'Requires Support';
};
