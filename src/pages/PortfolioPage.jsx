import { useResume } from '../context/ResumeContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Phone, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import './PortfolioPage.css';

export default function PortfolioPage() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills } = resumeData;

  const hasData = personalInfo.firstName || personalInfo.lastName || summary;

  if (!hasData) {
    return (
      <div className="portfolio-empty animate-fade-in">
        <Sparkles size={48} className="text-primary mb-4 mx-auto" style={{display: 'block'}} />
        <h2>Your portfolio is empty</h2>
        <p>Go back to the builder to add your details first.</p>
        <div className="pt-4 text-center">
          <Link to="/build" className="btn btn-primary mt-4">Go to Builder</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-theme animate-fade-in">
      <nav className="portfolio-nav container">
        <Link to="/build" className="back-link"><ArrowLeft size={16}/> Back to Edit</Link>
        <div className="portfolio-brand">{personalInfo.firstName} {personalInfo.lastName}</div>
        <a href={`mailto:${personalInfo.email}`} className="btn btn-primary btn-sm">Hire Me</a>
      </nav>

      <header className="portfolio-hero container">
        <h1 className="hero-name">Hi, I'm {personalInfo.firstName}.</h1>
        <h2 className="hero-role">{personalInfo.jobTitle}</h2>
        <p className="hero-summary">{summary}</p>
        <div className="hero-contact">
          {personalInfo.email && <span className="contact-pill"><Mail size={14}/> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="contact-pill"><Phone size={14}/> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="contact-pill"><MapPin size={14}/> {personalInfo.location}</span>}
        </div>
      </header>

      <main className="portfolio-main container">
        {experience.length > 0 && (
          <section className="portfolio-section">
            <h3 className="section-title"><Briefcase className="section-icon"/> Experience</h3>
            <div className="timeline">
              {experience.map((exp, idx) => (
                <div key={idx} className="timeline-item slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>{exp.title} <span>at {exp.company}</span></h4>
                    <span className="timeline-date">{exp.date}</span>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="portfolio-grid">
          {education.length > 0 && (
            <section className="portfolio-section">
              <h3 className="section-title"><GraduationCap className="section-icon"/> Education</h3>
              <div className="education-list">
                {education.map((edu, idx) => (
                  <div key={idx} className="education-card slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                    <h4>{edu.degree}</h4>
                    <span className="school">{edu.school}</span>
                    <span className="date">{edu.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.some(s => s) && (
             <section className="portfolio-section" style={{alignContent: 'start'}}>
               <h3 className="section-title"><Sparkles className="section-icon"/> Skills</h3>
               <div className="skills-cloud slide-up">
                 {skills.filter(s => s).map((btn, idx) => (
                   <span key={idx} className="skill-tag">{btn}</span>
                 ))}
               </div>
             </section>
          )}
        </div>
      </main>

      <footer className="portfolio-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName}. Built with Resumize.</p>
        </div>
      </footer>
    </div>
  );
}
