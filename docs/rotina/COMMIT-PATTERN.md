# COMMIT-PATTERN - Padrao de Commits com Gitmoji

## Formato

```
:emoji: tipo(BRANCH_REF): descricao
```

### Exemplo

```
:sparkles: feat(feature/autenticacao): adicionar login de usuarios
:bug: fix(checkout): corrigir validacao do formulario
```

---

## Regras Obrigatorias

1. **Emoji no inicio** - Usar Gitmoji correspondente ao tipo de mudanca
2. **Tipo seguido de escopo** - `tipo(escopo):` ou apenas `tipo:`
3. **Descricao sem acentos** - Usar apenas caracteres ASCII basicos
4. **Branch reference** - Opcional, mas recomendado
5. **Agrupamento logico** - Commits devem representar uma unidade logica de mudanca
6. **Verificacao de seguranca** - Scan de caracteres invisiveis antes de cada commit

---

## Escopos Validos

- `auth` - Autenticacao e autorizacao
- `checkout` - Fluxo de checkout
- `i18n` - Internacionalizacao
- `theme` - Estilos e aparencia visual
- `ui` - Componentes visuais
- `forms` - Formularios e validacao
- `api` - Rotas de API
- `store` - Gerenciamento de estado (Zustand)
- `perf` - Performance
- `docs` - Documentacao
- `config` - Configuracao do projeto
- `ci` - CI/CD e automatizacao

---

## Tabela Gitmoji por Categoria

### Features e Funcionalidades

| Emoji | Codigo            | Uso                              |
| ----- | ----------------- | -------------------------------- |
| ✨    | `:sparkles:`      | Nova feature                     |
| 🔥    | `:fire:`          | Remover codigo/arquivos          |
| 💄    | `:lipstick:`      | Melhorias de UI/estilo           |
| 🎨    | `:art:`           | Melhorias de estrutura/formato   |
| 🚀    | `:rocket:`        | Deployment                       |
| 🎉    | `:tada:`          | Commit inicial do projeto        |
| ✅    | `:white_check_mark:` | Adicionar/atualizar testes    |
| ♿    | `:wheelchair:`    | Acessibilidade                   |
| 💡    | `:bulb:`          | Comentarios/documentacao         |
| 🍻    | `:beers:`         | Commit embriagado                |

### Bug Fixes

| Emoji | Codigo      | Uso                          |
| ----- | ----------- | ---------------------------- |
| 🐛    | `:bug:`     | Corrigir bug                 |
| 🚑    | `:ambulance:` | Correcao critica (hotfix)  |
| 🔒    | `:lock:`    | Corrigir problema de seguranca |
| 🔇    | `:mute:`    | Remover logs/warnings        |

### Code Quality

| Emoji | Codigo       | Uso                           |
| ----- | ------------ | ----------------------------- |
| 🚨    | `:rotating_light:` | Corrigir warnings do linter |
| ♻️    | `:recycle:`  | Refatorar codigo              |
| 🩹    | `:adhesive_bandage:` | Correcao simples          |
| 🧹    | `:broom:`    | Limpeza de codigo             |
| 🗑️    | `:wastebasket:` | Remover codigo morto       |
| 🚧    | `:construction:` | Trabalho em progresso       |

### Dependencies

| Emoji | Codigo       | Uso                          |
| ----- | ------------ | ---------------------------- |
| ⬆️    | `:arrow_up:` | Atualizar dependencia        |
| ⬇️    | `:arrow_down:` | Downgrade de dependencia   |
| 🔖    | `:bookmark:` | Release/versao               |
| 📦    | `:package:`  | Compilar/gerar build         |

### UI/UX

| Emoji | Codigo         | Uso                           |
| ----- | -------------- | ----------------------------- |
| 💫    | `:dizzy:`      | Animacoes/transicoes          |
| 🎭    | `:performing_arts:` | Melhorias de tema/estilo   |
| 🖼️    | `:card_file_box:` | Alteracoes em assets       |
| 📱    | `:iphone:`     | Responsividade/mobile         |

---

## Tipos de Commit

| Tipo       | Emoji recomendado       | Quando usar                    |
| ---------- | ----------------------- | ------------------------------ |
| `feat`     | `:sparkles:` ✨         | Nova funcionalidade            |
| `fix`      | `:bug:` 🐛              | Correcao de bug                |
| `docs`     | `:memo:` 📝             | Documentacao                   |
| `style`    | `:lipstick:` 💄         | Estilo/formatacao (sem logica) |
| `refactor` | `:recycle:` ♻️          | Refatoracao (sem mudanca func) |
| `test`     | `:white_check_mark:` ✅ | Testes                         |
| `chore`    | `:wrench:` 🔧           | Configuracao/manutencao        |
| `perf`     | `:zap:` ⚡               | Melhorias de performance       |
| `ci`       | `:construction_worker:` | CI/CD                          |
| `build`    | `:package:` 📦          | Build/compilacao               |
| `revert`   | `:rewind:` ⏪            | Reverter commit                |
| `remove`   | `:fire:` 🔥             | Remover codigo/arquivos        |

---

## Exemplos Praticos

```bash
# Nova feature
:sparkles: feat(auth): adicionar autenticacao de usuarios

# Correcao de bug
:bug: fix(checkout): corrigir validacao do campo CPF no formulario

# Refatoracao
:recycle: refactor(ui): padronizar cores com tokens semanticos Tailwind

# Documentacao
:memo: docs: atualizar README com instrucoes de setup

# Performance
:zap: perf(images): otimizar carregamento com lazy loading e next/image

# Remocao de codigo
:fire: remove(components): remover componente LegacyHeader nao utilizado

# Estilo/UI
:lipstick: style(footer): ajustar espaçamento e cores do rodape

# Dependencias
:arrow_up: deps: atualizar next de 14 para 15 e react para 19

# Hotfix
:ambulance: fix(auth): correcao critica para vazamento de token

# Testes
:white_check_mark: test(checkout): adicionar testes de validacao do formulario

# CI/CD
:construction_worker: ci: configurar deploy automatico no Netlify
```

---

## Caracteres Proibidos (Seguranca)

Nunca usar caracteres Unicode invisiveis em mensagens de commit:

- `U+FE00` - `U+FE0F` (Variation Selectors)
- `U+E0100` - `U+E01EF` (Variation Selectors Supplement)
- `U+200B` - `U+200F` (Zero Width Spaces)
- `U+202A` - `U+202E` (Directional Formatting)

Verificar antes de cada commit com ferramenta de scan disponivel.

---

_Este padrao entra em vigor a partir da data de criacao._
