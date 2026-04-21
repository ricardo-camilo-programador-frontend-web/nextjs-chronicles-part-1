# GERENCIADOR.MD - Workflow de Gerenciamento do Projeto

## Visao Geral

Este documento descreve o workflow principal de gerenciamento automatizado do projeto Breath Natural.

---

## Sequencia de Execucao

```
Inicializacao → GitHub (issues, labels, PRs, tags) → Quality Gate SDD → Discord → Finalizacao
```

---

## Passo 1: GitHub

### 1.1 Analisar Issues
- Identificar issues sem descricao detalhada
- Identificar issues sem labels
- Identificar issues sem PR vinculado
- Sugerir labels conforme ISSUE_TEMPLATE.md

### 1.2 Analisar PRs
- Identificar PRs sem revisao
- Identificar PRs sem issue vinculada
- Identificar PRs com conflitos de merge
- Verificar se PRs seguem PULL_REQUEST_TEMPLATE.md

### 1.3 Tags e Versionamento
- Verificar tags existentes
- Sugerar nova tag conforme VERSIONAMENTO.md
- Analisar commits desde ultima tag para determinar tipo (MAJOR/MINOR/PATCH)

### 1.4 Quality Gate SDD
- Verificar consistencia entre spec (issue) e codigo (PR diff)
- Auditoria conforme SPEC-CODE-ALIGNMENT.md
- Checklist de validacao:
  - [ ] Spec descreve X e codigo implementa X
  - [ ] Criterios de aceitacao atendidos
  - [ ] CONSTITUICAO.md respeitada
  - [ ] Padroes de codigo seguidos

---

## Passo 2: Discord (se aplicavel)

- Filtrar mensagens nao processadas
- Criar issues a partir de reportes
- Notificar equipe sobre mudancas importantes
- Marcar mensagens como processadas

---

## Estado Persistente

Estado do workflow salvo em `dist/workflow/state.json` (coberto pelo `.gitignore`).

Schema completo: `workflow-state-schema.ts`
Documentacao: `workflow-state.md`

---

## Tratamento de Erros

1. Registrar erro em `recentErrors`
2. Continuar execucao se possivel
3. Salvar estado parcial
4. Notificar sobre erros nao recuperaveis

---

## Validacao de Seguranca

Todas as operacoes devem:
1. Verificar caracteres Unicode invisiveis
2. Validar inputs antes de processar
3. Registrar acoes em log

---

_Este workflow entra em vigor a partir da data de criacao._
