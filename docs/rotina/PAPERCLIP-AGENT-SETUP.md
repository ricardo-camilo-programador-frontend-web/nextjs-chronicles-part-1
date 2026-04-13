# Guia de Registro de Agentes SDD no Paperclip

Este documento contem todas as configuracoes necessarias para registrar os 9 novos agentes SDD no Paperclip, com **otimizacao de concorrencia** baseada nos limites de modelos do provider Z.ai Coding plan.

> **Como adicionar cada agente:**
> 1. Acesse `http://localhost:3100/TRU/agents/new`
> 2. Clique em "I want advanced configuration myself"
> 3. Preencha os campos conforme tabela abaixo
> 4. Clique em "Create agent"

---

## Otimizacao de Concorrencia

Distribuicao de modelos baseada nos limites de concorrencia do provider `zai-coding-plan`:

| Modelo | Concorrencia | Agentes | Total Slots |
|--------|:------------:|---------|:-----------:|
| **GLM-4.5** | 10 | Workflow-Manager, Architect | 20 |
| **GLM-4.6V** | 10 | Spec-Writer | 10 |
| **GLM-4.5-air** | 5 | Task-Coordinator | 5 |
| **GLM-4.7-FlashX** | 3 | Code-Builder | 3 |
| **GLM-4.6** | 3 | Quality-Gate | 3 |
| **GLM-5** | 2 | Tech-Planner | 2 |
| **GLM-4.5-flash** | 2 | Spec-Auditor | 2 |
| **GLM-4.7** | 2 | Retrospective-Analyst | 2 |
| **GLM-4.7-Flash** | 1 | Security-Scanner | 1 |
| **TOTAL** | | **10 agentes** | **48 slots** |

### Estrategia de Paralelismo

**Fase de Orquestracao** (GLM-4.5, 20 slots):
- Workflow-Manager pode rodar continuamente enquanto outros agentes operam
- Architect valida em paralelo em todas as fases

**Fase de Spec** (GLM-4.6V, 10 slots):
- Spec-Writer processa multiplas issues/discord simultaneamente

**Fase de Planning** (GLM-5 + GLM-4.5-air, 7 slots):
- Tech-Planner decompoe specs enquanto Task-Coordinator coordena tasks anteriores

**Fase de Implementacao** (GLM-4.7-FlashX, 3 slots):
- Code-Builder executa 3 tarefas de codigo em paralelo

**Fase de Quality** (GLM-4.6 + GLM-4.5-flash, 5 slots):
- Quality-Gate valida enquanto Spec-Auditor audita PRs anteriores

**Fase de Retrospectiva** (GLM-4.7, 2 slots):
- Execucao esporadica, baixa concorrencia necessaria

**Seguranca** (GLM-4.7-Flash, 1 slot):
- Scans rapidos, single-use e suficiente

---

## Configuracao Base (igual para todos)

| Campo | Valor |
|-------|-------|
| **Adapter type** | OpenCode (local) |
| **Command** | `opencode` |
| **Model** | (ver tabela de cada agente abaixo) |
| **Thinking effort** | Auto |
| **Enable Chrome** | Sim |
| **Skip permissions** | Nao |
| **Max turns per run** | 1000 |
| **Heartbeat on interval** | Desativado (exceto Workflow-Manager) |

---

## 1. Spec-Writer

| Campo | Valor |
|-------|-------|
| **Agent name** | `Spec-Writer` |
| **Title** | `SDD Spec Author` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-4.6v` |
| **Agent instructions file** | `~/.config/opencode/agents/spec-writer.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Follow SDD methodology for specification phase. Use context variables {{ context.* }} and {{ run.* }} to adapt to current workflow state.` |

---

## 2. Tech-Planner

| Campo | Valor |
|-------|-------|
| **Agent name** | `Tech-Planner` |
| **Title** | `SDD Technical Planner` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-5` |
| **Agent instructions file** | `~/.config/opencode/agents/tech-planner.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Follow SDD methodology for technical planning phase. Use context variables {{ context.* }} and {{ run.* }} to adapt to current workflow state.` |

---

## 3. Task-Coordinator

| Campo | Valor |
|-------|-------|
| **Agent name** | `Task-Coordinator` |
| **Title** | `SDD Task Coordinator` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-4.5-air` |
| **Agent instructions file** | `~/.config/opencode/agents/task-coordinator.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Follow SDD methodology for task decompositions phase. Use context variables {{ context.* }} and {{ run.* }} to adapt to current workflow state.` |

---

## 4. Code-Builder

| Campo | Valor |
|-------|-------|
| **Agent name** | `Code-Builder` |
| **Title** | `SDD Code Builder` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-4.7-flashx` |
| **Agent instructions file** | `~/.config/opencode/agents/code-builder.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Follow SDD methodology for implementation phase. Use context variables {{ context.* }} and {{ run.* }} to adapt to current workflow state.` |

---

## 5. Quality-Gate

| Campo | Valor |
|-------|-------|
| **Agent name** | `Quality-Gate` |
| **Title** | `SDD Quality Gate Lead` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-4.6` |
| **Agent instructions file** | `~/.config/opencode/agents/quality-gate.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Follow SDD methodology for quality gate phase. Use context variables {{ context.* }} and {{ run.* }} to adapt to current workflow state.` |

---

## 6. Workflow-Manager

| Campo | Valor |
|-------|-------|
| **Agent name** | `Workflow-Manager` |
| **Title** | `SDD Workflow Orchestrator` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-4.5` |
| **Agent instructions file** | `~/.config/opencode/agents/workflow-manager.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Execute SDD workflow orchestration routine. Use context variables {{ context.* }} and {{ run.* }} to maintain workflow state across executions.` |
| **Heartbeat on interval** | Sim (a cada 2 horas) |

---

## 7. Spec-Auditor

| Campo | Valor |
|-------|-------|
| **Agent name** | `Spec-Auditor` |
| **Title** | `SDD Spec Auditor` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-4.5-flash` |
| **Agent instructions file** | `~/.config/opencode/agents/spec-auditor.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Execute SPEC-CODE-ALIGNMENT audit process. Use context variables {{ context.* }} and {{ run.* }} to access current PR and spec state.` |

---

## 8. Retrospective-Analyst

| Campo | Valor |
|-------|-------|
| **Agent name** | `Retrospective-Analyst` |
| **Title** | `SDD Retrospective Lead` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-4.7` |
| **Agent instructions file** | `~/.config/opencode/agents/retrospective-analyst.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Execute SDD retrospective process and feedback loop. Use context variables {{ context.* }} and {{ run.* }} to access workflow state and error history.` |

---

## 9. Security-Scanner

| Campo | Valor |
|-------|-------|
| **Agent name** | `Security-Scanner` |
| **Title** | `Code Security Analyst` |
| **Department** | General |
| **Reports to** | CEO Bloodfallen |
| **Model** | `zai-coding-plan/glm-4.7-flash` |
| **Agent instructions file** | `~/.config/opencode/agents/security-scanner.md` |
| **Prompt Template** | `You are agent {{ agent.name }}. Your role is {{ agent.role }}. Execute security scanning for invisible Unicode characters and code safety. Use context variables {{ context.* }} and {{ run.* }} to access files being scanned.` |

---

## Fluxo Rapido de Criacao

Para criar cada agente rapidamente:

1. **Acesse**: `http://localhost:3100/TRU/agents/new`
2. **Clique**: "I want advanced configuration myself"
3. **Preencha**:
   - Agent name: (nome da tabela)
   - Title: (titulo da tabela)
   - Department: General
   - Reports to: CEO Bloodfallen
4. **Selecione**:
   - Adapter type: OpenCode (ou Claude local)
5. **Configure**:
   - Command: `opencode` ou `claude`
   - Agent instructions file: Clique em "Choose" e navegue ate o path indicado
   - Prompt Template: Cole o template da tabela
6. **Mantenha defaults** para:
   - Model: Default
   - Thinking effort: Auto
   - Max turns: 1000
7. **Ative Chrome**: Toggle ON
8. **Clique**: "Create agent"

---

## Verificacao Pos-Criacao

Apos criar cada agente, verifique:

1. Acesse `http://localhost:3100/TRU/agents/all`
2. Confirme que o novo agente aparece na lista
3. Clique no agente -> Instructions
4. Verifique que o conteudo do arquivo `.md` foi carregado corretamente
5. Clique em Skills para confirmar skills instalados

---

## Agentes Existentes (ja registrados)

Estes agentes ja existem no Paperclip e **nao precisam** ser recriados:

| Agente | Status |
|--------|--------|
| CEO Bloodfallen | Existente |
| Architect | Existente (atualizado) |
| Atlas | Existente |
| Code-Reviewer | Existente |
| Explore | Existente |
| Multimodal-Looker | Existente |
| Parallel-Worker | Existente |
| Prometheus | Existente |
| Quick-Fixer | Existente |
| Reasoning-Specialist | Existente |
| Senior-Coder | Existente |
| Test-Writer | Existente |

---

## Total Final

| Tipo | Quantidade |
|------|------------|
| Agentes existentes | 12 |
| Novos agentes | 9 |
| **Total final** | **21 agentes** |

---

## Arquivos de Agentes Criados

Todos os arquivos `.md` estao em:
`~/.config/opencode/agents/`

| Arquivo | Agente Correspondente |
|---------|----------------------|
| `spec-writer.md` | Spec-Writer |
| `tech-planner.md` | Tech-Planner |
| `task-coordinator.md` | Task-Coordinator |
| `code-builder.md` | Code-Builder |
| `quality-gate.md` | Quality-Gate |
| `workflow-manager.md` | Workflow-Manager |
| `spec-auditor.md` | Spec-Auditor |
| `retrospective-analyst.md` | Retrospective-Analyst |
| `security-scanner.md` | Security-Scanner |
| `architect.md` | Architect (atualizado) |

---

**Documento de referencia adicional:**
- `SDD-ORCHESTRATION-GENERIC.md` em `docs/rotina/` - Guia completo de orquestracao SDD
