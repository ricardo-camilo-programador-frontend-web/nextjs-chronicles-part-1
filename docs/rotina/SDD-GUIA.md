# SDD-GUIA - Spec-Driven Development para Breath Natural

## Conceito Central

**Specs sao a fonte da verdade.** O codigo e gerado a partir de specs. Cada issue e uma spec viva que descreve o que deve ser implementado, como e por que.

---

## 6 Fases do SDD

### 1. Constituicao
- **O que e:** Lei suprema do projeto (CONSTITUICAO.md)
- **Responsavel:** CEO Bloodfallen (ou responsavel tecnico)
- **Saida:** Constituicao aprovada e publicada
- **Arquivo:** `docs/rotina/CONSTITUICAO.md`

### 2. Especificacao
- **O que e:** Criar a spec detalhada como issue no GitHub
- **Responsavel:** Spec-Writer (Metis)
- **Saida:** Issue com descricao detalhada usando ISSUE_TEMPLATE.md
- **Arquivo:** `docs/rotina/ISSUE_TEMPLATE.md`

### 3. Plano Tecnico
- **O que e:** Decompor a spec em tasks tecnicas atomicas
- **Responsavel:** Tech-Planner (Hephaestus)
- **Saida:** Lista de tasks com arquivos afetados e responsaveis

### 4. Decomposicao em Tasks
- **O que e:** Criar subtasks ou checklist na issue
- **Responsavel:** Task-Coordinator
- **Saida:** Tasks individuais e rastreaveis

### 5. Implementacao
- **O que e:** Codigo seguindo a spec exatamente
- **Responsavel:** Code-Builder (Prometheus)
- **Saida:** PR vinculado a issue com todas as tasks marcadas

### 6. Quality Gate
- **O que e:** Validar spec vs codigo
- **Responsavel:** Quality-Gate (Momus)
- **Saida:** Aprovacao ou bloqueio do PR
- **Arquivo:** `docs/rotina/SPEC-CODE-ALIGNMENT.md`

---

## Quando Usar SDD Completo vs Fluxo Direto

### SDD Completo (todas as 6 fases)
- Features novas
- Refactors que afetam 3+ arquivos
- Mudancas arquiteturais
- Integracao com APIs externas
- Implementacao de i18n, auth

### Fluxo Direto (implementacao sem spec detalhada)
- Typos e correcoes ortograficas
- Hotfixes criticos
- Atualizacao de dependencias sem breaking changes
- Pequenos ajustes de estilo (1 arquivo)

**Regra pratica:** Se afeta >3 arquivos OU >1 modulo = SDD completo.

---

## Ciclo de Vida das Specs

1. **Nasce** como issue no GitHub
2. **E refinada** com analise tecnica e feedback
3. **E implementada** como PR vinculado
4. **E consumida** quando merge e feito
5. **Pode ser atualizada** se divergencias sao encontradas

---

## Referencia Rapida

| Documento                        | Funcao                                    |
| -------------------------------- | ----------------------------------------- |
| `CONSTITUICAO.md`                | Lei do projeto                            |
| `ISSUE_TEMPLATE.md`              | Template de specs                         |
| `COMMIT-PATTERN.md`              | Padrao de commits                         |
| `PULL_REQUEST_TEMPLATE.md`       | Template de PRs                           |
| `PULL_REQUEST_REVIEW.md`         | Guia de code review                       |
| `PULL_REQUEST_FIX.md`            | Correcao sequencial de erros              |
| `SPEC-CODE-ALIGNMENT.md`         | Auditoria spec vs codigo                  |
| `VERSIONAMENTO.md`               | Regras de versionamento                   |
| `SEGURANCA-CODIGO.md`            | Protecao contra caracteres Unicode        |
| `RETROSPECTIVA.md`               | Loop de feedback                          |
| `GERENCIADOR.MD`                 | Workflow de automatizacao                 |
| `WORKFLOW-EXECUTION-PROMPT.md`   | Prompt de execucao                        |
| `ISSUE_TO_PR_WORKFLOW.md`        | Fluxo issue -> PR                         |

---

## Resumo Visual do Ciclo

```
Issue (Spec) → Plano → Tasks → Implementacao → PR → Quality Gate → Merge
     ↑                                                              |
     └────────────── Retrospectiva ←────────────────────────────────┘
```

---

_Este guia entra em vigor a partir da data de criacao._
