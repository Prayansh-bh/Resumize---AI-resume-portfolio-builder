import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Wand2, Globe } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-wrapper animate-fade-in">
      <div className="ambient-background"></div>
      
      <header className="landing-header container">
        <div className="logo">
          <Wand2 className="logo-icon" size={28} />
          <span>Resumize.</span>
        </div>
      </header>

      <main className="hero-section container">
        <div className="hero-content">
          <div className="badge">✨ AI-Powered Resume Builder</div>
          <h1 className="hero-title">
            Craft your future<br/>
            <span className="text-gradient">in minutes.</span>
          </h1>
          <p className="hero-subtitle">
            Simply fill out a clean form and instability generate a professional printable PDF resume alongside a stunning personal portfolio website.
          </p>
          <div className="hero-actions">
            <Link to="/build" className="btn btn-primary btn-lg shine-effect">
              Start Building Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="features-grid">
          <div className="card feature-card slide-up" style={{animationDelay: '0.1s'}}>
            <div className="feature-icon-wrapper">
              <FileText size={24} className="feature-icon" />
            </div>
            <h3>Beautiful Templates</h3>
            <p>Minimal, clean, and modern designs tailored for today's professional standards.</p>
          </div>
          <div className="card feature-card slide-up" style={{animationDelay: '0.2s'}}>
            <div className="feature-icon-wrapper">
              <Wand2 size={24} className="feature-icon" />
            </div>
            <h3>AI Suggestions</h3>
            <p>Enhance your impact with one-click AI improvements to bullet points and summaries.</p>
          </div>
          <div className="card feature-card slide-up" style={{animationDelay: '0.3s'}}>
            <div className="feature-icon-wrapper">
              <Globe size={24} className="feature-icon" />
            </div>
            <h3>Auto Portfolio</h3>
            <p>Automatically generate a responsive, interactive web portfolio from your resume.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
