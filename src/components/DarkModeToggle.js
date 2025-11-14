import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const DarkModeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full 
                 bg-bg-dark text-text-light 
                 hover:bg-primary-red dark:hover:bg-secondary-orange 
                 transition duration-300 shadow-xl 
                 fixed top-6 right-6 z-50 transform hover:scale-110"
      aria-label="Alternar tema claro/escuro"
    >
      {}
      {theme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-indigo-700" />
      )}
    </button>
  );
};

export default DarkModeToggle;