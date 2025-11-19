import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  // Efeito para fechar automaticamente a notificação após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm w-full">
      {/* Container da notificação com estilo de sucesso (verde) */}
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 
                      animate-pulse-once"> {/* Adiciona uma animação sutil */}
        <CheckCircle size={24} className="flex-shrink-0" />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="p-1 rounded-full hover:bg-green-700 transition-colors"
          aria-label="Fechar notificação"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;