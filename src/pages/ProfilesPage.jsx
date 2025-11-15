import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import SearchFilter from '../components/SearchFilter'; 
import ProfileModal from '../components/ProfileModal';
import profilesData from '../data/profilesData.json'; 
// 1. IMPORTAMOS O NOVO COMPONENTE TOAST
import Toast from '../components/Toast'; 

const ProfilesPage = ({ goToLanding }) => {
  const [profiles] = useState(profilesData);
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null); 
  
  // 2. NOVO ESTADO PARA A MENSAGEM DO TOAST
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const isModalOpen = selectedProfile;
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProfile]);

  const handleSearchAndFilter = (text, filters) => {
    setSearchText(text);
    setActiveFilters(filters);
  };

  const filteredProfiles = useMemo(() => {
    // ... (Lógica de filtro robusta, sem alteração) ...
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
      
      {/* 3. RENDERIZAÇÃO CONDICIONAL DO TOAST */}
      {/* Se 'toastMessage' tiver texto, o Toast aparece */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage('')} // Função para fechar o Toast
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
                  // 4. PASSA A FUNÇÃO DE ATIVAR O TOAST PARA O CARD
                  setToastMessage={setToastMessage} 
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

      {/* Modal de Detalhes (Sem alteração) */}
      {selectedProfile && (
        <ProfileModal 
          profile={selectedProfile} 
          onClose={() => setSelectedProfile(null)} 
        />
      )}
    </div>
  );
};

export default ProfilesPage;