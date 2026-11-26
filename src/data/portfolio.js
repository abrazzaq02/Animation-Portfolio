// ─────────────────────────────────────────────────────────────
//  Edit this file to make the portfolio yours.
//  Every section of the site reads its content from here.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Your Name', // ← your best friend's name (used in the showreel, hero, footer)
  role: 'Computer Science Student',
  subtitle: 'Dreamer | Coder | Creative Thinker | Future Developer',
  email: 'your.email@example.com',
  location: 'Your City, Country',
  university: 'University / College Name',
  // Optional real photo, e.g. '/photo.jpg' (put the file in /public). Leave '' to show only the illustrated character.
  photo: '',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
}

// The signature shown at the end of the showreel and in the outro: "Made with Love for … ♡"
export const dedication = {
  for: "[Best Friend's Name]",
  from: 'Your Bestie',
}

// Contact form delivery.
// Leave endpoint '' → the form opens the visitor's email app (works everywhere, no setup).
// Or paste a form-backend URL to receive messages directly in your inbox, e.g.
//   Formspree:  'https://formspree.io/f/xxxxxxx'   (free account at formspree.io)
//   Web3Forms:  'https://api.web3forms.com/submit' + set accessKey below (web3forms.com)
export const contactForm = {
  endpoint: '',
  accessKey: '',
}

export const navLinks = [
  { id: 'showreel', label: 'Showreel' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Journey' },
  { id: 'creative', label: 'Creative' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  intro:
    "Hi there! I'm a Computer Science student who loves turning ideas into delightful, useful software. I enjoy the moment a messy problem finally clicks — and I care just as much about how something feels to use as how it works under the hood.",
  more:
    "When I'm not debugging, you'll find me sketching UI ideas, experimenting with AI models, exploring new frameworks, joining hackathons or helping classmates untangle their code. I'm currently looking for internships and collaborations where I can learn, build and grow.",
  interests: [
    { label: 'Programming', icon: 'code' },
    { label: 'Web Development', icon: 'web' },
    { label: 'UI/UX Design', icon: 'design' },
    { label: 'Technology', icon: 'tech' },
    { label: 'Problem Solving', icon: 'puzzle' },
    { label: 'AI & Machine Learning', icon: 'brain' },
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

// category: 'ai' | 'web' | 'app'  ·  cover: which illustrated cover to draw (see components/Covers.jsx)
// demo: null → opens the built-in live demo · '#section' → scrolls there · 'https://…' → opens your hosted site
export const projects = [
  {
    id: 'ai-chat',
    title: 'Study Buddy — AI Chat Assistant',
    description:
      'An AI study companion that explains CS concepts in simple words, quizzes you before exams and remembers what you are learning. Built on a large language model with a friendly chat UI.',
    tech: ['Python', 'FastAPI', 'LLM API', 'React'],
    category: 'ai',
    featured: true,
    year: '2025',
    demo: null,
    github: 'https://github.com/',
    cover: 'ai-chat',
  },
  {
    id: 'ai-vision',
    title: 'AI Image Classifier',
    description:
      'A convolutional neural network that recognises objects in photos with confidence scores, trained with TensorFlow and served through a simple web app.',
    tech: ['Python', 'TensorFlow', 'CNN', 'Flask'],
    category: 'ai',
    year: '2025',
    demo: null,
    github: 'https://github.com/',
    cover: 'ai-vision',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description:
      'This dreamy, fully animated portfolio — React and Framer Motion with an animated character, parallax and scroll-triggered motion.',
    tech: ['React', 'Framer Motion', 'CSS'],
    category: 'web',
    year: '2025',
    demo: '#home',
    github: 'https://github.com/',
    cover: 'portfolio',
  },
  {
    id: 'students',
    title: 'Student Management System',
    description:
      'Add, search and manage student records with grades and attendance in a clean dashboard with quick stats and charts.',
    tech: ['Java', 'MySQL', 'JavaFX'],
    category: 'app',
    year: '2024',
    demo: null,
    github: 'https://github.com/',
    cover: 'students',
  },
  {
    id: 'calculator',
    title: 'Calculator App',
    description:
      'A soft, tactile calculator with keyboard support, chained operations and pastel buttons that feel great to click.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    year: '2023',
    demo: null,
    github: 'https://github.com/',
    cover: 'calculator',
  },
  {
    id: 'todo',
    title: 'To-Do List',
    description:
      'Stay organised with a cheerful task list — add, complete and delete tasks, with progress tracking and saved state.',
    tech: ['React', 'LocalStorage', 'CSS'],
    category: 'app',
    year: '2024',
    demo: null,
    github: 'https://github.com/',
    cover: 'todo',
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

// Content used by the 40-second showreel at the top of the site.
export const showreel = {
  aboutIntro: 'A Computer Science student who turns ideas into delightful, useful software.',
  about: [
    ['💻', 'Passionate about technology and how things work'],
    ['⌨️', 'Loves programming — from Python to React'],
    ['🎨', 'Creative thinker with an eye for design'],
    ['🧩', 'Enjoys solving tricky problems step by step'],
    ['🚀', 'Goal: grow into a full-stack & AI developer'],
  ],
  // ids from `projects` above (3 or 4 look best)
  projects: ['portfolio', 'students', 'calculator', 'todo'],
}
