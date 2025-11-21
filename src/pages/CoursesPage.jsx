import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PlayCircle, ChevronDown, ChevronUp, BookOpen, ArrowLeft, Video, AlertCircle, Clock, CheckCircle } from 'lucide-react';

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

  // --- TESTE
  const [testeIniciado, setTesteIniciado] = useState(false);
  const [tempoInicio, setTempoInicio] = useState(null);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  React.useEffect(() => {
    if (!testeIniciado) return;

    const intervalo = setInterval(() => {
      const agora = Date.now();
      const decorrido = Math.floor((agora - tempoInicio) / 1000);
      setTempoDecorrido(decorrido);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [testeIniciado, tempoInicio]);

  const iniciarTeste = () => {
    setTesteIniciado(true);
    setTempoInicio(Date.now());
  };

  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
  };

  const enviarRespostas = () => {
    alert('✓ Respostas enviadas com sucesso!\n\nSeu teste foi concluído. Você receberá em breve um feedback detalhado por email.');
  };

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

      {/* --- SEÇÃO DE TESTE (Apenas para Python 3 - Curso Completo) --- */}
      {(getTitle(course) === 'Python 3 - Curso Completo' || course?.titulo === 'Python 3 - Curso Completo') && (
      <div className="w-full bg-gradient-to-b from-bg-light-main to-gray-50 dark:from-bg-dark-main dark:to-[#1a1a1a] border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {!testeIniciado ? (
            // Seção de Boas-vindas
            <div className="bg-white dark:bg-bg-dark-card rounded-xl shadow-lg p-8 md:p-12 text-center border-l-4 border-primary-red">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark-main dark:text-white mb-4">
                📝 Teste seus Conhecimentos
              </h2>
              <p className="text-lg text-text-light-support dark:text-text-dark-support mb-6">
                Após completar os vídeos, realize este teste para validar seus conhecimentos sobre programação Python.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0f1419] dark:to-[#1a1f2e] border-l-4 border-primary-red rounded-lg p-6 mb-8 text-left inline-block">
                <ul className="space-y-2 text-text-light-support dark:text-text-dark-support">
                  <li className="flex items-center"><CheckCircle size={18} className="mr-3 text-green-500" /> <span><strong>11 questões</strong> de teoria e prática</span></li>
                  <li className="flex items-center"><Clock size={18} className="mr-3 text-primary-red" /> <span><strong>Cronômetro</strong> para acompanhar seu tempo</span></li>
                  <li className="flex items-center"><CheckCircle size={18} className="mr-3 text-green-500" /> <span><strong>Feedback</strong> detalhado após envio</span></li>
                </ul>
              </div>

              <button 
                onClick={iniciarTeste}
                className="bg-gradient-to-r from-primary-red to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-lg text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                ▶ Iniciar Teste
              </button>
            </div>
          ) : (
            // Seção de Teste Ativo
            <div className="space-y-8">
              {/* Cronômetro */}
              <div className="bg-gradient-to-r from-primary-red to-orange-500 rounded-xl p-6 text-center text-white shadow-lg">
                <div className="text-sm font-semibold opacity-90 mb-2">⏱ TEMPO DECORRIDO</div>
                <div className="text-5xl font-mono font-bold tracking-wider">{formatarTempo(tempoDecorrido)}</div>
              </div>

              {/* Questões */}
              <div className="space-y-6">
                {/* PARTE 1: Questões Teóricas */}
                <div>
                  <h3 className="text-2xl font-bold text-text-dark-main dark:text-white mb-4 flex items-center">
                    <BookOpen size={28} className="mr-3 text-primary-red" /> Parte 1 – Questões Teóricas
                  </h3>

                  {[
                    { n: 1, titulo: 'O que é uma variável em Python?', desc: 'Explique o conceito, como funciona na memória e sua importância.' },
                    { n: 2, titulo: 'Diferença entre lista e tupla', desc: 'Descreva as principais diferenças e quando usar cada uma.' },
                    { n: 3, titulo: 'O que é uma função?', desc: 'Explique o conceito e suas vantagens.' },
                    { n: 4, titulo: 'Importância da indentação em Python', desc: 'Por que a indentação é importante? O que acontece sem ela?' },
                    { n: 5, titulo: 'O que é um loop for?', desc: 'Explique quando utilizá-lo e dê um exemplo prático.' }
                  ].map((q) => (
                    <div key={q.n} className="bg-white dark:bg-bg-dark-card rounded-lg shadow p-6 border-l-4 border-primary-red">
                      <div className="flex items-start mb-3">
                        <span className="inline-block bg-primary-red text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                          {q.n}
                        </span>
                        <div>
                          <h4 className="text-lg font-semibold text-text-dark-main dark:text-white">{q.titulo}</h4>
                          <p className="text-sm text-text-light-support dark:text-text-dark-support mt-1">{q.desc}</p>
                        </div>
                      </div>
                      <textarea 
                        className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg focus:border-primary-red focus:outline-none transition min-h-24"
                        placeholder="Sua resposta aqui..."
                      />
                    </div>
                  ))}
                </div>

                {/* PARTE 2: Questões Práticas */}
                <div>
                  <h3 className="text-2xl font-bold text-text-dark-main dark:text-white mb-4 flex items-center">
                    <Video size={28} className="mr-3 text-primary-red" /> Parte 2 – Questões Práticas
                  </h3>

                  {[
                    { n: 6, titulo: 'Verificar se um número é par ou ímpar', desc: 'Escreva um programa em Python.' },
                    { n: 7, titulo: 'Filtrar números maiores que 10', desc: 'De: [3, 15, 8, 22, 7, 11]' },
                    { n: 8, titulo: 'Função para calcular a média', desc: 'Crie: media(lista)' },
                    { n: 9, titulo: 'Contador de vogais em um texto', desc: 'Considere maiúsculas e minúsculas.' },
                    { n: 10, titulo: 'Filtrar produtos por preço', desc: 'Acima de 50 de: {"Mouse": 30, "Teclado": 80, "Monitor": 500, "Cabo HDMI": 25, "Headset": 120}' }
                  ].map((q) => (
                    <div key={q.n} className="bg-white dark:bg-bg-dark-card rounded-lg shadow p-6 border-l-4 border-primary-red">
                      <div className="flex items-start mb-3">
                        <span className="inline-block bg-primary-red text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                          {q.n}
                        </span>
                        <div>
                          <h4 className="text-lg font-semibold text-text-dark-main dark:text-white">{q.titulo}</h4>
                          <p className="text-sm text-text-light-support dark:text-text-dark-support mt-1">{q.desc}</p>
                        </div>
                      </div>
                      <textarea 
                        className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg focus:border-primary-red focus:outline-none transition min-h-24 font-mono text-sm"
                        placeholder="Seu código aqui..."
                      />
                    </div>
                  ))}
                </div>

                {/* DESAFIO FINAL */}
                <div>
                  <h3 className="text-2xl font-bold text-text-dark-main dark:text-white mb-4 flex items-center">
                    🚀 Desafio Final
                  </h3>

                  <div className="bg-white dark:bg-bg-dark-card rounded-lg shadow p-6 border-l-4 border-primary-red">
                    <div className="flex items-start mb-3">
                      <span className="inline-block bg-primary-red text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                        11
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold text-text-dark-main dark:text-white">Sistema de Cadastro de Usuários</h4>
                        <p className="text-sm text-text-light-support dark:text-text-dark-support mt-1">
                          Crie um programa com: Menu (1: Cadastrar, 2: Listar, 3: Sair) | Lista de dicionários {"{"}"nome": "", "idade": ""{"}"} | Loop até sair
                        </p>
                      </div>
                    </div>
                    <textarea 
                      className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white rounded-lg focus:border-primary-red focus:outline-none transition min-h-32 font-mono text-sm"
                      placeholder="Seu código aqui..."
                    />
                  </div>
                </div>
              </div>

              {/* Botão Enviar */}
              <div className="text-center pt-6">
                <button 
                  onClick={enviarRespostas}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  ✓ Enviar Respostas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

export default CoursesPage;