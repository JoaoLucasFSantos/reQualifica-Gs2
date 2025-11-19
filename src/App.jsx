import React, { useState, useEffect } from 'react';

import LandingPage from './pages/LandingPage'; 
import ProfilesPage from './pages/ProfilesPage';
import MyProfilePage from './pages/MyProfilePage';
import CoursesPage from './pages/CoursesPage';      
import CoursesListPage from './pages/CoursesListPage';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [currentPage, setCurrentPage] = useState('landing'); 
  const [selectedCourse, setSelectedCourse] = useState(null);

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
    if (page !== 'courses') {
      setSelectedCourse(null);
    }
    window.scrollTo(0, 0);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    window.scrollTo(0, 0);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  if (currentPage === 'landing') {
    return <LandingPage theme={theme} toggleTheme={toggleTheme} goToProfiles={() => handleNavigate('profiles')} />;
  } else if (currentPage === 'my-profile') {
    return <MyProfilePage onNavigate={handleNavigate} />;
  } else if (currentPage === 'courses') {
    
    if (selectedCourse) {
      return (
        <CoursesPage 
          key={selectedCourse.id} 
          onNavigate={handleNavigate} 
          course={selectedCourse} 
          onBack={handleBackToCourses}
        />
      );
    } else {
      return (
        <CoursesListPage 
          onNavigate={handleNavigate} 
          onCourseSelect={handleCourseSelect} 
        />
      );
    }
  } else {
    return <ProfilesPage onNavigate={handleNavigate} />;
  }
}

export default App;