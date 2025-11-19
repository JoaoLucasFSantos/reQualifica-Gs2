import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PlayCircle, ChevronDown, ChevronUp, BookOpen, ArrowLeft, Video, AlertCircle } from 'lucide-react';

const CoursesPage = ({ onNavigate, course, onBack }) => {
  
  const getModules = (c) => c?.modules || c?.modulos || [];
  const getLessons = (m) => m?.aulas || m?.lessons || [];
  const getTitle = (item) => item?.titulo || item?.title || "Sem título";
  const getDuration = (item) => item?.duracao || item?.duration || "--:--";

  // --- INICIALIZAÇÃO
  const [currentVideo, setCurrentVideo] = useState(() => {
    const mods = getModules(course);
    if (mods.length > 0) {
      const lessons = getLessons(mods[0]);
      if (lessons.length > 0) return lessons[0];
    }
    return null;
  });

  const [expandedModule, setExpandedModule] = useState(() => {
    const mods = getModules(course);
    if (mods.length > 0) return mods[0].id;
    return null;
  });

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  if (!course) return null;

  const modulesList = getModules(course);
  const hasContent = modulesList.length > 0;

  // Se o JSON estiver vazio ou com chaves erradas
  if (!hasContent) {
    return (
      <div className="min-h-screen bg-bg-light-main dark:bg-bg-dark-main flex flex-col transition-colors">
        <Navbar onNavigate={onNavigate} activePage="courses" />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle size={64} className="text-text-light-support mb-4" />
          <h2 className="text-2xl font-bold text-text-dark-main dark:text-white">Conteúdo indisponível</h2>
          <p className="text-text-light-support dark:text-text-dark-support mb-6">
            Não encontramos módulos ou aulas neste curso. Verifique o JSON.
          </p>
          <button onClick={onBack} className="text-primary-red hover:underline font-bold">Voltar</button>
        </div>
      </div>
    );
  }

  // Se tem módulos mas não achou video (ex: módulo vazio)
  if (!currentVideo) {
     return (
      <div className="min-h-screen bg-bg-light-main dark:bg-bg-dark-main flex items-center justify-center text-text-dark-main dark:text-white">
        Carregando player...
      </div>
     );
  }

  return (
    <div className="min-h-screen bg-bg-light-main dark:bg-bg-dark-main flex flex-col transition-colors">
      <Navbar onNavigate={onNavigate} activePage="courses" />

      <div className="flex-1 max-w-7xl mx-auto w-full p-4 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- PLAYER (Esquerda) --- */}
        <div className="lg:col-span-2 flex flex-col">
          <button 
            onClick={onBack}
            className="mb-4 flex items-center text-sm font-medium text-text-light-support dark:text-text-dark-support hover:text-primary-red transition w-fit"
          >
            <ArrowLeft size={18} className="mr-2" /> Voltar para Cursos
          </button>

          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 relative">
            <iframe 
              width="100%" height="100%" 
              src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0`} 
              title={getTitle(currentVideo)}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
          
          <div className="mt-4 bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md border-l-4 border-primary-red">
            <h1 className="text-xl md:text-2xl font-bold text-text-dark-main dark:text-white mb-2">
              {getTitle(currentVideo)}
            </h1>
            <div className="flex items-center justify-between text-sm text-text-light-support dark:text-text-dark-support">
              <span className="font-medium">{getTitle(course)}</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono text-xs">
                Duração: {getDuration(currentVideo)}
              </span>
            </div>
          </div>
        </div>

        {/* --- MÓDULOS (Direita) --- */}
        <div className="lg:col-span-1">
          <div className="bg-bg-light-card dark:bg-bg-dark-card rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
            
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1f1f1f] flex-shrink-0">
              <h2 className="font-bold text-text-dark-main dark:text-white flex items-center">
                <BookOpen size={20} className="mr-2 text-primary-red" /> 
                Conteúdo
              </h2>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1">
              {modulesList.map((modulo) => (
                <div key={modulo.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <button 
                    onClick={() => toggleModule(modulo.id)}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left group"
                  >
                    <span className="font-semibold text-sm text-text-dark-main dark:text-white group-hover:text-primary-red transition-colors pr-2">
                      {getTitle(modulo)}
                    </span>
                    {expandedModule === modulo.id ? <ChevronUp size={16} className="flex-shrink-0" /> : <ChevronDown size={16} className="flex-shrink-0" />}
                  </button>

                  {/* Lista de Aulas */}
                  {expandedModule === modulo.id && (
                    <div className="bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800">
                      {getLessons(modulo).map((aula) => (
                        <button
                          key={aula.id}
                          onClick={() => setCurrentVideo(aula)}
                          className={`w-full flex items-center p-3 text-sm transition border-l-4 
                            ${currentVideo.id === aula.id 
                              ? 'border-primary-red bg-primary-red/5 text-primary-red font-medium' 
                              : 'border-transparent text-text-light-support dark:text-text-dark-support hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                          <div className="mr-3 flex-shrink-0">
                             {currentVideo.id === aula.id ? <PlayCircle size={16} fill="currentColor" /> : <Video size={16} />}
                          </div>
                          <span className="flex-1 text-left line-clamp-2 text-xs md:text-sm">{getTitle(aula)}</span>
                          <span className="text-[10px] opacity-70 ml-2 font-mono">{getDuration(aula)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoursesPage;