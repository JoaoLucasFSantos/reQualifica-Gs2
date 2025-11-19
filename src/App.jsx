import React, { useState, useEffect } from 'react';

// 1. CORREÇÃO: Importando de './pages/'
import LandingPage from './pages/LandingPage'; 
import ProfilesPage from './pages/ProfilesPage';
import MyProfilePage from './pages/MyProfilePage';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  const [currentPage, setCurrentPage] = useState('landing'); 

  useEffect(() => {
    const root = window.document.documentElement; 
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (currentPage === 'landing') {
    return (
      <LandingPage 
        theme={theme} 
        toggleTheme={toggleTheme} 
        goToProfiles={() => handleNavigate('profiles')} 
      />
    );
  } else if (currentPage === 'my-profile') {
    return (
      <MyProfilePage 
        onNavigate={handleNavigate} 
      />
    );
  } else {
    return (
      <ProfilesPage 
        onNavigate={handleNavigate} 
      />
    );
  }
}

export default App;