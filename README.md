[![CI](https://github.com/ricardo-camilo-programador-frontend-web/nextjs-chronicles-part-1/actions/workflows/ci.yml/badge.svg)](https://github.com/ricardo-camilo-programador-frontend-web/nextjs-chronicles-part-1/actions)
# 🌳 Breath Natural - NextJS Chronicles Part 1

[![Netlify Status](https://api.netlify.com/api/v1/badges/d47b2f19-f948-4850-926f-40a3fdf478e8/deploy-status)](https://app.netlify.com/sites/breath-natural-nextjs-chronicles/deploys)


> A modern plant showcase application built with NextJS, TypeScript, and TailwindCSS.

[🇺🇸 English](#english) | [🇧🇷 Português](#português)

## 🔗 Quick Links
- [Live Preview](https://breath-natural-nextjs-chronicles.netlify.app/)
- [GitHub Repository](https://github.com/ricardo-camilo-programador-frontend-web)
- [Original Design](https://www.figma.com/community/file/1341057411255052611) by [@dsingr](https://www.figma.com/@dsingr)

<h2 id="english">English</h2>

## 🎯 Project Overview
A NextJS application showcasing plants with data from the [Trefle API](https://trefle.io/). The project combines beautiful design with modern web development practices.

### 🚀 Planned Features
- [ ] Authentication system
- [x] Shopping cart functionality
- [ ] Checkout flow
- [ ] Reviews system
- [ ] Plant search functionality
- [ ] Administrative panel
  - [ ] Plant management dashboard
  - [ ] Detailed plant information
  - [ ] Pagination system

## 🛠️ Tech Stack
- [NextJS](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Axios](https://axios-http.com/) - API requests
- [Trefle API](https://trefle.io/) - Plant data

## 📚 Learning Focus
- NextJS component architecture
- TypeScript implementation
- Server & Client Components
- Dynamic routing
- Code organization
- Responsive design

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site base URL | Yes |
| `NEXT_PUBLIC_API_URL` | API base URL | Yes |
| `NEXT_PUBLIC_PORTFOLIO_URL` | Portfolio site URL | No |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub profile URL | No |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn profile URL | No |
| `NEXT_PUBLIC_X_URL` | X (Twitter) profile URL | No |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile URL | No |
| `NEXT_PUBLIC_YOUTUBE_URL` | YouTube channel URL | No |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook profile URL | No |
| `NEXT_PUBLIC_99FREELAS_URL` | 99Freelas profile URL | No |
| `NEXT_PUBLIC_WORKANA_URL` | Workana profile URL | No |
| `NEXT_PUBLIC_BUYMEACOFFEE_URL` | Buy Me a Coffee URL | No |
| `NEXT_PUBLIC_FIGMA_URL` | Figma profile URL | No |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email address | No |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics measurement ID | No |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID | No |
| `NEXT_PUBLIC_COUNTER_DEV_ID` | Counter.dev analytics ID | No |
| `NEXT_PUBLIC_LIVE_DEMO_VIDEO_URL` | Live demo video URL | No |
| `TREFLE_API_KEY` | Trefle API key (server-side only) | No |

> **Note:** All `NEXT_PUBLIC_*` variables are exposed to the browser. Server-side variables (no prefix) are only available in API routes and server components.

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000)

<h2 id="português">Português</h2>

## 🎯 Visão Geral do Projeto
Este projeto foi desenvolvido usando NextJS para criar uma aplicação web moderna e responsiva para Breath Natural, demonstrando recursos e práticas de desenvolvimento web contemporâneo.

O design foi escolhido por sua beleza e simplicidade, a ideia desse projeto é servir como um mostruario de plantas. Para tornar o projeto mais complexo foi adicionado requisições a uma API chamada "Trefle - A global plants API" que é uma API de plantas.

Vou tomar um pouco de liberdade e adicionar coisas que não estão no design original, como:
- Pagina de login e registro - dados estaticos por enquanto
- Atalho interativo para carrinho de compras
- Adição e exclusão de plantas no carrinho
- Fluxo de checkout - dados estaticos por enquanto
- Pagina de avaliações - dados estaticos por enquanto
- Pagina de busca e resultados por nome de planta
- Painel administrativo - irei escolher outro design e artista para o painel administrativo
- Pagina com tabela de plantas e paginação no painel administrativo
- Pagina de detalhes da planta por id no painel administrativo

Essas novas funcionalidades serão adicionadas em uma release do projeto e visão tornar ele mais complexo e realista, mas ainda estão na minha area de conhecimento autais.

Pretendo fazer integração com o NextJS, que seria um novo e complexo aprendizado, e adicionar a mais funcionalidades removendo as partes estaticas, ou fica para um projeto exclusivo a isso.

## 🛠️ Implementações Técnicas Chave
- 🎨 UI Moderna com Tailwind CSS
- 📱 Princípios de design responsivo
- 🎯 Componentes do Servidor e do Cliente
- 📊 Roteamento dinâmico e busca de dados

## 📚 Resultados pretendidos no Aprendizado
- 🏗️ Ganhar experiência prática com a arquitetura de componentes do NextJS
- 📘 Praticar TypeScript
- 🎨 Dominar a sintaxe de template do NextJS
- 🔄 Aumentar a compreensão da renderização condicional no NextJS
- 📦 Praticar as habilidades de organização de código

---

## API
- Trefle - https://trefle.io/

## 🎨 Design Credits
UI/UX inspired by https://www.figma.com/community/file/1341057411255052611 by dsingr - https://www.figma.com/@dsingr, adapted and implemented with modern web technologies.

## 🎨 Design Credits
UI/UX for contact page inspired by https://www.figma.com/@VictorBravim by Victor Bravim.

## 🚀 Technologies
- NextJS - https://NextJS.com
- TailwindCSS - https://tailwindcss.com
- TypeScript - https://www.typescriptlang.org/
- Axios - https://axios-http.com
- Figma - https://www.figma.com

#NextJS #Web #Frontend #TypeScript #TailwindCSS #Git #Axios #Figma #CleanCode #NextJSChronicles

## 📄 License
MIT © Ricardo Damaceno
---

<p align="center">
Made with ❤️ by <a href={`https://github.com/${process.env.GITHUB_USERNAME}`}>Ricardo</a>
</p>

