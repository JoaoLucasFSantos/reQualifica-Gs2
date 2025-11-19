import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- CORREÇÃO PARA GITHUB PAGES ---
  // Substitua 'nome-do-seu-repositorio' pelo nome exato que está na URL do seu GitHub.
  // Exemplo: Se a URL é github.com/joao/projeto-requalifica, coloque '/projeto-requalifica/'
  base: "https://github.com/JoaoLucasFSantos/reQualifica-Gs2", 
})
