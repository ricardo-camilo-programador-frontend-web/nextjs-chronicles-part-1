# Padrao de Labels GitHub

Este documento define o sistema de labels utilizado no projeto para categorizar issues e pull requests.

## Estrutura de Labels

As labels seguem o formato: `categoria:valor` ou `tipo-simples`

## Labels por Categoria

### Tipo de Issue

| Label | Cor | Descricao | Uso |
|-------|-----|-----------|-----|
| `bug` | `#d73a4a` | Algo nao esta funcionando | Problemas em producao ou desenvolvimento |
| `feature` | `#a2eeef` | Nova funcionalidade | Novas features solicitadas |
| `improvement` | `#84b6eb` | Melhoria de algo existente | Refinamentos e otimizacoes |
| `documentation` | `#0075ca` | Melhorias ou adicoes na documentacao | Docs, README, comentarios |
| `refactor` | `#1d76db` | Refatoracao de codigo | Melhorias tecnicas sem mudanca de comportamento |
| `tech-debt` | `#fbca04` | Debito tecnico | Codigo que precisa ser melhorado |

### Prioridade

| Label | Cor | Descricao | Uso |
|-------|-----|-----------|-----|
| `priority:critical` | `#b60205` | Critico - bloqueia producao | Hotfixes urgentes |
| `priority:high` | `#d93f0b` | Alta prioridade | Deve ser resolvido em breve |
| `priority:medium` | `#fbca04` | Prioridade media | Proximas sprints |
| `priority:low` | `#0e8a16` | Baixa prioridade | Backlog |

### Status

| Label | Cor | Descricao | Uso |
|-------|-----|-----------|-----|
| `status:blocked` | `#000000` | Bloqueado por dependencia externa | Aguardando algo |
| `status:in-progress` | `#5319e7` | Em desenvolvimento | Sendo trabalhado |
| `status:review` | `#fbca04` | Aguardando revisao | PR aberto |
| `status:needs-info` | `#cfd3d7` | Necessita mais informacoes | Aguardando clarificacao |
| `stale` | `#eeeeee` | Sem atividade recente | Issues antigas |

### Escopo

| Label | Cor | Descricao | Uso |
|-------|-----|-----------|-----|
| `scope:frontend` | `#7057ff` | Relacionado ao frontend | Vue, componentes, UI |
| `scope:backend` | `#0052cc` | Relacionado ao backend | API, servicos |
| `scope:database` | `#1d76db` | Relacionado ao banco de dados | Queries, models |
| `scope:infrastructure` | `#5319e7` | Infraestrutura e DevOps | CI/CD, deploy |
| `scope:testing` | `#bfd4f2` | Testes | Unit, integration, e2e |
| `scope:security` | `#d4c5f9` | Seguranca | Vulnerabilidades, auth |

### Esforco

| Label | Cor | Descricao | Uso |
|-------|-----|-----------|-----|
| `effort:xs` | `#c2e0c6` | Muito pequeno (< 1h) | Typos, pequenos fixes |
| `effort:s` | `#0e8a16` | Pequeno (1-4h) | Pequenas tarefas |
| `effort:m` | `#fbca04` | Medio (4-8h) | Features simples |
| `effort:l` | `#d93f0b` | Grande (1-3 dias) | Features complexas |
| `effort:xl` | `#b60205` | Muito grande (> 3 dias) | Epicos, grandes refactors |

### Qualidade

| Label | Cor | Descricao | Uso |
|-------|-----|-----------|-----|
| `quality:needs-tests` | `#bfdadc` | Necessita testes | Codigo sem cobertura |
| `quality:needs-docs` | `#c5def5` | Necessita documentacao | Falta documentacao |
| `quality:needs-review` | `#d4c5f9` | Necessita code review | Aguardando revisao |

### Tipo de PR

| Label | Cor | Descricao | Uso |
|-------|-----|-----------|-----|
| `pr:wip` | `#fbca04` | Work in Progress | PR em desenvolvimento |
| `pr:ready` | `#0e8a16` | Pronto para merge | Aprovado e testado |
| `pr:breaking-change` | `#b60205` | Breaking change | Mudancas incompativeis |

## Regras de Aplicacao

### Issue Obrigatorias

Toda issue DEVE ter:
1. **Uma label de tipo**: `bug`, `feature`, `improvement`, `documentation`, `refactor`, ou `tech-debt`
2. **Uma label de prioridade**: `priority:critical`, `priority:high`, `priority:medium`, ou `priority:low`

### Issue Opcionais

Podem ter (quando aplicavel):
- Labels de escopo
- Labels de esforco
- Labels de status

### PR Obrigatorias

Todo PR DEVE ter:
1. **Uma label de tipo**: `bug`, `feature`, `improvement`, `documentation`, ou `refactor`
2. **Uma label de status PR**: `pr:wip` ou `pr:ready`

## Comandos GitHub CLI

```bash
# Criar labels padrao
gh label create "bug" --color "d73a4a" --description "Algo nao esta funcionando"
gh label create "feature" --color "a2eeef" --description "Nova funcionalidade"
gh label create "improvement" --color "84b6eb" --description "Melhoria de algo existente"
gh label create "tech-debt" --color "fbca04" --description "Debito tecnico"

# Adicionar label a issue
gh issue edit <number> --add-label "bug,priority:high"

# Remover label
gh issue edit <number> --remove-label "status:blocked"

# Listar issues por label
gh issue list --label "bug,priority:high"

# Filtrar PRs por label
gh pr list --label "pr:ready"
```

## Automacao

### Regras de Auto-Labeling

Issues criadas com palavras-chave recebem labels automaticamente:

| Palavras-chave | Label Automatica |
|----------------|------------------|
| bug, erro, falha, problema | `bug` |
| feature, nova, adicionar, criar | `feature` |
| melhorar, otimizar, refatorar | `improvement` |
| documento, readme, docs | `documentation` |
| urgente, critico, hotfix | `priority:critical` |

### Acoes Automaticas

| Evento | Acao |
|--------|------|
| Issue criada sem label | Adicionar comentario solicitando labels |
| Issue sem atividade por 30 dias | Adicionar label `stale` |
| PR aprovado | Trocar `pr:wip` por `pr:ready` |
| PR com conflitos | Adicionar comentario |

## Workflow de Labels

```
Nova Issue
    │
    ▼
[Sem labels?] ──Sim──> Comentar solicitando labels
    │
   Nao
    │
    ▼
[Tem tipo?] ──Nao──> Adicionar label tipo baseada em conteudo
    │
   Sim
    │
    ▼
[Tem prioridade?] ──Nao──> Atribuir priority:medium
    │
   Sim
    │
    ▼
Issue pronta para triagem
```
