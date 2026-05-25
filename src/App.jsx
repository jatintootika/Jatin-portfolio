import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { IconLaptop, IconGithub, IconLinkedin, IconTwitter, IconInstagram, IconJLogo } from './components/Icons';
import JatinBot from './components/JatinBot';
import Terminal from './components/Terminal';
import SkillsUniverse from './components/SkillsUniverse';
import Timeline from './components/Timeline';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

const ROBOT_SCENE = 'https://prod.spline.design/i7I0kVdoRd4Nwaja/scene.splinecode';
const PROJECTS_SCENE = 'https://prod.spline.design/DXoC1uJx2K9Z65Zv/scene.splinecode';

const CYCLE_ROLES = [
  { sub: 'A Passionate', outline: 'Data Scientist', solid: 'Engineer' },
  { sub: 'AI & ML', outline: 'Deep Learning', solid: 'Specialist' },
  { sub: 'Full Stack', outline: 'Python', solid: 'Developer' },
  { sub: 'Future Tech', outline: 'Intelligent', solid: 'Innovator' }
];

/* ── SVG Icon Components ───────── */
function IconPython() {
  return (
    <svg width="14" height="14" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
      <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="#8b5cf6"/>
      <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.519 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="#a78bfa"/>
    </svg>
  );
}

function IconTensorflow() {
  return (
    <svg width="14" height="14" viewBox="0 0 256 274" xmlns="http://www.w3.org/2000/svg">
      <path d="M145.726 42.065v42.07l72.861 42.07v-42.07l-72.861-42.07zM0 84.135l109.589 63.1v127.569l-36.528-21.036v-84.494L36.53 190.31v42.034L0 211.309V84.135zm109.589 63.1L145.726 126.2v84.527l36.529-21.035V147.66l36.529 21.035v84.494l-36.529 21.036-72.666-42.002V147.235z" fill="#8b5cf6"/>
    </svg>
  );
}

function IconReact() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.5" fill="#a78bfa"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#8b5cf6" strokeWidth="1"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#8b5cf6" strokeWidth="1" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#8b5cf6" strokeWidth="1" transform="rotate(120 12 12)"/>
    </svg>
  );
}

function IconPyTorch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.005 0L4.952 7.053a9.865 9.865 0 0 0 0 13.94 9.866 9.866 0 0 0 13.94 0 9.865 9.865 0 0 0 0-13.94l-3.005 3.005a5.441 5.441 0 0 1 0 7.702 5.439 5.439 0 0 1-7.701 0 5.44 5.44 0 0 1 0-7.702L14.2 6.05l2.61-2.61-1.46-1.46L12.005 0zm3.537 5.263a1.115 1.115 0 1 0 0 2.23 1.115 1.115 0 0 0 0-2.23z" fill="#8b5cf6"/>
    </svg>
  );
}

function IconOpenCV() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="8" r="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5"/>
      <circle cx="17" cy="8" r="4" fill="none" stroke="#a78bfa" strokeWidth="1.5"/>
      <circle cx="12" cy="17" r="4" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
    </svg>
  );
}

function IconSklearn() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z" fill="none" stroke="#8b5cf6" strokeWidth="1"/>
      <path d="M6 6l12 12M18 6L6 18" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}


function IconResume() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function AnnotationArrow() {
  return (
    <div className="annotation-arrow">
      <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 60 C 15 20, 50 5, 75 15"
          stroke="url(#arrow-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="4 4"
        />
        <polygon points="75,10 78,18 70,16" fill="#a78bfa" />
        <defs>
          <linearGradient id="arrow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Kill Spline watermark aggressively ─── */
function useKillSplineWatermark() {
  useEffect(() => {
    const kill = () => {
      // 1. Target standard DOM elements
      const selectors = [
        'a[href*="spline.design"]',
        '[data-logo="spline"]',
        'a[href="https://spline.design"]',
        'a[href="https://spline.design/"]',
        '#logo',
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          el.remove();
        });
      });

      // 2. Traversal of Shadow Roots to completely eliminate watermarks
      const allNodes = document.querySelectorAll('*');
      allNodes.forEach((el) => {
        if (el.shadowRoot) {
          const shadowLogo = el.shadowRoot.querySelector('#logo') || el.shadowRoot.querySelector('a[href*="spline.design"]');
          if (shadowLogo) {
            shadowLogo.remove();
          }

          // Inject CSS into shadow root to make sure it can never render
          if (!el.shadowRoot.querySelector('#anti-spline-style')) {
            const style = document.createElement('style');
            style.id = 'anti-spline-style';
            style.textContent = `
              #logo, a[href*="spline.design"], [data-logo="spline"], a[href*="spline"], #logo a {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                width: 0 !important;
                height: 0 !important;
              }
            `;
            el.shadowRoot.appendChild(style);
          }
        }
        
        // 3. Brute force text content match for logo containers
        if ((el.tagName === 'A' || el.tagName === 'DIV') && el.textContent) {
          if (el.textContent === 'Built with Spline') {
            el.style.display = 'none !important';
            el.remove();
          }
        }
      });
    };

    // Run immediately and on high frequency interval
    kill();
    const interval = setInterval(kill, 300);

    // Observe DOM mutations to catch asynchronous loading
    const observer = new MutationObserver(() => {
      kill();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);
}

function App() {
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Aggressively remove Spline watermark
  useKillSplineWatermark();

  // Cycle the dual stack roles on the right side of the screen
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % CYCLE_ROLES.length);
        setFadeState('fade-in');
      }, 400);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { label: 'Python', Icon: IconPython },
    { label: 'TensorFlow', Icon: IconTensorflow },
    { label: 'React', Icon: IconReact },
    { label: 'PyTorch', Icon: IconPyTorch },
    { label: 'OpenCV', Icon: IconOpenCV },
    { label: 'Scikit-Learn', Icon: IconSklearn },
  ];

  const { scrollYProgress } = useScroll();
  
  // Transform values for scroll animation
  // Robot scales down, stays visible in About Me (y progress 0 to 0.45), then fades out before Projects (0.45 to 0.55)
  const robotScale = useTransform(scrollYProgress, [0, 0.25], [0.85, 0.55]);
  const robotY = useTransform(scrollYProgress, [0, 0.25], ['-50%', '0%']);
  const robotX = useTransform(scrollYProgress, [0, 0.25], ['-50%', '10%']);
  const robotOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Projects Scene (loads in the 3rd view)
  const projectsSceneOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const projectsSceneY = useTransform(scrollYProgress, [0.45, 0.55], ['10%', '0%']);

  return (
    <div className="portfolio-container">
      {/* ─── HERO SECTION ──────────────────────── */}
      <section className="landing-page relative">

      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb--purple"></div>
        <div className="ambient-orb ambient-orb--pink"></div>
        <div className="ambient-orb ambient-orb--cyan"></div>
        <div className="ambient-grid"></div>
      </div>

      {/* Floating Vertical Social Sidebar on Far Left */}
      <div className="social-sidebar">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-sidebar-link" aria-label="GitHub">
          <IconGithub />
        </a>
        <a href="https://www.linkedin.com/in/jatin-tootika-8a1534405?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="social-sidebar-link" aria-label="LinkedIn">
          <IconLinkedin />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-sidebar-link" aria-label="Twitter">
          <IconTwitter />
        </a>
        <a href="https://www.instagram.com/umm.jatzx_?igsh=MWlhb2tla3RuY3QxaQ==" target="_blank" rel="noopener noreferrer" className="social-sidebar-link" aria-label="Instagram">
          <IconInstagram />
        </a>
      </div>

      {/* Top Header Navigation */}
      <header className="topbar-modern">
        <div className="brand-logo-container" onClick={() => setShowEmailModal(true)} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
          <div className="brand-logo-box flex items-center justify-center">
            <IconJLogo size={24} className="text-white relative z-10" />
            <span className="brand-logo-dot"></span>
          </div>
        </div>
        <nav className="navigation-links-container">
          <a href="#about" className="nav-modern-link">ABOUT</a>
          <a href="#projects" className="nav-modern-link">WORK</a>
          <a href="#contact" className="nav-modern-link">CONTACT</a>
        </nav>
      </header>

      {/* ─── HERO — 3-Column Cinematic Grid ──────── */}
      <div className="hero-modern-grid">
        
        {/* 1. Left Column: Typography & Actions */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="hero-modern-left"
        >
          <p className="hero-purple-eyebrow">Hello! I'm</p>
          <h1 className="hero-modern-name">JATIN</h1>
          
          <p className="hero-modern-description">
            I build intelligent systems that see, learn, and predict. Passionate about transforming
            raw data into powerful AI-driven solutions — from computer vision pipelines
            to production-ready ML models.
          </p>

          <div className="hero-modern-actions">
            <a href="#contact" className="btn-modern-primary inline-flex items-center justify-center no-underline">
              Get In Touch
            </a>
            <a href="#projects" className="btn-modern-secondary inline-flex items-center justify-center no-underline">
              View Projects
            </a>
          </div>

          <div className="tech-stack-pills-container">
            {techStack.map((tech) => (
              <span key={tech.label} className="tech-modern-pill">
                <tech.Icon /> {tech.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 2. Center Column: Ambient Backing Aura (Fades with Hero) */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="hero-modern-center pointer-events-none">
          <div className="center-aura-glowing-circle"></div>

          {/* Floating dynamic arrow pointing from bubble to model */}
          <div className="robot-annotation-modern pointer-events-auto">
            <AnnotationArrow />
            <div className="annotation-bubble-modern">
              <p className="annotation-bubble-text">
                Hi! I am <span className="highlight">Jatin</span> —<br />
                AI & ML Engineer
              </p>
            </div>
          </div>
        </motion.div>

        {/* The 3D Objects are rendered independently of the fading hero content so they persist */}
        <motion.div 
          style={{ 
            scale: robotScale,
            y: robotY,
            x: robotX,
            opacity: robotOpacity
          }}
          className="robot-modern-wrapper origin-center z-10 pointer-events-auto"
        >
          <div className={`scene-loading-state ${robotLoaded ? 'loaded' : ''}`}>
            <div className="loader-ring"></div>
            <span className="loader-label">Initializing 3D Module...</span>
          </div>

          <Suspense fallback={null}>
            <Spline scene={ROBOT_SCENE} onLoad={() => setRobotLoaded(true)} />
          </Suspense>
          
          <div className="watermark-hider-overlay"></div>
        </motion.div>

        {/* 3. Right Column: Rotating Stacked Roles */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="hero-modern-right">
          <div className={`dynamic-stacked-role-container ${fadeState}`}>
            <p className="hero-purple-eyebrow">{CYCLE_ROLES[roleIndex].sub}</p>
            <div className="role-word-outline">{CYCLE_ROLES[roleIndex].outline}</div>
            <div className="role-word-solid">{CYCLE_ROLES[roleIndex].solid}</div>
          </div>
        </motion.div>

      </div>
      </section>

      {/* Email Popover Window (Google-style) */}
      <AnimatePresence>
        {showEmailModal && (
          <div 
            className="fixed inset-0 z-[999] pointer-events-auto"
            onClick={() => setShowEmailModal(false)}
          >
            {/* The invisible backdrop captures clicks to close, but doesn't darken the screen */}
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-[80px] left-[48px] bg-[#0f081c] border border-purple-500/20 rounded-2xl p-6 w-[320px] shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(139,92,246,0.1)] overflow-hidden"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-[2px] shadow-lg">
                  <div className="w-full h-full rounded-full bg-[#0f081c] flex items-center justify-center relative">
                    <IconJLogo size={32} className="text-white" />
                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-purple-400 rounded-full border-2 border-[#0f081c]"></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide leading-tight">Jatin</h3>
                  <p className="text-white/50 text-xs font-mono tracking-wider">AI & ML Engineer</p>
                </div>
                
                <div className="w-full h-px bg-white/5 my-2"></div>
                
                <a 
                  href="mailto:jatintootikaaa0@gmail.com" 
                  className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-colors rounded-xl py-3 px-4 text-purple-300 font-mono text-xs tracking-wide w-full flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  jatintootikaaa0@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <About />

      {/* Skills Universe */}
      <SkillsUniverse />

      {/* Terminal Projects */}
      <Terminal />

      {/* Journey Timeline */}
      <Timeline />

      {/* Contact Section */}
      <Contact />

      {/* Floating Resume Trigger (Bottom-Right) */}
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="floating-resume-trigger" aria-label="View Resume">
        RESUME
        <IconResume />
      </a>

      {/* Chat with Jatin */}
      <JatinBot />

    </div>
  );
}

export default App;
