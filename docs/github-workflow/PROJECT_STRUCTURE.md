# Estrutura do Projeto - Breath Natural NextJS Chronicles

## Visao Geral

Projeto desenvolvido com Next.js 15 para explorar App Router e Server Components.

## Diretorios

```
nextjs-chronicles-part-1/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx            # Pagina inicial
│   └── globals.css         # Estilos globais
├── components/             # Componentes React
│   ├── ui/                 # Componentes UI
│   └── features/           # Componentes de features
├── lib/                    # Utilitarios
├── public/                 # Arquivos estaticos
├── docs/                   # Documentacao
│   └── github-workflow/    # Padroes GitHub
└── .github/                # Templates e CI/CD
```

## Convencoes

### Nomenclatura
- Componentes: PascalCase (ProductCard.tsx)
- Hooks: camelCase com prefixo use (useCart.ts)
- Server Components: sem 'use client'
- Client Components: 'use client' no topo

### Next.js Patterns
- Server Components por default
- Metadata API para SEO
- App Router com layouts aninhados

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 15 |
| UI | React 19 |
| Estilos | TailwindCSS 3 |
| Linguagem | TypeScript |
