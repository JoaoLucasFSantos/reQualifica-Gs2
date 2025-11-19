import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { MapPin, Mail, Phone, Linkedin, Github, Edit, Award, Briefcase, Code, Save, Plus, Trash2, Camera, AlertCircle } from 'lucide-react';

const MyProfilePage = ({ onNavigate }) => {
  
  // 1. DADOS INICIAIS
  const initialData = {
    nome: "João Desenvolvedor",
    cargo: "Engenheiro de Software Full Stack",
    resumo: "Apaixonado por tecnologia e inovação...",
    localizacao: "São Paulo, SP",
    email: "joao.dev@requalifica.com",
    telefone: "(11) 99999-8888",
    github: "github.com/joaodev",
    linkedin: "linkedin.com/in/joao",
    skills: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    experiencia: [
      { empresa: "Tech Solutions", cargo: "Dev Pleno", periodo: "2022 - Atual" }
    ],
    educacao: [
      { instituicao: "FIAP", curso: "Análise e Dev. Sistemas", ano: "2021" }
    ]
  };

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('myProfileData');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    localStorage.setItem('myProfileData', JSON.stringify(profileData));
  }, [profileData]);

  // --- FUNÇÃO DE VALIDAÇÃO E SALVAMENTO (A NOVA LÓGICA) ---
  const handleSave = () => {
    // 1. Valida Campos Principais
    if (!profileData.nome.trim() || !profileData.cargo.trim() || !profileData.resumo.trim()) {
      alert("Erro: Nome, Cargo e Resumo são obrigatórios!");
      return;
    }

    // 2. Valida Experiências (Nenhum campo pode estar vazio)
    const hasInvalidExp = profileData.experiencia.some(exp => 
      !exp.empresa.trim() || !exp.cargo.trim() || !exp.periodo.trim()
    );
    if (hasInvalidExp) {
      alert("Erro: Preencha todos os campos das Experiências Profissionais.");
      return;
    }

    // 3. Valida Formação
    const hasInvalidEdu = profileData.educacao.some(edu => 
      !edu.instituicao.trim() || !edu.curso.trim() || !edu.ano.trim()
    );
    if (hasInvalidEdu) {
      alert("Erro: Preencha todos os campos da Formação Acadêmica.");
      return;
    }

    // Se passou por tudo, salva/sai do modo edição
    setIsEditing(false);
    alert("Perfil atualizado com sucesso!");
  };

  // --- MANIPULAÇÃO DE DADOS ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setProfileData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      setNewSkill("");
    }
  };
  const removeSkill = (indexToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Experiência
  const handleExperienceChange = (index, field, value) => {
    const newExp = [...profileData.experiencia];
    newExp[index][field] = value;
    setProfileData(prev => ({ ...prev, experiencia: newExp }));
  };
  // Agora adiciona campos vazios para forçar digitação
  const addExperience = () => {
    setProfileData(prev => ({
      ...prev,
      experiencia: [...prev.experiencia, { empresa: "", cargo: "", periodo: "" }]
    }));
  };
  const removeExperience = (index) => {
    const newExp = profileData.experiencia.filter((_, i) => i !== index);
    setProfileData(prev => ({ ...prev, experiencia: newExp }));
  };

  // Educação
  const handleEducationChange = (index, field, value) => {
    const newEdu = [...profileData.educacao];
    newEdu[index][field] = value;
    setProfileData(prev => ({ ...prev, educacao: newEdu }));
  };
  const addEducation = () => {
    setProfileData(prev => ({
      ...prev,
      educacao: [...prev.educacao, { instituicao: "", curso: "", ano: "" }]
    }));
  };
  const removeEducation = (index) => {
    const newEdu = profileData.educacao.filter((_, i) => i !== index);
    setProfileData(prev => ({ ...prev, educacao: newEdu }));
  };

  // Helper para estilo de input inválido
  const getInputClass = (value) => {
    const base = "w-full p-1 rounded bg-white dark:bg-[#2d2d2d] text-text-dark-main dark:text-white border ";
    // Se estiver vazio e editando, borda vermelha. Senão, borda padrão.
    return base + (value.trim() === "" ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 dark:border-gray-600");
  };

  return (
    <div className="min-h-screen pb-16 bg-bg-light-main dark:bg-bg-dark-main transition-colors">
      <Navbar onNavigate={onNavigate} activePage="my-profile" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Capa e Header */}
        <div className="relative mb-24">
          <div className="h-48 w-full bg-gradient-to-r from-primary-red to-secondary-orange rounded-xl shadow-lg"></div>
          
          <div className="absolute -bottom-20 left-6 right-6 flex flex-col md:flex-row items-end md:items-center justify-between">
            <div className="flex items-end space-x-6">
              {/* Foto */}
              <div className="relative group w-32 h-32 rounded-full border-4 border-white dark:border-[#121212] overflow-hidden bg-white shadow-xl">
                <img 
                  alt="" 
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                    <Camera className="text-white" />
                  </div>
                )}
              </div>

              {/* Nome e Cargo */}
              <div className="mb-2 flex-1 w-full md:w-auto">
                {isEditing ? (
                  <div className="space-y-2">
                    <input 
                      name="nome" 
                      value={profileData.nome} 
                      onChange={handleChange}
                      placeholder="Seu Nome Completo *"
                      className={`text-2xl font-bold ${getInputClass(profileData.nome)}`}
                    />
                    <input 
                      name="cargo" 
                      value={profileData.cargo} 
                      onChange={handleChange}
                      placeholder="Seu Cargo *"
                      className={`text-sm font-medium ${getInputClass(profileData.cargo)}`}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-text-dark-main dark:text-white shadow-black drop-shadow-sm">
                      {profileData.nome}
                    </h1>
                    <p className="text-text-dark-support dark:text-gray-300 font-medium">{profileData.cargo}</p>
                  </>
                )}
              </div>
            </div>
            
            {/* Botão Ação: Chama handleSave se estiver editando, ou setIsEditing se não */}
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`mb-2 px-6 py-2 rounded-lg shadow-md transition flex items-center space-x-2 font-bold text-white
                ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-secondary-orange hover:bg-primary-red'}`}
            >
              {isEditing ? <><Save size={18} /><span>Salvar</span></> : <><Edit size={18} /><span>Editar Perfil</span></>}
            </button>
          </div>
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          {/* COLUNA ESQUERDA */}
          <div className="md:col-span-1 space-y-6">
            
            {/* Detalhes */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md border-t-4 border-primary-red">
              <h2 className="text-xl font-bold mb-4 text-text-dark-main dark:text-white flex items-center">
                <MapPin size={20} className="mr-2 text-primary-red" /> Detalhes
              </h2>
              <div className="space-y-3 text-sm text-text-light-support dark:text-text-dark-support">
                {[
                  { icon: MapPin, name: 'localizacao', ph: 'Cidade, Estado' },
                  { icon: Mail, name: 'email', ph: 'Email' },
                  { icon: Phone, name: 'telefone', ph: 'Telefone' },
                  { icon: Github, name: 'github', ph: 'GitHub URL' },
                  { icon: Linkedin, name: 'linkedin', ph: 'LinkedIn URL' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <item.icon size={16} className="flex-shrink-0" />
                    {isEditing ? (
                      <input 
                        name={item.name} value={profileData[item.name]} onChange={handleChange} placeholder={item.ph}
                        className="w-full p-1 text-xs rounded bg-white dark:bg-[#2d2d2d] border border-gray-300 dark:border-gray-600"
                      />
                    ) : (
                      <span className="break-all">{profileData[item.name]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md border-t-4 border-secondary-orange">
              <h2 className="text-xl font-bold mb-4 text-text-dark-main dark:text-white flex items-center">
                <Code size={20} className="mr-2 text-secondary-orange" /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-text-dark-main dark:text-white text-xs rounded-full font-medium flex items-center">
                    {skill}
                    {isEditing && (
                      <button onClick={() => removeSkill(index)} className="ml-2 text-red-500 hover:text-red-700"><Trash2 size={12} /></button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="mt-4 flex space-x-2">
                  <input 
                    value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Nova skill..."
                    className="flex-1 p-1 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-[#2d2d2d] dark:text-white"
                  />
                  <button onClick={addSkill} className="p-1 bg-secondary-orange text-white rounded hover:bg-primary-red"><Plus size={18} /></button>
                </div>
              )}
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Sobre Mim */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-text-dark-main dark:text-white">Sobre Mim</h2>
              {isEditing ? (
                <textarea 
                  name="resumo" value={profileData.resumo} onChange={handleChange} rows={4} placeholder="Escreva um breve resumo sobre você *"
                  className={`w-full p-2 rounded bg-white dark:bg-[#2d2d2d] text-text-dark-main dark:text-white ${profileData.resumo.trim() === "" ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
                />
              ) : (
                <p className="text-text-light-support dark:text-text-dark-support leading-relaxed">{profileData.resumo}</p>
              )}
            </div>

            {/* Experiência */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-dark-main dark:text-white flex items-center"><Briefcase size={24} className="mr-2 text-primary-red" /> Experiência</h2>
                {isEditing && <button onClick={addExperience} className="text-sm flex items-center text-secondary-orange hover:text-primary-red font-bold"><Plus size={16} className="mr-1" /> Adicionar</button>}
              </div>
              <div className="space-y-6">
                {profileData.experiencia.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 ml-1 relative group">
                    {isEditing ? (
                      <div className="space-y-2 p-2 bg-gray-50 dark:bg-[#252525] rounded">
                        <div className="flex justify-between">
                           <input value={exp.cargo} onChange={(e) => handleExperienceChange(idx, 'cargo', e.target.value)} placeholder="Cargo *" className={`font-bold p-1 w-full mr-2 ${getInputClass(exp.cargo)}`} />
                           <button onClick={() => removeExperience(idx)} className="text-red-500"><Trash2 size={18}/></button>
                        </div>
                        <input value={exp.empresa} onChange={(e) => handleExperienceChange(idx, 'empresa', e.target.value)} placeholder="Empresa *" className={`text-secondary-orange font-medium p-1 w-full ${getInputClass(exp.empresa)}`} />
                        <input value={exp.periodo} onChange={(e) => handleExperienceChange(idx, 'periodo', e.target.value)} placeholder="Período (ex: 2020 - Atual) *" className={`text-sm p-1 w-full ${getInputClass(exp.periodo)}`} />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold text-text-dark-main dark:text-white">{exp.cargo}</h3>
                        <p className="text-secondary-orange font-medium">{exp.empresa}</p>
                        <p className="text-sm text-text-light-support dark:text-text-dark-support mt-1">{exp.periodo}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Formação */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-dark-main dark:text-white flex items-center"><Award size={24} className="mr-2 text-primary-red" /> Formação</h2>
                {isEditing && <button onClick={addEducation} className="text-sm flex items-center text-secondary-orange hover:text-primary-red font-bold"><Plus size={16} className="mr-1" /> Adicionar</button>}
              </div>
              <div className="space-y-4">
                {profileData.educacao.map((edu, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="mt-1 bg-secondary-orange rounded-full p-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-2 p-2 bg-gray-50 dark:bg-[#252525] rounded">
                          <div className="flex justify-between">
                             <input value={edu.curso} onChange={(e) => handleEducationChange(idx, 'curso', e.target.value)} placeholder="Curso *" className={`font-bold p-1 w-full mr-2 ${getInputClass(edu.curso)}`} />
                             <button onClick={() => removeEducation(idx)} className="text-red-500"><Trash2 size={18}/></button>
                          </div>
                          <input value={edu.instituicao} onChange={(e) => handleEducationChange(idx, 'instituicao', e.target.value)} placeholder="Instituição *" className={`p-1 w-full ${getInputClass(edu.instituicao)}`} />
                          <input value={edu.ano} onChange={(e) => handleEducationChange(idx, 'ano', e.target.value)} placeholder="Ano de Conclusão *" className={`text-sm p-1 w-full ${getInputClass(edu.ano)}`} />
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-bold text-text-dark-main dark:text-white">{edu.curso}</h3>
                          <p className="text-text-light-support dark:text-text-dark-support">{edu.instituicao} - {edu.ano}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfilePage;