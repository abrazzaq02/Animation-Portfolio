// UI + social icons come from Lucide; language/tool logos come from Simple Icons
// (Lucide intentionally has no tech-brand logos).
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  ArrowUp,
  ExternalLink,
  Send,
  GraduationCap,
  BookOpen,
  School,
  Landmark,
  Award,
  Trophy,
  Medal,
  Users,
  Code2,
  Globe,
  Palette,
  Cpu,
  Puzzle,
  Brain,
  Heart,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  Sparkles,
  SkipForward,
} from 'lucide-react'
import { SiHtml5, SiCss3, SiJavascript, SiPython, SiCplusplus, SiReact, SiFigma, SiMysql, SiTensorflow } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

const map = {
  // tech logos
  html: SiHtml5,
  css: SiCss3,
  js: SiJavascript,
  python: SiPython,
  cpp: SiCplusplus,
  java: FaJava,
  react: SiReact,
  figma: SiFigma,
  db: SiMysql,
  tf: SiTensorflow,
  // ui
  brain: Brain,
  code: Code2,
  web: Globe,
  design: Palette,
  tech: Cpu,
  puzzle: Puzzle,
  school: School,
  uni: Landmark,
  book: BookOpen,
  grad: GraduationCap,
  medal: Medal,
  trophy: Trophy,
  cert: Award,
  users: Users,
  heart: Heart,
  up: ArrowUp,
  external: ExternalLink,
  send: Send,
  mail: Mail,
  pin: MapPin,
  play: Play,
  pause: Pause,
  replay: RotateCcw,
  down: ChevronDown,
  sparkles: Sparkles,
  skip: SkipForward,
  // social
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
}

export default function Icon({ name, size, ...props }) {
  const C = map[name] || Code2
  const isLucide = !['html', 'css', 'js', 'python', 'cpp', 'java', 'react', 'figma', 'db', 'tf'].includes(name)
  return isLucide ? <C aria-hidden="true" size={size || '1em'} strokeWidth={2.2} {...props} /> : <C aria-hidden="true" {...props} />
}
