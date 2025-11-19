import React, { useState, useEffect } from 'react';

// Importações das Páginas
import LandingPage from './pages/LandingPage'; 
import ProfilesPage from './pages/ProfilesPage';
import MyProfilePage from './pages/MyProfilePage';
import CoursesPage from './pages/CoursesPage'; // Importa a nova página

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  // Começa na landing page
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

  // Função de Navegação
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Renderização Condicional das Páginas
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
  } else if (currentPage === 'courses') {
    return (
      <CoursesPage 
        onNavigate={handleNavigate} 
      />
    );
  } else {
    // Default: 'profiles'
    return (
      <ProfilesPage 
        onNavigate={handleNavigate} 
      />
    );
  }
}

export default App;