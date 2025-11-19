import React, { useState } from 'react';
import Navbar from '../components/Navbar';
// Importação dos ícones
import { PlayCircle, ChevronDown, ChevronUp, BookOpen, CheckCircle } from 'lucide-react';
// Importa o JSON que você acabou de criar
import coursesData from '../data/coursesData.json';

const CoursesPage = ({ onNavigate }) => {
  
  // --- ESTADOS ---
  // 1. Qual vídeo está tocando? (Começa com o primeiro do primeiro módulo)
  const [currentVideo, setCurrentVideo] = useState(coursesData[0].aulas[0]);
  
  // 2. Qual módulo está aberto? (Começa com o primeiro aberto)
  const [expandedModule, setExpandedModule] = useState(coursesData[0].id);

  // Função para abrir/fechar módulos (Acordeão)
  const toggleModule = (moduleId) => {
    // Se clicar no que já está aberto, fecha. Se não, abre o novo.
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-bg-light-main dark:bg-bg-dark-main flex flex-col transition-colors">
      
      {/* Navbar com a página 'courses' ativa */}
      <Navbar onNavigate={onNavigate} activePage="courses" />

      <div className="flex-1 max-w-7xl mx-auto w-full p-4 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLUNA DA ESQUERDA: PLAYER DE VÍDEO (2/3 da tela) --- */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Container do Vídeo (Mantém proporção 16:9) */}
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 relative">
            <iframe 
              width="100%" 
              height="100%" 
              // URL do YouTube Embed + autoplay
              src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0`} 
              title={currentVideo.titulo}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
          
          {/* Informações do Vídeo Atual */}
          <div className="mt-4 bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md border-l-4 border-primary-red">
            <h1 className="text-2xl font-bold text-text-dark-main dark:text-white mb-2">
              {currentVideo.titulo}
            </h1>
            <div className="flex items-center justify-between text-sm text-text-light-support dark:text-text-dark-support">
              <span>Maratona Java Virado no Jiraya</span>
              <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                Duração: {currentVideo.duracao}
              </span>
            </div>
          </div>
        </div>

        {/* --- COLUNA DA DIREITA: LISTA DE AULAS (1/3 da tela) --- */}
        <div className="lg:col-span-1">
          <div className="bg-bg-light-card dark:bg-bg-dark-card rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 sticky top-24">
            
            {/* Cabeçalho da Lista */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1f1f1f]">
              <h2 className="font-bold text-text-dark-main dark:text-white flex items-center text-lg">
                <BookOpen size={20} className="mr-2 text-primary-red" /> 
                Conteúdo do Curso
              </h2>
              <p className="text-xs text-text-light-support dark:text-text-dark-support mt-1">
                {coursesData.length} Módulos Disponíveis
              </p>
            </div>

            {/* Lista com Scroll */}
            <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
              {coursesData.map((modulo) => (
                <div key={modulo.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                  
                  {/* Botão do Módulo (Expansível) */}
                  <button 
                    onClick={() => toggleModule(modulo.id)}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left group"
                  >
                    <span className="font-semibold text-sm text-text-dark-main dark:text-white group-hover:text-primary-red transition-colors">
                      {modulo.titulo}
                    </span>
                    {/* Ícone muda se está aberto ou fechado */}
                    {expandedModule === modulo.id ? (
                      <ChevronUp size={16} className="text-text-light-support" />
                    ) : (
                      <ChevronDown size={16} className="text-text-light-support" />
                    )}
                  </button>

                  {/* Lista de Aulas (Só aparece se o módulo estiver expandido) */}
                  {expandedModule === modulo.id && (
                    <div className="bg-gray-50 dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800">
                      {modulo.aulas.map((aula) => (
                        <button
                          key={aula.id}
                          onClick={() => setCurrentVideo(aula)}
                          className={`w-full flex items-center p-3 text-sm transition border-l-4 
                            ${currentVideo.id === aula.id 
                              ? 'border-primary-red bg-primary-red/10 text-primary-red font-medium' // Estilo da aula ativa
                              : 'border-transparent text-text-light-support dark:text-text-dark-support hover:bg-gray-200 dark:hover:bg-gray-800'
                            }`}
                        >
                          {/* Ícone Play ou Check (simulado) */}
                          <PlayCircle size={16} className="mr-3 flex-shrink-0" />
                          
                          <div className="flex-1 text-left">
                            <p className="line-clamp-1">{aula.titulo}</p>
                          </div>
                          
                          <span className="text-xs opacity-70 ml-2 font-mono">{aula.duracao}</span>
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