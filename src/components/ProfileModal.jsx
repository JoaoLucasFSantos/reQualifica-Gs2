import React from 'react';
// 1. IMPORTAÇÕES ATUALIZADAS (MessageSquare removido)
import { 
  X, MapPin, Mail, Phone, ExternalLink, 
  Briefcase, GraduationCap, Code, Brain, BookOpen, Award 
} from 'lucide-react';

// --- Componentes Auxiliares (InfoItem, DetailBlock) ---
// (Estes são os componentes robustos que não quebram)
const InfoItem = ({ icon: Icon, text }) => {
  if (!text) return null; 
  return (
    <div className="flex items-start space-x-2 text-sm">
      <Icon size={16} className="text-secondary-orange flex-shrink-0 mt-1" />
      <span className="text-text-dark-main dark:text-text-dark-main-light break-words">{text}</span>
    </div>
  );
};
const DetailBlock = ({ title, icon: Icon, children, items }) => {
  const hasContent = items && items.length > 0;
  return (
    <div className="mb-6">
      <h3 className="flex items-center text-xl font-bold mb-3 border-b pb-2 text-primary-red dark:text-secondary-orange">
        <Icon size={20} className="mr-2" />
        {title}
      </h3>
      <div className="space-y-4 pl-1">
        {hasContent ? children : <p className="text-sm text-text-light-support dark:text-text-dark-support">Nenhuma informação registrada.</p>}
      </div>
    </div>
  );
};

// --- Componente Principal (Atualizado) ---
const ProfileModal = ({ profile, onClose }) => {

  if (!profile) return null;

  // Desestruturação com valores padrão para segurança
  const {
    nome, cargo, foto, resumo, localizacao, area,
    infoPessoal = {}, 
    experiencias = [], 
    formacao = [],
    projetos = [],
    habilidadesTecnicas = [],
    softSkills = [],
    certificacoes = [],
    idiomas = [],
    areaInteresses = [] 
  } = profile;

  // 2. FUNÇÃO 'handleMessage' REMOVIDA
  
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
      onClick={onClose} 
    >
      {/* Container */}
      <div 
        className="bg-bg-light-main dark:bg-bg-dark-main w-full max-w-4xl h-[95vh] rounded-lg shadow-2xl flex flex-col overflow-hidden"
        onClick={handleContentClick}
      >
        
        {/* Header */}
        <header className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-2xl font-extrabold text-primary-red dark:text-secondary-orange">{nome}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-text-dark-main dark:text-text-dark-main-light hover:bg-gray-100 dark:hover:bg-gray-700 transition" aria-label="Fechar">
            <X size={24} />
          </button>
        </header>

        {/* Conteúdo Scrollável (Idêntico, sem alterações) */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {/* Seção Principal */}
          <div className="flex flex-col md:flex-row items-start md:space-x-6 mb-8 pb-6 border-b border-dashed border-gray-300 dark:border-gray-700">
            <img src={foto || 'https://via.placeholder.com/120'} alt={`Foto de ${nome}`} className="w-28 h-28 rounded-full object-cover mb-4 md:mb-0 border-4 border-secondary-orange flex-shrink-0"/>
            <div className="flex-1">
              <p className="text-lg font-semibold text-text-dark-main dark:text-text-dark-main-light">{cargo}</p>
              <p className="text-sm text-primary-red font-medium mb-3">{area}</p>
              <p className="text-base italic text-text-light-support dark:text-text-dark-support">{resumo}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-4">
                <InfoItem icon={MapPin} text={localizacao} />
                <InfoItem icon={Mail} text={infoPessoal.email} />
                <InfoItem icon={Phone} text={infoPessoal.telefone} />
                {infoPessoal.linkedin && (
                  <a href={infoPessoal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-primary-red hover:underline">
                      <ExternalLink size={16} />
                      <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Layout de Duas Colunas (Idêntico) */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DetailBlock title="Experiências Profissionais" icon={Briefcase} items={experiencias}>
                {experiencias.map((exp, index) => (
                  <div key={index} className="border-l-4 border-secondary-orange pl-3">
                    <p className="font-semibold text-text-dark-main dark:text-text-dark-main-light">{exp.cargo} em {exp.empresa}</p>
                    <p className="text-xs text-text-light-support dark:text-text-dark-support">{exp.inicio} até {exp.fim || 'Atual'}</p>
                    <p className="text-sm mt-1">{exp.descricao}</p>
                  </div>
                ))}
              </DetailBlock>
              <DetailBlock title="Formação Acadêmica" icon={GraduationCap} items={formacao}>
                {formacao.map((form, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-semibold text-text-dark-main dark:text-text-dark-main-light">{form.curso}</p>
                    <p>{form.instituicao}, Conclusão: {form.ano}</p>
                  </div>
                ))}
              </DetailBlock>
              <DetailBlock title="Projetos (Portfólio)" icon={BookOpen} items={projetos}>
                {projetos.map((proj, index) => (
                  <div key={index} className="text-sm">
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-red hover:underline flex items-center space-x-1">
                      <span>{proj.titulo}</span>
                      <ExternalLink size={14} />
                    </a>
                    <p>{proj.descricao}</p>
                  </div>
                ))}
              </DetailBlock>
            </div>
            <div className="lg:col-span-1 space-y-6">
              <DetailBlock title="Habilidades Técnicas" icon={Code} items={habilidadesTecnicas}>
                <div className="flex flex-wrap gap-2">
                  {habilidadesTecnicas.map((skill, index) => (
                    <span key={index} className="text-xs bg-primary-red/15 text-primary-red dark:bg-secondary-orange/20 dark:text-secondary-orange px-3 py-1 rounded-full font-medium">{skill}</span>
                  ))}
                </div>
              </DetailBlock>
              <DetailBlock title="Soft Skills & Interesses" icon={Brain} items={softSkills.length > 0 || areaInteresses.length > 0 ? softSkills : undefined}>
                <p className="font-medium text-text-dark-main dark:text-text-dark-main-light">Soft Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {softSkills.length > 0 ? softSkills.map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-300/30 dark:bg-gray-600/30 text-text-dark-main dark:text-text-dark-main-light px-3 py-1 rounded-full">{skill}</span>
                  )) : <p className="text-sm text-text-light-support dark:text-text-dark-support">Nenhuma soft skill registrada.</p>}
                </div>
                <p className="font-medium mt-3 text-text-dark-main dark:text-text-dark-main-light">Interesses (Hobbies):</p>
                <div className="flex flex-wrap gap-2">
                  {areaInteresses.length > 0 ? areaInteresses.map((hobby, index) => (
                    <span key={index} className="text-xs bg-gray-300/30 dark:bg-gray-600/30 text-text-dark-main dark:text-text-dark-main-light px-3 py-1 rounded-full">{hobby}</span>
                  )) : <p className="text-sm text-text-light-support dark:text-text-dark-support">Nenhum interesse registrado.</p>}
                </div>
              </DetailBlock>
              <DetailBlock title="Certificações e Idiomas" icon={Award} items={certificacoes.length > 0 || idiomas.length > 0 ? certificacoes : undefined}>
                <p className="font-medium text-text-dark-main dark:text-text-dark-main-light">Certificações:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {certificacoes.length > 0 ? certificacoes.map((cert, index) => (
                    <li key={index} className="text-text-dark-main dark:text-text-dark-main-light">{cert}</li>
                  )) : <p className="text-sm text-text-light-support dark:text-text-dark-support">Nenhuma certificação registrada.</p>}
                </ul>
                <p className="font-medium mt-3 text-text-dark-main dark:text-text-dark-main-light">Idiomas:</p>
                <div className="flex flex-wrap gap-x-4 text-sm">
                  {idiomas.length > 0 ? idiomas.map((lang, index) => (
                    <span key={index} className="text-text-dark-main dark:text-text-dark-main-light">{lang.idioma} ({lang.nivel})</span>
                  )) : <p className="text-sm text-text-light-support dark:text-text-dark-support">Nenhum idioma registrado.</p>}
                </div>
              </DetailBlock>
            </div>
          </div>
        </div>
        
        {/* 3. RODAPÉ ATUALIZADO (Sem botões) */}
        <footer className="p-4 bg-bg-light-main dark:bg-bg-dark-main border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex justify-end space-x-4">
            {/* Vazio - As ações estão no Card */}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfileModal;