// 1. IMPORTAMOS os novos ícones e o 'useState' (que já estava)
import React, { useState } from 'react';
import { ThumbsUp, CheckCircle, MessageSquare, Send, Check } from 'lucide-react'; 

// 2. O CARD AGORA SÓ RECEBE 'onCardClick'
const ProfileCard = ({ profile, onCardClick }) => {
  
  const { id, nome, cargo, foto, localizacao, resumo, area, habilidadesTecnicas = [] } = profile || {};
  
  // Lógica de Recomendar (do Commit 1, sem alteração)
  const [isRecommended, setIsRecommended] = useState(() => {
    try {
      if (id) {
        const recommendations = JSON.parse(localStorage.getItem('recomendacoesReQualifica') || '[]');
        return recommendations.includes(id); 
      }
    } catch (error) { console.error("Falha ao ler localStorage", error); }
    return false; 
  });
  
  // 3. NOVA LÓGICA DE MENSAGEM (Expansível no Card)
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Função Recomendar (do Commit 1, sem alteração)
  const handleRecommend = (e) => {
    e.stopPropagation(); 
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

  // 4. NOVA FUNÇÃO para abrir o formulário de Mensagem
  const handleMessageClick = (e) => {
    e.stopPropagation(); // Impede que o clique abra o modal de detalhes
    setIsMessageOpen(!isMessageOpen); // Alterna a visibilidade do formulário
    setIsSent(false); // Reseta o estado de "enviado"
  };

  // 5. NOVA FUNÇÃO para "enviar" a mensagem (simulação com alert)
  const handleSubmitMessage = (e) => {
    e.stopPropagation(); // Impede o modal de abrir
    e.preventDefault(); // Impede o recarregamento da página (pois é um form)
    
    if (message.trim() === '') {
      alert('Por favor, digite uma mensagem.');
      return;
    }
    
    console.log(`Mensagem para ${nome} (ID: ${id}): ${message}`);
    setIsSent(true);

    // MENSAGEM PROVISÓRIA (O Toast vem no próximo commit)
    alert(`Mensagem enviada para ${nome}!`);

    // Limpa e fecha o formulário após 1 segundo
    setTimeout(() => {
      setMessage('');
      setIsMessageOpen(false);
      setIsSent(false);
    }, 1000); 
  };

  // Trava de segurança
  if (!id) return null; 

  const displaySkills = habilidadesTecnicas.slice(0, 4);

  return (
    <div 
      className="bg-bg-light-card dark:bg-bg-dark-card rounded-xl shadow-lg 
                 transition-all duration-300 
                 border-t-4 border-primary-red dark:border-secondary-orange group
                 flex flex-col"
    >
      {/* --- Seção de Informações (Clicável para abrir o Modal de Detalhes) --- */}
      <div 
        onClick={() => onCardClick(profile)} 
        className="p-6 cursor-pointer"
      >
        {/* ... (Conteúdo do card: foto, nome, resumo, skills, etc. - Sem alteração) ... */}
        <div className="flex items-center space-x-4 mb-4">
          <img src={foto || 'https://via.placeholder.com/64'} alt={`Foto de ${nome}`} className="w-16 h-16 rounded-full object-cover border-2 border-secondary-orange group-hover:border-primary-red transition-colors"/>
          <div>
            <h2 className="text-xl font-bold text-text-dark-main dark:text-text-dark-main-light">{nome}</h2>
            <p className="text-sm text-primary-red font-medium">{cargo}</p>
          </div>
        </div>
        <p className="text-sm mb-3 text-text-light-support dark:text-text-dark-support line-clamp-2">{resumo}</p>
        <div className="flex justify-between items-center text-xs mt-3 border-t pt-3 border-gray-200 dark:border-gray-700">
          <span className="text-text-light-support dark:text-text-dark-support font-medium">Área: <span className="text-text-dark-main dark:text-text-dark-main-light">{area}</span></span>
          <span className="text-text-light-support dark:text-text-dark-support">📍 {localizacao}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {displaySkills.map(skill => (
            <span key={skill} className="text-xs bg-primary-red/10 text-primary-red px-3 py-1 rounded-full font-medium">{skill}</span>
          ))}
          {habilidadesTecnicas.length > 4 && (
            <span className="text-xs bg-gray-300/20 text-text-light-support dark:text-text-dark-support px-3 py-1 rounded-full font-medium">+ {habilidadesTecnicas.length - 4}</span>
          )}
        </div>
      </div>

      {/* --- 6. SEÇÃO DE AÇÕES E FORMULÁRIO (Atualizada) --- */}
      <div className="px-6 pb-6">
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-2">
          
          {/* Botão Recomendar (do Commit 1) */}
          <button
            onClick={handleRecommend}
            title="Recomendar"
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
              ${isRecommended 
                ? 'bg-primary-red text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-text-light-support dark:text-text-dark-support hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            {isRecommended ? <CheckCircle size={16} /> : <ThumbsUp size={16} />}
            <span>{isRecommended ? 'Recomendado' : 'Recomendar'}</span>
          </button>

          {/* Botão Enviar Mensagem (Abre o formulário) */}
          <button
            onClick={handleMessageClick}
            title="Enviar Mensagem"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light-support dark:text-text-dark-support hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 text-sm font-medium"
          >
            <MessageSquare size={16} />
            <span>{isMessageOpen ? 'Fechar' : 'Mensagem'}</span>
          </button>
        </div>

        {/* 7. Formulário Colapsável (Aparece aqui dentro) */}
        {isMessageOpen && (
          <form 
            onSubmit={handleSubmitMessage}
            className="mt-4" 
            onClick={(e) => e.stopPropagation()} // Impede o modal de abrir
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Digite sua mensagem para ${nome}...`}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-bg-dark-main dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-red"
              rows={3}
              disabled={isSent}
            />
            <button
              type="submit"
              disabled={isSent}
              className={`w-full mt-2 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2
                ${isSent 
                  ? 'bg-green-500 cursor-not-allowed' 
                  : 'bg-primary-red hover:bg-secondary-orange'
                }`}
            >
              {isSent ? <Check size={20} /> : <Send size={18} />}
              <span>{isSent ? 'Enviado!' : 'Enviar'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;