import { Calculator, Feather, FlaskConical, Globe2, Cross, Scroll, Palette, Hammer } from 'lucide-react';

export const SUBJECT_LIBRARY = [
  {
    name: 'Mathematics', icon: 'Calculator', color: '#8B6F47',
    description: 'From counting to calculus — the language of order in creation',
    levels: [
      { age: '4-6', title: 'Numbers & Patterns', lessons: 42, topics: ['Counting', 'Shapes', 'Addition'], status: 'available' },
      { age: '7-10', title: 'Foundations', lessons: 86, topics: ['Multiplication', 'Fractions', 'Geometry'], status: 'available', sampleCurriculum: 'MATH_G3' },
      { age: '11-14', title: 'Pre-Algebra & Algebra', lessons: 124, topics: ['Variables', 'Equations', 'Proofs'], status: 'available' },
      { age: '15-18', title: 'Advanced Mathematics', lessons: 168, topics: ['Geometry', 'Trigonometry', 'Calculus'], status: 'available' },
    ]
  },
  {
    name: 'Language Arts', icon: 'Feather', color: '#4A5D3A',
    description: 'Phonics, reading, grammar, and the craft of beautiful writing',
    levels: [
      { age: '4-6', title: 'Early Phonics', lessons: 56, topics: ['Letters', 'Sounds', 'First Words'], status: 'available' },
      { age: '7-10', title: 'Reading & Grammar', lessons: 98, topics: ['Comprehension', 'Sentences', 'Copywork'], status: 'available' },
      { age: '11-14', title: 'Composition', lessons: 110, topics: ['Essays', 'Poetry', 'Rhetoric'], status: 'available' },
      { age: '15-18', title: 'Classical Literature', lessons: 142, topics: ['Shakespeare', 'Tolkien', 'The Classics'], status: 'available' },
    ]
  },
  {
    name: 'Science', icon: 'FlaskConical', color: '#6B4E71',
    description: 'Exploring the wonder and design of the natural world',
    levels: [
      { age: '4-6', title: 'Nature Study', lessons: 38, topics: ['Animals', 'Weather', 'Seasons'], status: 'available' },
      { age: '7-10', title: 'Elementary Science', lessons: 72, topics: ['Botany', 'Anatomy', 'Astronomy'], status: 'available' },
      { age: '11-14', title: 'Life & Earth Sciences', lessons: 94, topics: ['Biology', 'Geology', 'Physics Intro'], status: 'available' },
      { age: '15-18', title: 'Physics & Chemistry', lessons: 128, topics: ['Chemistry', 'Physics', 'Lab Work'], status: 'available' },
    ]
  },
  {
    name: 'History & Geography', icon: 'Globe2', color: '#8B3A3A',
    description: 'The grand narrative of nations, peoples, and providence',
    levels: [
      { age: '4-6', title: 'Stories from Long Ago', lessons: 44, topics: ['Heroes', 'Maps', 'Our Country'], status: 'available' },
      { age: '7-10', title: 'Ancient Civilizations', lessons: 78, topics: ['Egypt', 'Greece', 'Rome'], status: 'available' },
      { age: '11-14', title: 'Medieval to Modern', lessons: 102, topics: ['Middle Ages', 'Reformation', 'Founding'], status: 'available' },
      { age: '15-18', title: 'Western Civilization', lessons: 136, topics: ['Worldviews', 'Philosophy', 'Politics'], status: 'available' },
    ]
  },
  {
    name: 'Scripture & Theology', icon: 'Cross', color: '#5D4037',
    description: 'The Word of God as the foundation of all learning',
    levels: [
      { age: '4-6', title: 'Bible Stories', lessons: 52, topics: ['Genesis', 'Gospels', 'Memory Verses'], status: 'available' },
      { age: '7-10', title: 'Bible Survey', lessons: 88, topics: ['Old Testament', 'New Testament', 'Catechism'], status: 'available' },
      { age: '11-14', title: 'Doctrine & Apologetics', lessons: 96, topics: ['Creeds', 'Worldview', 'Defense'], status: 'available' },
      { age: '15-18', title: 'Systematic Theology', lessons: 118, topics: ['Hermeneutics', 'Ethics', 'Church History'], status: 'available' },
    ]
  },
  {
    name: 'Classical Languages', icon: 'Scroll', color: '#2C5F5D',
    description: 'Latin, Greek, and Hebrew — the tongues of Western thought',
    levels: [
      { age: '7-10', title: 'Latin Roots', lessons: 64, topics: ['Vocabulary', 'Pronunciation', 'Simple Phrases'], status: 'available' },
      { age: '11-14', title: 'Latin Grammar', lessons: 96, topics: ['Declensions', 'Conjugations', 'Translation'], status: 'available' },
      { age: '15-18', title: 'Greek & Hebrew', lessons: 112, topics: ['Koine Greek', 'Biblical Hebrew', 'Classics'], status: 'available' },
    ]
  },
  {
    name: 'Fine Arts', icon: 'Palette', color: '#B8860B',
    description: 'Music, drawing, painting, and the appreciation of beauty',
    levels: [
      { age: '4-6', title: 'Creative Play', lessons: 36, topics: ['Coloring', 'Singing', 'Crafts'], status: 'available' },
      { age: '7-10', title: 'Drawing & Music', lessons: 62, topics: ['Sketching', 'Hymns', 'Instruments'], status: 'available' },
      { age: '11-14', title: 'Technique & Theory', lessons: 84, topics: ['Watercolor', 'Music Theory', 'Composition'], status: 'available' },
      { age: '15-18', title: 'Art History & Practice', lessons: 98, topics: ['Masters', 'Portfolio', 'Performance'], status: 'available' },
    ]
  },
  {
    name: 'Life Skills', icon: 'Hammer', color: '#556B2F',
    description: 'Home economics, finance, logic, and practical wisdom',
    levels: [
      { age: '7-10', title: 'Helping Hands', lessons: 42, topics: ['Cooking Basics', 'Tidying', 'Gardening'], status: 'available' },
      { age: '11-14', title: 'Stewardship', lessons: 68, topics: ['Budgeting', 'Meal Planning', 'Repairs'], status: 'available' },
      { age: '15-18', title: 'Preparation for Adulthood', lessons: 92, topics: ['Finance', 'Homemaking', 'Trades'], status: 'available' },
    ]
  },
];

export const ICON_MAP = { Calculator, Feather, FlaskConical, Globe2, Cross, Scroll, Palette, Hammer };

export function findSubjectByName(name) {
  return SUBJECT_LIBRARY.find(s => s.name === name) || null;
}

export function slugifySubject(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function findSubjectBySlug(slug) {
  return SUBJECT_LIBRARY.find(s => slugifySubject(s.name) === slug) || null;
}
