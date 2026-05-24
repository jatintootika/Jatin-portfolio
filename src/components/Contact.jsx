import { useRef, useEffect, useState } from 'react';
import './styles/Contact.css';
import { IconGithub, IconLinkedin, IconTwitter, IconInstagram } from './Icons';

export default function Contact() {
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
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">
        
        <div className={`contact-content ${isVisible ? 'contact-content--visible' : ''}`}>
          <div className="contact-info">
            <span className="contact-tag">COMMUNICATION</span>
            <h2 className="contact-title">Let's Build Something</h2>
            <p className="contact-desc">
              Whether you have a question, a project idea, or just want to chat about AI, my inbox is always open. I'll try my best to get back to you!
            </p>
            
            <a href="mailto:jatin@example.com" className="contact-email">
              hello@jatin.ai
            </a>

            <div className="contact-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <IconGithub />
              </a>
              <a href="https://www.linkedin.com/in/jatin-tootika-8a1534405?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <IconLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <IconTwitter />
              </a>
              <a href="https://www.instagram.com/umm.jatzx_?igsh=MWlhb2tla3RuY3QxaQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconInstagram />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message feature coming soon!'); }}>
            <div className="form-group">
              <input type="text" id="name" required placeholder=" " />
              <label htmlFor="name">Your Name</label>
              <div className="form-line"></div>
            </div>
            
            <div className="form-group">
              <input type="email" id="email" required placeholder=" " />
              <label htmlFor="email">Your Email</label>
              <div className="form-line"></div>
            </div>
            
            <div className="form-group">
              <textarea id="message" required rows="4" placeholder=" "></textarea>
              <label htmlFor="message">Your Message</label>
              <div className="form-line"></div>
            </div>

            <button type="submit" className="contact-submit">
              <span>Send Message</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
        
        <div className="contact-footer">
          <p>© {new Date().getFullYear()} Jatin. All rights reserved.</p>
          <p>Designed by Jatin</p>
        </div>

      </div>
    </section>
  );
}
