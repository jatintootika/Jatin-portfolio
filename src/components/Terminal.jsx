import { useState, useEffect, useRef } from 'react';
import './styles/Terminal.css';

const PROJECTS = [
  {
    id: 'health-ai',
    name: 'Health AI Website',
    tag: 'AI / Healthcare',
    desc: 'AI-driven platform for predictive healthcare and intelligent diagnostics. Takes patient data, runs it through trained ML models, and delivers actionable insights.',
    tech: ['Python', 'TensorFlow', 'React', 'Flask'],
    status: 'DEPLOYED',
  },
  {
    id: 'drone-sim',
    name: 'Drone Simulator',
    tag: 'Simulation / Physics',
    desc: 'Real-time physics engine for drone flight simulation. Tests autonomous pathing algorithms without risking hardware. Includes reinforcement learning navigation.',
    tech: ['Python', 'OpenCV', 'RL', 'NumPy'],
    status: 'DEPLOYED',
  },
  {
    id: 'whatsapp-bot',
    name: 'WhatsApp Bot',
    tag: 'Automation / NLP',
    desc: 'Automated conversational agent with multi-turn dialogue support. Understands context, handles intent classification, and responds naturally.',
    tech: ['Python', 'Twilio', 'NLP', 'REST API'],
    status: 'ACTIVE',
  },
  {
    id: 'insta-bot',
    name: 'Instagram Bot',
    tag: 'Social Media / Analytics',
    desc: 'Engagement automation and analytics pipeline. Tracks content performance, schedules posts, and handles multi-account management.',
    tech: ['Python', 'Selenium', 'Analytics', 'Cron'],
    status: 'ACTIVE',
  },
];

const BOOT_LINES = [
  { text: '> initializing jatin_portfolio v2.0...', delay: 0 },
  { text: '> loading project database...', delay: 400 },
  { text: '> establishing neural link...', delay: 800 },
  { text: '> connection secured. type a command or click a project.', delay: 1200 },
  { text: '', delay: 1600 },
];

export default function Terminal() {
  const [bootDone, setBootDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const termBodyRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
        if (i === BOOT_LINES.length - 1) setBootDone(true);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [visibleLines, typedText, activeProject]);

  // Type-out effect for project details
  function showProject(project) {
    setActiveProject(project);
    setIsTyping(true);
    setTypedText('');

    const fullText = `\n> project --load ${project.id}\n\n  PROJECT: ${project.name}\n  CATEGORY: ${project.tag}\n  STATUS: ${project.status}\n\n  ${project.desc}\n\n  STACK: ${project.tech.join(' / ')}\n`;

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setTypedText(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12);
  }

  return (
    <section className="terminal-section" id="projects">
      <div className="terminal-container">
        <div className="terminal-label">
          <span className="terminal-label-tag">PROJECTS</span>
          <h2 className="terminal-heading">What I Built</h2>
          <p className="terminal-subtext">
            Click a project or watch the terminal boot up.
          </p>
        </div>

        <div className="terminal-layout">
          {/* Project list */}
          <div className="terminal-sidebar">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                className={`terminal-project-btn ${activeProject?.id === p.id ? 'terminal-project-btn--active' : ''}`}
                onClick={() => showProject(p)}
              >
                <div className="terminal-project-btn-top">
                  <span className="terminal-project-name">{p.name}</span>
                  <span className={`terminal-status terminal-status--${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </div>
                <span className="terminal-project-tag">{p.tag}</span>
              </button>
            ))}
          </div>

          {/* Terminal window */}
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="terminal-dots">
                <span className="terminal-dot terminal-dot--red"></span>
                <span className="terminal-dot terminal-dot--yellow"></span>
                <span className="terminal-dot terminal-dot--green"></span>
              </div>
              <span className="terminal-titlebar-text">jatin@portfolio:~</span>
              <div className="terminal-titlebar-spacer"></div>
            </div>
            <div className="terminal-body" ref={termBodyRef}>
              {visibleLines.map((line, i) => (
                <div key={i} className="terminal-line">
                  {line === '' ? '\u00A0' : line}
                </div>
              ))}
              {typedText && (
                <pre className="terminal-output">{typedText}
                  {isTyping && <span className="terminal-cursor">_</span>}
                </pre>
              )}
              {bootDone && !typedText && (
                <div className="terminal-line terminal-prompt">
                  <span className="terminal-prompt-symbol">{'>'}</span>
                  <span className="terminal-cursor">_</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
