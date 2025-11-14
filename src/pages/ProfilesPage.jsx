import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/NavBar';
import ProfileCard from '../components/ProfileCard';
import SearchFilter from '../components/SearchFilter'; 
import ProfileModal from '../components/ProfileModal'; // Importa o Modal corrigido
import profilesData from '../data/profilesData.json'; 

const ProfilesPage = ({ goToLanding }) => {
  const [profiles] = useState(profilesData);
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null); 

  useEffect(() => {
    // Trava o scroll da página principal quando o modal está aberto
    document.body.style.overflow = selectedProfile ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProfile]);

  const handleSearchAndFilter = (text, filters) => {
    setSearchText(text);
    setActiveFilters(filters);
  };

  // Lógica de Filtro (Agora com verificações de segurança)
  const filteredProfiles = useMemo(() => {
    let results = profiles;
    const lowerSearchText = searchText.toLowerCase();

    if (searchText) {
      results = results.filter(profile =>
        // Verifica se cada campo existe antes de chamar o .toLowerCase()
        (profile.nome && profile.nome.toLowerCase().includes(lowerSearchText)) ||
        (profile.cargo && profile.cargo.toLowerCase().includes(lowerSearchText)) ||
        (profile.resumo && profile.resumo.toLowerCase().includes(lowerSearchText)) ||
        // Verifica o array de habilidades
        (profile.habilidadesTecnicas && profile.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(lowerSearchText)))
      );
    }
    
    // Filtros de Dropdown (com segurança)
    if (activeFilters.area) {
      results = results.filter(p => p.area === activeFilters.area);
    }
    if (activeFilters.localizacao) {
      // Usamos '?' (optional chaining) por segurança
      results = results.filter(p => p.localizacao?.includes(activeFilters.localizacao)); 
    }
    if (activeFilters.tecnologia) {
      // Usamos '?' (optional chaining) por segurança
      results = results.filter(p => p.habilidadesTecnicas?.includes(activeFilters.tecnologia)); 
    }

    return results;

  }, [profiles, searchText, activeFilters]);

  return (
    <div className="min-h-screen">
      
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
                  onClick={() => setSelectedProfile(profile)} // Define o perfil para abrir o modal
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

      {/* Renderiza o Modal se 'selectedProfile' não for nulo */}
      {selectedProfile && (
        <ProfileModal 
          profile={selectedProfile} 
          onClose={() => setSelectedProfile(null)} // Define como nulo para fechar
        />
      )}
    </div>
  );
};

export default ProfilesPage;