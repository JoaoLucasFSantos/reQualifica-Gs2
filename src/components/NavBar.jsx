import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

// 1. Recebe a prop 'goToLanding'
const Navbar = ({ goToLanding }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: "Cursos", href: "#" },
    { title: "Meu Perfil", href: "#" },
    { title: "Perfis Cadastrados", href: "#" } // Link ativo
  ];

  return (
    <header className="sticky top-0 z-20 bg-bg-light-card dark:bg-bg-dark-card shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 2. Logo agora é um botão para voltar para a Landing Page */}
          <button 
            onClick={goToLanding} 
            className="text-2xl font-bold text-primary-red transition-colors cursor-pointer"
          >
            ReQualifica
          </button>

          {/* Links para Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href} 
                className={`font-medium transition duration-300 ${
                  link.title === "Perfis Cadastrados"
                    ? "text-primary-red dark:text-secondary-orange" // Ativo
                    : "text-text-dark-main dark:text-text-dark-main-light hover:text-primary-red"
                }`}
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Botão Hamburger (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-text-dark-main dark:text-text-dark-main-light 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-expanded={isOpen}
            aria-label="Abrir Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Menu Dropdown para Mobile */}
      {isOpen && (
        <div className="md:hidden pb-4 px-4 bg-bg-light-card dark:bg-bg-dark-card shadow-inner">
          <nav className="flex flex-col space-y-2">
            {/* 3. Link para voltar para Home no Mobile */}
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); goToLanding(); setIsOpen(false); }}
              className="block py-2 px-3 rounded-md text-text-dark-main dark:text-text-dark-main-light hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Home (Landing Page)
            </a>
            
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-3 rounded-md font-medium transition duration-300 ${
                  link.title === "Perfis Cadastrados"
                    ? "bg-primary-red text-white" // Ativo
                    : "text-text-dark-main dark:text-text-dark-main-light hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;