<h1>Grade de Produtos – 4 Versões de Implementação CSS</h1>

  <p>Este projeto demonstra uma tela de e-commerce com Grid de Produtos, implementada em quatro abordagens diferentes de CSS:</p>

  <ul>
    <li><strong>CSS Global</strong> – estilos aplicados globalmente.</li>
    <li><strong>CSS Modules</strong> – estilos isolados por componente.</li>
    <li><strong>Tailwind CSS</strong> – framework utilitário-first.</li>
    <li><strong>Styled Components</strong> – CSS-in-JS com ThemeProvider e props.</li>
  </ul>

  <p>Todas as versões possuem funcionalidade idêntica e podem ser comparadas para estudar diferenças de estilização e manutenção.</p>

  <h2><span class="emoji">🎯</span> Funcionalidades Principais</h2>

  <ul>
    <li>Navbar fixa com logo, toggle de tema claro/escuro com persistência, e badge do carrinho.</li>
    <li>Grid de produtos responsivo:
      <ul>
        <li>≤480px: 1 coluna</li>
        <li>481–768px: 2 colunas</li>
        <li>769–1024px: 3 colunas</li>
        <li>≥1025px: 4 colunas</li>
      </ul>
    </li>
    <li>Cards de produto:
      <ul>
        <li>Imagem 1:1 com placeholder</li>
        <li>Título limitado a 2 linhas com ellipsis</li>
        <li>Preço, rating (★), tag (“Novo”/“Promo”)</li>
        <li>Botão “Adicionar” com variantes solid/outline/ghost</li>
      </ul>
    </li>
    <li>Estados e interações: hover com elevação, focus visível, disabled, loading com skeleton sem layout shift.</li>
    <li>Dark mode com persistência em localStorage.</li>
    <li>Acessibilidade: navegação por teclado, labels ARIA, contraste ≥ 4.5:1.</li>
    <li>Animações: transições suaves de 150–250ms usando transform e opacity.</li>
  </ul>

  <h2><span class="emoji">✨</span> Funcionalidades Avançadas (“Tailwind Enhanced”)</h2>
  <ul>
    <li>Sistema de busca avançado: debounce, sugestões em tempo real, histórico e trending searches.</li>
    <li>Filtros inteligentes: preço, categorias, marcas, avaliação mínima, estoque, frete grátis, descontos.</li>
    <li>Favoritos & Comparação: adicionar/remover favoritos, comparar até 4 produtos, badges visuais, notificações.</li>
    <li>Carrinho de compras: gerenciamento global via Context API, persistência local, contador de itens no navbar.</li>
    <li>Sistema de notificações: Toast elegante, 4 tipos (success, error, info, warning), auto-dismiss e histórico.</li>
    <li>UX/UI premium: micro-interações, hover states sofisticados, gradientes e sombras avançadas, lazy loading com Intersection Observer.</li>
    <li>Visual enhancements: cards com badges dinâmicas, indicadores de estoque limitado, ratings com reviews count, preços com desconto.</li>
    <li>Performance e acessibilidade: memoização de filtros e ordenação, focus management, ARIA labels completos.</li>
    <li>Funcionalidades extras: múltiplas opções de ordenação, view modes grid/list, scroll to top, produtos recentemente vistos, quick view modal preparado.</li>
  </ul>

  <h2><span class="emoji">📂</span> Estrutura do Projeto</h2>
  <pre>
src/
├── 01-css-global/
├── 02-css-modules/
├── 03-tailwind/
├── 04-styled-components/
├── components/ (shared: SearchBar, FilterSidebar, SortDropdown, Toast, ToastContainer)
├── context/ (AppContext com todas funcionalidades)
├── data/ (produtos)
├── hooks/ (useLocalStorage, useDebounce, useIntersectionObserver)
└── main.tsx
  </pre>
  <p>Cada pasta contém os componentes necessários (Navbar, ProductCard, Button, Skeleton) e um README curto explicando a versão.</p>

  <h2><span class="emoji">💻</span> Como Rodar</h2>
  <pre><code>npm install
npm run dev
http://localhost:5173
</code></pre>
  <p>Você pode alternar entre as versões usando os botões no topo da tela. A versão “Tailwind Enhanced” apresenta todas as funcionalidades avançadas e design premium.</p>

  <h2><span class="emoji">🎨</span> Design e UX</h2>
  <ul>
    <li>Tema escuro elegante com preto profundo e gradientes sutis.</li>
    <li>Micro-interações: elevação, hover, focus visível, animações suaves.</li>
    <li>Sistema de tokens consistente: cores, tipografia, espaçamentos, sombras, border-radius.</li>
    <li>Responsivo e mobile-first, com todas as interações adaptadas para dispositivos móveis.</li>
  </ul>

  <h2><span class="emoji">✅</span> Critérios de Aceite</h2>
  <ul>
    <li>Breakpoints conforme especificado.</li>
    <li>Skeleton loading sem layout shift.</li>
    <li>Botões com variantes consistentes em todos os temas.</li>
    <li>Dark mode persistente.</li>
    <li>Focus ring visível e navegação por teclado.</li>
    <li>Componentes moduláveis e reutilizáveis com TypeScript.</li>
  </ul>
