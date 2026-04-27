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

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000)

## 📊 Code Quality

This project uses **SonarQube Community** for continuous code quality analysis.

### Local Setup (SonarLint)

To run analysis locally in your IDE:

1. **VS Code:**
   ```bash
   code --install-extension SonarSource.sonarlint-vscode
   ```

2. Configure connection in VS Code:
   - Open Settings → Extensions → SonarLint
   - Add connection: `http://localhost:9000`
   - Authenticate with token (generated in SonarQube → My Account → Security)

3. Select project: `nextjs-chronicles-part-1`

### Run Scan Manually

```bash
# Install SonarQube Scanner (first time)
npm install -g sonarqube-scanner

# Run analysis
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=YOUR_TOKEN_HERE
```

### GitHub Actions

Automatic analysis runs on:
- **Push** to branches `master`, `main`, `develop`
- **Pull Requests** (opened, synchronized, reopened)

Check results at:
- **SonarQube Dashboard:** http://localhost:9000/dashboard?id=nextjs-chronicles-part-1
- **GitHub Actions:** Repository → Actions → SonarQube

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

## 📊 Qualidade de Código

Este projeto utiliza **SonarQube Community** para análise contínua de qualidade de código.

### Configuração Local (SonarLint)

Para executar análise localmente em sua IDE:

1. **VS Code:**
   ```bash
   code --install-extension SonarSource.sonarlint-vscode
   ```

2. Configurar conexão em VS Code:
   - Abrir Settings → Extensions → SonarLint
   - Adicionar connection: `http://localhost:9000`
   - Autenticar com token (gerado em SonarQube → My Account → Security)

3. Selecionar projeto: `nextjs-chronicles-part-1`

### Executar Scan Manualmente

```bash
# Instalar SonarQube Scanner (primeira vez)
npm install -g sonarqube-scanner

# Executar análise
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=SEU_TOKEN_AQUI
```

### GitHub Actions

Análises automáticas são executadas em:
- **Push** para branches `master`, `main`, `develop`
- **Pull Requests** (abertura, sincronização, reabertura)

Verifique os resultados em:
- **Dashboard SonarQube:** http://localhost:9000/dashboard?id=nextjs-chronicles-part-1
- **GitHub Actions:** Repositório → Actions → SonarQube

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

