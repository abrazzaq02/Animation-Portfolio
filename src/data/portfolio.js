// ─────────────────────────────────────────────────────────────
//  Edit this file to make the portfolio yours.
//  Every section of the site reads its content from here.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Your Name',
  role: 'Computer Science Student',
  subtitle: 'Aspiring Software Developer | Creative Thinker | Tech Enthusiast',
  email: 'your.email@example.com',
  location: 'Your City, Country',
  university: 'University / College Name',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  intro:
    "Hi there! I'm a Computer Science student who loves turning ideas into delightful, useful software. I enjoy the moment a messy problem finally clicks — and I care just as much about how something feels to use as how it works under the hood.",
  more:
    "When I'm not debugging, you'll find me sketching UI ideas, exploring new frameworks, joining hackathons or helping classmates untangle their code. I'm currently looking for internships and collaborations where I can learn, build and grow.",
  interests: [
    { label: 'Programming', icon: 'code' },
    { label: 'Web Development', icon: 'web' },
    { label: 'UI/UX Design', icon: 'design' },
    { label: 'Technology', icon: 'tech' },
    { label: 'Problem Solving', icon: 'puzzle' },
  ],
  stats: [
    { value: 15, suffix: '+', label: 'Projects Built' },
    { value: 7, suffix: '', label: 'Languages' },
    { value: 250, suffix: '+', label: 'Problems Solved' },
    { value: 999, suffix: '+', label: 'Cups of Coffee' },
  ],
}

export const skills = [
  { name: 'HTML', level: 95, icon: 'html', color: '#F28CB1' },
  { name: 'CSS', level: 90, icon: 'css', color: '#EFA6C8' },
  { name: 'JavaScript', level: 85, icon: 'js', color: '#E58BB5' },
  { name: 'Python', level: 85, icon: 'python', color: '#F4A3C0' },
  { name: 'C++', level: 75, icon: 'cpp', color: '#E99BBF' },
  { name: 'Java', level: 75, icon: 'java', color: '#F2B0CB' },
  { name: 'React', level: 80, icon: 'react', color: '#EC9DC2' },
  { name: 'UI/UX Design', level: 85, icon: 'figma', color: '#F5B5CF' },
  { name: 'Database Management', level: 70, icon: 'db', color: '#E8A0C0' },
  { name: 'Problem Solving', level: 90, icon: 'brain', color: '#EFA6C8' },
]

export const projects = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description:
      'This dreamy, fully animated portfolio — built with React and Framer Motion, featuring an animated character, parallax and scroll-triggered motion.',
    tech: ['React', 'Framer Motion', 'CSS'],
    demo: '#home',
    github: 'https://github.com/',
    art: 'portfolio',
  },
  {
    id: 'students',
    title: 'Student Management System',
    description:
      'Add, search and manage student records with grades and attendance. Clean dashboard UI with sortable tables and quick stats.',
    tech: ['Java', 'MySQL', 'JavaFX'],
    demo: null,
    github: 'https://github.com/',
    art: 'students',
  },
  {
    id: 'calculator',
    title: 'Calculator App',
    description:
      'A soft, tactile calculator with keyboard support, chained operations and a pastel button design that feels great to click.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: null,
    github: 'https://github.com/',
    art: 'calculator',
  },
  {
    id: 'todo',
    title: 'To-Do List',
    description:
      'Stay organised with a cheerful task list — add, complete and delete tasks, with progress tracking and saved state.',
    tech: ['React', 'LocalStorage', 'CSS'],
    demo: null,
    github: 'https://github.com/',
    art: 'todo',
  },
]

export const education = [
  {
    year: '2019 – 2021',
    title: 'High School / Secondary',
    place: 'Your School Name',
    text: 'Fell in love with maths and wrote my very first "Hello, World!" in a computer class.',
    icon: 'school',
  },
  {
    year: '2022',
    title: 'Started B.S. Computer Science',
    place: 'University / College Name',
    text: 'Foundations of programming, discrete mathematics and my first group software project.',
    icon: 'uni',
  },
  {
    year: '2023',
    title: 'Core CS Courses',
    place: 'University / College Name',
    text: 'Data Structures, Algorithms, OOP, Databases, Operating Systems and Computer Networks.',
    icon: 'book',
  },
  {
    year: '2024 – Present',
    title: 'Computer Science Student',
    place: 'University / College Name',
    text: 'Web development, software engineering, AI fundamentals, and building real projects.',
    icon: 'grad',
  },
]

export const courses = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Systems',
  'Web Engineering',
  'Software Engineering',
  'Human-Computer Interaction',
]

export const certifications = [
  'Responsive Web Design — freeCodeCamp',
  'Python for Everybody — Coursera',
  'Google UX Design (in progress)',
  'Git & GitHub Essentials',
]

export const achievements = [
  {
    title: "Dean's List",
    text: 'Recognised for academic excellence across consecutive semesters.',
    tag: 'Academic',
    icon: 'medal',
  },
  {
    title: 'Hackathon Finalist',
    text: 'Built a campus helper app in 24 hours with an amazing team.',
    tag: 'Competition',
    icon: 'trophy',
  },
  {
    title: '250+ Coding Problems',
    text: 'Solved problems on LeetCode & HackerRank, focusing on DSA.',
    tag: 'Coding Challenge',
    icon: 'code',
  },
  {
    title: 'Web Design Certificate',
    text: 'Completed responsive web design certification with honours.',
    tag: 'Certificate',
    icon: 'cert',
  },
  {
    title: 'Coding Club Lead',
    text: 'Organised workshops teaching HTML, CSS & Git to 100+ students.',
    tag: 'Leadership',
    icon: 'users',
  },
  {
    title: 'Open Source Contributor',
    text: 'Merged pull requests into community projects on GitHub.',
    tag: 'Open Source',
    icon: 'github',
  },
]
