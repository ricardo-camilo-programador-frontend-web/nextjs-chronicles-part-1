# Orquestração SDD - Guia Genérico de Agentes

> **Este documento é genérico e aplicável a qualquer projeto** que utilize Spec-Driven Development com agentes de IA.
> Adapte os nomes de tecnologias e ferramentas conforme o stack do seu projeto.

---

## Visão Geral

O Spec-Driven Development (SDD) divide o ciclo de desenvolvimento em **6 fases distintas**, cada uma com agentes responsáveis pela execução, e **agentes transversais** que atuam em múltiplas fases.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FLUXO SDD COM AGENTES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CONSTITUIÇÃO ──► SPEC ──► PLANO ──► TASKS ──► IMPLEMENTAÇÃO ──► QUALITY    │
│       │            │          │         │            │              │       │
│       ▼            ▼          ▼         ▼            ▼              ▼       │
│   Workflow     Spec-     Tech-     Task-      Code-       Quality-          │
│   Manager      Writer    Planner   Coordinator Builder     Gate             │
│   Architect              Architect            Senior-Coder Spec-Auditor     │
│   Security               Explore              Parallel-Worker Code-Reviewer │
│                          Librarian            Quick-Fixer    Test-Agent     │
│                          Security             Test-Writer                    │
│                                                                             │
│  ◄──────────────────── FEEDBACK LOOP ─────────────────────►                 │
│                        Retrospective-Analyst                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Agentes do Ecossistema SDD

### Agentes Primários (por fase)

| Agente | Fase | Responsabilidade | Modelo Sugerido |
|--------|------|------------------|-----------------|
| **Workflow-Manager** | Orquestração | Gerenciar ciclo completo de workflow, estado, e sincronização | Modelo de alta capacidade |
| **Spec-Writer** | Fase 2 - Spec | Criar e atualizar especificações completas | Modelo de alta capacidade |
| **Tech-Planner** | Fase 3 - Plano | Decompor specs em planos técnicos | Modelo de alta capacidade |
| **Task-Coordinator** | Fase 4 - Tasks | Converter planos em checklists executáveis | Modelo de alta capacidade |
| **Code-Builder** | Fase 5 - Implementação | Implementar código production-ready | Modelo de codificação |
| **Quality-Gate** | Fase 6 - Quality Gate | Validar spec ↔ código e conformidade | Modelo de alta capacidade |

### Agentes Transversais

| Agente | Atua Em | Responsabilidade | Modelo Sugerido |
|--------|---------|------------------|-----------------|
| **Architect** | Todas as fases | Governança arquitetural, validação de design | Modelo de alta capacidade |
| **Security-Scanner** | Todas as fases | Scan de segurança, caracteres invisíveis | Modelo de codificação |
| **Spec-Auditor** | Fase 6 | Auditoria detalhada spec ↔ código | Modelo de alta capacidade |
| **Retrospective-Analyst** | Feedback Loop | Análise de erros, melhorias contínuas | Modelo de alta capacidade |

### Agentes de Suporte

| Agente | Quando Usar | Responsabilidade |
|--------|-------------|------------------|
| **Code-Reviewer** | Fase 6 | Code review detalhado |
| **Test-Writer** | Fase 5 | Criação de testes automatizados |
| **Quick-Fixer** | Fase 5 | Correções triviais e ajustes simples |
| **Parallel-Worker** | Fase 4-5 | Execução paralela de tarefas independentes |
| **Reasoning-Specialist** | Fase 3 | Análise de dependências complexas |
| **Explore** | Fase 2-5 | Explorar codebase para contexto |

---

## Fluxo de Execução Completo

### Fase 0: Constituição

**Objetivo:** Validar que todas as operações respeitam os princípios inegociáveis do projeto.

| Passo | Agente | Ação |
|-------|--------|------|
| 0.1 | Workflow-Manager | Carregar estado do workflow |
| 0.2 | Workflow-Manager | Ler arquivo de Constituição do projeto |
| 0.3 | Security-Scanner | Executar scan de segurança pré-operacional |
| 0.4 | Architect | Validar princípios arquiteturais |

**Critérios de saída:**
- [ ] Constituição carregada e válida
- [ ] Scan de segurança passou
- [ ] Princípios arquiteturais validados

---

### Fase 1: Especificação (Spec)

**Objetivo:** Criar ou revisar especificações seguindo template do projeto.

| Passo | Agente | Ação |
|-------|--------|------|
| 1.1 | Workflow-Manager | Identificar issues sem descrição adequada |
| 1.2 | Spec-Writer | Analisar contexto do codebase (delegar para Explore) |
| 1.3 | Spec-Writer | Gerar descrição completa seguindo template |
| 1.4 | Spec-Writer | Validar qualidade e completude da spec |
| 1.5 | Spec-Writer | Publicar/atualizar issue |

**Critérios de saída:**
- [ ] Descrição técnica completa
- [ ] Contexto e motivação documentados
- [ ] Critérios de aceite definidos
- [ ] Análise técnica com possíveis causas
- [ ] Arquivos afetados mapeados
- [ ] Labels aplicadas

---

### Fase 2: Plano Técnico

**Objetivo:** Decompor spec em plano técnico com tarefas e sequenciamento.

| Passo | Agente | Ação |
|-------|--------|------|
| 2.1 | Tech-Planner | Analisar spec completa |
| 2.2 | Tech-Planner | Extrair todos os requisitos |
| 2.3 | Architect | Validar viabilidade arquitetural |
| 2.4 | Reasoning-Specialist | Analisar dependências complexas |
| 2.5 | Tech-Planner | Gerar plano técnico decomposto |
| 2.6 | Tech-Planner | Documentar plano na spec |

**Critérios de saída:**
- [ ] Plano técnico detalhado
- [ ] Tarefas decompostas em unidades atômicas
- [ ] Dependências identificadas
- [ ] Sequenciamento lógico definido
- [ ] Riscos mapeados
- [ ] Estimativa de esforço relativa

---

### Fase 3: Decomposição em Tasks

**Objetivo:** Converter plano técnico em checklist de tarefas executáveis.

| Passo | Agente | Ação |
|-------|--------|------|
| 3.1 | Task-Coordinator | Receber plano técnico |
| 3.2 | Task-Coordinator | Converter em checklist atômico |
| 3.3 | Parallel-Worker | Identificar tarefas paralelizáveis |
| 3.4 | Task-Coordinator | Mapear dependências entre tarefas |
| 3.5 | Task-Coordinator | Definir ordem de execução |

**Critérios de saída:**
- [ ] Checklist de tarefas criado
- [ ] Cada tarefa é atômica e executável
- [ ] Tarefas paralelizáveis identificadas
- [ ] Dependências mapeadas
- [ ] Ordem de execução definida

---

### Fase 4: Implementação

**Objetivo:** Executar tarefas e produzir código seguindo padrões.

| Passo | Agente | Ação |
|-------|--------|------|
| 4.1 | Code-Builder | Iniciar implementação por tarefa |
| 4.2 | Explore | Consultar padrões existentes |
| 4.3 | Parallel-Worker | Executar tarefas independentes em paralelo |
| 4.4 | Senior-Coder | Assumir tarefas complexas |
| 4.5 | Quick-Fixer | Aplicar correções triviais |
| 4.6 | Test-Writer | Criar testes |
| 4.7 | Security-Scanner | Validar segurança do código |
| 4.8 | Code-Builder | Validar: lint, type-check, testes |

**Critérios de saída:**
- [ ] Código implementado seguindo padrões
- [ ] TypeScript strict sem erros
- [ ] Lint aprovado
- [ ] Testes criados/executados
- [ ] Commits seguindo convenção
- [ ] Scan de segurança passou

---

### Fase 5: Quality Gate

**Objetivo:** Validar implementação contra spec e constituição.

| Passo | Agente | Ação |
|-------|--------|------|
| 5.1 | Quality-Gate | Iniciar validação |
| 5.2 | Code-Reviewer | Executar code review |
| 5.3 | Spec-Auditor | Executar auditoria spec ↔ código |
| 5.4 | Spec-Auditor | Calcular score de alinhamento |
| 5.5 | Test-Agent | Executar suite de testes |
| 5.6 | Quality-Gate | Comparar spec com implementação |
| 5.7 | Quality-Gate | Decisão: APROVAR | SOLICITAR_MUDANÇAS | BLOQUEAR |

**Critérios de saída:**
- [ ] Spec vs Código: consistência validada
- [ ] Todos os objetivos da spec implementados
- [ ] Nenhum princípio da constituição violado
- [ ] Code review completa
- [ ] Testes passando
- [ ] Score de alinhamento >= 90%

---

### Fase 6: Feedback Loop (Retrospectiva)

**Objetivo:** Fechar loop de feedback com melhorias contínuas.

| Passo | Agente | Ação |
|-------|--------|------|
| 6.1 | Retrospective-Analyst | Verificar triggers de retrospectiva |
| 6.2 | Retrospective-Analyst | Analisar erros recorrentes |
| 6.3 | Retrospective-Analyst | Identificar patterns e causas raiz |
| 6.4 | Retrospective-Analyst | Propor ações de melhoria |
| 6.5 | Quality-Gate | Validar propostas |
| 6.6 | Workflow-Manager | Aprovar/rejeitar ações |
| 6.7 | Senior-Coder | Implementar aprovados |
| 6.8 | Retrospective-Analyst | Registrar lessons learned |

**Critérios de saída:**
- [ ] Erros recorrentes analisados
- [ ] Ações de melhoria propostas
- [ ] Ações aprovadas implementadas
- [ ] Lessons learned registradas
- [ ] Próxima retrospectiva agendada

---

## Matriz de Responsabilidades

| Agente | Const. | Spec | Plano | Tasks | Impl. | Quality | Retro. |
|--------|:------:|:----:|:-----:|:-----:|:-----:|:-------:|:------:|
| Workflow-Manager | **PRIM** | - | - | - | - | - | - |
| Spec-Writer | - | **PRIM** | - | - | - | - | - |
| Tech-Planner | - | - | **PRIM** | SUP | - | - | - |
| Task-Coordinator | - | - | SUP | **PRIM** | - | - | - |
| Code-Builder | - | - | - | - | **PRIM** | - | - |
| Quality-Gate | - | - | - | - | - | **PRIM** | - |
| Spec-Auditor | - | - | - | - | SUP | **PRIM** | - |
| Retrospective-Analyst | - | - | - | - | - | - | **PRIM** |
| Architect | SUP | SUP | SUP | - | SUP | SUP | - |
| Security-Scanner | SUP | SUP | SUP | SUP | SUP | SUP | SUP |
| Code-Reviewer | - | - | - | - | SUP | SUP | - |
| Test-Writer | - | - | - | - | SUP | SUP | - |
| Quick-Fixer | - | - | - | - | SUP | SUP | - |
| Parallel-Worker | - | - | - | SUP | SUP | - | - |
| Reasoning-Specialist | - | - | SUP | - | - | - | - |
| Explore | - | SUP | - | - | SUP | - | - |

**Legenda:** PRIM = Primário | SUP = Suporte

---

## Regras de Orquestração

### Prioridade de Agentes

1. **Workflow-Manager**: Sempre inicia e coordena o fluxo
2. **Agentes Primários**: Executam a tarefa principal da fase
3. **Agentes de Suporte**: Executam em paralelo quando possível
4. **Security-Scanner**: Sempre disponível para validação pré-operacional

### Paralelismo

| Fase | Paralelo? | Agentes |
|------|-----------|---------|
| **Spec** | Sim | Spec-Writer + Explore (investiga codebase) |
| **Plano** | Sim | Tech-Planner + Architect (valida) + Reasoning-Specialist (análise) |
| **Tasks** | Sim | Task-Coordinator + Parallel-Worker (identifica paralelas) |
| **Implementação** | Sim | Code-Builder + Parallel-Worker + Senior-Coder + Quick-Fixer |
| **Quality Gate** | Sequencial | Quality-Gate → Code-Reviewer → Spec-Auditor |

### Tratamento de Conflitos

```
SE conflito entre agentes:
  1. Analisar evidências de ambos os lados
  2. Consultar Constituição do projeto
  3. Tomar decisão baseada em princípios
  4. Documentar decisão para referência futura
```

### Fallback

```
SE agente primário indisponivel:
  1. Tentar agente de suporte equivalente
  2. Se não houver, escalar para Workflow-Manager
  3. Documentar motivo da substituição
```

---

## Como Adaptar Para Qualquer Projeto

### 1. Defina a Constituição

Crie um arquivo `CONSTITUTION.md` na raiz do projeto com:

```markdown
# Constituição do Projeto

## Stack Tecnológica
| Camada | Tecnologia | Detalhe |
|--------|------------|---------|
| {camada} | {tecnologia} | {detalhe} |

## Padrões de Código
- {regra 1}
- {regra 2}

## Arquitetura
{Estrutura de diretórios fixa}

## Princípios
- {princípio 1}
- {princípio 2}
```

### 2. Defina o Template de Spec

Crie um arquivo `ISSUE_TEMPLATE.md` com:
- Referência e contexto
- Problema atual
- Objetivos
- Análise técnica
- Arquivos afetados
- Implementação sugerida
- Testes

### 3. Configure os Agentes

Para cada agente listado neste documento:
1. Crie um arquivo `.md` em seu diretório de agentes
2. Adapte as referências de tecnologias para o stack do projeto
3. Configure o modelo de IA apropriado

### 4. Defina Convenções de Commit

Exemplo com gitmoji:
```
:emoji: tipo(BRANCH_REF): descrição
```

### 5. Configure o Workflow State

Crie um schema de estado para manter contexto entre execuções:
- Issues processadas
- PRs revisados
- Mensagens processadas
- Erros recentes

---

## Modelos Sugeridos por Tipo de Tarefa

| Tipo de Tarefa | Modelo Sugerido | Justificativa |
|----------------|-----------------|---------------|
| Análise complexa | Modelo de alta capacidade | Requer raciocínio profundo |
| Implementação | Modelo de codificação | Otimizado para código |
| Execução rápida | Modelo rápido/trubo | Tarefas simples e paralelas |
| Correções triviais | Modelo leve | Typo, imports, formatação |
| Consultoria | Modelo de alta capacidade | Análise read-only |
| Scan de segurança | Modelo de codificação | Detecção de patterns |

---

## Referências

| Documento | Descrição |
|-----------|-----------|
| `CONSTITUTION.md` | Princípios inegociáveis do projeto |
| `ISSUE_TEMPLATE.md` | Template para specs (issues) |
| `SDD-GUIDE.md` | Guia completo do Spec-Driven Development |
| `SPEC-CODE-ALIGNMENT.md` | Processo de auditoria spec/código |
| `RETROSPECTIVE.md` | Template de retrospectiva |
| `SECURITY-POLICY.md` | Política de segurança de código |
| `COMMIT-PATTERN.md` | Padrão de commits |
| `VERSIONING.md` | Regras de versionamento (SemVer) |

---

## Histórico de Versões

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0.0 | 2026-04-05 | Versão inicial genérica |

---

**Nota:** Este documento é genérico e deve ser adaptado para cada projeto. Consulte sempre a Constituição do projeto específico como fonte da verdade para princípios e padrões.
