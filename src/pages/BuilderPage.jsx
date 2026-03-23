import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { Check, ChevronLeft, ChevronRight, Wand2, Download, Plus, Trash2, Globe } from 'lucide-react';
import './BuilderPage.css';

const steps = ['Personal Info', 'Summary', 'Experience', 'Education', 'Skills'];

export default function BuilderPage() {
  const { resumeData, updateData } = useResume();
  const [currentStep, setCurrentStep] = useState(0);

  const handleDownloadPdf = () => {
    const element = document.getElementById('resume-document');
    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.firstName || 'Resume'}_${resumeData.personalInfo.lastName || 'Builder'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(curr => curr + 1);
  };
  
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const [aiLoading, setAiLoading] = useState(false);
  const handleAiImprove = () => {
    if(!resumeData.summary) return;
    setAiLoading(true);
    setTimeout(() => {
      updateData('summary', "Performance-driven professional with a proven track record of delivering high-impact solutions. Adept at leveraging modern technologies to optimize workflows and drive strategic business goals. " + resumeData.summary);
      setAiLoading(false);
    }, 1500);
  };

  const handleAiImproveBullet = (index) => {
    setAiLoading(true);
    const newExp = [...resumeData.experience];
    setTimeout(() => {
      newExp[index].description = "Spearheaded cross-functional initiatives resulting in 30% reduction in operational costs. " + newExp[index].description;
      updateData('experience', newExp);
      setAiLoading(false);
    }, 1200);
  };

  const addExperience = () => {
    updateData('experience', [...resumeData.experience, { company: '', title: '', date: '', description: '' }]);
  };

  const addEducation = () => {
    updateData('education', [...resumeData.education, { school: '', degree: '', date: '' }]);
  };

  const updateArrayItem = (section, index, field, value) => {
    const newArr = [...resumeData[section]];
    newArr[index][field] = value;
    updateData(section, newArr);
  };

  const removeArrayItem = (section, index) => {
    const newArr = [...resumeData[section]];
    newArr.splice(index, 1);
    updateData(section, newArr);
  };

  const renderFormStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <div className="form-step animate-fade-in">
            <h2>Personal Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" placeholder="e.g. John" value={resumeData.personalInfo.firstName} onChange={e => updateData('personalInfo', {...resumeData.personalInfo, firstName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" placeholder="e.g. Doe" value={resumeData.personalInfo.lastName} onChange={e => updateData('personalInfo', {...resumeData.personalInfo, lastName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input className="form-input" placeholder="e.g. Software Engineer" value={resumeData.personalInfo.jobTitle} onChange={e => updateData('personalInfo', {...resumeData.personalInfo, jobTitle: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="e.g. john@example.com" value={resumeData.personalInfo.email} onChange={e => updateData('personalInfo', {...resumeData.personalInfo, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" placeholder="e.g. (555) 123-4567" value={resumeData.personalInfo.phone} onChange={e => updateData('personalInfo', {...resumeData.personalInfo, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" placeholder="e.g. New York, NY" value={resumeData.personalInfo.location} onChange={e => updateData('personalInfo', {...resumeData.personalInfo, location: e.target.value})} />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-step animate-fade-in">
            <h2>Professional Summary</h2>
            <p className="step-desc">Write a short, engaging pitch about yourself.</p>
            <div className="form-group">
              <textarea className="form-input" rows="6" value={resumeData.summary} onChange={e => updateData('summary', e.target.value)} placeholder="Briefly describe your professional background and key strengths..."></textarea>
            </div>
            <button className="btn btn-outline ai-btn" onClick={handleAiImprove} disabled={aiLoading || !resumeData.summary}>
              <Wand2 size={16} className={aiLoading ? 'spin' : ''} />
              {aiLoading ? 'Enhancing...' : 'Enhance with AI'}
            </button>
          </div>
        );
      case 2:
        return (
          <div className="form-step animate-fade-in">
            <h2>Work Experience</h2>
            <p className="step-desc">Add your relevant work experience.</p>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="repeatable-card">
                <div className="card-header">
                  <h4>Experience {idx + 1}</h4>
                  <button className="btn-icon" onClick={() => removeArrayItem('experience', idx)}><Trash2 size={18}/></button>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Company / Employer</label>
                    <input className="form-input" value={exp.company} onChange={e => updateArrayItem('experience', idx, 'company', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Job Title</label>
                    <input className="form-input" value={exp.title} onChange={e => updateArrayItem('experience', idx, 'title', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dates (e.g., Jan 2020 - Present)</label>
                    <input className="form-input" value={exp.date} onChange={e => updateArrayItem('experience', idx, 'date', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description / Bullet Points</label>
                  <textarea className="form-input" rows="4" value={exp.description} onChange={e => updateArrayItem('experience', idx, 'description', e.target.value)} placeholder="- Developed features using React..." />
                  <button className="btn btn-sm btn-outline ai-btn mt-2" onClick={() => handleAiImproveBullet(idx)} disabled={aiLoading || !exp.description}>
                    <Wand2 size={14} className={aiLoading ? 'spin' : ''} /> Auto-Improve
                  </button>
                </div>
              </div>
            ))}
            <button className="btn btn-outline w-full mt-4" onClick={addExperience}><Plus size={18}/> Add Experience</button>
          </div>
        );
      case 3:
        return (
          <div className="form-step animate-fade-in">
            <h2>Education</h2>
            <p className="step-desc">List your academic background.</p>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="repeatable-card">
                <div className="card-header">
                  <h4>Education {idx + 1}</h4>
                  <button className="btn-icon" onClick={() => removeArrayItem('education', idx)}><Trash2 size={18}/></button>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">School / University</label>
                    <input className="form-input" value={edu.school} onChange={e => updateArrayItem('education', idx, 'school', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Degree / Field of Study</label>
                    <input className="form-input" value={edu.degree} onChange={e => updateArrayItem('education', idx, 'degree', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Graduation Date</label>
                    <input className="form-input" value={edu.date} onChange={e => updateArrayItem('education', idx, 'date', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-outline w-full mt-4" onClick={addEducation}><Plus size={18}/> Add Education</button>
          </div>
        );
      case 4:
        return (
          <div className="form-step animate-fade-in">
            <h2>Skills</h2>
            <p className="step-desc">Enter your skills separated by commas.</p>
            <div className="form-group">
              <textarea className="form-input" rows="4" value={resumeData.skills.join(', ')} onChange={e => updateData('skills', e.target.value.split(',').map(s => s.trim()))} placeholder="React, Node.js, Project Management..."></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="builder-layout">
      {/* Left: Wizard Form */}
      <div className="builder-sidebar">
        <div className="builder-sidebar-header">
          <Wand2 className="text-primary" size={24} />
          <h2>Builder Wizard</h2>
        </div>
        
        <div className="steps-indicator">
          {steps.map((step, idx) => (
            <div key={idx} className={`step-item ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}>
              <div className="step-circle">{idx < currentStep ? <Check size={14}/> : idx + 1}</div>
              <span className="step-label">{step}</span>
            </div>
          ))}
        </div>
        
        <div className="form-container">
          {renderFormStep()}
        </div>

        <div className="builder-actions">
          <button className="btn btn-outline" onClick={handlePrev} disabled={currentStep === 0}>
            <ChevronLeft size={16} /> Back
          </button>
          {currentStep === steps.length - 1 ? (
             <button className="btn btn-primary" onClick={() => alert('Wizard complete!')}>
               Finish <Check size={16} />
             </button>
          ) : (
            <button className="btn btn-primary" onClick={handleNext}>
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="builder-preview">
        <div className="preview-header">
           <span className="preview-title">Live Preview</span>
           <div className="preview-tools" style={{ display: 'flex', gap: '0.5rem' }}>
             <Link to="/portfolio" className="btn btn-outline btn-sm"><Globe size={16}/> View Portfolio</Link>
             <button className="btn btn-primary btn-sm" onClick={handleDownloadPdf}><Download size={16}/> Download PDF</button>
           </div>
        </div>
        
        <div className="resume-paper-container">
          <div className="resume-paper" id="resume-document">
             <div className="resume-header">
               <h1 className="resume-name">{resumeData.personalInfo.firstName || 'First'} {resumeData.personalInfo.lastName || 'Last'}</h1>
               <p className="resume-job-title">{resumeData.personalInfo.jobTitle || 'Profession / Title'}</p>
               <div className="resume-contact">
                 {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                 {resumeData.personalInfo.phone && <span> • {resumeData.personalInfo.phone}</span>}
                 {resumeData.personalInfo.location && <span> • {resumeData.personalInfo.location}</span>}
               </div>
             </div>
             
             {resumeData.summary && (
               <div className="resume-section section-summary">
                 <h3>Professional Summary</h3>
                 <p>{resumeData.summary}</p>
               </div>
             )}

             {resumeData.experience.length > 0 && (
               <div className="resume-section section-experience">
                 <h3>Experience</h3>
                 {resumeData.experience.map((exp, idx) => (
                   <div key={idx} className="resume-item">
                     <div className="resume-item-header">
                       <span className="bold">{exp.title || 'Job Title'}</span>
                       <span className="date">{exp.date}</span>
                     </div>
                     <div className="company">{exp.company || 'Company Name'}</div>
                     <p className="desc">{exp.description}</p>
                   </div>
                 ))}
               </div>
             )}

             {resumeData.education.length > 0 && (
               <div className="resume-section section-education">
                 <h3>Education</h3>
                 {resumeData.education.map((edu, idx) => (
                   <div key={idx} className="resume-item">
                     <div className="resume-item-header">
                       <span className="bold">{edu.degree || 'Degree'}</span>
                       <span className="date">{edu.date}</span>
                     </div>
                     <div className="company">{edu.school || 'School/University'}</div>
                   </div>
                 ))}
               </div>
             )}

             {resumeData.skills.some(s => s) && (
               <div className="resume-section section-skills">
                 <h3>Skills</h3>
                 <p className="skills-list">{resumeData.skills.filter(s => s).join(' • ')}</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
