# ReQualifica - Plataforma de Qualificação e Realocação Profissional

## Integrantes do Grupo

Nome Completo | RM
--- | ---
Rafael RM:565855
Joao Lucas RM:562608
Samuel RM:566244

## Resumo do Projeto
A ReQualifica é uma solução digital desenvolvida para enfrentar os desafios da transição de carreira e recolocação profissional. A plataforma atua como um ecossistema integrado que une duas frentes essenciais: Visibilidade e Educação.

O sistema funciona como uma vitrine de talentos interativa, onde recrutadores podem filtrar profissionais por competências técnicas e comportamentais. Simultaneamente, oferece ao candidato um ambiente de "upskilling" (aprimoramento) através de uma plataforma de cursos em vídeo (EAD) e um painel de gestão de perfil pessoal.

Tecnicamente, trata-se de uma Single Page Application (SPA) desenvolvida em React.js, focada em performance e experiência do usuário (UX), simulando um ambiente de produção completo com persistência de dados local e interatividade em tempo real, sem a necessidade de um banco de dados tradicional neste estágio.

## Funcionalidades do Sistema

### 1. Landing Page Institucional
- Apresentação da proposta de valor com design responsivo.
- Sistema de temas (Dark Mode e Light Mode) com persistência de preferência do usuário.
- Navegação fluida para as áreas internas da aplicação.

### 2. Vitrine de Talentos (Perfis)
- Listagem dinâmica de profissionais carregada a partir de uma base de dados JSON.
- Sistema avançado de filtros por Área de Atuação, Localização e Tecnologia.
- Modal de detalhes que exibe o currículo completo do candidato (Experiência, Formação, Projetos).
- Funcionalidade de "Recomendar Profissional" com persistência de estado.
- Simulação de envio de mensagens com feedback visual (Toast Notification).

### 3. Plataforma de Ensino (EAD)
- Catálogo de cursos técnicos (Java, Python, HTML/CSS e JavaScript).
- Player de vídeo integrado consumindo conteúdo real via YouTube Embed.
- Navegação lateral por módulos e aulas com estrutura de acordeão.
- Tratamento de erros para cursos ou módulos vazios.

### 4. Painel do Usuário (Meu Perfil)
- Área administrativa simulada para o usuário logado.
- Funcionalidade completa de edição (CRUD) para informações pessoais, experiências e formação.
- Validação de formulários para impedir o cadastro de campos vazios.
- Persistência automática das edições utilizando o LocalStorage do navegador.

## Tecnologias Utilizadas
- React.js (Vite)
- Tailwind CSS (Estilização e Responsividade)
- Lucide React (Biblioteca de Ícones)
- LocalStorage API (Persistência de dados no cliente)

## Acesso e Credenciais
Este projeto é um protótipo Front-end focado na validação de interface e fluxo de usuário. Não há um sistema de autenticação (backend) acoplado.

- Usuário: O sistema assume um usuário pré-autenticado para facilitar a navegação.
- Senha: Não é necessária senha para acessar nenhuma área da plataforma.
- Dados: As alterações feitas na aba "Meu Perfil" são salvas localmente no navegador do usuário. Para resetar os dados, basta limpar o cache/armazenamento do navegador.

## Guia de Instalação e Execução

O projeto não inclui a pasta "node_modules" no repositório para otimizar o envio. Siga os passos abaixo para configurar o ambiente localmente.

Pré-requisitos: Ter o Node.js instalado na máquina.

1. Clonar ou Baixar o Repositório
Faça o download dos arquivos para uma pasta em seu computador.

2. Instalar Dependências
Abra o terminal de comando na pasta raiz do projeto e execute:
npm install

3. Executar o Projeto
Após a instalação das dependências, inicie o servidor de desenvolvimento local:
npm run dev

4. Acessar a Aplicação
O terminal exibirá o endereço de acesso local (geralmente http://localhost:5173/). Abra este endereço em seu navegador.

## Link do Repositório
https://github.com/JoaoLucasFSantos/reQualifica-Gs2

## Link do Deploy
https://joaolucasfsantos.github.io/reQualifica-Gs2/