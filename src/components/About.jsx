import { useRef, useEffect, useState } from 'react';
import './styles/About.css';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        
        <div className="about-header">
          <span className="about-tag">IDENTIFICATION</span>
          <h2 className="about-title">About the Architect</h2>
        </div>

        <div className={`about-grid ${isVisible ? 'about-grid--visible' : ''}`}>
          
          {/* Main Bio Card */}
          <div className="about-card about-card--large">
            <div className="about-card-inner">
              <h3 className="about-card-title">Who I Am</h3>
              <p className="about-text">
                I'm an AI & Machine Learning Engineer focused on bridging the gap between theoretical models and production-ready applications. 
                My expertise lies in building intelligent systems that can process complex data, run predictive analytics, and automate high-level tasks.
              </p>
              <p className="about-text">
                When I'm not training models, I'm usually exploring new architectures, optimizing deployment pipelines, or building full-stack interfaces to make AI accessible to end-users.
              </p>
            </div>
            <div className="about-glow"></div>
          </div>

          {/* Stats Card */}
          <div className="about-card about-card--stats">
            <div className="about-card-inner">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Models Deployed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Accuracy Target</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Systems Running</span>
              </div>
            </div>
          </div>

          {/* Philosophy Card */}
          <div className="about-card about-card--quote">
            <div className="about-card-inner">
              <div className="quote-icon">"</div>
              <p className="quote-text">
                "Data is just noise until you give it a purpose. My job is to find the signal and build systems that listen."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
