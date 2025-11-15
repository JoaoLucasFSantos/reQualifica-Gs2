// 1. IMPORTAMOS useState, useEffect e os ícones
import React, { useState } from 'react';
import { ThumbsUp, CheckCircle } from 'lucide-react'; 

// 2. O CARD AGORA SÓ RECEBE 'onCardClick' (o onMessageClick virá no próximo commit)
const ProfileCard = ({ profile, onCardClick }) => {
  
  const { id, nome, cargo, foto, localizacao, resumo, area, habilidadesTecnicas = [] } = profile || {};
  
  // 3. LÓGICA DE RECOMENDAR (Corrigida com lazy initializer para evitar erro)
  const [isRecommended, setIsRecommended] = useState(() => {
    try {
      if (id) {
        const recommendations = JSON.parse(localStorage.getItem('recomendacoesReQualifica') || '[]');
        return recommendations.includes(id); 
      }
    } catch (error) { console.error("Falha ao ler localStorage", error); }
    return false; 
  });
  
  // 4. FUNÇÃO PARA RECOMENDAR (LIKE/UNLIKE)
  const handleRecommend = (e) => {
    e.stopPropagation(); // Impede que o clique abra o modal de detalhes
    
    const recommendations = JSON.parse(localStorage.getItem('recomendacoesReQualifica') || '[]');
    let newRecommendations;

    if (isRecommended) {
      newRecommendations = recommendations.filter(recId => recId !== id);
      setIsRecommended(false);
    } else {
      newRecommendations = [...recommendations, id];
      setIsRecommended(true);
    }
    localStorage.setItem('recomendacoesReQualifica', JSON.stringify(newRecommendations));
  };

  // Trava de segurança
  if (!id) return null; 

  const displaySkills = habilidadesTecnicas.slice(0, 4);

  return (
    <div 
      className="bg-bg-light-card dark:bg-bg-dark-card rounded-xl shadow-lg 
                 transition-all duration-300 
                 border-t-4 border-primary-red dark:border-secondary-orange group
                 flex flex-col justify-between" // Garante que os botões fiquem embaixo
    >
      {/* --- Seção de Informações (Clicável para abrir o Modal de Detalhes) --- */}
      <div 
        onClick={() => onCardClick(profile)} 
        className="p-6 cursor-pointer"
      >
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={foto || 'https://via.placeholder.com/64'} 
            alt={`Foto de ${nome}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-secondary-orange group-hover:border-primary-red transition-colors"
          />
          <div>
            <h2 className="text-xl font-bold text-text-dark-main dark:text-text-dark-main-light">{nome}</h2>
            <p className="text-sm text-primary-red font-medium">{cargo}</p>
          </div>
        </div>
        
        <p className="text-sm mb-3 text-text-light-support dark:text-text-dark-support line-clamp-2">
          {resumo}
        </p>

        <div className="flex justify-between items-center text-xs mt-3 border-t pt-3 border-gray-200 dark:border-gray-700">
          <span className="text-text-light-support dark:text-text-dark-support font-medium">
            Área: <span className="text-text-dark-main dark:text-text-dark-main-light">{area}</span>
          </span>
          <span className="text-text-light-support dark:text-text-dark-support">
            📍 {localizacao}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {displaySkills.map(skill => (
            <span key={skill} className="text-xs bg-primary-red/10 text-primary-red px-3 py-1 rounded-full font-medium">
              {skill}
            </span>
          ))}
          {habilidadesTecnicas.length > 4 && (
            <span className="text-xs bg-gray-300/20 text-text-light-support dark:text-text-dark-support px-3 py-1 rounded-full font-medium">
              + {habilidadesTecnicas.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* --- 5. NOVA SEÇÃO DE AÇÕES (COM APENAS 1 BOTÃO POR ENQUANTO) --- */}
      <div className="px-6 pb-6">
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-2">
          
          <button
            onClick={handleRecommend}
            title="Recomendar"
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
              ${isRecommended 
                ? 'bg-primary-red text-white' // Estado "Recomendado"
                : 'bg-gray-200 dark:bg-gray-700 text-text-light-support dark:text-text-dark-support hover:bg-gray-300 dark:hover:bg-gray-600' // Estado Padrão
              }`}
          >
            {isRecommended ? <CheckCircle size={16} /> : <ThumbsUp size={16} />}
            <span>{isRecommended ? 'Recomendado' : 'Recomendar'}</span>
          </button>

          {/* O botão de Mensagem será adicionado no próximo commit */}
          
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;