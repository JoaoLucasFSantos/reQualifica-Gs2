import React, { useState } from 'react';
import { Menu, X, User, Users, BookOpen } from 'lucide-react'; 

// Recebe 'onNavigate' e 'activePage' para destacar o link correto
const Navbar = ({ onNavigate, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'courses', title: "Cursos", icon: BookOpen },
    { id: 'my-profile', title: "Meu Perfil", icon: User },
    { id: 'profiles', title: "Perfis Cadastrados", icon: Users }
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 bg-bg-light-card dark:bg-bg-dark-card shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo -> Vai para Landing */}
          <button 
            onClick={() => handleNavClick('landing')} 
            className="text-2xl font-bold text-primary-red transition-colors cursor-pointer hover:opacity-80"
          >
            ReQualifica
          </button>

          {/* Links Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleNavClick(link.id)} 
                className={`font-medium transition duration-300 flex items-center space-x-2 ${
                  activePage === link.id
                    ? "text-primary-red dark:text-secondary-orange font-bold border-b-2 border-primary-red dark:border-secondary-orange" // Ativo
                    : "text-text-dark-main dark:text-text-dark-main-light hover:text-primary-red"
                }`}
              >
                <link.icon size={18} />
                <span>{link.title}</span>
              </button>
            ))}
          </nav>

          {/* Botão Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-text-dark-main dark:text-text-dark-main-light 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden pb-4 px-4 bg-bg-light-card dark:bg-bg-dark-card shadow-inner">
          <nav className="flex flex-col space-y-2 mt-2">
            <button 
              onClick={() => handleNavClick('landing')}
              className="block w-full text-left py-2 px-3 rounded-md text-text-dark-main dark:text-text-dark-main-light hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Home (Landing Page)
            </button>
            
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleNavClick(link.id)} 
                className={`block w-full text-left py-2 px-3 rounded-md font-medium transition duration-300 ${
                  activePage === link.id
                    ? "bg-primary-red text-white" 
                    : "text-text-dark-main dark:text-text-dark-main-light hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <link.icon size={18} />
                  <span>{link.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;