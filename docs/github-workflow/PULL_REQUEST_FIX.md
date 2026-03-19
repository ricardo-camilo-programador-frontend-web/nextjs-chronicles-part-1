# Guia de Correcoes de PR

Este documento define o processo para corrigir problemas identificados em pull requests.

## Regras de Execucao

1. Cada erro deve ser corrigido **individualmente e em ordem**
2. Para cada erro corrigido, criar um **commit separado**
3. **Nao agrupar** multiplas correcoes no mesmo commit
4. Se uma correcao depende de outra, resolver a dependencia primeiro

## Fluxo de Correcao

### 1. Validacao Pre-Correcao

Apos cada correcao, valide se:
- [ ] O codigo continua compilando
- [ ] Nao foram introduzidos novos erros
- [ ] O comportamento esperado foi preservado
- [ ] Lint passa sem erros
- [ ] Type-check passa sem erros

### 2. Aplicacao da Correcao

Para cada erro encontrado:

1. **Identifique o erro** - Leia e entenda o problema
2. **Aplique a correcao** - Faca a mudanca minima necessaria
3. **Valide localmente** - Rode lint e type-check
4. **Gere o commit** - Use o padrao definido

### 3. Formato de Registro

```
Correcao aplicada:
<explicacao breve da correcao>

Commit gerado:
<mensagem seguindo COMMIT-PATTERN.md>
```

## Padrão de Commit

Cada commit deve seguir estritamente o padrao em `COMMIT-PATTERN.md`.

### Estrutura

```
:emoji: tipo(BRANCH_REF): descricao do commit
```

### Exemplos de Correcao

```bash
# Bug fix
:bug: fix(CSR_WEB_RC_330): corrigir validacao de formulario

# Refactor
:recycle: refactor(CSR_WEB_RC_330): extrair logica duplicada para funcao

# Type fix
:label: fix(CSR_WEB_RC_330): adicionar tipo especifico para retorno

# Performance
:zap: perf(CSR_WEB_RC_330): otimizar loop com Map lookup

# Security
:lock: security(CSR_WEB_RC_330): sanitizar input de usuario
```

## Exemplos Praticos

### Exemplo 1: Variavel Nao Utilizada

**Problema:**
```markdown
- [ ] Problema: variavel declarada mas nunca utilizada

Arquivo: src/components/UserList.vue
Linha: 42

Sugestao:
Remover a variavel `userCache`, pois ela nao e utilizada no fluxo atual.
```

**Correcao:**

```typescript
// ANTES
const userCache = new Map()  // linha 42
const users = await fetchUsers()

// DEPOIS
const users = await fetchUsers()
```

**Registro:**
```
Correcao aplicada:
Removida variavel userCache nao utilizada no componente UserList.vue

Commit gerado:
:fire: refactor(CSR_WEB_RC_330): remover variavel nao utilizada em UserList
```

---

### Exemplo 2: Tipo Any

**Problema:**
```markdown
- [ ] Problema: uso de `any` perde seguranca de tipos

Arquivo: src/services/api.ts
Linha: 25

Sugestao:
Definir interface especifica para o retorno da API.
```

**Correcao:**

```typescript
// ANTES
export async function getUser(id: number): Promise<any> {
  return fetch(`/api/users/${id}`)
}

// DEPOIS
interface UserResponse {
  id: number
  name: string
  email: string
}

export async function getUser(id: number): Promise<UserResponse> {
  return fetch(`/api/users/${id}`)
}
```

**Registro:**
```
Correcao aplicada:
Adicionada interface UserResponse para tipar retorno da API

Commit gerado:
:label: fix(CSR_WEB_RC_330): adicionar tipo UserResponse em api.ts
```

---

### Exemplo 3: Performance

**Problema:**
```markdown
- [ ] Problema: loop O(n^2) pode causar lentidao

Arquivo: src/stores/associado-store.ts
Linha: 78

Sugestao:
Usar Map para lookup O(1).
```

**Correcao:**

```typescript
// ANTES
for (const item of items) {
  const found = otherArray.find(x => x.id === item.id)  // O(n)
  if (found) {
    // ...
  }
}

// DEPOIS
const lookup = new Map(otherArray.map(x => [x.id, x]))  // O(n) uma vez
for (const item of items) {
  const found = lookup.get(item.id)  // O(1)
  if (found) {
    // ...
  }
}
```

**Registro:**
```
Correcao aplicada:
Otimizado loop usando Map para lookup O(1) em vez de array.find O(n)

Commit gerado:
:zap: perf(CSR_WEB_RC_330): otimizar lookup em associado-store
```

---

### Exemplo 4: Seguranca

**Problema:**
```markdown
- [ ] Problema: vulnerabilidade de XSS

Arquivo: src/components/RichText.vue
Linha: 15

Sugestao:
Sanitizar HTML antes de renderizar.
```

**Correcao:**

```vue
<!-- ANTES -->
<template>
  <div v-html="userContent"></div>
</template>

<!-- DEPOIS -->
<template>
  <div v-html="sanitize(userContent)"></div>
</template>

<script setup lang="ts">
import { sanitize } from '@/utils/sanitize'

const props = defineProps<{
  userContent: string
}>()
</script>
```

**Registro:**
```
Correcao aplicada:
Adicionada sanitizacao de HTML para previnir XSS

Commit gerado:
:lock: security(CSR_WEB_RC_330): sanitizar HTML em RichText.vue
```

## Diretrizes de Qualidade

Durante as correcoes:

### Codigo Limpo

- Mantenha Clean Code
- Funcoes pequenas e focadas
- Nomes descritivos
- Evite comentarios obvios

### TypeScript

- Preserve tipagem
- Evite `any`
- Use tipos especificos
- Aproveite inferencia

### Manutenibilidade

- Remova imports nao utilizados
- Evite duplicacao
- Priorize clareza
- Faca codigo dev-friendly

### Padroes

- Respeite padroes do projeto
- Siga estilo existente
- Mantenha consistencia
- Consulte arquivos similares

## Workflow Completo

```
1. Receber lista de problemas
         │
         ▼
2. Para cada problema:
   ├── Ler e entender
   ├── Aplicar correcao minima
   ├── Validar localmente
   │   ├── pnpm lint
   │   ├── pnpm type-check
   │   └── pnpm test (se aplicavel)
   ├── Commit individual
   └── Push
         │
         ▼
3. Apos todas correcoes:
   ├── Verificar CI
   ├── Solicitar re-review
   └── Aguardar aprovacao
```

## Comandos Uteis

```bash
# Verificar lint
pnpm lint

# Verificar tipos
pnpm type-check

# Rodar testes
pnpm test

# Commit (usando template)
git add .
git commit -m ":bug: fix(BRANCH_REF): descricao"

# Push
git push origin nome-da-branch

# Verificar status
git status

# Ver diff
git diff
```

## Checklist Final

Antes de considerar correcoes completas:

- [ ] Todos os problemas foram enderecados
- [ ] Lint passa sem erros
- [ ] Type-check passa sem erros
- [ ] Testes passam
- [ ] Commits seguem padrao
- [ ] CI passa
- [ ] PR atualizada
