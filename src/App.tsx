import React, { useState, useEffect, useRef } from 'react';
import {
  SITE,
  PROJECTS,
  SKILLS,
  CERTIFICATIONS,
  LEARNING_JOURNEY_ORDER,
  HACKATHONS,
  TRAININGS,
  ProjectData,
  ProjectSection,
  CertificationData
} from './data';

/* --- Inline SVGs matching user's design --- */
const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="acc-chevron">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const IconChip = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="6" y="6" width="12" height="12" rx="1" />
    <path d="M9 6V3M15 6V3M9 21v-3M15 21v-3M3 9h3M3 15h3M18 9h3M18 15h3" />
    <circle cx="12" cy="12" r="2.4" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4" />
  </svg>
);

const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

const KaranLogoStamp = () => (
  <div className="footer-logo-wrap" style={{ marginBottom: '20px' }}>
    <img
      src="/assets/logo/karan-logo.jpeg"
      alt="Karan Mendhe Official Logo"
      className="footer-official-logo"
      referrerPolicy="no-referrer"
    />
  </div>
);

const HERO_ROLES = [
  "Electrical Engineering Student",
  "Power Electronics Enthusiast",
  "Embedded Systems Explorer",
  "AI & Innovation Builder"
];

const SECTION_IDS = ['home', 'about', 'projects', 'skills', 'certifications', 'hackathons', 'trainings', 'resume', 'contact'];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [activeCert, setActiveCert] = useState<CertificationData | null>(null);

  // Accordion states
  const [allSkillsExpanded, setAllSkillsExpanded] = useState(false);
  const [openSkillCats, setOpenSkillCats] = useState<Record<string, boolean>>({});
  const [openSubSkills, setOpenSubSkills] = useState<Record<string, boolean>>({});
  const [openSkillsGained, setOpenSkillsGained] = useState<Record<string, boolean>>({});
  const [openHackathons, setOpenHackathons] = useState<Record<string, boolean>>({});
  const [openTrainings, setOpenTrainings] = useState<Record<string, boolean>>({});

  // Hero rotator
  const [roleIndex, setHeroRoleIndex] = useState(0);
  const [fadeRole, setFadeRole] = useState(false);

  // Trace Spine
  const [tracePulseTop, setTracePulseTop] = useState(0);

  // Back to top visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Animated counters
  const [counterValues, setCounterValues] = useState<Record<string, number>>({
    projects: 0,
    hackathons: 0,
    certifications: 0,
    trainings: 0,
    years: 0
  });
  const [countersTriggered, setCountersTriggered] = useState(false);

  // Ref for trace spine wrapper
  const pageWrapRef = useRef<HTMLDivElement>(null);

  // Rotator effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeRole(true);
      setTimeout(() => {
        setHeroRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
        setFadeRole(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for nav, back-to-top, trace spine, active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
      setShowBackToTop(scrollY > 600);

      // Section intersection detection
      const scrollCenter = scrollY + window.innerHeight / 2.5;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top - 150 && scrollY < top + height - 150) {
            setActiveSection(id);
          }
        }
      }

      // Trace spine pulse
      if (pageWrapRef.current) {
        const wrapTop = pageWrapRef.current.offsetTop;
        const wrapHeight = pageWrapRef.current.offsetHeight;
        if (wrapHeight > 0) {
          const rel = ((scrollY - wrapTop) / wrapHeight) * 100;
          setTracePulseTop(Math.max(0, Math.min(100, rel)));
        }
      }

      // Trigger counter animation when home stats are in view
      const homeStats = document.getElementById('snapshotGrid');
      if (homeStats && !countersTriggered) {
        const rect = homeStats.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          setCountersTriggered(true);
          animateCounters();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [countersTriggered]);

  // Reveal observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    const timelineElements = document.querySelectorAll('.timeline');
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    timelineElements.forEach((el) => timelineObserver.observe(el));

    return () => {
      observer.disconnect();
      timelineObserver.disconnect();
    };
  }, [activeProject, activeCert]);

  // Counter animation logic
  const animateCounters = () => {
    const targets = { projects: 3, hackathons: HACKATHONS.length, certifications: CERTIFICATIONS.length, trainings: TRAININGS.length, years: 3 };
    const duration = 1200;
    const startTime = performance.now();

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCounterValues({
        projects: Math.floor(progress * targets.projects),
        hackathons: Math.floor(progress * targets.hackathons),
        certifications: Math.floor(progress * targets.certifications),
        trainings: Math.floor(progress * targets.trainings),
        years: Math.floor(progress * targets.years)
      });
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCounterValues(targets);
      }
    };
    requestAnimationFrame(update);
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeProject) setActiveProject(null);
        if (activeCert) setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, activeCert]);

  // Lock body scroll when modals / case study overlay are open
  useEffect(() => {
    if (activeProject || activeCert) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [activeProject, activeCert]);

  const toggleSkillCategory = (cat: string) => {
    setOpenSkillCats((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const toggleSubSkill = (key: string) => {
    setOpenSubSkills((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExpandAllSkills = () => {
    const next = !allSkillsExpanded;
    setAllSkillsExpanded(next);
    const newCats: Record<string, boolean> = {};
    SKILLS.forEach((cat) => {
      newCats[cat.category] = next;
    });
    setOpenSkillCats(newCats);
  };

  const toggleHackathon = (name: string) => {
    setOpenHackathons((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleTraining = (name: string) => {
    setOpenTrainings((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleSkillsGained = (name: string) => {
    setOpenSkillsGained((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value || 'Portfolio contact form';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const openProjectCaseStudy = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (proj) {
      setActiveProject(proj);
    }
  };

  return (
    <div id="app-root">
      {/* Navigation Bar */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="nav">
        <div className="container nav-inner">
          <a href="#home" className="logo">
            <span className="logo-mark">{SITE.initials}</span> {SITE.name}
          </a>
          <div className="nav-links">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            <a href="#certifications" className={activeSection === 'certifications' ? 'active' : ''}>Certifications</a>
            <a href="#hackathons" className={activeSection === 'hackathons' ? 'active' : ''}>Hackathons</a>
            <a href="#trainings" className={activeSection === 'trainings' ? 'active' : ''}>Trainings</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          </div>
          <a href="#resume" className="nav-cta">Resume</a>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
        <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
        <a href="#certifications" onClick={() => setMobileMenuOpen(false)}>Certifications</a>
        <a href="#hackathons" onClick={() => setMobileMenuOpen(false)}>Hackathons</a>
        <a href="#trainings" onClick={() => setMobileMenuOpen(false)}>Trainings</a>
        <a href="#resume" onClick={() => setMobileMenuOpen(false)}>Resume</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
      </div>

      <div className="page-wrap" ref={pageWrapRef}>
        {/* Trace Spine Left Circuit Line */}
        <div className="trace-spine" id="traceSpine" aria-hidden="true">
          <div className={`trace-dot ${activeSection === 'home' ? 'active' : ''}`} style={{ top: '0%' }}></div>
          <div className={`trace-dot ${activeSection === 'about' ? 'active' : ''}`} style={{ top: '15%' }}></div>
          <div className={`trace-dot ${activeSection === 'projects' ? 'active' : ''}`} style={{ top: '30%' }}></div>
          <div className={`trace-dot ${activeSection === 'skills' ? 'active' : ''}`} style={{ top: '45%' }}></div>
          <div className={`trace-dot ${activeSection === 'certifications' ? 'active' : ''}`} style={{ top: '60%' }}></div>
          <div className={`trace-dot ${activeSection === 'hackathons' ? 'active' : ''}`} style={{ top: '72%' }}></div>
          <div className={`trace-dot ${activeSection === 'trainings' ? 'active' : ''}`} style={{ top: '82%' }}></div>
          <div className={`trace-dot ${activeSection === 'contact' ? 'active' : ''}`} style={{ top: '95%' }}></div>
          <div className="trace-pulse" style={{ top: `${tracePulseTop}%` }}></div>
        </div>

        <main>
          {/* ============ HOME SECTION ============ */}
          <section className="hero" id="home">
            <div className="container hero-grid">
              <div>
                <div className="eyebrow-badge reveal" style={{ transitionDelay: '.05s' }}>
                  <span className="eyebrow-dot"></span> B.Tech Electrical Engineering • Power Electronics • PCB Design • CAD • Embedded Systems • Renewable Energy
                </div>
                <h1 className="hero-title reveal" style={{ transitionDelay: '.15s' }}>
                  Hi, I'm Karan <span className="accent-grad">Mendhe</span>
                </h1>
                <p className="hero-subtitle reveal" style={{ transitionDelay: '.25s' }}>
                  <span className={`hero-rotator ${fadeRole ? 'fade-out' : ''}`}>
                    {HERO_ROLES[roleIndex]}
                  </span>
                </p>
                <p className="hero-tagline reveal" style={{ transitionDelay: '.35s' }}>
                  Passionate about designing intelligent electrical systems that combine Power Electronics, Embedded Systems, PCB Design, CAD, and Renewable Energy. I enjoy transforming engineering concepts into practical hardware—from wearable rehabilitation devices to EV power electronics—while continuously learning and building real-world solutions.
                </p>
                <div className="hero-actions reveal" style={{ transitionDelay: '.45s' }}>
                  <a href="#resume" className="btn btn-primary">Download Resume</a>
                  <a href="#projects" className="btn btn-outline">View Projects</a>
                  <a href="#contact" className="btn btn-ghost">Contact Me</a>
                </div>
              </div>
              <div className="hero-visual reveal" style={{ transitionDelay: '.1s' }}>
                <div className="avatar-wrap">
                  <div className="avatar-glow"></div>
                  <div className="avatar-ring"></div>
                  <div className="avatar-photo">
                    <img src="/assets/karan-profile.jpg" alt="Karan Mendhe" />
                  </div>
                </div>
              </div>
            </div>

            {/* Snapshot Stats Grid */}
            <div className="container" style={{ marginTop: '88px' }}>
              <div className="snapshot-grid" id="snapshotGrid">
                <a href="#projects" className="snapshot-card reveal">
                  <div className="snapshot-number mono">{counterValues.projects}</div>
                  <div className="snapshot-label">Projects</div>
                </a>
                <a href="#hackathons" className="snapshot-card reveal">
                  <div className="snapshot-number mono">{counterValues.hackathons}</div>
                  <div className="snapshot-label">Hackathons</div>
                </a>
                <a href="#certifications" className="snapshot-card reveal">
                  <div className="snapshot-number mono">{counterValues.certifications}</div>
                  <div className="snapshot-label">Certifications</div>
                </a>
                <a href="#trainings" className="snapshot-card reveal">
                  <div className="snapshot-number mono">{counterValues.trainings}</div>
                  <div className="snapshot-label">Trainings</div>
                </a>
                <a href="#about" className="snapshot-card reveal">
                  <div className="snapshot-number mono">{counterValues.years}+</div>
                  <div className="snapshot-label">Years Learning</div>
                </a>
              </div>
            </div>

            {/* Domains Grid */}
            <div className="container" style={{ marginTop: '96px' }}>
              <p className="section-eyebrow reveal">Technical domains</p>
              <h2 className="section-title reveal">Where the strength is</h2>
              <div className="card-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="card reveal">
                  <div className="icon-chip c-blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h16v16H4z"/><path d="M9 4v4M15 4v4M9 16v4M15 16v4M4 9h4M4 15h4M16 9h4M16 15h4"/></svg>
                  </div>
                  <div className="card-title">Electrical Engineering</div>
                  <div className="card-body">Core electrical principles, circuit analysis, machines, and system design.</div>
                </div>
                <div className="card reveal">
                  <div className="icon-chip c-amber">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>
                  </div>
                  <div className="card-title">Power Electronics</div>
                  <div className="card-body">DC-DC converters, motor drives, EV power systems, and converter design.</div>
                </div>
                <div className="card reveal">
                  <div className="icon-chip c-cyan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2v20M5 7h14M3 13h18M7 19h10M5 7l7-5 7 5M3 13l9-6 9 6M7 19l5-6 5 6"/></svg>
                  </div>
                  <div className="card-title">Power Systems</div>
                  <div className="card-body">Protection, transmission, distribution, and grid fundamentals.</div>
                </div>
                <div className="card reveal">
                  <div className="icon-chip c-violet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 9h6v6H9z"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>
                  </div>
                  <div className="card-title">Embedded Systems</div>
                  <div className="card-body">ESP32, Arduino, sensors, and real-time hardware development.</div>
                </div>
                <div className="card reveal">
                  <div className="icon-chip c-blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>
                  </div>
                  <div className="card-title">PCB Design</div>
                  <div className="card-body">Schematic capture, PCB layout, and hardware prototyping.</div>
                </div>
                <div className="card reveal">
                  <div className="icon-chip c-green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>
                  </div>
                  <div className="card-title">Electrical CAD</div>
                  <div className="card-body">AutoCAD Electrical for electrical drawings, wiring, and panel design.</div>
                </div>
                <div className="card reveal">
                  <div className="icon-chip c-pink">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>
                  </div>
                  <div className="card-title">Industrial Automation</div>
                  <div className="card-body">PLC, SCADA fundamentals, industrial control, and automation workflows.</div>
                </div>
                <div className="card reveal">
                  <div className="icon-chip c-amber">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
                  </div>
                  <div className="card-title">Renewable Energy</div>
                  <div className="card-body">Solar energy systems, sustainable power generation, and green technologies.</div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ ABOUT SECTION ============ */}
          <section className="section" id="about">
            <div className="container">
              <p className="section-eyebrow reveal">About</p>
              <h2 className="section-title reveal">A journey that didn't start with engineering</h2>

              <div className="about-grid reveal" style={{ marginBottom: '64px' }}>
                <div className="about-bio">
                  <p className="project-desc" style={{ marginBottom: '14px' }}>
                    I'm Karan Kailas Mendhe, a final-year B.Tech student in Electrical Engineering at Bajaj Institute of Technology, Wardha.
                  </p>
                  <p className="project-desc" style={{ marginBottom: '14px' }}>
                    I grew up in a lower-middle-class family where success wasn't measured by what we had, but by how hard we were willing to work for it. My parents taught me that consistency, honesty, and patience matter far more than shortcuts. Those values still shape every decision I make today.
                  </p>
                  <p className="project-desc" style={{ marginBottom: '14px', fontWeight: 500, color: 'var(--text-main)' }}>
                    I never imagined I'd become an engineer.
                  </p>
                  <p className="project-desc" style={{ marginBottom: '14px' }}>
                    For almost two years, I believed my future would be in medicine. I studied for NEET, spent countless hours with biology books, and thought that was the only path ahead. Then MHT-CET happened—and one decision changed everything.
                  </p>
                  <p className="project-desc" style={{ marginBottom: '14px' }}>
                    Looking back, choosing engineering wasn't about changing careers—it was about finding where I truly belonged. I found myself genuinely excited by building things, solving problems, and understanding how technology works.
                  </p>
                  <p className="project-desc" style={{ marginBottom: '14px', fontWeight: 500, color: 'var(--text-main)' }}>
                    Since then, my definition of success has changed.
                  </p>
                  <p className="project-desc" style={{ marginBottom: '14px' }}>
                    Today, I spend more time building than chasing marks—whether it's developing hardware projects, participating in hackathons, earning certifications, or learning new tools on my own. Every project teaches me something valuable, and every setback becomes another lesson that makes me a better engineer.
                  </p>
                  <p className="project-desc" style={{ marginBottom: '14px' }}>
                    Outside engineering, I enjoy exploring emerging technologies, learning from the people around me, and occasionally switching off with a good film.
                  </p>
                  <p className="project-desc" style={{ marginBottom: '16px' }}>
                    My long-term goal is simple: to build a meaningful engineering career, support my family, help people through engineering, and create technology that solves real-world problems and leaves a lasting impact.
                  </p>
                  <p className="project-desc" style={{ margin: 0, fontStyle: 'italic', color: 'var(--primary)', fontWeight: 500 }}>
                    — Karan Mendhe
                  </p>
                </div>
                <div className="about-photo">
                  <img src="/assets/karan-about.jpg" alt="Karan Mendhe" />
                </div>
              </div>

              <p className="section-eyebrow reveal">My journey</p>
              <div className="timeline-grid reveal" style={{ marginBottom: '72px' }}>
                <div className="timeline">
                  <div className="timeline-item"><div className="timeline-year mono">2004</div><div className="timeline-title">Born in Wardha, Maharashtra</div></div>
                  <div className="timeline-item"><div className="timeline-year mono">2020</div><div className="timeline-title">Completed SSC — 85.20%</div><div className="timeline-sub">Kasturba Vidya Mandir, Sevagram</div></div>
                  <div className="timeline-item"><div className="timeline-year mono">2022</div><div className="timeline-title">Completed HSC (PCMB) — 87.67%</div><div className="timeline-sub">Insight Junior College, Nagpur</div></div>
                  <div className="timeline-item"><div className="timeline-year mono">2023</div><div className="timeline-title">Started B.Tech in Electrical Engineering</div><div className="timeline-sub">Bajaj Institute of Technology</div></div>
                  <div className="timeline-item"><div className="timeline-year mono">2024</div><div className="timeline-title">Built First Hardware Project</div><div className="timeline-sub">High Gain DC–DC Converter</div></div>
                  <div className="timeline-item"><div className="timeline-year mono">2025</div><div className="timeline-title">Developed Dextra Smart Hand Orthosis</div><div className="timeline-sub">Qualified for Smart India Hackathon Grand Finale</div></div>
                  <div className="timeline-item"><div className="timeline-year mono">2026</div><div className="timeline-title">Developed Renewable Energy & Microgrid Monitoring System (REYNEX)</div><div className="timeline-sub">Finalist, Smartathon 2.0</div></div>
                  <div className="timeline-item"><div className="timeline-year mono">2026–27</div><div className="timeline-title">Internships, Certifications & Advanced Projects</div></div>
                  <div className="timeline-item"><div className="timeline-year mono">2027</div><div className="timeline-title">Expected Graduation</div></div>
                </div>
                <div className="timeline-visuals">
                  <div className="timeline-visual-card illus c-blue">
                    <svg viewBox="0 0 200 140" className="timeline-illus" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <rect x="30" y="20" width="140" height="90" rx="6" strokeOpacity=".5"/>
                      <rect x="80" y="45" width="40" height="26" rx="3"/>
                      <path d="M50 45h30M50 58h30M50 71h30M120 50h30M120 62h30" />
                      <circle cx="50" cy="45" r="2.2" fill="currentColor" stroke="none"/>
                      <circle cx="50" cy="58" r="2.2" fill="currentColor" stroke="none"/>
                      <circle cx="50" cy="71" r="2.2" fill="currentColor" stroke="none"/>
                      <circle cx="150" cy="50" r="2.2" fill="currentColor" stroke="none"/>
                      <circle cx="150" cy="62" r="2.2" fill="currentColor" stroke="none"/>
                      <path d="M40 95c8-18 16 18 24 0s16 18 24 0 16 18 24 0 16 18 24 0" strokeOpacity=".8"/>
                    </svg>
                    <span className="timeline-visual-year">2024 · Power Electronics</span>
                  </div>
                  <div className="timeline-visual-card illus c-violet">
                    <svg viewBox="0 0 200 140" className="timeline-illus" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M100 30v18M80 34l8 16M120 34l-8 16"/>
                      <rect x="72" y="48" width="56" height="46" rx="14"/>
                      <path d="M84 60c0-6 6-6 6 0v10M96 58c0-7 8-7 8 0v14M112 60c0-6 6-6 6 0v10"/>
                      <path d="M100 94v14M84 108c8 8 24 8 32 0"/>
                      <circle cx="100" cy="30" r="4" fill="currentColor" stroke="none" opacity=".7"/>
                    </svg>
                    <span className="timeline-visual-year">2025 · Dextra</span>
                  </div>
                  <div className="timeline-visual-card illus c-cyan">
                    <svg viewBox="0 0 200 140" className="timeline-illus" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M100 26c-18 0-30 13-30 29 0 12 7 19 12 25 3 4 5 8 5 13h26c0-5 2-9 5-13 5-6 12-13 12-25 0-16-12-29-30-29z"/>
                      <path d="M100 40v10M84 58h8M108 58h8M92 48l6 6M108 48l-6 6" strokeOpacity=".85"/>
                      <path d="M88 95h24M91 103h18"/>
                      <path d="M40 40l8 6M160 40l-8 6M40 90h10M160 90h-10" strokeOpacity=".5"/>
                    </svg>
                    <span className="timeline-visual-year">2026 · REYNEX</span>
                  </div>
                </div>
              </div>

              <p className="section-eyebrow reveal">Engineering philosophy</p>
              <div className="card-grid reveal" style={{ marginBottom: '72px' }}>
                <div className="card"><div className="icon-chip c-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><div className="card-title">Continuous Learning</div><div className="card-body">Every project, every conversation, and every challenge is an opportunity to learn something new.</div></div>
                <div className="card"><div className="icon-chip c-violet"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 3a5 5 0 0 0-7 7L3 21l1 1 11-11a5 5 0 0 0 7-7l-3 3-2-2z"/></svg></div><div className="card-title">Practical Engineering</div><div className="card-body">Converting ideas into practical engineering solutions through design, prototyping, testing, and continuous improvement.</div></div>
                <div className="card"><div className="icon-chip c-cyan"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg></div><div className="card-title">Growth Mindset</div><div className="card-body">Focused on improving every day rather than chasing perfection — every success and setback contributes to development.</div></div>
                <div className="card"><div className="icon-chip c-amber"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div className="card-title">Integrity & Teamwork</div><div className="card-body">Honesty, discipline, responsibility, collaboration, and respect while working with others.</div></div>
              </div>

              <p className="section-eyebrow reveal">Currently learning</p>
              <div className="pill-row reveal" style={{ marginBottom: '48px' }}>
                <span className="pill"><span className="pill-dot"></span>GATE 2027 Preparation (Electrical Engineering)</span>
                <span className="pill"><span className="pill-dot"></span>PCB Design (KiCad)</span>
                <span className="pill"><span className="pill-dot"></span>PCB Design (Altium Designer)</span>
                <span className="pill"><span className="pill-dot"></span>AutoCAD Electrical</span>
              </div>

              {/* Moments Along the Way Photo Showcase */}
              <div className="moments-showcase reveal" style={{ borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
                <div style={{ marginBottom: '28px' }}>
                  <p className="section-eyebrow">Milestones & Memories</p>
                  <h3 className="section-title" style={{ fontSize: '24px' }}>Moments Along the Way</h3>
                  <p className="section-sub" style={{ marginBottom: '24px' }}>
                    Snapshots from national hackathon finals, institute honor ceremonies, prototype demos, and startup pitch competitions.
                  </p>
                </div>
                <div className="moments-grid">
                  <div className="moment-card">
                    <div className="moment-img-wrap">
                      <img src="/assets/Moments Along the Way/SIH Team at National Finale.jpeg" alt="SIH Team at National Finale" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="moment-content">
                      <span className="badge badge-comp">Smart India Hackathon 2025</span>
                      <h4>SIH Team at National Finale</h4>
                      <p>Representing Bajaj Institute of Technology, Wardha as Team Dexterist at the SIH Grand Finale stage.</p>
                    </div>
                  </div>

                  <div className="moment-card">
                    <div className="moment-img-wrap">
                      <img src="/assets/Moments Along the Way/College Appreciation & Send-off.jpeg" alt="College Appreciation & Send-off" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="moment-content">
                      <span className="badge badge-status">Institute Honor</span>
                      <h4>College Appreciation & Send-off</h4>
                      <p>Felicitated and honored by institute leadership and faculty for qualifying for the SIH national finals.</p>
                    </div>
                  </div>

                  <div className="moment-card">
                    <div className="moment-img-wrap">
                      <img src="/assets/Moments Along the Way/Solo Grand Finale Showcase.jpeg" alt="Solo SIH Grand Finale Showcase" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="moment-content">
                      <span className="badge badge-comp">SIH Showcase</span>
                      <h4>Solo Grand Finale Showcase</h4>
                      <p>Demonstrating Dextra's tendon-driven hand orthosis and live smartphone controls at the SIH finals.</p>
                    </div>
                  </div>

                  <div className="moment-card">
                    <div className="moment-img-wrap">
                      <img src="/assets/Moments Along the Way/Wardha Startup Challenge Runner-Up.jpeg" alt="Wardha Startup Challenge Runner-Up" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="moment-content">
                      <span className="badge badge-comp">Runner-Up Award</span>
                      <h4>Wardha Startup Challenge Runner-Up</h4>
                      <p>Secured Runner-Up recognition pitching Dextra before government and InFED IIM Nagpur panels.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ PROJECTS SECTION ============ */}
          <section className="section" id="projects">
            <div className="container">
              <p className="section-eyebrow reveal">Engineering Projects</p>
              <h2 className="section-title reveal">A collection of hardware engineering projects</h2>
              <p className="section-sub reveal">
                Focused on solving practical problems through design, prototyping, embedded systems, automation, and renewable energy. Each project below represents a different stage of the journey — built for practical learning and continuous improvement, not just to be finished.
              </p>

              <div className="projects-overview">
                <div className="projects-grid">
                  {PROJECTS.map((p) => (
                    <div className="project-card reveal" key={p.id}>
                      <div className="project-card-image">
                        {p.heroImage ? (
                          <img src={p.heroImage} alt={p.name} loading="lazy" />
                        ) : (
                          'Project image — placeholder'
                        )}
                      </div>
                      <div className="project-card-body">
                        <div className="project-card-cat">{p.category}</div>
                        <h3 className="project-card-title">{p.name}</h3>
                        <p className="project-card-desc">{p.shortDescription}</p>
                        <div className="tag-row">
                          {p.techTags.slice(0, 3).map((t) => (
                            <span className="tag" key={t}>{t}</span>
                          ))}
                        </div>
                        <div className="project-card-footer">
                          <span className="badge badge-status">{p.status}</span>
                          <button
                            className="link-arrow"
                            onClick={() => openProjectCaseStudy(p.id)}
                          >
                            Explore Project <IconArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============ SKILLS SECTION ============ */}
          <section className="section" id="skills">
            <div className="container">
              <p className="section-eyebrow reveal">Skills</p>
              <h2 className="section-title reveal">Skills</h2>
              <p className="section-sub reveal">
                Developed through academic coursework, industrial training, professional certifications, and hands-on engineering projects — spanning Electrical Engineering, Embedded Systems, Power Electronics, IoT, Renewable Energy, Hardware Development, Engineering Design, and Technical Software.
              </p>

              <div className="acc-controls reveal">
                <button onClick={handleExpandAllSkills}>
                  {allSkillsExpanded ? 'Collapse all' : 'Expand all'}
                </button>
              </div>

              <div id="skillsAccordion">
                {SKILLS.map((cat) => {
                  const isOpen = !!openSkillCats[cat.category];
                  return (
                    <div className="accordion reveal" key={cat.category}>
                      <button
                        className="acc-header"
                        aria-expanded={isOpen}
                        onClick={() => toggleSkillCategory(cat.category)}
                      >
                        <span>
                          {cat.category}{' '}
                          <span className="placeholder-note" style={{ fontStyle: 'normal' }}>
                            ({cat.skills.length})
                          </span>
                        </span>
                        <IconChevron />
                      </button>
                      {isOpen && (
                        <div className="acc-panel" style={{ maxHeight: '3000px' }}>
                          <div className="acc-panel-inner" style={{ paddingTop: '2px' }}>
                            {cat.skills.map((sk) => {
                              const subKey = `${cat.category}-${sk.name}`;
                              const isSubOpen = !!openSubSkills[subKey];
                              return (
                                <div className="acc-sub" key={sk.name}>
                                  <button
                                    className="acc-header"
                                    aria-expanded={isSubOpen}
                                    onClick={() => toggleSubSkill(subKey)}
                                  >
                                    <span>{sk.name}</span>
                                    <IconChevron />
                                  </button>
                                  {isSubOpen && (
                                    <div className="acc-panel" style={{ maxHeight: '500px' }}>
                                      <div className="acc-detail">
                                        {sk.learnedThrough && (
                                          <div className="acc-detail-row">
                                            <span className="acc-detail-label">Learned through:</span>
                                            {sk.learnedThrough.join(', ')}
                                          </div>
                                        )}
                                        {sk.appliedIn && (
                                          <div className="acc-detail-row">
                                            <span className="acc-detail-label">Applied in:</span>
                                            {sk.appliedIn.join(', ')}
                                          </div>
                                        )}
                                        {sk.experience && (
                                          <div className="acc-detail-row">
                                            <span className="acc-detail-label">Experience:</span>
                                            {sk.experience.join(', ')}
                                          </div>
                                        )}
                                        {sk.relatedTech && (
                                          <div className="acc-detail-row">
                                            <span className="acc-detail-label">Related technologies:</span>
                                            {sk.relatedTech.join(', ')}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ============ CERTIFICATIONS SECTION ============ */}
          <section className="section" id="certifications">
            <div className="container">
              <p className="section-eyebrow reveal">Certifications</p>
              <h2 className="section-title reveal">Certifications</h2>
              <p className="section-sub reveal">
                Continuous learning has been one of the strongest foundations of this journey — professional courses and industry-recognized certifications that expand on classroom learning in Electrical Engineering, Power Electronics, MATLAB, Design, Human Psychology, and Productivity Tools.
              </p>

              <div className="snapshot-grid reveal" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '64px' }}>
                <div className="snapshot-card"><div className="snapshot-number mono">6</div><div className="snapshot-label">Certifications</div></div>
                <div className="snapshot-card"><div className="snapshot-number mono">5</div><div className="snapshot-label">Issuing Organizations</div></div>
                <div className="snapshot-card"><div className="snapshot-number mono" style={{ fontSize: '20px' }}>Multiple</div><div className="snapshot-label">Engineering Domains</div></div>
                <div className="snapshot-card"><div className="snapshot-number mono" style={{ fontSize: '20px' }}>Ongoing</div><div className="snapshot-label">Continuous Learner</div></div>
              </div>

              {/* Cert Grid */}
              <div className="cert-grid" style={{ marginBottom: '72px' }}>
                {CERTIFICATIONS.map((c) => (
                  <div className="cert-card reveal" key={c.name}>
                    <div className="cert-card-image">
                      {c.image ? (
                        <img src={c.image} alt={c.name} loading="lazy" />
                      ) : (
                        'Certificate image — placeholder'
                      )}
                    </div>
                    <div className="cert-card-body">
                      <div className="cert-org">{c.organization}</div>
                      <h3 className="cert-name">{c.name}</h3>
                      <div className="cert-date mono">{c.date}</div>
                      <p className="cert-desc">{c.description}</p>
                      <div className="tag-row" style={{ marginBottom: '16px' }}>
                        {c.skills.slice(0, 3).map((s) => (
                          <span className="tag" key={s}>{s}</span>
                        ))}
                      </div>
                      <div className="cert-actions">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setActiveCert(c)}
                        >
                          Details
                        </button>
                        {c.verify ? (
                          <a href={c.verify} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                            Verify
                          </a>
                        ) : (
                          <span className="badge">Verification on file</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Learning Journey Timeline */}
              <p className="section-eyebrow reveal">Learning journey</p>
              <div style={{ marginBottom: '72px', maxWidth: '600px' }}>
                <div className="timeline reveal">
                  {LEARNING_JOURNEY_ORDER.map((name) => {
                    const cert = CERTIFICATIONS.find((c) => c.name === name);
                    if (!cert) return null;
                    return (
                      <div className="timeline-item" key={name}>
                        <div className="timeline-year mono">{cert.date}</div>
                        <div className="timeline-title">{cert.name}</div>
                        <div className="timeline-sub">{cert.organization}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Skills Gained Accordion */}
              <p className="section-eyebrow reveal">Skills gained</p>
              <div style={{ marginBottom: '72px' }}>
                {CERTIFICATIONS.map((c) => {
                  const isOpen = !!openSkillsGained[c.name];
                  return (
                    <div className="accordion reveal" key={c.name}>
                      <button
                        className="acc-header"
                        aria-expanded={isOpen}
                        onClick={() => toggleSkillsGained(c.name)}
                      >
                        <span>{c.name}</span>
                        <IconChevron />
                      </button>
                      {isOpen && (
                        <div className="acc-panel" style={{ maxHeight: '500px' }}>
                          <div className="acc-panel-inner">
                            <ul className="tl-list">
                              {c.skills.map((s) => (
                                <li key={s}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>


            </div>
          </section>

          {/* ============ HACKATHONS SECTION ============ */}
          <section className="section" id="hackathons">
            <div className="container">
              <p className="section-eyebrow reveal">Hackathons & Competitions</p>
              <h2 className="section-title reveal">Hackathons & Competitions</h2>
              <p className="section-sub reveal">
                National-level hackathons where ideas had to become working prototypes under real time pressure.
              </p>

              <div>
                {HACKATHONS.map((h) => {
                  const isOpen = !!openHackathons[h.name];
                  return (
                    <div className="tl-card reveal" key={h.name}>
                      <button
                        className="tl-card-header"
                        aria-expanded={isOpen}
                        onClick={() => toggleHackathon(h.name)}
                      >
                        <div className="tl-card-header-left">
                          <div className="tl-card-name">{h.name}</div>
                          <div className="tl-card-meta">{h.level} · {h.achievement}</div>
                        </div>
                        <IconChevron />
                      </button>
                      {isOpen && (
                        <div className="acc-panel" style={{ maxHeight: '1000px' }}>
                          <div className="tl-card-panel-inner">
                            {h.image && (
                              <div className="tl-photo">
                                <img src={h.image} alt={h.name} loading="lazy" />
                              </div>
                            )}
                            <p className="project-desc" style={{ marginBottom: '16px' }}>{h.overview}</p>
                            <div className="tag-row" style={{ marginBottom: '16px' }}>
                              <span className="badge badge-comp">Project: {h.project}</span>
                            </div>
                            <button
                              className="link-arrow"
                              onClick={() => openProjectCaseStudy(h.projectId)}
                            >
                              View {h.project} case study <IconArrowRight />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ============ TRAININGS SECTION ============ */}
          <section className="section" id="trainings">
            <div className="container">
              <p className="section-eyebrow reveal">Industrial Trainings</p>
              <h2 className="section-title reveal">Industrial Trainings</h2>
              <p className="section-sub reveal">
                Bridging classroom knowledge with real-world engineering through hands-on industrial exposure and professional technical training — railway electrical systems, renewable energy integration, smart grids, and modern power system technologies, learned directly from industry professionals.
              </p>

              <div className="snapshot-grid reveal" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '56px' }}>
                <div className="snapshot-card"><div className="snapshot-number mono">2</div><div className="snapshot-label">Training Programs</div></div>
                <div className="snapshot-card"><div className="snapshot-number mono">2</div><div className="snapshot-label">Industry Certificates</div></div>
                <div className="snapshot-card"><div className="snapshot-number mono" style={{ fontSize: '18px' }}>Railway</div><div className="snapshot-label">Engineering</div></div>
                <div className="snapshot-card"><div className="snapshot-number mono" style={{ fontSize: '18px' }}>Smart Grid</div><div className="snapshot-label">& Renewable Energy</div></div>
              </div>

              <div style={{ marginBottom: '40px' }}>
                {TRAININGS.map((t) => {
                  const isOpen = !!openTrainings[t.name];
                  return (
                    <div className="tl-card reveal" key={t.name}>
                      <button
                        className="tl-card-header"
                        aria-expanded={isOpen}
                        onClick={() => toggleTraining(t.name)}
                      >
                        <div className="tl-card-header-left">
                          <div className="tl-card-name">{t.name}</div>
                          <div className="tl-card-meta">{t.duration} · {t.type}</div>
                        </div>
                        <IconChevron />
                      </button>
                      {isOpen && (
                        <div className="acc-panel" style={{ maxHeight: '1500px' }}>
                          <div className="tl-card-panel-inner">
                            {(t.certificateImage || (t.images && t.images.length > 0)) && (
                              <div className="tl-photo-row">
                                {t.certificateImage && (
                                  <img src={t.certificateImage} alt={`${t.name} certificate`} loading="lazy" />
                                )}
                                {(t.images || []).map((im, idx) => (
                                  <img src={im} alt={`${t.name} detail ${idx + 1}`} key={idx} loading="lazy" />
                                ))}
                              </div>
                            )}
                            <p className="project-desc" style={{ marginBottom: '16px' }}>{t.overview}</p>
                            <div className="tl-grid">
                              <div>
                                <div className="tl-list-title">Key learnings</div>
                                <ul className="tl-list">
                                  {t.keyLearnings.map((k) => (
                                    <li key={k}>{k}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <div className="tl-list-title">Skills developed</div>
                                <ul className="tl-list">
                                  {t.skillsDeveloped.map((k) => (
                                    <li key={k}>{k}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <p className="card-body" style={{ marginBottom: '12px' }}>
                              <strong style={{ color: 'var(--text)' }}>Outcome:</strong> {t.outcome}
                            </p>
                            <div className="placeholder-note">
                              {t.organization}{t.association ? ` · with ${t.association}` : ''} · {t.certificateNo}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="placeholder-note reveal">
                These training programs complemented academic study with practical exposure to industrial environments and emerging technologies — strengthening technical knowledge, problem-solving ability, and readiness for future engineering challenges.
              </p>
            </div>
          </section>

          {/* ============ RESUME SECTION ============ */}
          <section className="section" id="resume">
            <div className="container text-center">
              <p className="section-eyebrow reveal">Career Documentation</p>
              <h2 className="section-title reveal">Curriculum Vitae & Resume</h2>
              <p className="section-sub reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                A comprehensive overview of education, technical skills, engineering projects, certifications, industrial training, and achievements — available in two formats.
              </p>
              <div className="resume-grid reveal">
                <div className="resume-card">
                  <svg className="resume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <path d="M14 2v6h6M9 13h6M9 17h6M9 9h1"/>
                  </svg>
                  <h3 className="resume-card-title">ATS-Friendly Resume</h3>
                  <p className="project-desc" style={{ marginBottom: '24px' }}>
                    A clean, single-column format built for applicant tracking systems — ideal for online job applications and recruiter portals.
                  </p>
                  <a href={SITE.resumeATS} className="btn btn-primary" download>
                    📄 Download ATS Resume
                  </a>
                </div>
                <div className="resume-card">
                  <svg className="resume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="13.5" cy="6.5" r="2.5"/>
                    <path d="M17.5 10a2.5 2.5 0 000 5H19a3 3 0 010 6H7a5 5 0 01-1-9.9A5 5 0 0110.5 3c1.5 0 2.8.7 3.7 1.8"/>
                  </svg>
                  <h3 className="resume-card-title">Visual Resume</h3>
                  <p className="project-desc" style={{ marginBottom: '24px' }}>
                    A designed, portfolio-style layout with photo and visual hierarchy — ideal for sharing directly with people and interviewers.
                  </p>
                  <a href={SITE.resumeVisual} className="btn btn-primary" download>
                    🎨 Download Visual Resume
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <div className="container" style={{ margin: '-40px 0 40px' }}>
            <div className="cta-banner reveal">
              <div className="cta-banner-inner">
                <h2>Let's build something together</h2>
                <p>Open to internships, collaborations, and conversations about electrical engineering, embedded systems, or power electronics.</p>
                <a href="#contact" className="btn btn-primary">Get in touch</a>
              </div>
            </div>
          </div>

          {/* ============ CONTACT SECTION ============ */}
          <section className="section" id="contact">
            <div className="container">
              <p className="section-eyebrow reveal">Contact</p>
              <h2 className="section-title reveal">Let's Connect</h2>
              <p className="section-sub reveal">
                Whether it's an engineering project, internship opportunity, research collaboration, or simply a conversation about technology — happy to connect.
              </p>

              <div className="contact-grid">
                <div className="reveal">
                  <div className="contact-info-item">
                    <IconMail />
                    <div>
                      <div className="contact-info-label">Email</div>
                      <a href={`mailto:${SITE.email}`} className="contact-info-value">{SITE.email}</a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <IconPhone />
                    <div>
                      <div className="contact-info-label">Phone</div>
                      <a href={`tel:${SITE.phone.replace(/\s+/g, '')}`} className="contact-info-value">{SITE.phone}</a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ color: 'var(--primary)', flexShrink: 0 }}>
                      <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10.6 8.9 10.2 8 10 7.5c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3z"/>
                      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2z"/>
                    </svg>
                    <div>
                      <div className="contact-info-label">WhatsApp</div>
                      <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="contact-info-value">Chat on WhatsApp</a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <IconPin />
                    <div>
                      <div className="contact-info-label">Location</div>
                      <div className="contact-info-value">{SITE.location}</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <IconLinkedin />
                    <div>
                      <div className="contact-info-label">LinkedIn</div>
                      <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="contact-info-value">View Profile</a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <IconGithub />
                    <div>
                      <div className="contact-info-label">GitHub</div>
                      {SITE.github ? (
                        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="contact-info-value">View Profile</a>
                      ) : (
                        <div className="contact-info-value">Coming soon</div>
                      )}
                    </div>
                  </div>
                </div>

                <form className="reveal" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="cf-name">Name</label>
                    <input type="text" id="cf-name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-email">Email</label>
                    <input type="email" id="cf-email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-subject">Subject</label>
                    <input type="text" id="cf-subject" name="subject" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-message">Message</label>
                    <textarea id="cf-message" name="message" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                  <p className="placeholder-note mt-24">
                    Direct message routed to karanmendhe2025@gmail.com.
                  </p>
                </form>
              </div>

              <div className="quote-block reveal mt-24">
                <p>Engineering is about solving real-world problems through curiosity, creativity, and continuous learning.</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <KaranLogoStamp />
              <div>
                <div className="logo" style={{ fontSize: '18px' }}><span className="logo-mark">{SITE.initials}</span> <span>{SITE.name}</span></div>
                <p className="footer-tagline">{SITE.tagline}</p>
              </div>
            </div>
            <div className="footer-col">
              <h5>Quick Links</h5>
              <div>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#skills">Skills</a>
                <a href="#certifications">Certifications</a>
                <a href="#hackathons">Hackathons</a>
                <a href="#trainings">Trainings</a>
                <a href="#resume">Resume</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            <div className="footer-col">
              <h5>Projects</h5>
              <div>
                {PROJECTS.map((p) => (
                  <a key={p.id} href="#projects" onClick={() => openProjectCaseStudy(p.id)}>
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h5>Connect</h5>
              <div>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={`mailto:${SITE.email}`}>Email</a>
                {SITE.github && <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">
              © {new Date().getFullYear()} {SITE.name}. Designed and developed by {SITE.name}.
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top float button */}
      <a
        href="#home"
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        id="backToTop"
        aria-label="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>

      {/* WhatsApp float button */}
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`}
        id="whatsappFloat"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
          <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10.6 8.9 10.2 8 10 7.5c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3z"/>
          <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2z"/>
        </svg>
        <span className="whatsapp-label">Connect on WhatsApp</span>
      </a>

      {/* Full-screen Case Study Overlay */}
      {activeProject && (
        <div className="project-expanded open" id={`expanded-${activeProject.id}`}>
          <button
            className="back-to-projects"
            onClick={() => setActiveProject(null)}
          >
            <IconArrowLeft /> Back to Projects
          </button>
          <div className="project-expanded-inner">
            <div className="case-hero">
              <div className="case-hero-badges">
                <span className="badge badge-status">{activeProject.status}</span>
                <span className="badge badge-comp">{activeProject.competition}</span>
                {activeProject.techTags.map((t) => (
                  <span className="badge" key={t}>{t}</span>
                ))}
              </div>
              <h1>{activeProject.name}</h1>
              <p className="case-hero-tagline">{activeProject.tagline}</p>
              <p className="project-desc" style={{ maxWidth: '680px' }}>
                {activeProject.heroNote || activeProject.shortDescription}
              </p>
              {activeProject.heroImage && (
                <div className="case-hero-image">
                  <img src={activeProject.heroImage} alt={activeProject.name} />
                </div>
              )}
            </div>

            {/* Case Study Sections */}
            {activeProject.sections.map((section: ProjectSection, index: number) => {
              const numStr = String(index + 1).padStart(2, '0');
              return (
                <div className="case-section" key={index}>
                  <h2 className="case-section-title">
                    <span className="num mono">{numStr}</span> {section.title}
                  </h2>

                  {section.type === 'narrative' && (
                    <div>
                      {section.subtitle && <p className="section-sub">{section.subtitle}</p>}
                      {(section.body || []).map((p, pIdx) => (
                        <p className="project-desc" style={{ maxWidth: '720px' }} key={pIdx}>{p}</p>
                      ))}
                      {section.chips && (
                        <div className="tag-row" style={{ marginTop: '16px' }}>
                          {section.chips.map((c) => (
                            <span className="tag" key={c}>{c}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {section.type === 'highlights' && (
                    <div className="card-grid">
                      {(section.items || []).map((i, iIdx) => (
                        <div className="card" key={iIdx}>
                          <div className="mono" style={{ fontSize: '22px', color: 'var(--primary)', marginBottom: '6px' }}>
                            {i.value}
                          </div>
                          <div className="card-body">{i.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(section.type === 'features' || section.type === 'applications' || section.type === 'roadmap') && (
                    <div className="card-grid">
                      {(section.items || []).map((f, fIdx) => (
                        <div className="card" key={fIdx}>
                          <div className="card-title" style={{ fontSize: '14.5px', margin: 0 }}>
                            {typeof f === 'string' ? f : f.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === 'hardware' && (
                    <div>
                      <div className="card-grid">
                        {(section.items || []).map((h, hIdx) => (
                          <div className="card" key={hIdx}>
                            <div className="card-title" style={{ fontSize: '14px', margin: 0 }}>{h}</div>
                          </div>
                        ))}
                      </div>
                      {section.note && <p className="placeholder-note mt-24">{section.note}</p>}
                    </div>
                  )}

                  {section.type === 'architecture' && (
                    <div>
                      {section.groups && section.groups.some((g) => typeof g !== 'string' && g.image) ? (
                        <div className="arch-diagram-grid">
                          {section.groups.filter((g) => typeof g !== 'string' && g.image).map((g, gIdx) => (
                            <div className="arch-diagram-photo" key={gIdx}>
                              <img src={g.image} alt={g.label} loading="lazy" />
                              <span className="gallery-caption">{g.label}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="arch-diagram">System architecture diagram</div>
                      )}
                      <div className="arch-grid">
                        {(section.groups || []).map((g, gIdx) => (
                          <div className="arch-block" key={gIdx}>
                            {typeof g === 'string' ? g : g.label}
                          </div>
                        ))}
                      </div>
                      {section.note && <p className="flag-note mt-24">{section.note}</p>}
                    </div>
                  )}

                  {section.type === 'timeline' && (
                    <div className="timeline">
                      {(section.steps || []).map((step, sIdx) => (
                        <div className="timeline-item" key={sIdx}>
                          <div className="timeline-year mono">{String(sIdx + 1).padStart(2, '0')}</div>
                          <div className="timeline-title">{step}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === 'challenges' && (
                    <div className="challenge-grid">
                      {(section.pairs || []).map((pair, pIdx) => (
                        <div className="challenge-card" key={pIdx}>
                          <div className="challenge-label c mono">CHALLENGE</div>
                          <div className="challenge-text">{pair.challenge}</div>
                          <div className="challenge-label s mono">SOLUTION</div>
                          <div className="challenge-text">{pair.solution}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === 'contributions' && (
                    <div className="contrib-grid">
                      <div className="contrib-illustration"><IconChip /></div>
                      <div className="contrib-list">
                        {(section.items || []).map((item, iIdx) => (
                          <div className="contrib-item" key={iIdx}>{item}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.type === 'team' && (
                    <div>
                      <div className="team-grid">
                        {(section.members || []).map((member, mIdx) => (
                          <div className={`team-card ${mIdx === 0 ? 'lead' : ''}`} key={mIdx}>
                            <div className="team-avatar mono">
                              {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                            </div>
                            <div className="team-name">{member.name}</div>
                            <div className="team-role">{member.role}</div>
                          </div>
                        ))}
                      </div>
                      {section.note && <p className="flag-note mt-24">{section.note}</p>}
                    </div>
                  )}

                  {section.type === 'impact' && (
                    <div className="impact-split">
                      <div className="impact-card">
                        <h4>Social Impact</h4>
                        <p>{section.social}</p>
                      </div>
                      <div className="impact-card">
                        <h4>Industrial Impact</h4>
                        <p>{section.industrial}</p>
                      </div>
                    </div>
                  )}

                  {section.type === 'gallery' && (
                    <div className="gallery-grid">
                      {(section.groups || []).map((g, gIdx) => {
                        const label = typeof g === 'string' ? g : g.label;
                        const img = typeof g === 'string' ? null : g.image;
                        return img ? (
                          <div className="gallery-slot has-photo" key={gIdx}>
                            <img src={img} alt={label} loading="lazy" />
                            <span className="gallery-caption">{label}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  {section.type === 'lessons' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '760px' }}>
                      {(section.body || []).map((l, lIdx) => (
                        <p className="project-desc" style={{ margin: 0 }} key={lIdx}>{l}</p>
                      ))}
                    </div>
                  )}

                  {section.type === 'quote' && (
                    <div className="quote-block">
                      <p>{section.text}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certification Detail Modal Overlay */}
      {activeCert && (
        <div className="modal-overlay open" onClick={() => setActiveCert(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCert(null)}>
              <IconX />
            </button>
            {activeCert.image && (
              <img src={activeCert.image} alt={activeCert.name} className="modal-cert-image" />
            )}
            <div className="cert-org">{activeCert.organization}</div>
            <h3 style={{ fontSize: '21px', margin: '6px 0 4px' }}>{activeCert.name}</h3>
            <div className="cert-date mono" style={{ marginBottom: '18px' }}>{activeCert.date}</div>
            <p className="project-desc" style={{ marginBottom: '18px' }}>{activeCert.description}</p>
            <div className="tl-list-title">Skills learned</div>
            <div className="tag-row" style={{ marginBottom: '20px' }}>
              {activeCert.skills.map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
            {activeCert.certCode && (
              <div className="placeholder-note" style={{ fontStyle: 'normal', marginBottom: '6px' }}>
                Certificate code: {activeCert.certCode}
              </div>
            )}
            {activeCert.validationCode && (
              <div className="placeholder-note" style={{ fontStyle: 'normal', marginBottom: '6px' }}>
                Validation code: {activeCert.validationCode}
              </div>
            )}
            {activeCert.verify && (
              <a href={activeCert.verify} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-24">
                Verify certificate <IconArrowRight />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
