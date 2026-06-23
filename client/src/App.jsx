import { useState, useCallback } from 'react';
import Header from './components/Header';
import BarsBox from './components/BarsBox';
import Home from './components/Home';
import Service from './components/Service';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

const sections = ['Home', 'Service', 'Resume', 'Portfolio', 'Contact'];
const TRANSITION_DELAY = 1100; // ms — matches CSS bar animation timing

export default function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [barsAnimating, setBarsAnimating] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);

  const handleNavClick = useCallback(
    (target) => {
      if (target === activeSection || barsAnimating) return;

      // 1. Trigger bar slide-in animation
      setBarsAnimating(true);
      setPendingSection(target);

      // 2. After bars cover screen, switch section
      setTimeout(() => {
        setActiveSection(target);
        setBarsAnimating(false);
        setPendingSection(null);
      }, TRANSITION_DELAY);
    },
    [activeSection, barsAnimating]
  );

  return (
    <>
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <BarsBox animating={barsAnimating} />

      {sections.map((name) => {
        const isActive = activeSection === name && !barsAnimating;

        switch (name) {
          case 'Home':
            return <Home key={name} isActive={isActive} />;
          case 'Service':
            return <Service key={name} isActive={isActive} />;
          case 'Resume':
            return <Resume key={name} isActive={isActive} />;
          case 'Portfolio':
            return <Portfolio key={name} isActive={isActive} />;
          case 'Contact':
            return <Contact key={name} isActive={isActive} />;
          default:
            return null;
        }
      })}
    </>
  );
}
