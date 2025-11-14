import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; 

// Componente para alternar o tema (Gatilho do Dark Mode)
const DarkModeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full 
                 bg-bg-light-card dark:bg-bg-dark-card text-text-dark-main dark:text-white
                 transition duration-300 shadow-xl 
                 fixed top-6 right-6 z-50 transform hover:scale-110"
      aria-label="Alternar tema claro/escuro"
    >
      {theme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-indigo-700" />
      )}
    </button>
  );
};

// Componente Card (Mantido)
const Card = ({ title, description }) => {
  return (
    <div className="p-6 rounded-xl shadow-xl 
                   bg-bg-light-card dark:bg-bg-dark-card text-text-dark-main dark:text-text-dark-main-light
                   transition duration-500
                   border-b-4 border-primary-red hover:border-secondary-orange">
      <h3 className="text-2xl font-bold mb-2 text-primary-red">{title}</h3>
      <p className="text-base text-text-light-support dark:text-text-dark-support">{description}</p>
    </div>
  );
};

// 1. Recebe a prop 'goToProfiles'
const LandingPage = ({ theme, toggleTheme, goToProfiles }) => {
  return (
    <div className="min-h-screen">
      
      <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* 1. SEÇÃO HERO / HEADER */}
      <header className="py-20 md:py-32 text-center md:text-left">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Texto de Boas-Vindas */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-primary-red">
              ReQualifica: Transforme Seu Futuro Profissional
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-text-light-support dark:text-text-dark-support">
              A ReQualifica oferece educação profissional gratuita através de cursos, videoaulas e um vasto acervo de informações. Geramos certificações próprias validadas por exames práticos que simulam o mercado de trabalho. Além disso, somos o ponto de encontro onde você exibe seu perfil e empresas contratam sua qualificação de forma direta e transparente, como em plataformas freelancer.
            </p>
            
            {/* 2. Adiciona o onClick aqui */}
            <button 
              onClick={goToProfiles} 
              className="bg-primary-red hover:bg-secondary-orange text-white 
                         font-bold py-4 px-10 rounded-full text-lg 
                         transition-colors duration-300 shadow-xl transform hover:scale-105"
            >
              Começar Jornada
            </button>
          </div>
          {/* Imagem Hero */}
          <div className="flex justify-center md:justify-end">
            <img 
              src="https://d1ih8jugeo2m5m.cloudfront.net/2023/04/como-vender-cursos-online-1200x685.jpg" 
              alt="Profissional trabalhando em um computador" 
              className="rounded-lg shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
      </header>
      
      {/* 2. SEÇÃO: NOSSO PROPÓSITO */}
      <section className="py-20 bg-bg-light-card dark:bg-bg-dark-card">
        {/* ... conteúdo da seção ... */}
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <img src="https://images.educamaisbrasil.com.br/content/noticias/senaisp-oferece-530-vagas-em-curso-gratuito-na-area-de-ti_g.jpg" alt="Pessoa assistindo a um curso online" className="rounded-lg shadow-xl max-w-full h-auto" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-4 text-secondary-orange">Educação de Qualidade e Gratuita</h2>
            <p className="text-lg mb-4 text-text-dark-main dark:text-text-dark-main-light">
              Nosso propósito é democratizar o acesso ao conhecimento. Oferecemos um vasto catálogo de cursos, vídeo aulas e materiais didáticos de alta qualidade, tudo de forma gratuita para que todos tenham a chance de se desenvolver.
            </p>
            <ul className="list-disc list-inside text-text-light-support dark:text-text-dark-support space-y-2">
              <li>Cursos completos e atualizados</li>
              <li>Videoaulas interativas</li>
              <li>Materiais de apoio ricos</li>
              <li>Acesso ilimitado e flexível</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO: CERTIFICAÇÃO PRÓPRIA */}
      <section className="py-20">
        {/* ... conteúdo da seção ... */}
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-primary-red">Certificação Validada pelo Mercado</h2>
            <p className="text-lg mb-4 text-text-dark-main dark:text-text-dark-main-light">
              Vá além do aprendizado. Nossas certificações são baseadas em exames rigorosos que simulam testes reais de vagas de emprego, garantindo que suas novas habilidades sejam reconhecidas e valorizadas pelas empresas.
            </p>
            <ul className="list-disc list-inside text-text-light-support dark:text-text-dark-support space-y-2">
              <li>Testes práticos e focados no dia a dia profissional</li>
              <li>Certificados aceitos por empregadores</li>
              <li>Comprove suas competências com credibilidade</li>
            </ul>
          </div>
          <div className="flex justify-center md:justify-end">
            <img src="https://content.app-us1.com/gQoMa/2025/01/18/006aad44-5ec4-40af-879d-8ec33f266ae4.png" alt="Certificado ReQualifica" className="rounded-lg shadow-xl max-w-full h-auto" />
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO: CONEXÃO MERCADO */}
      <section className="py-20 bg-bg-light-card dark:bg-bg-dark-card">
        {/* ... conteúdo da seção ... */}
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <img src="https://deltabc.com.br/wp-content/uploads/2025/04/como-fazer-uma-reuniAo-online-3.webp" alt="Pessoas fazendo networking ou sendo contratadas online" className="rounded-lg shadow-xl max-w-full h-auto" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-4 text-secondary-orange">Conexão Direta com o Mercado de Trabalho</h2>
            <p className="text-lg mb-4 text-text-dark-main dark:text-text-dark-main-light">
              Assim como em plataformas freelancers, você cria seu perfil detalhado com suas qualificações e certificações. Empresas podem buscar e contratar talentos diretamente na ReQualifica, baseadas nas habilidades reais demonstradas em nossos exames.
            </p>
            <ul className="list-disc list-inside text-text-light-support dark:text-text-dark-support space-y-2">
              <li>Perfis detalhados e profissionais</li>
              <li>Match com vagas ideais</li>
              <li>Agilize sua recolocação profissional</li>
              <li>Encontre os melhores talentos para sua empresa</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO: CHAMADA PARA AÇÃO FINAL */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-primary-red">
            Pronto para Transformar Sua Carreira?
          </h2>
          <p className="text-xl mb-8 text-text-light-support dark:text-text-dark-support">
            Comece hoje mesmo a sua jornada rumo a novas oportunidades e conquistas profissionais com a ReQualifica.
          </p>
          
          {/* 2. Adiciona o onClick aqui também */}
          <button 
            onClick={goToProfiles} 
            className="bg-secondary-orange hover:bg-primary-red text-white 
                       font-bold py-4 px-16 rounded-full text-lg 
                       transition-colors duration-300 shadow-xl transform hover:scale-105"
          >
            Crie Seu Perfil Gratuito Agora
          </button>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-10 bg-bg-light-card dark:bg-bg-dark-card mt-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-text-light-support dark:text-text-dark-support">
            &copy; {new Date().getFullYear()} ReQualifica. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;