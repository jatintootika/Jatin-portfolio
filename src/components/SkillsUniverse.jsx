import { useEffect, useRef, useState } from 'react';
import './styles/SkillsUniverse.css';

const SKILLS = [
  { name: 'Python', orbit: 1, angle: 0, size: 'lg', color: '#8b5cf6' },
  { name: 'TensorFlow', orbit: 2, angle: 45, size: 'md', color: '#a78bfa' },
  { name: 'PyTorch', orbit: 2, angle: 180, size: 'md', color: '#7c3aed' },
  { name: 'React', orbit: 3, angle: 90, size: 'md', color: '#c4b5fd' },
  { name: 'OpenCV', orbit: 3, angle: 220, size: 'sm', color: '#a78bfa' },
  { name: 'Scikit-Learn', orbit: 1, angle: 180, size: 'md', color: '#7c3aed' },
  { name: 'Pandas', orbit: 4, angle: 30, size: 'sm', color: '#8b5cf6' },
  { name: 'NumPy', orbit: 4, angle: 150, size: 'sm', color: '#c4b5fd' },
  { name: 'Flask', orbit: 3, angle: 320, size: 'sm', color: '#a78bfa' },
  { name: 'Git', orbit: 4, angle: 270, size: 'sm', color: '#7c3aed' },
  { name: 'Docker', orbit: 5, angle: 60, size: 'sm', color: '#8b5cf6' },
  { name: 'SQL', orbit: 5, angle: 200, size: 'sm', color: '#c4b5fd' },
];

const ORBIT_RADII = [0, 110, 190, 270, 350, 430];

export default function SkillsUniverse() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-container">
        <div className="skills-label">
          <span className="skills-label-tag">EXPERTISE</span>
          <h2 className="skills-heading">Skills Universe</h2>
          <p className="skills-subtext">
            A cinematic constellation of my tech stack.
          </p>
        </div>

        <div className={`skills-3d-viewport ${isVisible ? 'skills-3d-viewport--visible' : ''}`}>
          <div className="skills-galaxy">
            
            {/* Draw 3D orbit rings */}
            {ORBIT_RADII.map((r, i) => {
              if (i === 0) return null;
              return (
                <div 
                  key={i} 
                  className="skills-orbit-ring"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    opacity: 0.15 - (i * 0.02)
                  }}
                />
              );
            })}

            {/* Center core */}
            <div className="skills-core-3d">
              <div className="skills-core-glow"></div>
              {hoveredSkill ? (
                <span className="skills-core-text skills-core-text--active">{hoveredSkill}</span>
              ) : (
                <span className="skills-core-text">JATIN</span>
              )}
            </div>

            {/* Skill nodes in 3D */}
            {SKILLS.map((skill, i) => {
              const r = ORBIT_RADII[skill.orbit];
              const angleRad = (skill.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * r;
              const y = Math.sin(angleRad) * r;

              return (
                <div
                  key={skill.name}
                  className={`skill-node-3d skill-node-3d--${skill.size} ${hoveredSkill === skill.name ? 'skill-node-3d--hovered' : ''}`}
                  style={{
                    '--x': `${x}px`,
                    '--y': `${y}px`,
                    '--color': skill.color,
                    '--delay': `${i * 0.1}s`
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="skill-node-inner">
                    <span className="skill-node-label-3d">{skill.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
