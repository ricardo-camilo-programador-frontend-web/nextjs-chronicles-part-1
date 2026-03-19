# Formato do Arquivo de Estado do Workflow

O arquivo de estado permite que o workflow mantenha contexto entre execucoes, evitando duplicacoes e rastreando progresso.

## Localizacao

```
dist/workflow/state.json
```

Este caminho ja esta coberto pelo `.gitignore` (linha `dist`), entao nao sera versionado.

## Schema

```typescript
interface WorkflowState {
  version: string
  lastRun: string
  nextRun: string
  stats: WorkflowStats
  github: GitHubState
  codeQuality: CodeQualityState
  recentErrors: WorkflowError[]
  lock: WorkflowLock | null
}
```

### Estrutura Completa

| Campo | Tipo | Descricao |
|-------|------|-----------|
| `version` | string | Versao do schema (ex: "1.0.0") |
| `lastRun` | string | Timestamp ISO 8601 da ultima execucao |
| `nextRun` | string | Timestamp ISO 8601 da proxima execucao agendada |
| `stats` | WorkflowStats | Estatisticas de execucao |
| `github` | GitHubState | Estado do processamento do GitHub |
| `codeQuality` | CodeQualityState | Estado de analise de qualidade |
| `recentErrors` | WorkflowError[] | Ultimos erros ocorridos |
| `lock` | WorkflowLock \| null | Lock para execucao exclusiva |

### WorkflowStats

```typescript
interface WorkflowStats {
  totalRuns: number
  issuesCreated: number
  issuesClosed: number
  issuesUpdated: number
  prsReviewed: number
  prsMerged: number
  labelsAdded: number
  tagsCreated: number
  errors: number
}
```

### GitHubState

```typescript
interface GitHubState {
  processedIssues: string[]      // ["#330", "#331"]
  reviewedPRs: Record<string, PRReviewInfo>
  tags: string[]                 // ["v1.2.0", "v1.2.1"]
  releases: string[]             // ["v1.2.0", "v1.2.1"]
  staleIssues: string[]          // Issues marcadas como stale
}

interface PRReviewInfo {
  lastReview: string
  reviewer: string
  status: 'approved' | 'changes_requested' | 'pending' | 'commented'
  filesReviewed: number
  commentsCount: number
}
```

### CodeQualityState

```typescript
interface CodeQualityState {
  lastAnalysis: string
  score: number                  // 0-100
  issues: CodeQualityIssue[]
  techDebt: TechDebtItem[]
  dependencies: DependencyStatus
}

interface CodeQualityIssue {
  file: string
  line: number
  rule: string
  severity: 'error' | 'warning' | 'info'
  message: string
}

interface TechDebtItem {
  id: string
  area: string
  description: string
  priority: 'high' | 'medium' | 'low'
  estimatedEffort: string
  created: string
}

interface DependencyStatus {
  outdated: number
  vulnerable: number
  lastCheck: string
}
```

### WorkflowError

```typescript
interface WorkflowError {
  timestamp: string
  step: string
  error: string
  resolved: boolean
}
```

## Exemplo Completo

```json
{
  "version": "1.0.0",
  "lastRun": "2026-03-18T10:00:00Z",
  "nextRun": "2026-03-18T12:00:00Z",
  "stats": {
    "totalRuns": 42,
    "issuesCreated": 15,
    "issuesClosed": 8,
    "issuesUpdated": 3,
    "prsReviewed": 23,
    "prsMerged": 12,
    "labelsAdded": 45,
    "tagsCreated": 5,
    "errors": 3
  },
  "github": {
    "processedIssues": ["#330", "#331", "#332"],
    "reviewedPRs": {
      "45": {
        "lastReview": "2026-03-18T09:30:00Z",
        "reviewer": "agent",
        "status": "approved",
        "filesReviewed": 5,
        "commentsCount": 2
      },
      "46": {
        "lastReview": "2026-03-18T08:00:00Z",
        "reviewer": "agent",
        "status": "changes_requested",
        "filesReviewed": 3,
        "commentsCount": 8
      }
    },
    "tags": ["v1.2.0", "v1.2.1", "v1.3.0"],
    "releases": ["v1.2.0", "v1.3.0"],
    "staleIssues": ["#320", "#315"]
  },
  "codeQuality": {
    "lastAnalysis": "2026-03-18T10:00:00Z",
    "score": 85,
    "issues": [
      {
        "file": "src/stores/user-store.ts",
        "line": 42,
        "rule": "no-any",
        "severity": "warning",
        "message": "Avoid using 'any' type"
      }
    ],
    "techDebt": [
      {
        "id": "td-001",
        "area": "authentication",
        "description": "Refactor auth flow to use composables",
        "priority": "medium",
        "estimatedEffort": "4h",
        "created": "2026-03-15T10:00:00Z"
      }
    ],
    "dependencies": {
      "outdated": 3,
      "vulnerable": 0,
      "lastCheck": "2026-03-18T10:00:00Z"
    }
  },
  "recentErrors": [
    {
      "timestamp": "2026-03-18T08:15:00Z",
      "step": "github.pr_review",
      "error": "Rate limit exceeded",
      "resolved": true
    }
  ],
  "lock": null
}
```

## Operacoes

### Carregar Estado

```typescript
import { createInitialState, type WorkflowState } from './workflow-state-schema'

async function loadState(): Promise<WorkflowState> {
  const path = 'dist/workflow/state.json'

  try {
    const content = await fs.readFile(path, 'utf-8')
    return JSON.parse(content) as WorkflowState
  } catch {
    return createInitialState()
  }
}
```

### Salvar Estado

```typescript
import { cleanupState } from './workflow-state-schema'

async function saveState(state: WorkflowState): Promise<void> {
  const path = 'dist/workflow/state.json'

  await fs.mkdir('dist/workflow', { recursive: true })

  state.lastRun = new Date().toISOString()
  cleanupState(state)

  await fs.writeFile(path, JSON.stringify(state, null, 2))
}
```

## Funcoes Helper

O schema inclui funcoes helper para manipulacao do estado:

| Funcao | Uso |
|--------|-----|
| `isIssueProcessed(state, issueNumber)` | Verifica se issue ja foi processada |
| `markIssueProcessed(state, issueNumber)` | Marca issue como processada |
| `isPRReviewed(state, prNumber)` | Verifica se PR ja foi revisado |
| `needsReReview(state, prNumber, hours)` | Verifica se precisa nova revisao |
| `markPRReviewed(state, prNumber, status)` | Marca PR como revisado |
| `addError(state, step, errorMessage)` | Registra erro no estado |
| `addTechDebtItem(state, item)` | Adiciona item de debito tecnico |
| `updateCodeQualityScore(state, score)` | Atualiza score de qualidade |

## Rotina de Cleanup

A funcao `cleanupState()` e chamada automaticamente ao salvar e:

- Limita `processedIssues` a 100 itens
- Limita `recentErrors` a 10 itens
- Limita `codeQuality.issues` a 50 itens
- Remove `techDebt` resolvidos ha mais de 30 dias

Isso evita crescimento ilimitado do arquivo de estado.

## Logs

Alem do estado, o workflow pode gerar logs em:

```
dist/workflow/logs/YYYY-MM-DD.log
```

Formato sugerido:

```
[2026-03-18T10:00:00Z] INFO  Workflow iniciado
[2026-03-18T10:00:05Z] INFO  Processando issue #330
[2026-03-18T10:00:10Z] ERROR Falha ao revisar PR #45: Rate limit
[2026-03-18T10:00:15Z] INFO  Workflow finalizado
```
