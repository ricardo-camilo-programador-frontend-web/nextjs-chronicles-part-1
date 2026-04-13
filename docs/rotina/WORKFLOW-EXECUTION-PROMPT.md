# Prompt de Execucao do Workflow Completo - Breath Natural (Next.js)

## Objetivo

Executar automaticamente o workflow completo de gerenciamento do projeto Breath Natural, incluindo:

- Revisao e atualizacao de todas as issues abertas
- Busca de novos posts no Discord
- Criacao e correcao de Pull Requests
- Code review de PRs existentes

---

## Contexto do Projeto

**Repositorio:** `Consir-Sistemas-e-Sites/nextjs-chronicles-part-1`
**Tecnologias:** Next.js (App Router), React, TypeScript, Tailwind CSS
**Padroes:** Gitmoji, Object Calisthenics, Clean Code, DRY
**Metodologia:** Spec-Driven Development (SDD)

**Documentacao de Referencia:**

- `docs/rotina/SDD-GUIA.md` - Guia SDD do projeto
- `docs/rotina/CONSTITUICAO.md` - Principios inegociaveis
- `docs/rotina/GERENCIADOR.MD` - Workflow principal
- `docs/rotina/ISSUE_TEMPLATE.md` - Padrao de issues (specs)
- `docs/rotina/COMMIT-PATTERN.md` - Padrao de commits
- `docs/rotina/PULL_REQUEST_TEMPLATE.md` - Template de PR
- `docs/rotina/PULL_REQUEST_REVIEW.md` - Guia de review
- `docs/rotina/PULL_REQUEST_FIX.md` - Correcao de PRs

---

## Pre-requisitos

Antes de iniciar, verifique:

```bash
# GitHub CLI autenticado
gh auth status

# Discord token disponivel (se aplicavel)
# Acesso de escrita no repositorio
# Node.js e dependencias instaladas
pnpm install
```

---

## EXECUCAO DO WORKFLOW

### FASE 1: INICIALIZACAO

```
1. Carregue o estado atual do workflow:
   - Ler: dist/workflow/state.json
   - Se nao existir: criar estado inicial (workflow-state-schema.ts)
   - Validar schema conforme workflow-state.md

2. Registre inicio da execucao:
   - Timestamp atual em state.lastRun
   - Incrementar state.stats.totalRuns
   - Criar log em dist/workflow/logs/YYYY-MM-DD.log

3. VALIDACAO DE SEGURANCA (NOVO):
   - Executar scan de caracteres invisiveis
   - python scripts/scan-invisible-chars.py
   - Se detectar: limpar antes de continuar
   - Registrar em log de seguranca

4. CARREGAR CONSTITUICAO SDD:
   - Ler docs/rotina/CONSTITUICAO.md
   - Validar que proximas operacoes respeitam os principios
   - Referencia: docs/rotina/SDD-GUIA.md
```

### Seguranca de Codigo em Todas as Fases

**EM TODAS AS OPERACOES DO WORKFLOW:**

1. **GitHub Issues/PRs**:

   - Scan de descricoes e comentarios
   - Remover automaticamente caracteres proibidos
   - Bloquear se detectar padrao malicioso

2. **Codigo-fonte**:

   - NUNCA aceitar codigo com caracteres invisiveis
   - SEMPRE validar antes de commit
   - AUTOMATICAMENTE remover se detectar

3. **Discord**:
   - Validar mensagens antes de criar issues
   - Remover caracteres estranhos de citacoes
   - Manter apenas texto limpo

**Caracteres proibidos**:

- U+FE00 a U+FE0F: Variation Selectors
- U+E0100 a U+E01EF: Variation Selectors Supplement
- U+200B a U+200F: Zero-Width Characters
- U+202A a U+202E: Directional Formatting Characters

**Referencia obrigatoria**: `docs/rotina/SEGURANCA-CODIGO.md`

---

### FASE 2: GITHUB - ISSUES

#### 2.1 Listar Issues Abertas

```bash
# Listar todas as issues abertas
gh issue list --state open --limit 100 --json number,title,labels,createdAt,updatedAt,body
```

#### 2.2 Identificar Issues sem Descricao Adequada

**Criterios de descricao inadequada:**

- Titulo generico ("Corrigir bug", "Erro no sistema")
- Corpo vazio ou apenas "ver acima"
- Sem contexto tecnico
- Sem passos para reproduzir
- Sem informacao de impacto

**Filtro:**

```
Para cada issue aberta:
  SE issue NAO esta em state.github.processedIssues:
    ANALISAR descricao atual
    SE descricao e incompleta/superficial:
      MARCAR para atualizacao
```

#### 2.3 Atualizar Descricoes de Issues

**Para cada issue identificada:**

1. **Analisar contexto completo:**

   - Ler titulo e corpo atual
   - Ler todos os comentarios
   - Identificar codigo relacionado (arquivos, components, actions, api routes)
   - Verificar labels existentes
   - Buscar issues/PRs relacionados

2. **Gerar descricao completa seguindo ISSUE_TEMPLATE.md:**

```markdown
# {Titulo Tecnico e Descritivo}

## Referencia

| Campo | Valor |
|-------|-------|
| **Origem** | {Link do post/discord ou "Reporte direto no GitHub"} |
| **Reportado por** | {Autor da issue} |
| **Data** | {Data de criacao} |
| **Prioridade** | {alta | media | baixa} |
| **Impacto** | {critico | alto | medio | baixo} |

**Contexto Resumido:**
{2-3 frases sobre o problema}

---

## PROBLEMA ATUAL

### Descricao Clara e Objetiva

{Descricao tecnica detalhada do problema}

**Condicoes que desencadeiam:**

1. {Condicao 1}
2. {Condicao 2}

**Frequencia:** {100%|intermitente|raro}

### Impacto no Sistema/Usuario

| Dimensao | Descricao |
|----------|-----------|
| **Usuarios afetados** | {Quem e impactado} |
| **Funcionalidades bloqueadas** | {O que nao funciona} |
| **Prejuizo** | {Impacto negativo} |
| **Urgencia** | {Justificativa de prioridade} |

### Riscos Envolvidos

- {Risco 1}
- {Risco 2}
- {Risco 3}

---

## OBJETIVOS

- [ ] **Objetivo 1**: {Acao especifica}
- [ ] **Objetivo 2**: {Acao especifica}
- [ ] **Objetivo 3**: {Acao especifica}

---

## ANALISE TECNICA

### Possivel Causa Raiz

{Analise tecnica fundamentada}

### Fluxo Atual vs Fluxo Esperado

#### Fluxo Atual (Problematico)

1. {Passo 1}
2. {Passo 2 onde ocorre erro}
3. {Resultado indesejado}

#### Fluxo Esperado (Correto)

1. {Passo 1}
2. {Passo 2 correto}
3. {Resultado esperado}

### Dependencias Envolvidas

| Tipo | Nome | Impacto |
|------|------|---------|
| **Server Actions** | {nome-action.ts} | {impacto} |
| **Hooks** | {useNome.ts} | {impacto} |
| **API Routes** | {/api/endpoint} | {impacto} |
| **Components** | {NomeComponent.tsx} | {impacto} |

---

## ARQUIVOS AFETADOS

```
src/
├── app/
│   └── {rota}/
│       └── {page,layout}.tsx
├── components/
│   └── {NomeComponent.tsx}
├── actions/
│   └── {nome-action.ts}
├── hooks/
│   └── {useNome.ts}
└── types/
    └── {nome-types.ts}
```

---

## IMPLEMENTACAO SUGERIDA

### Passo a Passo Tecnico

#### 1. {Nome da Etapa}

**Responsabilidade:** {O que resolve}

```typescript
// Exemplo de codigo
```

**Arquivos:** `caminho/do/arquivo.ts`

---

## TESTES

### Fluxos Manuais Obrigatorios

1. **Fluxo Principal**
   - [ ] {Passo 1}
   - [ ] {Passo 2}
   - [ ] **Verificar**: {Resultado}

### Casos de Sucesso

- {Cenario}: {Resultado}

### Casos de Erro

- {Cenario}: {Tratamento}

---

## LABELS SUGERIDAS

| Label | Aplicar |
|-------|---------|
| `bug` | {sim | nao} |
| `feature` | {sim | nao} |
| `priority:high` | {sim | nao} |
```

3. **Atualizar issue no GitHub:**

```bash
gh issue edit {number} --body-file /tmp/issue-{number}-description.md
```

4. **Marcar como processada:**

```typescript
markIssueProcessed(state, issueNumber)
```

5. **Sugerir labels:**

```bash
gh issue edit {number} --add-label "bug,priority:high,frontend"
```

6. **Registrar no log:**

```
[TIMESTAMP] INFO Issue #{number} atualizada com descricao completa
```

---

### FASE 3: GITHUB - PULL REQUESTS

#### 3.1 Listar Pull Requests Abertos

```bash
gh pr list --state open --limit 100 --json number,title,labels,createdAt,updatedAt,author,reviews
```

#### 3.2 Identificar PRs sem Revisao

**Criterios:**

- PR sem nenhum review
- PR com review ha mais de 2 horas
- PR com status "changes_requested" sem nova revisao

**Filtro:**

```
Para cada PR aberto:
  SE PR NAO esta em state.github.reviewedPRs:
    MARCAR para revisao
  SENAO:
    lastReview = state.github.reviewedPRs[prNumber].lastReview
    SE (Date.now() - lastReview) > 2 horas:
      MARCAR para re-revisao
```

#### 3.3 Realizar Code Review (seguindo PULL_REQUEST_REVIEW.md)

**Para cada PR identificado:**

1. **Baixar e analisar mudancas:**

```bash
gh pr checkout {number}
git diff origin/main...HEAD --stat
```

2. **Analise completa do codigo:**

**Verificar:**

- [ ] Bugs potenciais
- [ ] Logica incorreta
- [ ] Problemas de tipagem TypeScript
- [ ] Problemas de performance
- [ ] Problemas de seguranca
- [ ] Inconsistencias com padroes do projeto
- [ ] Codigo duplicado
- [ ] Imports nao utilizados
- [ ] Nomes pouco claros
- [ ] Violacoes de Clean Code / DRY
- [ ] Problemas de manutencao futura
- [ ] Uso correto de Server vs Client Components

3. **Gerar comentarios no formato padrao:**

```markdown
- [ ] Problema: {descricao clara do erro}

Arquivo: {caminho/do/arquivo}
Linha: {numero aproximado}

Sugestao:
{Explicacao de como corrigir}
```

4. **Postar comentarios no PR:**

```bash
gh pr review {number} --comment --body-file /tmp/pr-{number}-review.md
```

5. **Aprovar ou solicitar mudancas:**

```bash
# Se aprovado
gh pr review {number} --approve

# Se precisa de mudancas
gh pr review {number} --request-changes
```

6. **Marcar como revisado:**

```typescript
markPRReviewed(state, prNumber, 'approved' | 'changes_requested')
```

7. **Registrar no log:**

```
[TIMESTAMP] INFO PR #{number} revisado - status: {approved|changes_requested}
```

---

### FASE 4: CORRECAO DE PULL REQUESTS

#### 4.1 Identificar PRs com Problemas

**Criterios:**

- PR com review "changes_requested"
- PR com comentarios pendentes de resolucao
- PR com falhas no CI/CD

**Filtro:**

```
Para cada PR revisado:
  SE state.github.reviewedPRs[prNumber].status == 'changes_requested':
    MARCAR para correcao
```

#### 4.2 Corrigir Problemas (seguindo PULL_REQUEST_FIX.md)

**Para cada PR identificado:**

1. **Listar problemas pendentes:**

```
Problemas identificados:
1. {Problema 1}
2. {Problema 2}
3. {Problema 3}
```

2. **Corrigir sequencialmente:**

```
Para cada problema:
  A. Identificar arquivo e linha
  B. Aplicar correcao no codigo
  C. Validar build (pnpm build)
  D. Validar type-check (pnpm type-check)
  E. Validar lint (pnpm lint)
  F. Gerar commit separado

  Commit pattern (COMMIT-PATTERN.md):
  :emoji: tipo(BRANCH_REF): descricao

  Exemplo:
  :bug: fix(feature/checkout): corrigir validacao de formulario
```

3. **Push das correcoes:**

```bash
git push origin {branch}
```

4. **Comentar no PR:**

```markdown
## Correcoes Aplicadas

### Problema 1: {descricao}

- [x] Corrigido em commit `{hash}`

### Problema 2: {descricao}

- [x] Corrigido em commit `{hash}`

**Validacoes:**

- pnpm lint
- pnpm type-check
- Testes manuais realizados
```

**IMPORTANTE:** Nunca fazer merge automaticamente. Deixar aberto para revisao humana.

---

### FASE 4.5: QUALITY GATE SDD (Analise de Consistencia)

#### 4.5.1 Verificar Consistencia Spec Codigo

Para cada PR revisado ou corrigido:

1. **Comparar objetivos da spec com implementacao**:

   ```
   Para cada objetivo na issue (spec):
     SE objetivo NAO esta implementado no PR:
       REGISTRAR inconsistencia
       SOLICITAR atualizacao do PR ou da spec
   ```

2. **Validar contra Constituicao**:

   ```
   Verificar se implementacao:
   - Usa stack definido em CONSTITUICAO.md
   - Segue padroes de codigo definidos
   - Mantem estrutura de diretorios definida
   - Respeita regras de TypeScript strict
   - Usa Server Components corretamente
   ```

3. **Atualizar spec se necessario**:
   ```
   SE escopo mudou durante implementacao:
     ATUALIZAR issue com novo escopo
     COMENTAR no PR com justificativa da mudanca
   ```

#### 4.5.2 Checklist de Quality Gate

- [ ] Todos os objetivos da spec implementados
- [ ] Nenhum principio da constituicao violado
- [ ] Spec (issue) atualizada se escopo divergiu
- [ ] Padroes de codigo verificados
- [ ] Testes da spec executados

#### 4.5.3 Acao se Inconsistencia

```
SE inconsistencia detectada:
  1. Comentar no PR com detalhes
  2. SOLICITAR mudancas (se codigo diverge da spec)
  3. OU ATUALIZAR spec (se spec diverge do codigo aceito)
  4. NUNCA aprovar PR com inconsistencia nao resolvida
```

---

### FASE 5: DISCORD - NOVOS POSTS

#### 5.1 Conectar ao Discord

```
Conectar usando token configurado
Acessar canais monitorados:
- Canal de bugs
- Canal de features
- Canal de suporte
```

#### 5.2 Filtrar Mensagens Nao Processadas

```typescript
Para cada canal monitorado:
  lastMessageId = state.discord.lastMessageId[channelId] || '0'

  Buscar mensagens apos lastMessageId:
    mensagens = discord.getChannelMessages(channelId, {
      after: lastMessageId,
      limit: 100
    })

    Para cada mensagem:
      SE mensagem NAO esta em state.discord.processedMessages:
        SE mensagem menciona @Front-End ou @Dev ou tem issue potencial:
          MARCAR para processamento
```

#### 5.3 Processar Mensagens

**Para cada mensagem identificada:**

1. **Ler contexto completo:**

```
- Ler toda a thread/chat da mensagem
- Identificar autor
- Identificar problema/feature relatado
- Capturar imagens/anexos
- Verificar se ja existe issue relacionada
```

2. **Verificar existencia de issue:**

```bash
# Buscar issues com palavras-chave da mensagem
gh issue list --state all --search "{palavras-chave}"
```

3. **Criar nova issue (se nao existir):**

```
Gerar descricao completa seguindo ISSUE_TEMPLATE.md
Incluir:
- Link da mensagem do Discord
- Contexto completo do chat
- Imagens/anexos se houver
- Mencao ao autor original

gh issue create \
  --title "{titulo tecnico}" \
  --body-file /tmp/discord-issue-{messageId}.md \
  --label "bug,discord,priority:high"
```

4. **Vincular mensagem a issue:**

```typescript
linkMessageToIssue(state, messageId, issueNumber)
```

5. **Notificar no Discord:**

```
Postar resposta na mensagem original:

"Issue criada: #{number} - {titulo}

Link: https://github.com/Consir-Sistemas-e-Sites/nextjs-chronicles-part-1/issues/{number}

A descricao foi detalhada com analise tecnica e plano de implementacao.
Acompanhe o progresso pela issue no GitHub.

@{autor} Obrigado pelo reporte!"
```

6. **Marcar como processada:**

```typescript
markMessageProcessed(state, messageId)
updateLastMessageId(state, channelId, messageId)
```

7. **Registrar no log:**

```
[TIMESTAMP] INFO Mensagem Discord {messageId} processada - Issue #{number} criada
```

---

### FASE 6: TAGS E VERSIONAMENTO

#### 6.1 Analisar Ultimos Merges

```bash
# Listar commits na main desde ultima tag
git log --oneline $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD
```

#### 6.2 Determinar Novo Versionamento

**Regras (SEMVER):**

```
SE commits incluem:
  - Breaking changes → MAJOR (vX.0.0)
  - Novas features → MINOR (v1.x.0)
  - Apenas correcoes → PATCH (v1.2.x)
```

#### 6.3 Criar Tag (se necessario)

```bash
# Se ha mudancas desde ultima tag
git tag -a v1.2.3 -m "Release v1.2.3

## Changelog
- Feature: {descricao}
- Fix: {descricao}
- Refactor: {descricao}
"

git push origin v1.2.3
```

#### 6.4 Registrar Tag

```typescript
state.github.tags.push('v1.2.3')
```

---

### FASE 7: FINALIZACAO

#### 7.1 Atualizar Estado

```typescript
state.lastRun = new Date().toISOString()
state.nextRun = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // +2 horas

cleanupState(state) // Limitar arrays a 100 itens, erros a 10
```

#### 7.2 Salvar Estado

```typescript
const path = 'dist/workflow/state.json'
await fs.mkdir('dist/workflow', { recursive: true })
await fs.writeFile(path, JSON.stringify(state, null, 2))
```

#### 7.3 Gerar Relatorio

```markdown
# Relatorio de Execucao do Workflow

**Data:** {timestamp}
**Duracao:** {duration}

## Resumo

| Metrica | Valor |
|---------|-------|
| Issues processadas | {count} |
| Issues atualizadas | {count} |
| PRs revisados | {count} |
| PRs corrigidos | {count} |
| Mensagens Discord | {count} |
| Issues criadas | {count} |
| Tags criadas | {count} |
| Erros | {count} |

## Issues Atualizadas

| # | Titulo | Status |
|---|--------|--------|
| {number} | {title} | OK |

## PRs Revisados

| # | Titulo | Status |
|---|--------|--------|
| {number} | {title} | {approved | changes_requested} |

## Mensagens Discord Processadas

| Canal | Mensagem | Issue |
|-------|----------|-------|
| {channel} | {snippet} | #{number} |

## Erros (se houver)

| Step | Erro | Resolvido |
|------|------|-----------|
| {step} | {error} | {sim | nao} |

## Proximos Passos

- [ ] Revisar PRs com changes_requested
- [ ] Acompanhar issues de alta prioridade
- [ ] Verificar novas mensagens no Discord
```

#### 7.4 Registrar Log Final

```
[TIMESTAMP] INFO Workflow finalizado com sucesso
[TIMESTAMP] INFO Estado salvo em dist/workflow/state.json
[TIMESTAMP] INFO Relatorio gerado em dist/workflow/logs/YYYY-MM-DD.log
```

---

## REGRAS DE EXECUCAO (YOLO MODE)

### Tomar Decisoes Automaticamente

- **NUNCA** pergunte "devo fazer isso?"
- **NUNCA** deixe decisoes pendentes
- **SEMPRE** analise o contexto antes de decidir
- **SEMPRE** escolha a melhor abordagem tecnica
- **NUNCA** crie issues genericas
- **SEMPRE** inclua descricao completa e tecnica

### Prioridade de Execucao

```
1. CRITICO: Issues com bugs de producao
2. ALTO: PRs bloqueando outras tarefas
3. MEDIO: Novas features reportadas
4. BAIXO: Melhorias e refatoracoes
```

### Tratamento de Erros

```
SE erro em qualquer passo:
  1. addError(state, step, errorMessage)
  2. Registrar no log com detalhes
  3. Continuar para proximo passo se possivel
  4. NUNCA interromper todo workflow por erro isolado
  5. Salvar estado parcial antes de encerrar
```

---

## CHECKLIST DE VALIDACAO FINAL

Antes de encerrar, verifique:

- [ ] Todas as issues abertas foram analisadas
- [ ] Issues sem descricao foram atualizadas
- [ ] Todos os PRs abertos foram revisados
- [ ] PRs com problemas foram corrigidos
- [ ] Novas mensagens do Discord foram processadas
- [ ] Tags de versionamento foram atualizadas (se necessario)
- [ ] Estado foi salvo corretamente
- [ ] Logs foram gerados
- [ ] Relatorio foi criado
- [ ] Erros foram registrados e tratados
- [ ] Quality Gate SDD executado para todos os PRs
- [ ] Specs (issues) atualizadas para refletir escopo real
- [ ] Constituicao respeitada em todas as implementacoes

---

## COMANDOS UTEIS

### GitHub CLI

```bash
# Listar issues
gh issue list --state open --json number,title,labels,body

# Editar issue
gh issue edit {number} --body-file file.md

# Criar issue
gh issue create --title "Titulo" --body-file file.md

# Listar PRs
gh pr list --state open --json number,title,reviews

# Revisar PR
gh pr review {number} --comment --body "Comentario"

# Aprovar PR
gh pr review {number} --approve

# Checkout de PR
gh pr checkout {number}
```

### pnpm / Git

```bash
# Instalar dependencias
pnpm install

# Verificar status
git status

# Criar commit
git add . && git commit -m ":emoji: tipo(REF): descricao"

# Push
git push origin {branch}

# Criar tag
git tag -a vX.Y.Z -m "Release notes"
git push origin vX.Y.Z

# Build
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

---

## SUPORTE

Em caso de duvidas durante a execucao:

1. Consultar documentacao em `docs/rotina/`
2. Verificar schema em `workflow-state-schema.ts`
3. Revisar exemplos em `ISSUE-EXEMPLO.md`
4. Validar padroes em `COMMIT-PATTERN.md`

---

**FIM DO PROMPT DE EXECUCAO DO WORKFLOW**
