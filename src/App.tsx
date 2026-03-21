import { useState, useEffect, useRef, type RefObject } from 'react'
import { Github, Linkedin, Mail, MapPin, Cloud } from 'lucide-react'
import {
  SiGo, SiTypescript, SiJavascript, SiPython,
  SiNodedotjs, SiNestjs, SiExpress, SiReact,
  SiPostgresql, SiMysql, SiMongodb,
  SiDocker, SiGithubactions, SiGooglecloud, SiKubernetes, SiRedis,
  SiJest, SiSentry, SiPrometheus, SiHtml5, SiCss
} from 'react-icons/si'
import { type IconType } from 'react-icons'
import { GitHubCalendar } from 'react-github-calendar'
import './App.css'

// ===== Types =====

interface Job {
  role: string
  company: string
  period: string
  bullets: string[]
  tags: string[]
}

interface SkillGroup {
  category: string
  skills: string[]
}

// ===== Data =====

const JOBS: Job[] = [
  {
    role: 'AI/Backend Engineer',
    company: 'SubmitterAI',
    period: 'Nov 2025 – Present',
    bullets: [
      'Architected a two tier RAG pipeline in Go with cosine similarity routing local generation (<2s) vs. Python LangGraph multi-hop agent (<10s).',
      'Designed a dual protocol API layer (gRPC + REST) with JWT auth, per-IP rate limiting, and Prometheus metrics.',
      'Achieved <2000ms p99 for live LLM queries (Groq) and ~10ms for cached queries via Redis.',
      'Built a concurrent ingestion pipeline with a bounded worker pool to embed ~1500 pages into pgvector with HNSW indexing.',
      'Built a fault tolerant sidecar with mid request fallback to local generation if the Python FastAPI/LangChain service fails.',
    ],
    tags: ['Go', 'RAG', 'pgvector', 'gRPC', 'Redis', 'Prometheus'],
  },
  {
    role: 'Software Engineer (Backend)',
    company: 'PSS',
    period: 'Mar 2025 – Oct 2025',
    bullets: [
      'Built and deployed an e-commerce platform (15K+ records) with NestJS, MySQL/Prisma, and React, cutting load times from 30s → 0.5s.',
      'Developed 20+ RESTful APIs with optimized DB performance via indexing.',
      'Implemented JWT/Passport.js/bcrypt auth with Jest test coverage.',
      'Normalized and migrated multiple databases into a unified production schema using Python.',
      'Built BeautifulSoup web scrapers to automate record creation and data sanitation.',
      'Automated CI/CD to Linux/Apache via GitHub Actions, Docker Compose, and Kubernetes with Sentry monitoring.',
    ],
    tags: ['NestJS', 'MySQL', 'React', 'Stripe', 'Kubernetes', 'Docker'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Beyond Digital',
    period: 'Feb 2024 – Nov 2024',
    bullets: [
      'Implemented custom, scalable websites using React.js and REST APIs built with Node.js/Express.js and MongoDB/PostgreSQL databases, ensuring optimal performance and user experience.',
      'Designed CI/CD pipelines to automate deployments, improving delivery speed and minimizing downtime.',
      'Utilized AWS services such as S3, IAM and Route 53 for cloud hosting and deployment of static websites.',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS'],
  },
  {
    role: 'Technical Product Manager',
    company: 'Maple',
    period: 'May 2021 – Jun 2023',
    bullets: [
      'Partnered closely with backend engineers on system architecture for a production Flutter app (1,000+ users)',
      'Optimized Firestore/MySQL queries (including geo-queries) and led a cloud migration that cut infrastructure costs by 40%.',
    ],
    tags: ['Flutter', 'Firestore', 'MySQL'],
  },
]

const SKILL_GROUPS: SkillGroup[] = [
  { category: 'Languages', skills: ['Go', 'TypeScript', 'JavaScript', 'Python'] },
  { category: 'Backend', skills: ['Go', 'Node.js', 'Nest.js', 'Express.js'] },
  { category: 'Frontend', skills: ['React.js', 'HTML', 'CSS'] },
  { category: 'Databases', skills: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { category: 'Tools & Infra', skills: ['Docker', 'GitHub Actions', 'AWS', 'GCP', 'Kubernetes', 'Redis'] },
  { category: 'Testing & Monitoring', skills: ['Jest', 'Sentry', 'Prometheus'] },
]

// Icon lookup — keys must exactly match skill strings in SKILL_GROUPS and JOBS tags.
// AWS has no Simple Icons entry; Cloud (lucide) is used as a fallback via SKILL_ICON_FALLBACK.
const SKILL_ICONS: Record<string, IconType> = {
  'Go': SiGo,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Python': SiPython,
  'Node.js': SiNodedotjs,
  'Nest.js': SiNestjs,
  'Express.js': SiExpress,
  'React.js': SiReact,
  'React': SiReact,
  'NestJS': SiNestjs,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'MongoDB': SiMongodb,
  'Docker': SiDocker,
  'GitHub Actions': SiGithubactions,
  'GCP': SiGooglecloud,
  'Kubernetes': SiKubernetes,
  'Redis': SiRedis,
  'Jest': SiJest,
  'Sentry': SiSentry,
  'Prometheus': SiPrometheus,
  'HTML': SiHtml5,
  'CSS': SiCss,
}

// Skills that need a lucide fallback icon (AWS — no Simple Icons brand icon available)
const LUCIDE_FALLBACKS = new Set(['AWS'])

const GITHUB_CALENDAR_THEME = {
  dark: ['#0b1120', '#1e3a8a', '#1d4ed8', '#2563eb', '#93c5fd'],
}

// ===== Hook =====

function useFadeIn<T extends Element>(): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

// ===== Components =====

function Navbar() {
  const [open, setOpen] = useState(false)
  const handleLinkClick = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#hero" className="navbar__brand">
          Sajad<span>.</span>
        </a>
        <nav className="navbar__links" aria-label="Primary navigation">
          <a href="#about" className="navbar__link">About</a>
          <a href="#experience" className="navbar__link">Experience</a>
          <a href="#skills" className="navbar__link">Skills</a>
          <a href="#activity" className="navbar__link">Activity</a>
          <a href="#contact" className="navbar__link">Contact</a>
        </nav>
        <button
          className="navbar__toggle"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>
      <nav className={`navbar__mobile${open ? ' open' : ''}`} aria-label="Mobile navigation">
        <a href="#about" className="navbar__link" onClick={handleLinkClick}>About</a>
        <a href="#experience" className="navbar__link" onClick={handleLinkClick}>Experience</a>
        <a href="#skills" className="navbar__link" onClick={handleLinkClick}>Skills</a>
        <a href="#activity" className="navbar__link" onClick={handleLinkClick}>Activity</a>
        <a href="#contact" className="navbar__link" onClick={handleLinkClick}>Contact</a>
      </nav>
    </header>
  )
}

function Hero() {
  const ref = useFadeIn<HTMLDivElement>()

  return (
    <section id="hero" className="hero">
      <div className="hero__container">
        <div ref={ref} className="fade-in">
          <span className="hero__eyebrow">AI/Backend Engineer</span>
          <h1 className="hero__name">Sajad Daneshmand</h1>
          <p className="hero__location">
            <MapPin size={15} />
            Toronto, ON
          </p>
          <div className="hero__ctas">
            <a href="https://github.com/saji2000" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <Github size={16} />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sajad-d/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a href="mailto:me@sajaddaneshmand.com" className="btn btn--outline">
              <Mail size={16} />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const ref = useFadeIn<HTMLDivElement>()

  return (
    <section id="about" className="section about">
      <div className="section__container">
        <div ref={ref} className="fade-in">
          <div className="section__header">
            <h2 className="section__title">About</h2>
            <div className="section__divider" />
          </div>
          <div className="about__grid">
            <div className="about__body">
              <p>
                I am a backend developer with over two years of experience building scalable, production-grade systems. My work spans microservices, data pipelines, and cloud infrastructure, with a focus on correctness, performance, and maintainability.
              </p>
              <p>
                I mostly work with Go, JavaScript/TypeScript and Python, and I have shipped real-world products across ecommerce, SaaS, and AI verticals. I care about clean API design, observable systems, and keeping operational complexity low.
              </p>
              <p>
                Currently open to Backend and AI Engineer roles in anywhere in Canada. I value teams that move with purpose and hold high engineering standards.
              </p>
            </div>
            <div className="about__photo-wrap">
              <img src="/sajad.jpg" alt="Sajad Daneshmand" className="about__photo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineCardProps {
  job: Job
}

function SkillIcon({ name }: { name: string }) {
  if (LUCIDE_FALLBACKS.has(name)) {
    return <Cloud size={14} className="skill-icon" aria-hidden="true" />
  }
  const Icon = SKILL_ICONS[name]
  if (!Icon) return null
  return <Icon size={14} className="skill-icon" aria-hidden="true" />
}

function TimelineCard({ job }: TimelineCardProps) {
  const ref = useFadeIn<HTMLLIElement>()

  return (
    <li ref={ref} className="timeline__item fade-in">
      <div className="timeline__dot" />
      <div className="timeline__card">
        <div className="timeline__header">
          <span className="timeline__role">{job.role}</span>
          <span className="timeline__period">{job.period}</span>
        </div>
        <p className="timeline__company">{job.company}</p>
        <ul className="timeline__bullets">
          {job.bullets.map((bullet, i) => (
            <li key={i} className="timeline__bullet">{bullet}</li>
          ))}
        </ul>
        <div className="timeline__tags">
          {job.tags.map(tag => (
            <span key={tag} className="timeline__tag">
              <SkillIcon name={tag} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </li>
  )
}

function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Experience</h2>
          <div className="section__divider" />
        </div>
        <ul className="timeline">
          {JOBS.map(job => (
            <TimelineCard key={job.company} job={job} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Skills() {
  const ref = useFadeIn<HTMLDivElement>()

  return (
    <section id="skills" className="section skills">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Skills</h2>
          <div className="section__divider" />
        </div>
        <div ref={ref} className="skills__grid fade-in">
          {SKILL_GROUPS.map(group => (
            <div key={group.category} className="skills__group">
              <p className="skills__group-title">{group.category}</p>
              <div className="skills__pills">
                {group.skills.map(skill => (
                  <span key={skill} className="skills__pill">
                    <SkillIcon name={skill} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Activity() {
  const ref = useFadeIn<HTMLDivElement>()

  return (
    <section id="activity" className="section activity">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Activity</h2>
          <div className="section__divider" />
        </div>
        <div ref={ref} className="activity__calendar fade-in">
          <GitHubCalendar
            username="saji2000"
            colorScheme="dark"
            theme={GITHUB_CALENDAR_THEME}
            blockSize={13}
            blockMargin={4}
            blockRadius={3}
            fontSize={13}
            showWeekdayLabels
          />
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const ref = useFadeIn<HTMLDivElement>()

  return (
    <section id="contact" className="section contact">
      <div ref={ref} className="contact__container fade-in">
        <h2 className="contact__title">Get in touch</h2>
        <p className="contact__subtitle">
          Open to backend and full-stack opportunities. Reach out via email or connect on LinkedIn.
        </p>
        <div className="contact__links">
          <a href="mailto:me@sajaddaneshmand.com" className="btn btn--primary">
            <Mail size={16} />
            me@sajaddaneshmand.com
          </a>
          <a href="https://github.com/saji2000" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            <Github size={16} />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/sajad-d/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </div>
      <footer className="footer">
        <p className="footer__text">Sajad Daneshmand &mdash; Toronto, ON</p>
      </footer>
    </section>
  )
}

// ===== Root =====

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Activity />
        <Contact />
      </main>
    </>
  )
}
