import React, { useState } from 'react';
import { Search, MapPin, Layers, Briefcase } from 'lucide-react';

const SearchFilter = ({ onSearch, filters, setFilters }) => {
  const [searchText, setSearchText] = useState('');

  // Opções simuladas (ajuste conforme seu JSON final, se necessário)
  const areas = ['Desenvolvimento', 'Data Science', 'Design e Experiência do Usuário', 'Marketing', 'Cibersegurança', 'Gestão de Projetos', 'Infraestrutura e Cloud', 'Qualidade de Software', 'Recursos Humanos'];
  const cidades = ['São Paulo/SP', 'Rio de Janeiro/RJ', 'Curitiba/PR', 'Belo Horizonte/MG', 'Porto Alegre/RS', 'Campinas/SP', 'Recife/PE', 'Salvador/BA', 'Florianópolis/SC'];
  // Tecnologias mais comuns
  const tecnologias = ['React', 'Python', 'AWS', 'Figma', 'SEO', 'SQL', 'Node.js', 'Angular', 'Java', 'C#', 'Flutter'];

  const handleSearch = () => {
    onSearch(searchText, filters);
  };

  const handleFilterChange = (name, value) => {
    // Atualiza os filtros no componente pai (ProfilesPage.jsx)
    setFilters(prev => ({
      ...prev,
      [name]: value === "" ? null : value 
    }));
  };

  return (
    <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-lg mb-8 transition-colors">
      <h2 className="text-xl font-bold mb-4 text-text-dark-main dark:text-text-dark-main-light">
        Busca Avançada
      </h2>

      {/* 1. Busca por Texto */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
        <Search size={20} className="text-primary-red dark:text-secondary-orange" />
        <input
          type="text"
          placeholder="Busque por nome, cargo ou tecnologia..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 bg-transparent p-2 text-text-dark-main dark:text-text-dark-main-light 
                     placeholder-text-light-support focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-primary-red hover:bg-secondary-orange text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Buscar
        </button>
      </div>

      {/* 2. Filtros Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Filtro por Área */}
        <div className="flex items-center space-x-2">
          <Briefcase size={18} className="text-secondary-orange" />
          <select 
            onChange={(e) => handleFilterChange('area', e.target.value)}
            value={filters.area || ''}
            className="flex-1 bg-bg-light-main dark:bg-bg-dark-main p-2 rounded-md border border-gray-300 dark:border-gray-600 text-text-dark-main dark:text-text-dark-main-light"
          >
            <option value="">Todas as Áreas</option>
            {areas.sort().map(area => <option key={area} value={area}>{area}</option>)}
          </select>
        </div>

        {/* Filtro por Localização */}
        <div className="flex items-center space-x-2">
          <MapPin size={18} className="text-secondary-orange" />
          <select
            onChange={(e) => handleFilterChange('localizacao', e.target.value)}
            value={filters.localizacao || ''}
            className="flex-1 bg-bg-light-main dark:bg-bg-dark-main p-2 rounded-md border border-gray-300 dark:border-gray-600 text-text-dark-main dark:text-text-dark-main-light"
          >
            <option value="">Todas as Cidades</option>
            {cidades.sort().map(cidade => <option key={cidade} value={cidade}>{cidade}</option>)}
          </select>
        </div>
        
        {/* Filtro por Tecnologia */}
        <div className="flex items-center space-x-2">
          <Layers size={18} className="text-secondary-orange" />
          <select
            onChange={(e) => handleFilterChange('tecnologia', e.target.value)}
            value={filters.tecnologia || ''}
            className="flex-1 bg-bg-light-main dark:bg-bg-dark-main p-2 rounded-md border border-gray-300 dark:border-gray-600 text-text-dark-main dark:text-text-dark-main-light"
          >
            <option value="">Qualquer Tecnologia</option>
            {tecnologias.sort().map(tech => <option key={tech} value={tech}>{tech}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;