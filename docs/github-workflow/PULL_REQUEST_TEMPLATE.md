# Template de Pull Request

Este documento define o template padrao para pull requests do projeto.

## Template Completo

```markdown
# 🐛 Fix: Titulo Descritivo da Mudanca

## 📝 Descricao

Uma descricao clara e concisa do que esta PR faz e por que.

## 🎯 Tipo de Mudanca

- [ ] 🐛 Bug fix (correcao de problema que afeta producao)
- [ ] ✨ Feature (nova funcionalidade)
- [ ] ♻️ Refactor (melhoria de codigo sem mudanca de comportamento)
- [ ] 📚 Documentacao
- [ ] 🔧 Chore (tarefas de manutencao)
- [ ] ⚡ Performance
- [ ] 🔒 Security

## 🔗 Issue Relacionada

Fixes #XXX
Refs #YYY

## 📋 Mudancas Realizadas

### Mudanca 1: Titulo da Mudanca

Descricao detalhada da mudanca.

```typescript
// ANTES
const exemplo = 'antigo'

// DEPOIS  
const exemplo = 'novo'
```

### Mudanca 2: Outra Mudanca

- Item 1
- Item 2

## 🧪 Como Testar

### Pre-requisitos
- Lista de pre-requisitos

### Passos

1. Navegue para `Menu > Submenu`
2. Clique em `Botao`
3. ✅ **Verifique**: Resultado esperado
4. ✅ **Verifique**: Outro resultado

### Cenarios de Teste

| Cenario | Input | Esperado | Status |
|---------|-------|----------|--------|
| Caso 1 | valor | resultado | ✅ |
| Caso 2 | valor | resultado | ✅ |
| Edge case | valor | resultado | ✅ |

## 📸 Screenshots

### Antes
```
Descricao ou captura do estado anterior
```

### Depois
```
Descricao ou captura do estado atual
```

## 📁 Arquivos Modificados

```
src/caminho/arquivo1.ts
src/caminho/arquivo2.vue
```

**Estatisticas**:
- X arquivos modificados
- +Y linhas adicionadas
- -Z linhas removidas

## ✅ Checklist

### Codigo
- [ ] Codigo segue as diretrizes de estilo do projeto
- [ ] Review proprio realizado
- [ ] Codigo comentado em areas complexas
- [ ] Nenhum console.log esquecido
- [ ] Imports nao utilizados removidos

### Testes
- [ ] Testes unitarios passando
- [ ] Testes manuais realizados com sucesso
- [ ] Novos testes adicionados (se aplicavel)

### Qualidade
- [ ] Lint passado sem erros
- [ ] Type-check passado sem erros
- [ ] Sem warnings novos

### Documentacao
- [ ] Documentacao atualizada (se aplicavel)
- [ ] README atualizado (se aplicavel)
- [ ] CHANGELOG atualizado (se aplicavel)

### Validacoes Automatizadas
```bash
pnpm lint        # Biome check
pnpm type-check  # vue-tsc --noEmit
pnpm test        # Vitest
```

## 🚨 Breaking Changes

**Breaking changes**: Sim / Nao

Se sim, descreva:
- O que mudou
- Como migrar
- Impacto nos usuarios

## 📊 Impacto

### Beneficios
- ✅ Beneficio 1
- ✅ Beneficio 2

### Performance
- ⚡ Impacto em performance (se houver)

### Riscos
- ⚠️ Risco 1 (e mitigacao)
- ⚠️ Risco 2 (e mitigacao)

## 🔍 Review Guidelines

### Pontos de Atencao
1. Ponto 1 que merece atencao especial
2. Ponto 2 que precisa revisao cuidadosa

### Sugestoes de Review
- [ ] Verificar logica X
- [ ] Testar cenario Y
- [ ] Validar comportamento Z

## 📚 Referencias

- **Branch**: `nome-da-branch`
- **Base**: `develop` / `main`
- **Commits**: X
- **Arquivos relevantes**: 
  - `src/models/modelo.ts`
  - `src/types/tipos.ts`

---

## 💬 Notas Adicionais

Qualquer informacao adicional relevante para os reviewers.

---

## 📝 Poema

O poema criado deve ter relacao com todas as alteracoes.
```

## Versoes Simplificadas

### Bug Fix

```markdown
# 🐛 Fix: Descricao do Bug

## Descricao
Descricao do bug e da correcao.

## Issue
Fixes #XXX

## Mudancas
- Correcao aplicada

## Teste
1. Reproduzir bug original
2. Verificar que foi corrigido

## Checklist
- [ ] Lint OK
- [ ] Type-check OK
- [ ] Testes passando
```

### Feature Pequena

```markdown
# ✨ Feature: Descricao da Feature

## Descricao
Nova funcionalidade adicionada.

## Issue
Closes #XXX

## Mudancas
- Funcionalidade X
- Funcionalidade Y

## Teste
1. Acessar nova funcionalidade
2. Verificar comportamento

## Checklist
- [ ] Lint OK
- [ ] Type-check OK
- [ ] Testes passando
- [ ] Testes novos adicionados
```

## Preenchimento Automatico

### Titulo

O titulo deve seguir o padrao de commits:
- `🐛 Fix: ...`
- `✨ Feature: ...`
- `♻️ Refactor: ...`

### Issue

Use as palavras-chave para fechar automaticamente:
- `Fixes #123` - Bug fix
- `Closes #123` - Feature
- `Resolves #123` - Generico

### Checklist

Preencha baseado no tipo de mudanca:

| Tipo | Checklist Minimo |
|------|------------------|
| Bug fix | Lint, Type-check, Teste manual |
| Feature | Lint, Type-check, Testes novos |
| Refactor | Lint, Type-check, Todos testes |
| Docs | Review de conteudo |

## Exemplo Real

```markdown
# 🐛 Fix: Erro 500 ao Atualizar Telefones

## 📝 Descricao

Esta PR corrige o erro 500 que ocorria ao atualizar telefones de associados.

## 🎯 Tipo de Mudanca

- [x] 🐛 Bug fix

## 🔗 Issue Relacionada

Fixes #330

## 📋 Mudancas Realizadas

### Store de Telefones

```typescript
// ANTES
fetchItems: '/associados/telefones'

// DEPOIS  
fetchItems: '/associados/:id/telefones'
```

## 🧪 Como Testar

1. Navegue para `Cadastro > Associados`
2. Selecione um associado
3. Acesse a aba de Telefones
4. Clique em editar um telefone
5. ✅ **Verifique**: Lista atualiza sem erro 500

## 📁 Arquivos Modificados

```
src/stores/associados/telefone-associado-store.ts
```

## ✅ Checklist

- [x] Lint OK
- [x] Type-check OK
- [x] Teste manual OK
```
