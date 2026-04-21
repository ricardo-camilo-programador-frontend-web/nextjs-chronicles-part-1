# CONSTITUICAO - Principios Inegociaveis do Breath Natural (Next.js Chronicles Part 1)

Este documento e a "lei" do projeto. Nenhuma spec, issue ou PR pode violar os principios definidos aqui. Se algo aqui descrito precisa mudar, a propria constituicao deve ser atualizada primeiro, com aprovacao e conscientizacao da equipe.

---

## 1. Stack Tecnologica (Imutavel)

| Camada          | Tecnologia                          | Detalhe                                                    |
| --------------- | ----------------------------------- | ---------------------------------------------------------- |
| Framework       | Next.js 15+ (App Router)            | React Server Components + Client Components                |
| Linguagem       | TypeScript                          | Strict mode, zero any                                      |
| Estado          | Zustand                             | Stores leves com persistencia localStorage                 |
| Roteamento      | Next.js App Router                  | Rotas em `src/app/[locale]/`, i18n via next-intl           |
| UI/CSS          | TailwindCSS v3 + CSS Variables      | Tokens semanticos de cor                     |
| Formularios     | React Hook Form + Zod               | Validacao schema-based                                     |
| i18n            | next-intl                           | Traducoes em `src/messages/*.json`                         |
| Build           | Next.js (Turbopack)                 | Desenvolvimento e producao                                 |
| Icones          | lucide-react + react-icons          | Bibliotecas de icones                                      |
| Animacoes       | CSS keyframes + Tailwind animate    | EmblaCarousel para carousels                               |
| Linting         | ESLint + Next.js plugin             | `pnpm run lint` deve passar                                |
| Deploy          | Netlify                             | Producao                                                   |

Nenhuma dessas tecnologias pode ser substituida ou adicionada sem atualizar esta secao.

---

## 2. Padroes de Codigo (Nao Negociaveis)

### TypeScript

- Zero `any`. Se o tipo e desconhecido, use `unknown` e faca type narrowing.
- Zero `@ts-ignore`. Zero `@ts-expect-error`.
- Prefira interfaces a types e enums.
- Tipos explicitos em retornos de funcoes publicas.
- Generics quando aplicavel.

### React / Next.js

- Componentes funcionais com tipagem (`FC<Props>` ou props tipadas).
- `"use client"` apenas quando necessario (hooks, estado, efeitos).
- Server Components por padrao (sem `"use client"`).
- Custom hooks com prefixo `use` (ex: `useToast`, `useFormatCurrency`).
- Named exports para componentes e hooks.

### Nomenclatura

| Elemento             | Padrao           | Exemplo                             |
| -------------------- | ---------------- | ----------------------------------- |
| Arquivos componentes | PascalCase       | `PlantCard.tsx`, `Header.tsx`       |
| Arquivos utilitarios | kebab-case       | `format-currency.ts`                |
| Hooks                | prefixo `use`    | `useToast.ts`, `useMockupPlants.ts` |
| Stores               | sufixo `Store`   | `cartStore.ts`, `customerStore.ts`  |
| Types/Interfaces     | PascalCase       | `Plant`, `CustomerInformation`      |
| Funcoes              | camelCase        | `formatCurrency`, `getUniqueId`     |
| Blocks               | camelCase        | `quantityShortcut.tsx`              |
| Sections             | camelCase        | `introSection.tsx`                  |
| CSS files            | camelCase        | `globals.css`, `pageTransition.css` |

### Principios

- Early returns. Sem arrow code profundo.
- Funcoes puras quando possivel.
- DRY (Don't Repeat Yourself).
- Clean Code + Object Calisthenics.
- ESLint deve passar sempre (`pnpm run lint`).
- TypeScript deve compilar sem erros (`npx tsc --noEmit`).

---

## 3. Arquitetura (Estrutura Fixa)

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (NestJS-style modules)
│   ├── [locale]/           # Paginas internacionalizadas
│   │   ├── layout.tsx      # Root layout internacionalizado
│   │   ├── page.tsx        # Home
│   │   ├── plants/         # Paginas de produtos
│   │   ├── checkout/       # Checkout flow
│   │   └── ...
│   └── sitemap.ts          # SEO
├── assets/
│   ├── images/             # Imagens estaticas
│   ├── svg/                # Icones SVG
│   └── styles/             # CSS globais (globals.css, etc.)
├── blocks/                 # Blocos de funcionalidade
│   ├── checkout/           # Steps do checkout
│   ├── sections/           # Seccoes da home (footer, intro, etc.)
│   └── *.tsx               # Shortcuts e blocos diversos
├── components/             # Componentes reutilizaveis
│   ├── forms/              # Inputs, Checkbox, RadioGroup, etc.
│   ├── EmblaCarousel/      # Componentes de carousel
│   └── *.tsx               # Componentes gerais
├── config/                 # Configuracoes (i18n, etc.)
├── hooks/                  # Custom hooks
├── i18n/                   # Configuracao de internacionalizacao
├── layouts/                # Layouts de pagina (DefaultLayout)
├── messages/               # Arquivos de traducao JSON (pt, en, etc.)
├── schemas/                # Schemas Zod para validacao
├── services/               # Servicos HTTP (countries, etc.)
├── static/                 # Dados estaticos (menu, footer, mocks)
├── store/                  # Zustand stores
├── types/                  # Tipos TypeScript globais
└── utils/                  # Funcoes utilitarias
```

### Regras de estrutura

- `app/` para roteamento e paginas. Uma pagina por rota.
- `components/` para componentes reutilizaveis entre paginas.
- `blocks/` para blocos de funcionalidade especifica (shortcuts, sections, checkout).
- `store/` para estado global com Zustand.
- `hooks/` para logica reutilizavel (sempre `use*`).
- `schemas/` para validacao Zod.
- `services/` para comunicacao com APIs externas.
- `types/` para tipos TypeScript.
- `utils/` para funcoes utilitarias puras.
- `messages/` para traducoes next-intl.

Novos diretorios nao sao criados sem justificativa e atualizacao desta secao.

---

## 4. Seguranca de Codigo

- Caracteres Unicode invisiveis sao **PROIBIDOS** no codigo-fonte.
- Scan obrigatorio antes de commits (verificar com ferramenta disponivel).
- Detalhes completos: `SEGURANCA-CODIGO.md`

---

## 5. Convencoes de Commit

Formato obrigatorio:

```
:emoji: tipo(BRANCH_REF): descricao
```

- Emojis seguem Gitmoji (`:sparkles:`, `:bug:`, `:fire:`, etc.)
- Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`, `perf`
- BRANCH_REF e opcional
- Descricao sem acentuacao exclusiva do portugues

Detalhes completos: `COMMIT-PATTERN.md`

---

## 6. Versionamento

- SemVer 2.0.0 obrigatorio (`MAJOR.MINOR.PATCH`)
- Tags anotadas (`git tag -a v1.2.3 -m "descricao"`)
- BREAKING CHANGE = major
- Nova feature = minor
- Bug fix = patch

Detalhes completos: `VERSIONAMENTO.md`

---

## 7. Principios SDD

### Spec primeiro, codigo depois

Para features, refactors e qualquer trabalho nao trivial, a spec (issue) vem antes do codigo. Nao abrir PR sem issue correspondente.

### Issues sao specs vivas

Manter a issue atualizada durante toda a implementacao. Se o escopo muda, a spec muda junto. Nunca implementar algo que diverge da spec sem atualiza-la.

### Constituicao e a lei

Nenhuma spec pode violar esta constituicao. Se uma spec pede algo que contradiz os principios aqui definidos, a spec precisa ser reformulada.

### Quality gate antes de merge

Antes de merge, verificar:

1. Spec descreve X e codigo implementa X (consistencia)
2. Criterios de aceitacao todos atendidos
3. Constituicao respeitada
4. Padroes de codigo seguidos (lint, type-check, testes)
5. Seguranca de codigo verificada (scan de chars invisiveis)

---

_Esta constituicao entra em vigor a partir da data de criacao e so pode ser alterada com acordo da equipe._
