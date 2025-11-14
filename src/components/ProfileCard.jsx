import React from 'react';

const ProfileCard = ({ profile, onClick }) => {
  // Pegamos as 4 primeiras skills principais para o card (ou menos)
  const displaySkills = profile.habilidadesTecnicas.slice(0, 4);
  
  const { nome, cargo, foto, localizacao, resumo, area } = profile;

  return (
    <div 
      onClick={onClick}
      className="bg-bg-light-card dark:bg-bg-dark-card rounded-xl shadow-lg 
                 p-6 transform hover:scale-[1.02] transition-all duration-300 
                 cursor-pointer border-t-4 border-primary-red dark:border-secondary-orange group"
    >
      <div className="flex items-center space-x-4 mb-4">
        {/* Foto do Perfil */}
        <img 
          src={foto || 'https://via.placeholder.com/64/FF7043/FFFFFF?text=P'} 
          alt={`Foto de ${nome}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-secondary-orange group-hover:border-primary-red transition-colors"
        />
        <div>
          {/* Nome e Cargo */}
          <h2 className="text-xl font-bold text-text-dark-main dark:text-text-dark-main-light">{nome}</h2>
          <p className="text-sm text-primary-red font-medium">{cargo}</p>
        </div>
      </div>
      
      {/* Resumo e Localização */}
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

      {/* Skills Principais */}
      <div className="mt-4 flex flex-wrap gap-2">
        {displaySkills.map(skill => (
          <span 
            key={skill} 
            className="text-xs bg-primary-red/10 text-primary-red px-3 py-1 rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
        {profile.habilidadesTecnicas.length > 4 && (
          <span className="text-xs bg-gray-300/20 text-text-light-support dark:text-text-dark-support px-3 py-1 rounded-full font-medium">
            + {profile.habilidadesTecnicas.length - 4}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;