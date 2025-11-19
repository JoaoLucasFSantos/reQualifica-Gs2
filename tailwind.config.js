/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Cores de Destaque
      colors: {
        'primary-red': '#E53935',
        'secondary-orange': '#FF7043',
        
        // Fundo e Texto para o TEMA CLARO
        'bg-light-main': '#FFFFFF',     
        'bg-light-card': '#F5F5F5',     
        'text-dark-main': '#212121',    
        'text-light-support': '#616161',
        
        // Fundo e Texto para o TEMA ESCURO
        'bg-dark-main': '#121212',      
        'bg-dark-card': '#1E1E1E',      
        'text-dark-main-light': '#E0E0E0',
        'text-dark-support': '#A9A9A9',
      },
    },
  },
  plugins: [],

}

