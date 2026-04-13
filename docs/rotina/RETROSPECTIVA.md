# Retrospectiva SDD - Fechando o Loop de Feedback

> **Principio SDD**: Especificacoes sao a fonte da verdade, mas a verdade evolui.
> Retrospectivas sao o mecanismo pelo qual a metodologia SDD se auto-melhora.

Este documento define o processo de retrospectiva para o projeto Breath Natural (Next.js), garantindo que licões aprendidas alimentem de volta a Constituicao, templates e workflow.

---

## Objetivo

**Fechar o loop de feedback** do Spec-Driven Development:

- Erros recorrentes devem gerar melhorias na Constituicao ou templates
- Pain points identificados devem resultar em ajustes no workflow
- Sucessos devem ser formalizados como padroes a repetir
- A metodologia SDD e viva e deve evoluir continuamente

### Fluxo de Feedback

```
Implementacao → Erros/Desafios → Retrospectiva → Acoes de Melhoria
                                                           |
                                                           v
    Constituicao ← Templates ← Workflow ←───────────────────┘
         |              |            |
         v              v            v
    (principios)   (padroes)    (processos)
```

---

## Quando Realizar

### Triggers Automaticos

| Trigger | Condicao | Prioridade |
|---------|----------|------------|
| **Ciclo SDD Completo** | Apos merge de feature (spec → plan → tasks → implementation → merge) | Alta |
| **Erros Recorrentes** | 3+ erros do mesmo tipo no `recentErrors` do workflow state | Alta |
| **Revisao Mensal** | Agendamento automatico (primeira segunda-feira do mes) | Media |
| **Incidente de Seguranca** | Deteccao de caracteres invisiveis ou vulnerabilidade | Critica |
| **Pain Points da Equipe** | Identificacao manual pelo time | Media |
| **Divergencia Spec-Codigo** | Quality Gate rejeitar 2+ vezes a mesma spec | Alta |

### Verificacao Automatica via Workflow State

```typescript
// No workflow state (workflow-state-schema.ts)
interface WorkflowState {
  // ... campos existentes ...
  lastRetrospective?: string      // Timestamp da ultima retrospectiva
  lessonsLearned?: LessonLearned[] // Licoes acumuladas
}

interface LessonLearned {
  id: string
  date: string
  source: 'retrospective' | 'incident' | 'quality_gate'
  category: 'constitution' | 'template' | 'workflow' | 'code_pattern'
  description: string
  action: string
  status: 'pending' | 'implemented' | 'rejected'
}

// Helper para verificar necessidade de retrospectiva
function needsRetrospective(state: WorkflowState): boolean {
  // Verificar erros recorrentes (3+ do mesmo tipo)
  const errorCounts = countErrorsByType(state.recentErrors)
  const hasRecurringErrors = Object.values(errorCounts).some(count => count >= 3)

  // Verificar ultima retrospectiva (30 dias)
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  const lastRetrospectiveDate = state.lastRetrospective
    ? new Date(state.lastRetrospective).getTime()
    : 0
  const monthlyReviewDue = lastRetrospectiveDate < thirtyDaysAgo

  return hasRecurringErrors || monthlyReviewDue
}
```

---

## Participantes (Mapeamento para Agentes Paperclip)

A retrospectiva e conduzida pelos agentes do Paperclip, cada um com papel especifico:

| Papel | Agente Paperclip | Responsabilidades |
|-------|------------------|-------------------|
| **Facilitador** | CEO Bloodfallen | Coordenar a retrospectiva, tomar decisoes finais, aprovar mudancas na Constituicao |
| **Coordenador Alternativo** | Atlas | Quando Bloodfallen indisponivel, coordenar fluxo e garantir follow-up |
| **Analise de Erros** | Oracle | Identificar padroes em `recentErrors`, causas raiz, tendencias |
| **Propostas de Melhoria** | Metis | Analisar impacto das mudancas propostas, custo-beneficio |
| **Validacao de Planos** | Momus | Review critico das propostas, identificar falhas ou riscos |
| **Implementacao** | Senior-Coder | Implementar mudancas aprovadas em templates e workflow |
| **Correcoes Rapidas** | Quick-Fixer | Ajustes menores identificados durante retrospectiva |
| **Documentacao** | Librarian | Registrar retrospectiva, atualizar documentacao |
| **Pesquisa de Contexto** | Explore | Buscar contexto adicional quando necessario |
| **Testes** | Test-Writer | Criar testes para validar mudancas propostas |

### Fluxo de Execucao

```
1. CEO Bloodfallen inicia retrospectiva
2. Oracle analisa recentErrors e identifica padroes
3. Metis propoe melhorias com analise de impacto
4. Momus valida propostas (pode rejeitar ou solicitar ajustes)
5. CEO Bloodfallen aprova/rejeita cada acao
6. Senior-Coder ou Quick-Fixer implementa aprovacoes
7. Librarian documenta tudo
```

---

## Template de Retrospectiva

### Estrutura Obrigatoria

```markdown
# Retrospectiva SDD - {YYYY-MM-DD}

## Metadados

| Campo | Valor |
|-------|-------|
| **Data** | {YYYY-MM-DD} |
| **Ciclo SDD Trigger** | {Issue/PR que motivou a retrospectiva} |
| **Facilitador** | {Agente responsavel} |
| **Participantes** | {Lista de agentes envolvidos} |
| **Tipo** | {ciclo_completo | erros_recorrentes | mensal | incidente | pain_point} |

---

## O Que Funcionou Bem (Fazer Mais)

> Identificar praticas bem-sucedidas que devem ser repetidas ou amplificadas.

- {Pratica 1}: {descricao do que funcionou}
- {Pratica 2}: {descricao do que funcionou}
- {Pratica 3}: {descricao do que funcionou}

---

## O Que Nao Funcionou (Parar de Fazer)

> Identificar praticas problematicas que devem ser eliminadas ou evitadas.

| Problema | Frequencia | Impacto | Acao |
|----------|------------|---------|------|
| {descricao} | {alta | media | baixa} | {critico | alto | medio | baixo} | {eliminar | modificar} |

---

## O Que Melhorar (Experimentar)

> Propostas de melhoria a serem experimentadas.

### Proposta 1: {Titulo}

| Campo | Valor |
|-------|-------|
| **Descricao** | {O que mudar} |
| **Motivacao** | {Por que mudar} |
| **Experimento** | {Como testar} |
| **Metrica de Sucesso** | {Como medir} |
| **Duracao do Experimento** | {Tempo de teste} |

---

## Erros Recorrentes (do Workflow State)

> Erros extraidos de `state.recentErrors` que se repetiram 3+ vezes.

| Erro | Contagem | Causa Raiz | Acao Proposta |
|------|----------|------------|---------------|
| {erro} | {N} | {analise} | {acao} |

### Analise de Padroes (Oracle)

```
{Analise detalhada dos padroes identificados}
```

---

## Propostas de Acao

> Acoes concretas a serem implementadas.

### Acao 1: {Titulo}

| Campo | Valor |
|-------|-------|
| **ID** | {RETRO-YYYY-NNN} |
| **Descricao** | {O que fazer} |
| **Categoria** | {constitution | template | workflow | code_pattern} |
| **Responsavel** | {Agente} |
| **Prazo** | {YYYY-MM-DD} |
| **Impacto Esperado** | {Resultado esperado} |
| **Arquivos Afetados** | {Lista de arquivos} |
| **Status** | {pending | in_progress | completed | rejected} |

---

## Decisoes da Retrospectiva

> Registro das decisoes tomadas pelo facilitador.

| Decisao | Justificativa | Aprovado por |
|---------|---------------|--------------|
| {decisao} | {por que} | {agente} |

---

## Proxima Retrospectiva

| Campo | Valor |
|-------|-------|
| **Data Sugerida** | {YYYY-MM-DD} |
| **Triggers Monitorados** | {Lista de triggers} |

---

## Assinaturas

- Facilitador: {Agente} em {data}
- Validado por: {Agentes}
```

---

## Feedback para Constituicao

A Constituicao (`CONSTITUICAO.md`) e "inviolavel" mas deve evoluir com base em evidencias concretas.

### Quando Atualizar a Constituicao

| Condicao | Evidencia Necessaria | Processo |
|----------|---------------------|----------|
| **Novo Principio** | Erro recorrente causado por ausencia de diretriz | Proposta → Validacao Momus → Aprovacao CEO |
| **Remocao de Principio** | Principio obsoleto ou impeditivo | Proposta → Analise Impacto Metis → Aprovacao Unanime |
| **Ajuste de Principio** | Principio ambiguo gerando inconsistencias | Proposta → Validacao Momus → Aprovacao CEO |
| **Nova Tecnologia** | Stack mudou (ex: adicionar biblioteca) | RFC → Analise Arquiteto → Aprovacao CEO |

### Processo de Proposta de Mudanca na Constituicao

```
1. IDENTIFICACAO
   - Erro recorrente OU pain point documentado
   - Oracle registra em recentErrors com tag "constitution-related"

2. PROPOSTA
   - Agente cria proposta detalhada:
     - Secao atual da Constituicao
     - Problema identificado
     - Mudanca proposta
     - Impacto esperado

3. VALIDACAO (Momus)
   - Review critico da proposta
   - Verificar conflitos com outros principios
   - Identificar riscos

4. ANALISE DE IMPACTO (Metis)
   - Avaliar custo-beneficio
   - Estimar esforco de implementacao
   - Identificar arquivos/processos afetados

5. APROVACAO (CEO Bloodfallen)
   - Decisao final
   - Se rejeitado: documentar motivo
   - Se aprovado: delegar implementacao

6. IMPLEMENTACAO (Senior-Coder)
   - Atualizar CONSTITUICAO.md
   - Atualizar templates relacionados
   - Comunicar mudanca

7. REGISTRO (Librarian)
   - Adicionar em lessonsLearned
   - Atualizar CHANGELOG da Constituicao
```

### Exemplo de Mudanca na Constituicao

```markdown
## Proposta: Adicionar Principio de Server Components

### Contexto
- Erro recorrente: "Performance degradada em paginas com muitos dados" (5 ocorrencias)
- Causa raiz: Componentes pesados sendo renderizados no client sem necessidade

### Secao Atual
Nao existe secao especifica para Server Components.

### Mudanca Proposta
Adicionar na secao "2. Padroes de Codigo":

```markdown
### Performance

- Preferir Server Components por padrao (usar `'use client'` apenas quando necessario)
- Streaming com `Suspense` para carregamento progressivo
- `generateMetadata` para SEO otimizado
- Evitar hidratacao desnecessaria de componentes estaticos
```

### Impacto Esperado
- Reducao de 30% no tempo de carregamento inicial
- Melhoria na metrica LCP (Largest Contentful Paint)
- Reducao do bundle JavaScript enviado ao cliente

### Aprovacao
- Momus: APROVADO - Sem conflitos com principios existentes
- Metis: APROVADO - Custo baixo, beneficio alto
- CEO Bloodfallen: APROVADO - Implementar imediatamente
```

---

## Feedback para Templates

Os templates (`ISSUE_TEMPLATE.md`, `PULL_REQUEST_REVIEW.md`, `COMMIT-PATTERN.md`) sao a interface pratica do SDD.

### ISSUE_TEMPLATE.md

**Quando atualizar:**

| Condicao | Exemplo |
|----------|---------|
| Specs incompletas recorrentemente | Adicionar secao obrigatoria |
| Ambiguidade gerando retrabalho | Clarificar instrucoes |
| Novo tipo de spec | Adicionar template alternativo |
| Campos desnecessarios | Remover secoes nao utilizadas |

**Processo:**

```
1. Oracle identifica padrao de specs incompletas
2. Metis propoe alteracao no template
3. Momus valida se alteracao melhora clareza
4. CEO Bloodfallen aprova
5. Senior-Coder atualiza ISSUE_TEMPLATE.md
```

### PULL_REQUEST_REVIEW.md

**Quando atualizar:**

| Condicao | Exemplo |
|----------|---------|
| Bug passou pelo review | Adicionar checklist especifico |
| Novo tipo de problema detectado | Adicionar secao de verificacao |
| Review muito demorado | Simplificar checklist |
| Falsos positivos frequentes | Remover verificacao problematica |

**Processo:**

```
1. Bug reportado apos merge
2. Oracle analisa se review deveria ter detectado
3. Se sim: Metis propoe adicao ao checklist
4. Momus valida se novo item e acionavel
5. CEO Bloodfallen aprova
6. Senior-Coder atualiza PULL_REQUEST_REVIEW.md
```

### COMMIT-PATTERN.md

**Quando atualizar:**

| Condicao | Exemplo |
|----------|---------|
| Commits inconsistentes | Adicionar exemplos especificos |
| Novo tipo de alteracao | Adicionar emoji/tipo |
| Commits muito grandes | Adicionar guideline de granularidade |
| Mensagens confusas | Clarificar regras |

**Processo:**

```
1. Padrao de commits problematicos identificado
2. Metis propoe ajuste no pattern
3. Momus valida impacto no workflow de versionamento
4. CEO Bloodfallen aprova
5. Senior-Coder atualiza COMMIT-PATTERN.md
```

---

## Feedback para Workflow

O workflow principal (`GERENCIADOR.MD`, `WORKFLOW-EXECUTION-PROMPT.md`) e o orquestrador do SDD.

### Quando Atualizar

| Condicao | Evidencia | Acao |
|----------|-----------|------|
| **Passo Ineficiente** | Tempo excessivo em etapa especifica | Otimizar ou remover passo |
| **Passo Faltando** | Erro recorrente por ausencia de verificacao | Adicionar passo |
| **Ordem Incorreta** | Dependencias nao respeitadas | Reordenar passos |
| **Ambiguidade** | Interpretacoes diferentes do mesmo passo | Clarificar instrucoes |

### Integracao com Workflow State

Adicionar campos ao `workflow-state-schema.ts`:

```typescript
interface WorkflowState {
  // ... campos existentes ...

  // Novos campos para retrospectiva
  lastRetrospective?: string
  nextRetrospective?: string
  retrospectiveTriggers?: RetrospectiveTrigger[]
  lessonsLearned?: LessonLearned[]
}

interface RetrospectiveTrigger {
  type: 'error_count' | 'time_based' | 'incident' | 'manual'
  threshold: number
  currentValue: number
  lastChecked: string
}

interface LessonLearned {
  id: string
  retrospectiveId: string
  date: string
  source: 'retrospective' | 'incident' | 'quality_gate' | 'manual'
  category: 'constitution' | 'template' | 'workflow' | 'code_pattern'
  title: string
  description: string
  action: string
  implementedAt?: string
  status: 'pending' | 'implemented' | 'rejected' | 'deprecated'
  files: string[]
  metrics?: {
    before?: Record<string, number>
    after?: Record<string, number>
  }
}

// Funcoes helper para retrospectiva
function addLessonLearned(state: WorkflowState, lesson: Omit<LessonLearned, 'id' | 'date'>): void {
  const newLesson: LessonLearned = {
    ...lesson,
    id: `LL-${Date.now()}`,
    date: new Date().toISOString(),
  }
  state.lessonsLearned = state.lessonsLearned || []
  state.lessonsLearned.push(newLesson)

  // Limitar a 50 licoes aprendidas
  if (state.lessonsLearned.length > 50) {
    state.lessonsLearned = state.lessonsLearned.slice(-50)
  }
}

function getPendingLessons(state: WorkflowState): LessonLearned[] {
  return (state.lessonsLearned || []).filter(l => l.status === 'pending')
}

function markLessonImplemented(state: WorkflowState, lessonId: string): void {
  const lesson = state.lessonsLearned?.find(l => l.id === lessonId)
  if (lesson) {
    lesson.status = 'implemented'
    lesson.implementedAt = new Date().toISOString()
  }
}

function updateRetrospectiveTimestamp(state: WorkflowState): void {
  state.lastRetrospective = new Date().toISOString()
  // Agendar proxima para 30 dias
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + 30)
  state.nextRetrospective = nextDate.toISOString()
}
```

### Atualizacao do GERENCIADOR.MD

Adicionar passo de verificacao de retrospectiva:

```markdown
## Passo 0.3: Verificar Necessidade de Retrospectiva

- Execute `needsRetrospective(state)` para verificar triggers
- Se retornar true:
  1. Notificar CEO Bloodfallen
  2. Iniciar processo de retrospectiva
  3. Seguir `RETROSPECTIVA.md`

### Triggers Verificados

- [ ] 3+ erros do mesmo tipo em recentErrors
- [ ] Ultima retrospectiva ha mais de 30 dias
- [ ] Incidente de seguranca registrado
- [ ] Pain point reportado pela equipe
```

---

## Registro e Rastreabilidade

### Armazenamento

As retrospectivas sao armazenadas em duas formas:

#### 1. Arquivos de Retrospectiva

**Localizacao:** `docs/rotina/retrospectivas/YYYY-MM-DD-retrospectiva-{tipo}.md`

**Nomenclatura:**
- `{YYYY-MM-DD}`: Data da retrospectiva
- `{tipo}`: `ciclo` | `erros` | `mensal` | `incidente` | `pain-point`

**Exemplo:**
```
docs/rotina/retrospectivas/
├── 2026-03-01-retrospectiva-mensal.md
├── 2026-03-15-retrospectiva-erros.md
├── 2026-04-01-retrospectiva-mensal.md
└── 2026-04-05-retrospectiva-incidente.md
```

#### 2. Workflow State

**Campo:** `lessonsLearned` no `state.json`

**Vantagens:**
- Consulta rapida por agentes
- Rastreamento de status
- Vinculo com acoes implementadas

#### 3. GitHub Issues (Alternativa)

**Label:** `retrospective`

**Formato de Titulo:** `[RETRO] {YYYY-MM-DD} - {tipo} - {titulo curto}`

**Exemplo:** `[RETRO] 2026-04-05 - erros - Caracteres invisiveis recorrentes`

### Formato de Registro

```typescript
interface RetrospectiveRecord {
  id: string                    // RETRO-2026-001
  date: string                  // ISO 8601
  type: 'ciclo_completo' | 'erros_recorrentes' | 'mensal' | 'incidente' | 'pain_point'
  trigger: {
    source: string              // Issue #, PR #, ou descricao
    description: string
  }
  participants: string[]        // Agentes envolvidos
  findings: {
    worked_well: string[]
    didnt_work: Array<{ problem: string; frequency: string; impact: string }>
    improvements: Array<{ title: string; description: string; experiment: string }>
  }
  recurring_errors: Array<{
    error: string
    count: number
    root_cause: string
    action: string
  }>
  actions: Array<{
    id: string
    description: string
    category: 'constitution' | 'template' | 'workflow' | 'code_pattern'
    responsible: string
    deadline: string
    status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  }>
  decisions: Array<{
    decision: string
    justification: string
    approved_by: string
  }>
  next_retrospective: string     // Data sugerida
}
```

### Vinculo com Acoes Implementadas

Cada acao aprovada deve ter:

1. **ID unico**: `RETRO-YYYY-NNN` (ex: `RETRO-2026-003`)
2. **Referencia no commit**: `[RETRO-2026-003] descricao`
3. **Referencia na PR**: Link para a retrospectiva
4. **Referencia na issue**: Se aplicavel

```bash
# Exemplo de commit
:memo: docs(RETRO-2026-003): adicionar principio de Server Components na Constituicao
```

---

## Metricas de Sucesso

### KPIs de Retroalimentacao

| Metrica | Formula | Target | Coleta |
|---------|---------|--------|--------|
| **Reducao de Erros Recorrentes** | `(erros_pre - erros_post) / erros_pre * 100` | > 50% | Workflow state |
| **Tempo Medio do Ciclo SDD** | Media de `merge_date - spec_creation_date` | < 7 dias | GitHub API |
| **Taxa de Re-trabalho** | `specs_atualizadas_durante_impl / total_specs * 100` | < 10% | GitHub issues |
| **Tempo de Resolucao de Acoes** | Media de `action_completed - action_created` | < 14 dias | Retrospectiva records |
| **Cobertura de Licões Aplicadas** | `lessons_implemented / lessons_identified * 100` | > 80% | Workflow state |
| **Satisfacao com Workflow** | NPS da equipe com metodologia | > 7 | Survey mensal |

### Dashboard de Retrospectivas

```typescript
interface RetrospectiveMetrics {
  period: {
    start: string
    end: string
  }
  totals: {
    retrospectives: number
    actionsProposed: number
    actionsCompleted: number
    actionsRejected: number
  }
  byCategory: {
    constitution: number
    template: number
    workflow: number
    code_pattern: number
  }
  errorReduction: {
    beforeTotal: number
    afterTotal: number
    percentChange: number
  }
  cycleTime: {
    averageDays: number
    trend: 'improving' | 'stable' | 'degrading'
  }
  reworkRate: {
    percent: number
    trend: 'improving' | 'stable' | 'degrading'
  }
}
```

### Coleta Automatica

```typescript
// Adicionar ao workflow para coleta de metricas
function collectRetrospectiveMetrics(state: WorkflowState): RetrospectiveMetrics {
  const lessons = state.lessonsLearned || []
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

  return {
    period: {
      start: new Date(thirtyDaysAgo).toISOString(),
      end: new Date().toISOString(),
    },
    totals: {
      retrospectives: countRetrospectivesInPeriod(thirtyDaysAgo),
      actionsProposed: lessons.filter(l => l.date > new Date(thirtyDaysAgo).toISOString()).length,
      actionsCompleted: lessons.filter(l => l.status === 'implemented').length,
      actionsRejected: lessons.filter(l => l.status === 'rejected').length,
    },
    byCategory: {
      constitution: lessons.filter(l => l.category === 'constitution').length,
      template: lessons.filter(l => l.category === 'template').length,
      workflow: lessons.filter(l => l.category === 'workflow').length,
      code_pattern: lessons.filter(l => l.category === 'code_pattern').length,
    },
    errorReduction: calculateErrorReduction(state),
    cycleTime: calculateCycleTimeTrend(),
    reworkRate: calculateReworkRate(),
  }
}
```

---

## Exemplo Preenchido

```markdown
# Retrospectiva SDD - 2026-04-05

## Metadados

| Campo | Valor |
|-------|-------|
| **Data** | 2026-04-05 |
| **Ciclo SDD Trigger** | Issue #412 - Implementar filtros avancados |
| **Facilitador** | CEO Bloodfallen |
| **Participantes** | Oracle, Metis, Momus, Senior-Coder, Librarian |
| **Tipo** | erros_recorrentes |

---

## O Que Funcionou Bem (Fazer Mais)

- **Template de Spec Completo**: Issues criadas com template completo tiveram 40% menos retrabalho
- **Quality Gate Antes do Merge**: Detectou 3 inconsistencias spec-codigo antes do merge
- **Scan de Seguranca**: Bloqueou 2 PRs com caracteres invisiveis

---

## O Que Nao Funcionou (Parar de Fazer)

| Problema | Frequencia | Impacto | Acao |
|----------|------------|---------|------|
| Specs muito longas sem checklist de tarefas | Alta | Medio | Adicionar secao obrigatoria de checklist |
| Commits sem referencia a issue | Media | Baixo | Reforcar regra no COMMIT-PATTERN |
| Reviews focados apenas em codigo, ignorando spec | Alta | Alto | Atualizar PULL_REQUEST_REVIEW |

---

## O Que Melhorar (Experimentar)

### Proposta 1: Checklist de Decomposicao Obrigatorio

| Campo | Valor |
|-------|-------|
| **Descricao** | Toda spec deve ter checklist de tarefas atômicas antes de iniciar implementacao |
| **Motivacao** | 3 specs foram rejeitadas no Quality Gate por falta de decomposicao clara |
| **Experimento** | Adicionar secao obrigatoria em ISSUE_TEMPLATE.md por 2 semanas |
| **Metrica de Sucesso** | Reducao de 50% em specs rejeitadas por decomposicao incompleta |
| **Duracao do Experimento** | 14 dias |

---

## Erros Recorrentes (do Workflow State)

| Erro | Contagem | Causa Raiz | Acao Proposta |
|------|----------|------------|---------------|
| Rate limit exceeded | 4 | Muitas requisicoes GitHub em sequencia | Adicionar retry com backoff |
| Spec divergente do codigo | 5 | Spec nao atualizada durante implementacao | Adicionar passo de sincronizacao no workflow |
| Caracteres invisiveis em commits | 3 | Desenvolvedor nao executou scan | Tornar scan obrigatorio no pre-commit hook |

### Analise de Padroes (Oracle)

```
Analise dos ultimos 30 dias revelou padrao consistente:

1. ERROS DE RATE LIMIT
   - Concentrados em horarios de pico (10h-12h)
   - Afeta principalmente step 1.1 (processamento de issues)
   - Recomendacao: Implementar fila com rate limiting

2. DIVERGENCIA SPEC-CODIGO
   - Causa principal: Mudancas de escopo nao documentadas
   - 60% das ocorrencias em features com prazo apertado
   - Recomendacao: Quality Gate intermediario durante implementacao

3. CARACTERES INVISIVEIS
   - Origem: Copy-paste de fontes externas
   - Concentrados em comentarios e strings
   - Recomendacao: Pre-commit hook obrigatorio
```

---

## Propostas de Acao

### Acao 1: Implementar Retry com Backoff no GitHub

| Campo | Valor |
|-------|-------|
| **ID** | RETRO-2026-008 |
| **Descricao** | Adicionar logica de retry com exponential backoff nas chamadas GitHub API |
| **Categoria** | workflow |
| **Responsavel** | Senior-Coder |
| **Prazo** | 2026-04-12 |
| **Impacto Esperado** | Eliminar erros de rate limit |
| **Arquivos Afetados** | `workflow-github-client.ts`, `GERENCIADOR.MD` |
| **Status** | pending |

### Acao 2: Adicionar Secao de Checklist Obrigatorio em ISSUE_TEMPLATE

| Campo | Valor |
|-------|-------|
| **ID** | RETRO-2026-009 |
| **Descricao** | Adicionar secao "Checklist de Tarefas Atômicas" como obrigatoria no template |
| **Categoria** | template |
| **Responsavel** | Senior-Coder |
| **Prazo** | 2026-04-08 |
| **Impacto Esperado** | Reducao de 50% em specs rejeitadas |
| **Arquivos Afetados** | `ISSUE_TEMPLATE.md` |
| **Status** | pending |

### Acao 3: Atualizar PULL_REQUEST_REVIEW com Verificacao de Spec

| Campo | Valor |
|-------|-------|
| **ID** | RETRO-2026-010 |
| **Descricao** | Adicionar secao de verificacao de consistencia spec-codigo no checklist de review |
| **Categoria** | template |
| **Responsavel** | Senior-Coder |
| **Prazo** | 2026-04-10 |
| **Impacto Esperado** | Detectar divergencias antes do merge |
| **Arquivos Afetados** | `PULL_REQUEST_REVIEW.md` |
| **Status** | pending |

### Acao 4: Implementar Pre-commit Hook para Scan de Seguranca

| Campo | Valor |
|-------|-------|
| **ID** | RETRO-2026-011 |
| **Descricao** | Adicionar git hook que executa scan de caracteres invisiveis automaticamente |
| **Categoria** | workflow |
| **Responsavel** | Senior-Coder |
| **Prazo** | 2026-04-15 |
| **Impacto Esperado** | Eliminar commits com caracteres maliciosos |
| **Arquivos Afetados** | `.husky/pre-commit`, `scripts/scan-invisible-chars.py` |
| **Status** | pending |

---

## Decisoes da Retrospectiva

| Decisao | Justificativa | Aprovado por |
|---------|---------------|--------------|
| Aprovar acao RETRO-2026-008 | Custo baixo, beneficio alto | CEO Bloodfallen |
| Aprovar acao RETRO-2026-009 | Alinhado com principios SDD | CEO Bloodfallen |
| Aprovar acao RETRO-2026-010 | Garante consistencia spec-codigo | CEO Bloodfallen |
| Aprovar acao RETRO-2026-011 | Seguranca e nao negociavel | CEO Bloodfallen |

---

## Proxima Retrospectiva

| Campo | Valor |
|-------|-------|
| **Data Sugerida** | 2026-05-05 |
| **Triggers Monitorados** | erros_recorrentes, ciclo_completo |

---

## Assinaturas

- Facilitador: CEO Bloodfallen em 2026-04-05
- Validado por: Oracle, Metis, Momus
```

---

**Documento vivo.** Ultima revisao: 2026-04-05.
