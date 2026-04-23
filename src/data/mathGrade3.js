export const MATH_GRADE_3 = {
  subject: 'Mathematics',
  gradeLevel: 'Grade 3',
  totalLessons: 20,
  units: [
    {
      unitName: 'Unit 1: Place Value to 10,000',
      lessons: [
        {
          id: 'm3-1', title: 'Reading & Writing Numbers to 1,000', duration: '30 min',
          openingVerse: '"He telleth the number of the stars; he calleth them all by their names." — Psalm 147:4',
          objective: 'Read and write three-digit numbers in standard, expanded, and word form.',
          teaching: 'Every number to 1,000 has three places: hundreds, tens, and ones. The number 547 means 5 hundreds, 4 tens, and 7 ones. In expanded form we write it as 500 + 40 + 7. In word form: "five hundred forty-seven." God ordered creation with number and measure — learning to read numbers carefully is learning to see His order.',
          example: 'Write 382 in expanded form. 3 hundreds = 300, 8 tens = 80, 2 ones = 2. So 382 = 300 + 80 + 2.',
          practice: [
            { q: 'Write 456 in expanded form.', a: '400 + 50 + 6' },
            { q: 'What is 700 + 20 + 3 in standard form?', a: '723' },
            { q: 'Write "two hundred nineteen" as a number.', a: '219' },
          ],
        },
        {
          id: 'm3-2', title: 'Place Value to 10,000', duration: '30 min',
          openingVerse: '"The works of the Lord are great, sought out of all them that have pleasure therein." — Psalm 111:2',
          objective: 'Identify the place value of digits in four-digit numbers.',
          teaching: 'When numbers grow past 999, we add a thousands place. The number 4,286 has: 4 thousands, 2 hundreds, 8 tens, 6 ones. Each place is ten times bigger than the one to its right — this is the beautiful pattern of base ten.',
          example: 'In 7,305, the digit 7 is in the thousands place (value 7,000). The digit 3 is in the hundreds place (value 300). The 0 tells us there are no tens.',
          practice: [
            { q: 'In 5,842, what digit is in the hundreds place?', a: '8' },
            { q: 'Write 9,000 + 400 + 20 + 1 in standard form.', a: '9421' },
            { q: 'What is the value of the 6 in 6,273?', a: '6000' },
          ],
        },
        {
          id: 'm3-3', title: 'Comparing & Ordering Numbers', duration: '30 min',
          openingVerse: '"Let all things be done decently and in order." — 1 Corinthians 14:40',
          objective: 'Use <, >, and = to compare numbers up to 10,000.',
          teaching: 'To compare numbers, look at the largest place first. If one number has more thousands than another, it is greater. If the thousands are equal, move to hundreds, then tens, then ones. The symbol < means "less than" and > means "greater than."',
          example: 'Compare 3,457 and 3,475. Both have 3 thousands and 4 hundreds. But 3,475 has 7 tens while 3,457 has only 5 tens. So 3,457 < 3,475.',
          practice: [
            { q: 'Compare: 2,341 __ 2,314. (use <, >, or =)', a: '>' },
            { q: 'Which is greater: 6,089 or 6,098?', a: '6098' },
            { q: 'Compare: 5,000 __ 4,999.', a: '>' },
          ],
        },
      ],
    },
    {
      unitName: 'Unit 2: Addition & Subtraction',
      lessons: [
        {
          id: 'm3-4', title: 'Adding with Regrouping', duration: '35 min',
          openingVerse: '"One shall chase a thousand, and two shall put ten thousand to flight." — Deuteronomy 32:30',
          objective: 'Add three-digit numbers using regrouping (carrying).',
          teaching: 'When you add numbers, you start with the ones place. If the sum is 10 or more, you regroup — carry one to the next place. Example: 7 + 8 = 15. Write 5 in the ones place, carry the 1 to the tens.',
          example: '  247\n+ 186\n-----\nOnes: 7 + 6 = 13. Write 3, carry 1.\nTens: 1 + 4 + 8 = 13. Write 3, carry 1.\nHundreds: 1 + 2 + 1 = 4.\nAnswer: 433',
          practice: [
            { q: 'Solve: 358 + 274', a: '632' },
            { q: 'Solve: 496 + 237', a: '733' },
            { q: 'Solve: 189 + 156', a: '345' },
          ],
        },
        {
          id: 'm3-5', title: 'Subtracting with Regrouping', duration: '35 min',
          openingVerse: '"Teach us to number our days, that we may apply our hearts unto wisdom." — Psalm 90:12',
          objective: 'Subtract three-digit numbers using regrouping (borrowing).',
          teaching: 'When the top digit is smaller than the bottom digit, we borrow from the next place. Example: 52 - 17. Ones: 2 - 7 cannot be done. Borrow 1 ten. Now we have 12 - 7 = 5, and 4 - 1 = 3. Answer: 35.',
          example: '  403\n- 147\n-----\nOnes: 3 - 7 cannot be done. The tens place is 0, so borrow from hundreds.\n4 becomes 3, tens becomes 10. Borrow from tens: 10 becomes 9, ones becomes 13.\n13 - 7 = 6.   9 - 4 = 5.   3 - 1 = 2.\nAnswer: 256',
          practice: [
            { q: 'Solve: 523 - 178', a: '345' },
            { q: 'Solve: 700 - 246', a: '454' },
            { q: 'Solve: 812 - 394', a: '418' },
          ],
        },
        {
          id: 'm3-6', title: 'Word Problems: Add & Subtract', duration: '40 min',
          openingVerse: '"The Lord is my shepherd; I shall not want." — Psalm 23:1',
          objective: 'Solve real-life word problems using addition and subtraction.',
          teaching: 'A word problem is a story that uses numbers. Your job is to find what the story is asking. Key words: "in all," "total," "altogether" usually mean ADD. "Left," "remain," "fewer," "difference" usually mean SUBTRACT.',
          example: 'A shepherd has 245 sheep. He sells 89 at the market. How many does he have left? "Left" signals subtraction: 245 - 89 = 156 sheep.',
          practice: [
            { q: 'Eleanor read 156 pages on Monday and 178 pages on Tuesday. How many pages in all? (Enter number only)', a: '334' },
            { q: 'A farm has 520 apples. 247 are sold. How many remain?', a: '273' },
            { q: 'The church has 438 members. 156 are children. How many are adults?', a: '282' },
          ],
        },
      ],
    },
    {
      unitName: 'Unit 3: Multiplication',
      lessons: [
        {
          id: 'm3-7', title: 'Understanding Multiplication', duration: '30 min',
          openingVerse: '"Be fruitful, and multiply, and replenish the earth." — Genesis 1:28',
          objective: 'Understand multiplication as repeated addition and equal groups.',
          teaching: 'Multiplication is a fast way to add the same number many times. 4 × 3 means "4 groups of 3" or 3 + 3 + 3 + 3 = 12. We read it as "four times three equals twelve."',
          example: 'If you have 5 baskets with 4 apples in each, you can add: 4 + 4 + 4 + 4 + 4 = 20. Or multiply: 5 × 4 = 20.',
          practice: [
            { q: 'What is 6 × 3?', a: '18' },
            { q: 'What is 4 × 5?', a: '20' },
            { q: 'What is 7 × 2?', a: '14' },
          ],
        },
        {
          id: 'm3-8', title: 'Multiplication Tables: 2s, 5s, 10s', duration: '30 min',
          openingVerse: '"Thy word is a lamp unto my feet, and a light unto my path." — Psalm 119:105',
          objective: 'Master the 2s, 5s, and 10s multiplication facts.',
          teaching: 'These are the easiest tables to learn. The 2s are doubles. The 5s always end in 0 or 5. The 10s just add a zero to the other number.',
          example: '5 × 7 = 35. 10 × 8 = 80. 2 × 9 = 18.',
          practice: [
            { q: 'What is 5 × 8?', a: '40' },
            { q: 'What is 10 × 7?', a: '70' },
            { q: 'What is 2 × 11?', a: '22' },
          ],
        },
        {
          id: 'm3-9', title: 'Multiplication Tables: 3s, 4s', duration: '30 min',
          openingVerse: '"In the beginning God created the heaven and the earth." — Genesis 1:1',
          objective: 'Master the 3s and 4s multiplication facts.',
          teaching: 'The 3s pattern: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30. The 4s are doubles of the 2s: if 2 × 6 = 12, then 4 × 6 = 24.',
          example: '3 × 7 = 21. 4 × 8 = 32. 3 × 9 = 27.',
          practice: [
            { q: 'What is 3 × 8?', a: '24' },
            { q: 'What is 4 × 9?', a: '36' },
            { q: 'What is 3 × 12?', a: '36' },
          ],
        },
        {
          id: 'm3-10', title: 'Multiplication Tables: 6s, 7s, 8s, 9s', duration: '40 min',
          openingVerse: '"Study to shew thyself approved unto God." — 2 Timothy 2:15',
          objective: 'Master the harder multiplication tables through 12.',
          teaching: 'The 9s have a beautiful pattern: the digits always add to 9 (9 × 4 = 36, and 3 + 6 = 9). For the 6s, 7s, 8s — patience and daily practice are the keys. Do five facts every morning before breakfast.',
          example: '7 × 8 = 56. 9 × 6 = 54. 8 × 8 = 64.',
          practice: [
            { q: 'What is 7 × 9?', a: '63' },
            { q: 'What is 8 × 6?', a: '48' },
            { q: 'What is 9 × 9?', a: '81' },
          ],
        },
      ],
    },
    {
      unitName: 'Unit 4: Division',
      lessons: [
        {
          id: 'm3-11', title: 'Understanding Division', duration: '35 min',
          openingVerse: '"Give us this day our daily bread." — Matthew 6:11',
          objective: 'Understand division as sharing equally and as the opposite of multiplication.',
          teaching: 'Division is splitting a number into equal groups. 12 ÷ 3 asks: "If I share 12 things among 3 people, how many does each get?" The answer is 4. Division is the opposite of multiplication: if 3 × 4 = 12, then 12 ÷ 3 = 4.',
          example: 'You have 20 loaves to share equally among 5 families. 20 ÷ 5 = 4 loaves per family.',
          practice: [
            { q: 'What is 18 ÷ 3?', a: '6' },
            { q: 'What is 24 ÷ 4?', a: '6' },
            { q: 'What is 35 ÷ 5?', a: '7' },
          ],
        },
        {
          id: 'm3-12', title: 'Division Facts', duration: '35 min',
          openingVerse: '"A just weight and balance are the Lord\'s." — Proverbs 16:11',
          objective: 'Recall division facts related to multiplication tables.',
          teaching: 'Every multiplication fact gives you a division fact. If 6 × 7 = 42, then 42 ÷ 6 = 7 and 42 ÷ 7 = 6. Learn them as fact families.',
          example: 'Family of 5, 8, 40: 5 × 8 = 40, 8 × 5 = 40, 40 ÷ 5 = 8, 40 ÷ 8 = 5.',
          practice: [
            { q: 'What is 56 ÷ 7?', a: '8' },
            { q: 'What is 63 ÷ 9?', a: '7' },
            { q: 'What is 48 ÷ 6?', a: '8' },
          ],
        },
      ],
    },
    {
      unitName: 'Unit 5: Fractions',
      lessons: [
        {
          id: 'm3-13', title: 'Introduction to Fractions', duration: '30 min',
          openingVerse: '"He hath made every thing beautiful in his time." — Ecclesiastes 3:11',
          objective: 'Recognize fractions as equal parts of a whole.',
          teaching: 'A fraction has two numbers. The bottom (denominator) tells how many equal parts the whole is divided into. The top (numerator) tells how many parts you have. In 3/4, the whole is cut into 4 parts and you have 3 of them.',
          example: 'A loaf of bread is cut into 8 equal slices. You eat 3 slices. You ate 3/8 of the loaf. 5/8 remain.',
          practice: [
            { q: 'If a pie is cut into 6 equal pieces and you take 2, what fraction did you take? (Write as a/b like 1/2)', a: '2/6' },
            { q: 'In the fraction 5/9, what is the denominator?', a: '9' },
            { q: 'In the fraction 3/7, what is the numerator?', a: '3' },
          ],
        },
        {
          id: 'm3-14', title: 'Equivalent Fractions', duration: '35 min',
          openingVerse: '"The Lord is my portion, saith my soul." — Lamentations 3:24',
          objective: 'Identify fractions that represent the same amount.',
          teaching: 'Two fractions can look different but mean the same thing. 1/2 = 2/4 = 4/8. They all fill half the whole. To find equivalent fractions, multiply (or divide) the top and bottom by the same number.',
          example: '1/3 = 2/6 because 1 × 2 = 2 and 3 × 2 = 6.',
          practice: [
            { q: 'What is equivalent to 1/2? (answer like 2/4)', a: '2/4' },
            { q: 'Fill in: 2/3 = ?/6', a: '4' },
            { q: 'Fill in: 3/4 = 6/?', a: '8' },
          ],
        },
      ],
    },
    {
      unitName: 'Unit 6: Measurement & Geometry',
      lessons: [
        {
          id: 'm3-15', title: 'Measuring Length', duration: '30 min',
          openingVerse: '"Who hath measured the waters in the hollow of his hand?" — Isaiah 40:12',
          objective: 'Measure length in inches, feet, centimeters, and meters.',
          teaching: '12 inches = 1 foot. 3 feet = 1 yard. 100 centimeters = 1 meter. Use a ruler for small objects, a yardstick or tape measure for longer ones.',
          example: 'A book is 9 inches long. That is less than 1 foot. A door is about 7 feet tall.',
          practice: [
            { q: 'How many inches are in 2 feet?', a: '24' },
            { q: 'How many feet are in 1 yard?', a: '3' },
            { q: 'How many centimeters are in 3 meters?', a: '300' },
          ],
        },
        {
          id: 'm3-16', title: 'Time & Elapsed Time', duration: '30 min',
          openingVerse: '"To every thing there is a season, and a time to every purpose." — Ecclesiastes 3:1',
          objective: 'Tell time and calculate elapsed time.',
          teaching: '60 minutes = 1 hour. 24 hours = 1 day. To find elapsed time: count forward from the start time to the end time.',
          example: 'School begins at 8:30 and ends at 2:45. From 8:30 to 2:30 is 6 hours. From 2:30 to 2:45 is 15 minutes. Total: 6 hours 15 minutes.',
          practice: [
            { q: 'How many minutes are in 2 hours?', a: '120' },
            { q: 'If a lesson starts at 9:15 and ends at 10:00, how many minutes long is it?', a: '45' },
            { q: 'How many hours are in 2 days?', a: '48' },
          ],
        },
        {
          id: 'm3-17', title: 'Perimeter & Area', duration: '35 min',
          openingVerse: '"The lines are fallen unto me in pleasant places." — Psalm 16:6',
          objective: 'Calculate perimeter and area of rectangles.',
          teaching: 'Perimeter is the distance around a shape — add all the sides. Area is the amount of space inside — for a rectangle, multiply length × width.',
          example: 'A rectangular garden is 8 feet long and 5 feet wide. Perimeter = 8 + 5 + 8 + 5 = 26 feet. Area = 8 × 5 = 40 square feet.',
          practice: [
            { q: 'A rectangle has sides of 6 and 4. What is the perimeter?', a: '20' },
            { q: 'A rectangle has sides of 6 and 4. What is the area?', a: '24' },
            { q: 'A square has a side of 7. What is the area?', a: '49' },
          ],
        },
        {
          id: 'm3-18', title: 'Shapes & Angles', duration: '30 min',
          openingVerse: '"He hath set the world upon them." — 1 Samuel 2:8',
          objective: 'Identify 2D shapes, 3D shapes, and right angles.',
          teaching: 'A triangle has 3 sides. A quadrilateral has 4. A pentagon has 5, a hexagon 6, an octagon 8. A right angle is a perfect corner — like the corner of a book. A right angle measures 90 degrees.',
          example: 'A square has 4 right angles. A stop sign is an octagon — 8 sides.',
          practice: [
            { q: 'How many sides does a hexagon have?', a: '6' },
            { q: 'How many degrees are in a right angle?', a: '90' },
            { q: 'How many sides does an octagon have?', a: '8' },
          ],
        },
      ],
    },
    {
      unitName: 'Unit 7: Data & Review',
      lessons: [
        {
          id: 'm3-19', title: 'Reading Graphs & Tables', duration: '30 min',
          openingVerse: '"For God is not the author of confusion, but of peace." — 1 Corinthians 14:33',
          objective: 'Read and interpret bar graphs, pictographs, and tables.',
          teaching: 'A graph shows data as a picture. A bar graph uses bars of different lengths. A pictograph uses small pictures, where one picture can stand for many things. Always read the title and the labels first.',
          example: 'If a pictograph shows 🍎 = 10 apples, and there are 4 apple pictures, there are 40 apples.',
          practice: [
            { q: 'If each ⭐ = 5 stars and a graph shows 6 stars, how many stars total?', a: '30' },
            { q: 'A bar graph shows: Dogs 12, Cats 8. How many more dogs than cats?', a: '4' },
            { q: 'A bar graph shows: Monday 15, Tuesday 22. How many total?', a: '37' },
          ],
        },
        {
          id: 'm3-20', title: 'Year-End Review', duration: '45 min',
          openingVerse: '"I have fought a good fight, I have finished my course." — 2 Timothy 4:7',
          objective: 'Review and celebrate mastery of Grade 3 mathematics.',
          teaching: 'This year you learned place value to 10,000, addition and subtraction with regrouping, multiplication and division, fractions, measurement, geometry, and how to read graphs. You have built a strong foundation. Well done!',
          example: 'A mixed review tests everything at once — place value, operations, fractions, measurement.',
          practice: [
            { q: 'What is 347 + 256?', a: '603' },
            { q: 'What is 8 × 7?', a: '56' },
            { q: 'What is 1/2 equivalent to over 10? (like 5/10)', a: '5/10' },
          ],
        },
      ],
    },
  ],
};

export function findLessonById(id) {
  for (const unit of MATH_GRADE_3.units) {
    for (const lesson of unit.lessons) {
      if (lesson.id === id) return lesson;
    }
  }
  return null;
}
