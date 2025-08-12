# Prompt Aprimorado para Criação da Tela de Visualização de Imóvel

**Objetivo:**  
Desenvolver a página de visualização de um imóvel, consumindo dados da API Laravel e exibindo todos os detalhes, fotos, localização e opções de contato em uma interface modular e responsiva, utilizando os componentes React existentes.

---

## Contexto Técnico

- **Frontend:** Next.js 13+ (App Router), TypeScript, Tailwind CSS.
- **Backend:** API RESTful Laravel (estrutura conforme `nome-do-projeto`).
- **Fluxo de Dados:**  
  O componente de página no Next.js (`app/imovel/[id]/page.tsx`) faz uma requisição `fetch` do lado do servidor para a API Laravel (`/api/imoveis/{id}`), usando o ID do imóvel da URL. Os dados recebidos são passados como `props` para o componente de visualização.

---

## Backend (Laravel)

### Endpoint Principal

- **GET** `/api/imoveis/{id}`  
  Retorna um objeto JSON com todos os dados do imóvel.

### Exemplo de Resposta Esperada

```json
{
  "id": 1,
  "usuario_id": 2,
  "tipo_imovel": "Apartamento",
  "cep": "12345-678",
  "endereco": "Rua Exemplo, 123",
  "bairro": "Centro",
  "cidade": "Cidade Exemplo",
  "estado": "UF",
  "area": 80,
  "quartos": 3,
  "banheiros": 2,
  "garagem": 1,
  "descricao": "Imóvel bem localizado...",
  "fotos": [
    "https://cloudinary.com/imagens/1.jpg",
    "https://cloudinary.com/imagens/2.jpg"
  ],
  "valor_agio": 35000,
  "valor_parcela_atual": 1200,
  "parcelas_restantes": 100,
  "valor_total_financiado": 100000,
  "created_at": "2025-08-11T22:00:00Z"
}
```

### Ajustes Recomendados no Backend

- **Certifique-se de que o campo `fotos` seja sempre um array de URLs no JSON.**  
  Se estiver serializando como string, ajuste no model/cast ou use um accessor para garantir array.
- **Inclua todos os campos relevantes na resposta, principalmente `bairro`, `garagem`, e `created_at`.**
- **Garanta que o CORS esteja habilitado** para o domínio do frontend no Laravel (`config/cors.php`).

---

## Frontend (Next.js)

### Interface dos Dados

```typescript
interface Imovel {
  id: number;
  usuario_id: number;
  tipo_imovel: string;
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  area: number;
  quartos: number;
  banheiros: number;
  garagem: number;
  descricao: string;
  fotos: string[];
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado: number;
  created_at: string;
}
```

### Página Principal (`app/imovel/[id]/page.tsx`)

- Deve ser um Server Component (`async function`).
- Buscar dados do imóvel via `fetch('https://<API_URL>/api/imoveis/${id}')`.
- Tratar erros e ausência de dados (404).
- Passar os dados como props para o componente `PropertyView`.

### Componente de Visualização (`components/PropertyView.tsx`)

- Receberá os dados do imóvel como `props`.
- Dividir a interface nas seguintes seções:
  1. **Galeria de Imagens** (`hero-carousel.tsx`)
  2. **Informações Principais** (endereço, bairro, cidade, preço, ícones de quartos/banheiros/garagem/área)
  3. **Descrição**
  4. **Características e Comodidades** (exibir campos como área, garagem, bairro, etc.)
  5. **Mapa de Localização** (`Map.tsx`)
  6. **Simulador de Financiamento** (`financing-simulator.tsx`)
  7. **Contato** (`whatsapp-button.tsx` ou botão de ação)
  8. **Imóveis Semelhantes** (opcional, pode ser implementado depois)

---

## Pontos de Atenção

- **Consistência dos campos:**  
  O frontend espera os mesmos nomes de campos do backend. Se necessário, alinhe os nomes (ex: `bairro`, `garagem`).
- **Formatação de valores:**  
  Use `Intl.NumberFormat` para valores monetários.
- **Tratamento de imagens:**  
  Sempre use um array de URLs para o carrossel.
- **CORS:**  
  O backend deve liberar o domínio do frontend para evitar erros de requisição.

---

## Checklist de Ajustes

- [ ] Backend retorna todos os campos necessários, com tipos corretos.
- [ ] Campo `fotos` sempre como array de URLs.
- [ ] CORS habilitado no Laravel.
- [ ] Frontend consome e exibe todos os dados, com tratamento de erros.
- [ ] Interface responsiva e modular.

---

Se desejar, posso sugerir ou aplicar ajustes no backend ou frontend para garantir o funcionamento ideal da tela de visualização de imóvel.

  quartos: number;
  banheiros: number;
  garagem: number;
  descricao: string;
  fotos: string[]; // Array de URLs das imagens
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado?: number;
  // ...outros campos como created_at, updated_at, etc.
}
```

**Plano de Implementação (Frontend):**

1.  **Página de Rota Dinâmica (`app/imovel/[id]/page.tsx`):**
    *   Deve ser um Server Component (`async function`).
    *   Receberá `params` contendo o `id` do imóvel.
    *   Implementará uma função `fetch` para chamar o endpoint `http://<SUA_API_LARAVEL>/api/imoveis/${params.id}`.
    *   Tratará casos de erro (ex: imóvel não encontrado, falha na API).
    *   Renderizará o componente `PropertyView`, passando os dados do imóvel como `props`.

2.  **Componente de UI Principal (`components/PropertyView.tsx`):**
    *   Deve ser um Client Component (`'use client'`) para permitir interatividade (carrossel, modais, etc.).
    *   Receberá os dados do imóvel (`imovel: Imovel`) via `props`.
    *   Organizará a interface nas seguintes seções, reutilizando componentes existentes:
        *   **Galeria de Imagens:** Usar `hero-carousel.tsx` com o array `imovel.fotos`.
        *   **Informações Principais:** Exibir `imovel.endereco`, `imovel.cidade`, `imovel.valor_agio`, etc. Usar ícones para `quartos`, `banheiros`, `area` e `garagem`.
        *   **Descrição:** Renderizar `imovel.descricao`.
        *   **Mapa:** Integrar `Map.tsx` com as coordenadas ou endereço do imóvel.
        *   **Contato:** Adicionar o `whatsapp-button.tsx`.
        *   **Simulador:** Incluir o `financing-simulator.tsx`.
        *   **Imóveis Semelhantes:** Implementar uma lógica (ou um novo componente) para buscar e exibir outros imóveis, usando o `property-card.tsx` para cada item.
