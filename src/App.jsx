import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';

function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    

    root.classList.remove(theme === 'dark' ? 'light' : 'dark');

    root.classList.add(theme);
    

    localStorage.setItem('theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <LandingPage theme={theme} toggleTheme={toggleTheme} />
  );
}

export default App;