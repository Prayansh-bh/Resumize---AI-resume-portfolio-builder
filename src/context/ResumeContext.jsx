import { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

const initialData = {
  personalInfo: { firstName: '', lastName: '', email: '', phone: '', jobTitle: '', website: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: []
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialData);

  const updateData = (section, payload) => {
    setResumeData(prev => ({
      ...prev,
      [section]: payload
    }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, updateData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
