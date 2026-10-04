import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaXmark } from 'react-icons/fa6';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Add smooth scrolling ONLY after the initial load jump
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const message = formData.get('message');
    const mailtoLink = `mailto:sathvikasanem3@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  const navLinks = (
    <>
      <a href="#home" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
      <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
      <a href="#education" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Education</a>
      <a href="#skills" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
      <a href="#achievements" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Achievements</a>
      <a href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
      <a href="#contact" className="nav-link active" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
    </>
  );

  return (
    <>
      <motion.header className="header" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
        <div className="logo">
          Sathvika<span className="highlight-red">.</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="nav-links">
          {navLinks}
        </nav>

        {/* Mobile Toggle */}
        <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
        </div>
      </motion.header>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="home" className="hero">
        <div className="hero-static-img-wrapper">
          <motion.img src="/character-image.png" alt="Character" className="hero-static-img" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }} transition={{ opacity: { duration: 1 }, scale: { duration: 1 }, y: { repeat: Infinity, duration: 4, ease: 'easeInOut' } }} />
        </div>

        <motion.div className="hero-content" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p className="greeting" variants={slideInLeft}>Hello, I'm</motion.p>
          <motion.h1 className="name" variants={slideInLeft}>Sanem Sathvika</motion.h1>
          <motion.p className="subtitle" variants={slideInLeft}>
            CSE Student |<br className="mobile-break" /> React.js Developer Intern |<br className="mobile-break" /> Frontend Developer
          </motion.p>
          <motion.p className="bio" variants={fadeInUp}>
            I'm a Computer Science student and React.js Developer Intern at Zoiko Group, passionate about building responsive, user-friendly web experiences. I enjoy transforming UI designs into functional interfaces and continuously improving my frontend development skills.
          </motion.p>
          <motion.div className="btn-group" variants={fadeInUp}>
            <motion.a href="/Sanem_Sathvika_Resume.docx" download="Sanem_Sathvika_Resume.docx" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Download Resume <span className="arrow-icon">↓</span>
            </motion.a>
            <motion.a href="#contact" className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Let's Talk
            </motion.a>
          </motion.div>
        </motion.div>
      </main>

      <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        id="about" className="about-section">
        <motion.h2 className="about-title" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>About <span className="highlight-red">Me</span></motion.h2>
        <div className="about-content">
          <p className="about-text">
            I'm <strong>Sanem Sathvika</strong>, a third-year B.Tech Computer Science and Engineering student at <strong>TRR College of Technology</strong>. I am passionate about web development, modern technologies, and creating meaningful digital experiences.
          </p>
          <p className="about-text">
            Currently, I am working as a <strong>React.js Developer Intern at Zoiko Group</strong>, where I contribute to frontend development by building responsive, user-friendly web interfaces and translating UI designs into functional web pages. This experience is helping me strengthen my skills in React.js, JavaScript, Next.js, and modern frontend development practices.
          </p>
          <p className="about-text">
            I enjoy learning new technologies, improving website usability, and developing practical projects that combine creativity with technical problem-solving. My goal is to grow as a frontend developer, contribute to impactful projects, and continue building my expertise in software development.
          </p>
        </div>
      </motion.section>

      <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        id="education" className="education-section">
        <motion.h2 className="about-title" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>My <span className="highlight-red">Education</span></motion.h2>
        
        <motion.div className="timeline" variants={staggerContainer} initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }}>
          {/* Item 1 */}
          <motion.div className="timeline-item" variants={fadeInUp} whileHover={{ x: 10 }}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="timeline-degree">B.Tech (CSE)</h3>
              <h4 className="timeline-college">TRR College of Technology</h4>
              <span className="timeline-date">Currently 3rd Year</span>
            </div>
          </motion.div>

          {/* Item 2 */}
          <motion.div className="timeline-item" variants={fadeInUp} whileHover={{ x: 10 }}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="timeline-degree">Intermediate</h3>
              <h4 className="timeline-college">Sri Chaitanya College</h4>
              <span className="timeline-date">2022 – 2024</span>
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div className="timeline-item" variants={fadeInUp} whileHover={{ x: 10 }}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="timeline-degree">SSC (10th Standard)</h3>
              <h4 className="timeline-college">Sri Chaitanya High School</h4>
              <span className="timeline-date">2021 – 2022</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        id="skills" className="skills-section">
        <motion.h2 className="about-title" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>My <span className="highlight-red">Skills</span></motion.h2>
        
        <motion.div className="skills-container" variants={staggerContainer} initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="skills-category" variants={fadeInUp} whileHover={{ y: -10 }}>
            <h3 className="skills-category-title">Languages & Frameworks</h3>
            <div className="skills-grid">
              {['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'C', 'Python'].map((skill, index) => (
                <div key={skill} className="skill-pill" style={{animationDelay: `${index * 0.1}s`}}>
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="skills-category" variants={fadeInUp} whileHover={{ y: -10 }}>
            <h3 className="skills-category-title">Tools & Technologies</h3>
            <div className="skills-grid">
              {['Antigravity', 'GitHub', 'VS Code', 'Figma', 'Claude'].map((skill, index) => (
                <div key={skill} className="skill-pill" style={{animationDelay: `${(index + 7) * 0.1}s`}}>
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        id="achievements" className="achievements-section">
        <motion.h2 className="about-title" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>My <span className="highlight-red">Achievements</span></motion.h2>
        
        <motion.div className="achievements-grid" variants={staggerContainer} initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="achievement-card" variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }}>
            <div className="achievement-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </div>
            <h3 className="achievement-title">Smart India Hackathon 2025</h3>
            <p className="achievement-desc">Participated in this national-level innovation event.</p>
          </motion.div>

          <motion.div className="achievement-card" variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }}>
            <div className="achievement-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>
            <h3 className="achievement-title">Academic Excellence</h3>
            <p className="achievement-desc">Consistently ranked in the Top 5 / Top 10 in college/class.</p>
          </motion.div>

          <motion.div className="achievement-card" variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }}>
            <div className="achievement-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <h3 className="achievement-title">IBM AI Course</h3>
            <p className="achievement-desc">Successfully completed the IBM Artificial Intelligence certification.</p>
          </motion.div>

          <motion.div className="achievement-card" variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }}>
            <div className="achievement-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3 className="achievement-title">Portfolio Website</h3>
            <p className="achievement-desc">Successfully designed and developed this personal portfolio.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        id="projects" className="projects-section">
        <motion.h2 className="about-title" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>My <span className="highlight-red">Projects</span></motion.h2>
        
        <div className="projects-placeholder">
          <div className="projects-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3 className="projects-title">Projects will be added soon</h3>
          <p className="projects-desc">
            I am currently working on some exciting things. Check back later to see my latest work!
          </p>
        </div>
      </motion.section>

      <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        id="contact" className="contact-section">
        <motion.h2 className="about-title" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Contact <span className="highlight-red">Me</span></motion.h2>
        
        <div className="contact-container">
          <div className="contact-left">
            <h3 className="contact-heading">Let's Connect!</h3>
            <p className="contact-desc">
              If you'd like to get in touch, discuss a project, or just say hi, feel free to reach out.
            </p>
            <div className="contact-email">
              <div className="email-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <span>sathvikasanem3@gmail.com</span>
            </div>
          </div>
          
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <input type="text" name="name" placeholder="Full Name" className="form-input" required />
                <input type="email" name="email" placeholder="Email Address" className="form-input" required />
              </div>
              <textarea name="message" placeholder="Your Message" rows="5" className="form-textarea" required></textarea>
              <motion.button type="submit" className="form-submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Send Message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="send-icon"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>

      <footer className="footer">
        <div className="footer-content">
          <p className="copyright">© 2026 by Sanem Sathvika | All Rights Reserved.</p>
          
          <div className="social-links">
            <a href="https://github.com/sathvikasanem" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/sathvikasanem/" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="mailto:sathvikasanem3@gmail.com" className="social-icon" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>

          <a href="#" className="scroll-top" aria-label="Scroll to top">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
