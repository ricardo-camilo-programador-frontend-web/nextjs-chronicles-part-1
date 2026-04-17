# Padrao de Commits

Este documento define o padrao de mensagens de commit utilizado no projeto SGS Web, baseado no [Gitmoji](https://gitmoji.dev/).

## Formato de Commit

O formato padrao para mensagens de commit e:

```
:emoji: tipo(BRANCH_REF): descricao do commit
```

### Componentes

| Componente | Descricao | Exemplo |
|------------|-----------|---------|
| `:emoji:` | Emoji do Gitmoji | `:bug:`, `:sparkles:` |
| `tipo` | Tipo do commit | `fix`, `feat`, `refactor` |
| `(BRANCH_REF)` | Referencia a branch | `(CSR_WEB_RC_330)` |
| `descricao` | Descricao da mudanca | `corrigir validacao` |

### Regras Importantes

1. **Agrupamento Logico**: Agrupe arquivos relacionados em um commit
2. **Referencia da Branch**: Inclua trecho inicial do nome da branch
3. **Sem Acentuacao**: Nao use acentos (ç, ã, etc.)
4. **Emoji no Inicio**: O emoji deve ser o primeiro elemento

## Emojis por Categoria

### Features e Novas Funcionalidades

| Emoji | Codigo | Uso |
|-------|--------|-----|
| ✨ | `:sparkles:` | Nova feature |
| 🎉 | `:tada:` | Inicio do projeto |
| 👔 | `:necktie:` | Logica de negocio |
| 🚩 | `:triangular_flag_on_post:` | Feature flags |

### Bug Fixes e Hotfixes

| Emoji | Codigo | Uso |
|-------|--------|-----|
| 🐛 | `:bug:` | Bug fix |
| 🚑️ | `:ambulance:` | Hotfix critico |
| 🩹 | `:adhesive_bandage:` | Fix simples |
| 🥅 | `:goal_net:` | Tratamento de erros |

### Qualidade de Codigo

| Emoji | Codigo | Uso |
|-------|--------|-----|
| 🎨 | `:art:` | Formatacao/estrutura |
| ♻️ | `:recycle:` | Refatoracao |
| ⚡️ | `:zap:` | Performance |
| 🚨 | `:rotating_light:` | Linter warnings |
| 💩 | `:poop:` | Codigo ruim (para melhorar) |
| 🧑‍💻 | `:technologist:` | DX |

### Documentacao

| Emoji | Codigo | Uso |
|-------|--------|-----|
| 📝 | `:memo:` | Documentacao |
| 💬 | `:speech_balloon:` | Textos |
| ✏️ | `:pencil2:` | Typos |
| 💡 | `:bulb:` | Comentarios |

### UI/UX

| Emoji | Codigo | Uso |
|-------|--------|-----|
| 💄 | `:lipstick:` | UI/Style |
| ♿️ | `:wheelchair:` | Acessibilidade |
| 🚸 | `:children_crossing:` | UX |
| 📱 | `:iphone:` | Responsividade |
| 💫 | `:dizzy:` | Animacoes |

### Dependencias

| Emoji | Codigo | Uso |
|-------|--------|-----|
| ➕ | `:heavy_plus_sign:` | Adicionar dep |
| ➖ | `:heavy_minus_sign:` | Remover dep |
| ⬆️ | `:arrow_up:` | Upgrade dep |
| ⬇️ | `:arrow_down:` | Downgrade dep |
| 📌 | `:pushpin:` | Fixar versao |
| 🔧 | `:wrench:` | Configuracao |

### Seguranca

| Emoji | Codigo | Uso |
|-------|--------|-----|
| 🔒️ | `:lock:` | Security fix |
| 🔐 | `:closed_lock_with_key:` | Secrets |
| 🛂 | `:passport_control:` | Auth/permissoes |
| 🦺 | `:safety_vest:` | Validacao |

### Testes

| Emoji | Codigo | Uso |
|-------|--------|-----|
| ✅ | `:white_check_mark:` | Testes |
| 🧪 | `:test_tube:` | Teste falhando |
| 💚 | `:green_heart:` | CI fix |
| 👷 | `:construction_worker:` | CI/CD |

### Deploy

| Emoji | Codigo | Uso |
|-------|--------|-----|
| 🚀 | `:rocket:` | Deploy |
| 🧱 | `:bricks:` | Infra |
| 🏗️ | `:building_construction:` | Arquitetura |

### Remocao

| Emoji | Codigo | Uso |
|-------|--------|-----|
| 🔥 | `:fire:` | Remover codigo |
| ⚰️ | `:coffin:` | Dead code |
| 🗑️ | `:wastebasket:` | Deprecar |
| 🔇 | `:mute:` | Remover logs |

### Outros

| Emoji | Codigo | Uso |
|-------|--------|-----|
| 🚚 | `:truck:` | Mover/renomear |
| 🔖 | `:bookmark:` | Release tag |
| ⏪ | `:rewind:` | Revert |
| 🔀 | `:twisted_rightwards_arrows:` | Merge |
| 💥 | `:boom:` | Breaking change |
| 🚧 | `:construction:` | WIP |
| 🏷️ | `:label:` | Tipos |

## Tipos de Commit

| Tipo | Descricao | Emoji |
|------|-----------|-------|
| `feat` | Nova funcionalidade | ✨ |
| `fix` | Bug fix | 🐛 |
| `docs` | Documentacao | 📝 |
| `style` | Formatacao | 🎨 |
| `refactor` | Refatoracao | ♻️ |
| `perf` | Performance | ⚡️ |
| `test` | Testes | ✅ |
| `chore` | Manutencao | 🔧 |
| `ci` | CI/CD | 👷 |
| `revert` | Revert | ⏪ |
| `security` | Seguranca | 🔒 |

## Exemplos Praticos

### Bug Fix

```bash
:bug: fix(CSR_WEB_RC_330): corrigir validacao de email no formulario
```

### Nova Feature

```bash
:sparkles: feat(CSR_WEB_RC_230): adicionar filtro de busca na lista
```

### Refatoracao

```bash
:recycle: refactor(CSR_WEB_RC_330): extrair logica de validacao para composable
```

### Performance

```bash
:zap: perf(CSR_WEB_RC_330): otimizar renderizacao de listas grandes
```

### Seguranca

```bash
:lock: security(CSR_WEB_RC_330): corrigir vulnerabilidade XSS em inputs
```

### Documentacao

```bash
:memo: docs(CSR_WEB_RC_330): atualizar documentacao da API de autenticacao
```

### Testes

```bash
:white_check_mark: test(CSR_WEB_RC_330): adicionar testes para user-store
```

### Linter

```bash
:rotating_light: fix(CSR_WEB_RC_330): corrigir warnings do linter
```

### Tipos

```bash
:label: fix(CSR_WEB_RC_330): adicionar tipos especificos para API response
```

### UI/Style

```bash
:lipstick: style(CSR_WEB_RC_330): ajustar espacamento do sidebar
```

### Remocao

```bash
:fire: refactor(CSR_WEB_RC_330): remover codigo duplicado em utils
```

## Linkando Issues

### Fechar Issue

```bash
:bug: fix(CSR_WEB_RC_330): corrigir erro de validacao (fixes #330)
```

### Referenciar

```bash
:sparkles: feat(CSR_WEB_RC_331): adicionar nova feature (refs #331)
```

## Boas Praticas

### Titulo

- **Bom**: `:bug: fix(CSR_WEB_RC_330): corrigir erro ao salvar telefone`
- **Ruim**: `:bug: fix: arrumei o bug`

### Escopo

- Use o prefixo da branch
- Seja consistente
- Mantenha curto

### Descricao

- Use verbo no infinitivo
- Seja especifico
- Evite genericos

### Tamanho

- Max 72 caracteres no titulo
- Use corpo para detalhes se necessario

## Template com Corpo

```
:emoji: tipo(escopo): titulo curto

Corpo do commit explicando:
- O que foi feito
- Por que foi feito
- Impactos da mudanca

Refs #XXX
```

### Exemplo

```
:recycle: refactor(CSR_WEB_RC_330): extrair logica de validacao

A logica de validacao estava duplicada em tres componentes.
Extraida para useValidation composable para:

- Reduzir duplicacao
- Centralizar regras
- Facilitar testes

Breaking change: API do composable diferente dos metodos originais

Refs #330
```

## Referencias

- [Gitmoji](https://gitmoji.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)
