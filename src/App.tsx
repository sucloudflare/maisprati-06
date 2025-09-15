import React, { useState } from 'react';
import { Globe, Palette, Wind, Zap, Sparkles } from 'lucide-react';

// Importa componentes das diferentes versões
import CssGlobalApp from './01-css-global/App';
import CssModulesApp from './02-css-modules/App';
import TailwindApp from './03-tailwind/App';
import EnhancedTailwindApp from './03-tailwind/EnhancedApp';
import StyledComponentsApp from './04-styled-components/App';

const versoes = [
  {
    id: 'css-global',
    name: 'CSS Global',
    icon: Globe,
    description: 'CSS tradicional com estilos globais',
    component: CssGlobalApp
  },
  {
    id: 'css-modules',
    name: 'CSS Modules',
    icon: Palette,
    description: 'CSS modular e isolado por componentes',
    component: CssModulesApp
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: Wind,
    description: 'Framework CSS utilitário-first',
    component: TailwindApp
  },
  {
    id: 'tailwind-enhanced',
    name: 'Tailwind Aprimorado',
    icon: Sparkles,
    description: 'Versão aprimorada com mais de 25 recursos',
    component: EnhancedTailwindApp
  },
  {
    id: 'styled-components',
    name: 'Styled Components',
    icon: Zap,
    description: 'CSS-in-JS usando styled-components',
    component: StyledComponentsApp
  }
];

function App() {
  const [versaoSelecionada, setVersaoSelecionada] = useState('tailwind-enhanced');
  
  const versaoSelecionadaData = versoes.find(v => v.id === versaoSelecionada);
  const ComponenteSelecionado = versaoSelecionadaData?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Seletor de Versão */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Grade de Produtos - Versões Aprimoradas de Implementação CSS
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {versoes.map((versao) => {
              const Icon = versao.icon;
              return (
                <button
                  key={versao.id}
                  onClick={() => setVersaoSelecionada(versao.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    versaoSelecionada === versao.id
                      ? versao.id === 'tailwind-enhanced' 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {versao.name}
                </button>
              );
            })}
          </div>
          
          {versaoSelecionada === 'tailwind-enhanced' && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                Recursos Aprimorados
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-purple-800">
                <div>• Pesquisa Avançada</div>
                <div>• Filtros Inteligentes</div>
                <div>• Sistema de Favoritos</div>
                <div>• Comparação de Produtos</div>
                <div>• Carrinho de Compras</div>
                <div>• Notificações Toast</div>
                <div>• Lazy Loading</div>
                <div>• Modo Escuro</div>
                <div>• Design Responsivo</div>
                <div>• Acessibilidade</div>
                <div>• Otimização de Performance</div>
                <div>• E mais 15 recursos!</div>
              </div>
            </div>
          )}
          
          {versaoSelecionadaData && (
            <p className="text-sm text-gray-600 mt-2">
              {versaoSelecionadaData.description}
            </p>
          )}
        </div>
      </div>

      {/* Componente da Versão Selecionada */}
      <div className={versaoSelecionada === 'tailwind-enhanced' ? '' : 'min-h-screen'}>
        {ComponenteSelecionado && <ComponenteSelecionado />}
      </div>
    </div>
  );
}

export default App;
