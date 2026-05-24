import { useEffect, useRef, useState } from 'react';
import './styles/Timeline.css';

const MILESTONES = [
  {
    year: '2021',
    title: 'The Spark',
    desc: 'Started learning Python and fell into the data science rabbit hole. First scripts, first bugs, first breakthroughs.',
    metric: 'Python',
    value: 30,
  },
  {
    year: '2022',
    title: 'Going Deeper',
    desc: 'Dove into machine learning and deep learning. Built first neural networks with TensorFlow. Started working with real datasets.',
    metric: 'ML Models',
    value: 55,
  },
  {
    year: '2023',
    title: 'Building Real Things',
    desc: 'Shipped the Health AI platform and Drone Simulator. Learned what it takes to move from a notebook to a working product.',
    metric: 'Projects',
    value: 75,
  },
  {
    year: '2024',
    title: 'Full Stack AI',
    desc: 'Combined ML with full-stack development. Built automation bots, deployed models to production, and started working with computer vision.',
    metric: 'Expertise',
    value: 88,
  },
  {
    year: 'NOW',
    title: 'Pushing Boundaries',
    desc: 'Working on cutting-edge AI systems. Exploring reinforcement learning, advanced CV pipelines, and scalable ML infrastructure.',
    metric: 'Growth',
    value: 95,
  },
];

export default function Timeline() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger reveal milestones
          MILESTONES.forEach((_, i) => {
            setTimeout(() => setActiveIndex(i), 300 + i * 250);
          });
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline-section" id="journey" ref={sectionRef}>
      <div className="timeline-container">
        <div className="timeline-label">
          <span className="timeline-label-tag">JOURNEY</span>
          <h2 className="timeline-heading">The Path So Far</h2>
          <p className="timeline-subtext">
            From first line of code to production AI systems.
          </p>
        </div>

        <div className={`timeline-track ${isVisible ? 'timeline-track--visible' : ''}`}>
          {/* Vertical progress line */}
          <div className="timeline-line">
            <div
              className="timeline-line-fill"
              style={{ height: isVisible ? '100%' : '0%' }}
            />
          </div>

          {MILESTONES.map((m, i) => (
            <div
              key={m.year}
              className={`timeline-item ${i <= activeIndex ? 'timeline-item--visible' : ''} ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
            >
              {/* Connector dot */}
              <div className="timeline-dot">
                <div className="timeline-dot-inner" />
              </div>

              {/* Card */}
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <span className="timeline-year">{m.year}</span>
                  <h3 className="timeline-title">{m.title}</h3>
                </div>
                <p className="timeline-desc">{m.desc}</p>

                {/* Data bar */}
                <div className="timeline-bar-container">
                  <div className="timeline-bar-label">
                    <span>{m.metric}</span>
                    <span className="timeline-bar-value">{m.value}%</span>
                  </div>
                  <div className="timeline-bar-track">
                    <div
                      className="timeline-bar-fill"
                      style={{ width: i <= activeIndex ? `${m.value}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
