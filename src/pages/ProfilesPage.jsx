import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import SearchFilter from '../components/SearchFilter'; 
import ProfileModal from '../components/ProfileModal'; // Modal de Detalhes
import Toast from '../components/Toast'; // O NOVO componente de notificação
import profilesData from '../data/profilesData.json'; 

const ProfilesPage = ({ goToLanding }) => {
  const [profiles] = useState(profilesData);
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  
  // Estados dos Modais/Pop-ups
  const [selectedProfile, setSelectedProfile] = useState(null); // Para o Modal de Detalhes
  const [toastMessage, setToastMessage] = useState('');     // Para a notificação push-up

  // Efeito para travar o scroll
  useEffect(() => {
    const isModalOpen = selectedProfile; // Apenas o modal grande trava o scroll
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProfile]);

  const handleSearchAndFilter = (text, filters) => {
    setSearchText(text);
    setActiveFilters(filters);
  };

  // Lógica de Filtro (com verificações de segurança)
  const filteredProfiles = useMemo(() => {
    let results = profiles;
    const lowerSearchText = searchText.toLowerCase();

    if (searchText) {
      results = results.filter(profile =>
        (profile.nome && profile.nome.toLowerCase().includes(lowerSearchText)) ||
        (profile.cargo && profile.cargo.toLowerCase().includes(lowerSearchText)) ||
        (profile.resumo && profile.resumo.toLowerCase().includes(lowerSearchText)) ||
        (profile.habilidadesTecnicas && profile.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(lowerSearchText)))
      );
    }
    
    if (activeFilters.area) {
      results = results.filter(p => p.area === activeFilters.area);
    }
    if (activeFilters.localizacao) {
      results = results.filter(p => p.localizacao?.includes(activeFilters.localizacao)); 
    }
    if (activeFilters.tecnologia) {
      results = results.filter(p => p.habilidadesTecnicas?.includes(activeFilters.tecnologia)); 
    }

    return results;

  }, [profiles, searchText, activeFilters]);

  return (
    <div className="min-h-screen">
      
      {/* Notificação Push-up (Toast) */}
      {/* Renderiza o Toast se houver uma mensagem */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage('')} 
        />
      )}
      
      <Navbar goToLanding={goToLanding} /> 
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-4xl font-extrabold mb-6 text-primary-red dark:text-secondary-orange">
            Perfis Cadastrados
          </h1>
          
          <SearchFilter 
            onSearch={(text) => handleSearchAndFilter(text, activeFilters)} 
            filters={activeFilters} 
            setFilters={(filters) => handleSearchAndFilter(searchText, filters)} 
          />
          
          <h2 className="text-2xl font-semibold mb-4 text-text-dark-main dark:text-text-dark-main-light">
            {filteredProfiles.length} Profissionais Encontrados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  onCardClick={() => setSelectedProfile(profile)} 
                  setToastMessage={setToastMessage} // Passa a função para o card
                />
              ))
            ) : (
              <p className="text-xl col-span-full text-center py-10 text-text-light-support dark:text-text-dark-support">
                Nenhum profissional corresponde aos filtros aplicados. Tente ajustar a busca.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Renderização Condicional do Modal de Detalhes */}
      {selectedProfile && (
        <ProfileModal 
          profile={selectedProfile} 
          onClose={() => setSelectedProfile(null)} 
        />
      )}
      
      {/* O MessageModal foi removido daqui */}
    </div>
  );
};

export default ProfilesPage;