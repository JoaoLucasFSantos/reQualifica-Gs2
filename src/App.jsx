import React, { useState, useEffect } from 'react';

// 1. Importe suas duas "páginas"
import LandingPage from './pages/LandingPage'; 
import ProfilesPage from './pages/ProfilesPage';
// Certifique-se de que os componentes Navbar, ProfileCard, etc., 
// estejam na pasta 'components' e sejam importados pela ProfilesPage.

function App() {
  // --- ESTADO DO TEMA (Já tínhamos) ---
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

  // --- ESTADO DE NAVEGAÇÃO ---
  // Controla qual página está visível. Começa na 'landing'
  const [currentPage, setCurrentPage] = useState('landing'); 

  // --- FUNÇÕES DE NAVEGAÇÃO ---
  // Esta função será passada para a LandingPage
  const goToProfiles = () => {
    setCurrentPage('profiles');
    window.scrollTo(0, 0); // Garante que a nova página comece no topo
  };

  // Esta função será passada para a ProfilesPage (para o Navbar)
  const goToLanding = () => {
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---
  // O App decide qual página mostrar
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        theme={theme} 
        toggleTheme={toggleTheme} 
        goToProfiles={goToProfiles} // Passa a função para a Landing Page
      />
    );
  } else {
    // (currentPage === 'profiles')
    return (
      <ProfilesPage 
        goToLanding={goToLanding} // Passa a função para a Página de Perfis
      />
    );
  }
}

export default App;