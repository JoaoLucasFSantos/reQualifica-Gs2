import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Search, Play, User, Clock } from 'lucide-react';
import coursesData from '../data/coursesData.json';

const CoursesListPage = ({ onNavigate, onCourseSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = coursesData.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg-light-main dark:bg-bg-dark-main pb-16 transition-colors">
      <Navbar onNavigate={onNavigate} activePage="courses" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Cabeçalho e Busca */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4 text-primary-red dark:text-secondary-orange">
            Academia ReQualifica
          </h1>
          <p className="text-xl text-text-light-support dark:text-text-dark-support mb-8">
            Escolha sua trilha e comece a codar hoje mesmo.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar curso (ex: Python, Java)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 text-text-dark-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-red shadow-lg"
            />
          </div>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.map(course => (
            <div 
              key={course.id}
              onClick={() => onCourseSelect(course)}
              className="bg-bg-light-card dark:bg-bg-dark-card rounded-xl shadow-lg overflow-hidden 
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
                         cursor-pointer border border-gray-100 dark:border-gray-800 group flex flex-col h-full"
            >
              {/* Capa */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={course.cover} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-primary-red p-3 rounded-full text-white shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Play fill="white" size={24} />
                  </div>
                </div>
                <span className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm uppercase tracking-wider">
                  {course.category}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-text-dark-main dark:text-white mb-2 line-clamp-2 group-hover:text-primary-red transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-text-light-support dark:text-text-dark-support mb-4 line-clamp-3 flex-1">
                  {course.description}
                </p>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <User size={14} className="mr-1 text-secondary-orange" />
                    {course.instructor}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {course.modules.length} Módulos
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursesListPage;