import React from 'react';
import Navbar from '../components/Navbar';
import { MapPin, Mail, Phone, Linkedin, GitHub, Edit, Award, Briefcase, Code } from 'lucide-react';

const MyProfilePage = ({ onNavigate }) => {
  
  // Dados Simulados do "Usuário Logado"
  const myData = {
    nome: "João Desenvolvedor",
    cargo: "Engenheiro de Software Full Stack",
    resumo: "Apaixonado por tecnologia e inovação. Atualmente focando em React, Node.js e arquitetura de microsserviços. Buscando sempre aprender novas tecnologias e contribuir com a comunidade open source.",
    localizacao: "São Paulo, SP",
    email: "joao.dev@requalifica.com",
    telefone: "(11) 99999-8888",
    skills: ["React", "Node.js", "TypeScript", "Tailwind CSS", "Docker", "AWS"],
    experiencia: [
      { empresa: "Tech Solutions", cargo: "Dev Pleno", periodo: "2022 - Atual" },
      { empresa: "StartUp Inova", cargo: "Dev Júnior", periodo: "2020 - 2022" }
    ],
    educacao: [
      { instituicao: "FIAP", curso: "Análise e Desenvolvimento de Sistemas", ano: "2021" }
    ]
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar onNavigate={onNavigate} activePage="my-profile" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Capa e Header do Perfil */}
        <div className="relative mb-20">
          {/* Capa */}
          <div className="h-48 w-full bg-gradient-to-r from-primary-red to-secondary-orange rounded-xl shadow-lg"></div>
          
          {/* Info Flutuante */}
          <div className="absolute -bottom-16 left-6 right-6 flex flex-col md:flex-row items-end md:items-center justify-between">
            <div className="flex items-end space-x-6">
              <div className="w-32 h-32 rounded-full border-4 border-bg-light-main dark:border-bg-dark-main overflow-hidden bg-white shadow-xl">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Meu Perfil" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-text-dark-main dark:text-white shadow-black drop-shadow-sm">
                  {myData.nome}
                </h1>
                <p className="text-text-dark-support dark:text-gray-300 font-medium">{myData.cargo}</p>
              </div>
            </div>
            
            {/* Botão Editar */}
            <button className="mb-2 bg-bg-light-card dark:bg-bg-dark-card text-text-dark-main dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center space-x-2 font-medium border border-gray-200 dark:border-gray-600">
              <Edit size={18} />
              <span>Editar Perfil</span>
            </button>
          </div>
        </div>

        {/* Conteúdo Principal - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          
          {/* Coluna Esquerda - Info Pessoal */}
          <div className="md:col-span-1 space-y-6">
            
            {/* Card Sobre */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md border-t-4 border-primary-red">
              <h2 className="text-xl font-bold mb-4 text-text-dark-main dark:text-white flex items-center">
                <MapPin size={20} className="mr-2 text-primary-red" /> Detalhes
              </h2>
              <div className="space-y-3 text-sm text-text-light-support dark:text-text-dark-support">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} /> <span>{myData.localizacao}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} /> <span>{myData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} /> <span>{myData.telefone}</span>
                </div>
              </div>
            </div>

            {/* Card Skills */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md border-t-4 border-secondary-orange">
              <h2 className="text-xl font-bold mb-4 text-text-dark-main dark:text-white flex items-center">
                <Code size={20} className="mr-2 text-secondary-orange" /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {myData.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-text-dark-main dark:text-white text-xs rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita - Conteúdo */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Resumo */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-text-dark-main dark:text-white">Sobre Mim</h2>
              <p className="text-text-light-support dark:text-text-dark-support leading-relaxed">
                {myData.resumo}
              </p>
            </div>

            {/* Experiência */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-text-dark-main dark:text-white flex items-center">
                <Briefcase size={24} className="mr-2 text-primary-red" /> Experiência
              </h2>
              <div className="space-y-6">
                {myData.experiencia.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 ml-1">
                    <h3 className="text-lg font-bold text-text-dark-main dark:text-white">{exp.cargo}</h3>
                    <p className="text-secondary-orange font-medium">{exp.empresa}</p>
                    <p className="text-sm text-text-light-support dark:text-text-dark-support mt-1">{exp.periodo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Educação */}
            <div className="bg-bg-light-card dark:bg-bg-dark-card p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-text-dark-main dark:text-white flex items-center">
                <Award size={24} className="mr-2 text-primary-red" /> Formação
              </h2>
              <div className="space-y-4">
                {myData.educacao.map((edu, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="mt-1 bg-secondary-orange rounded-full p-1"></div>
                    <div>
                      <h3 className="text-lg font-bold text-text-dark-main dark:text-white">{edu.curso}</h3>
                      <p className="text-text-light-support dark:text-text-dark-support">{edu.instituicao} - {edu.ano}</p>
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