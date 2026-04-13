# SPEC-CODE-ALIGNMENT - Auditoria de Alinhamento Spec vs Codigo

## Objetivo

Garantir que o codigo implementado no PR corresponde exatamente ao especificado na issue.

---

## 5 Passos de Auditoria

### 1. Extrair Requisitos da Spec
Ler a issue e listar todos os requisitos:
```markdown
- [ ] R1: [Descricao do requisito 1]
- [ ] R2: [Descricao do requisito 2]
- [ ] R3: [Descricao do requisito 3]
```

### 2. Mapear para Arquivos
Para cada requisito, identificar quais arquivos deveriam ser modificados:
```
R1 → src/components/X.tsx
R2 → src/styles/globals.css, src/components/Y.tsx
R3 → src/hooks/useZ.ts
```

### 3. Verificar Cobertura
Comparar arquivos modificados no PR com o mapeamento:
```
✅ R1: src/components/X.tsx modificado
✅ R2: globals.css e Y.tsx modificados
❌ R3: useZ.ts NAO modificado
```

### 4. Detectar Divergencia
Identificar modificacoes que nao correspondem a nenhum requisito:
```
⚠️  Arquivo nao especificado: src/components/W.tsx
    Justificativa necessaria
```

### 5. Gerar Relatorio
Calcular score e classificar:

---

## Criterios de Alinhamento

| Status | Score | Acao |
| ------ | ----- | ---- |
| ✅ ALINHADO | 90-100% | Prosseguir com merge |
| ⚠️ DIVERGENTE_PARCIAL | 70-89% | Atualizar spec ou codigo |
| 🚨 DIVERGENTE_CRITICO | <70% | Bloquear PR |

### Formula

```
score = (coberturaRequisitos + coberturaCodigo) / 2 * 100

coberturaRequisitos = (requisitosAtendidos / totalRequisitos) * 100
coberturaCodigo = (arquivosEspecificadosModificados / arquivosEspecificadosTotal) * 100
```

---

## Template de Relatorio

```markdown
## Relatorio de Auditoria Spec-Codigo

**Issue:** #[numero]
**PR:** #[numero]
**Auditor:** [nome]

### Score: 85% - ⚠️ DIVERGENTE_PARCIAL

### Requisitos da Spec
- [x] R1: [Descricao] → ✅ Implementado
- [x] R2: [Descricao] → ✅ Implementado
- [ ] R3: [Descricao] → ❌ Nao implementado
- [x] R4: [Descricao] → ✅ Implementado

### Arquivos Modificados (nao especificados)
- ⚠️ `src/components/Extra.tsx` - Nao mencionado na spec

### Arquivos Nao Modificados (esperados)
- ❌ `src/hooks/useMissing.ts` - Esperado mas nao modificado

### Acao Requerida
- [ ] Implementar R3 ou remover da spec
- [ ] Justificar adicao de Extra.tsx ou remover
```

---

## Integracao com Quality Gate

O SPEC-CODE-ALIGNMENT e parte do **Quality Gate** (Fase 6 do SDD).

### Fluxo

```
PR Criado
    ↓
Extrair Requisitos da Issue
    ↓
Mapear Arquivos
    ↓
Verificar PR Diff
    ↓
Calcular Score
    ↓
┌─────────────┬──────────────┬──────────────┐
│  >= 90%     │  70-89%      │   < 70%      │
│  Aprovado   │  Revisar     │  Bloqueado   │
└─────────────┴──────────────┴──────────────┘
```

---

_Este processo entra em vigor a partir da data de criacao._
