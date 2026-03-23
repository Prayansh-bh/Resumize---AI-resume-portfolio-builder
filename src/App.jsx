import { Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <ResumeProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/build" element={<BuilderPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </div>
    </ResumeProvider>
  );
}

export default App;
