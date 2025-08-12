# Estrutura do Projeto

Este documento descreve a organização dos diretórios e arquivos principais do projeto.

- **`/.next`**: Diretório de compilação do Next.js, gerado automaticamente.
- **`/app`**: Contém o núcleo da sua aplicação, seguindo o App Router do Next.js.
    - **`api/`**: Rotas de API para comunicação com o backend.
    - **`imovel/[id]/`**: Páginas dinâmicas para exibir detalhes de imóveis específicos.
    - **`anunciar/`**: Página para o usuário criar um novo anúncio de imóvel.
    - **`buscar/`**: Página com as funcionalidades de busca de imóveis.
    - **`contato/`**: Página de contato.
    - **`meus-imoveis/`**: Área do usuário para gerenciar os imóveis anunciados.
    - **`perfil/`**: Página de perfil do usuário.
    - **`sobre/`**: Página com informações sobre a plataforma.
    - **`layout.tsx`**: O layout principal que envolve todas as páginas.
    - **`page.tsx`**: A página inicial da sua aplicação.
- **`/components`**: Componentes React reutilizáveis que formam a interface do usuário.
    - **`ui/`**: Componentes de UI básicos, possivelmente de uma biblioteca como Shadcn/UI.
    - **`PropertyView.tsx`**: Componente para visualizar os detalhes de um imóvel.
    - **`Map.tsx`**: Componente para exibir mapas.
    - **`header.tsx`**: O cabeçalho do site.
    - **`footer.tsx`**: O rodapé do site.
- **`/public`**: Arquivos estáticos como imagens, fontes e ícones.
- **`/context`**: Gerenciamento de estado global com a Context API.
- **`/hooks`**: Hooks personalizados do React para lógicas reutilizáveis.
- **`/lib`**: Funções utilitárias e auxiliares.
- **`next.config.js`**: Arquivo de configuração do Next.js.
- **`tailwind.config.ts`**: Arquivo de configuração do Tailwind CSS.
- **`package.json`**: Lista de dependências e scripts do projeto.
- **`tsconfig.json`**: Configurações do TypeScript para o projeto.
