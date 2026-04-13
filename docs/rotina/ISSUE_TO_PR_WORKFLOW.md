# ISSUE_TO_PR_WORKFLOW - Fluxo de Issue para PR

## Pre-Checagens

1. Confirmar que a issue nao tem PR vinculado
2. Confirmar que a branch `develop` esta atualizada
3. Confirmar que o escopo da issue esta bem definido

---

## Fase de Plano SDD

### 1. Validar a Spec
- Ler a issue completamente
- Verificar se segue ISSUE_TEMPLATE.md
- Confirmar que nao viola CONSTITUICAO.md

### 2. Decompor em Tasks Atomicas
- Listar cada mudanca como task individual
- Identificar arquivos afetados
- Estimar complexidade (baixa/media/alta)

### 3. Definir Ordem de Execucao
- Dependencias primeiro
- Fundacao antes de detalhes (ex: CSS variables antes de componentes)

---

## Padrao de Branch

```
type_numeroDaIssue_descricao-curta
```

Exemplos:
```
feature_20_adicionar-autenticacao
fix_25_corrigir-validacao-checkout
refactor_30_padronizar-componentes
```

---

## Fluxo de Execucao

### 1. Criar Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature_20_adicionar-autenticacao
```

### 2. Implementar
- Seguir a spec exatamente
- Usar tokens semanticos de cor (nunca hardcoded)
- Commits atomicos seguindo COMMIT-PATTERN.md

### 3. Validar Localmente
```bash
pnpm run lint        # ESLint deve passar
npx tsc --noEmit     # TypeScript deve compilar
pnpm run dev         # Testar manualmente
```

### 4. Commits
```bash
git add -A
git commit -m ":sparkles: feat(auth): adicionar autenticacao de usuarios"
```

### 5. Push
```bash
git push origin feature_20_adicionar-autenticacao
```

### 6. Criar PR
```bash
gh pr create \
  --base develop \
  --head feature_20_adicionar-autenticacao \
  --title "feat: Adicionar Autenticacao" \
  --body-file PULL_REQUEST_TEMPLATE.md
```

---

## Template Minimo de PR

```markdown
## 📋 Contexto

Resolve #[numero-da-issue]

## 🎯 Mudancas

- [x] Mudanca 1
- [x] Mudanca 2
- [x] Mudanca 3

## 🧪 Como Testar

1. [Passo 1]
2. [Passo 2]
3. Verificar que [resultado esperado]

## ⚠️ Riscos

- [Descrever riscos conhecidos, se houver]

## 🔄 Rollback

[Descrever como reverter, se necessario]

## ✅ Checklist

- [ ] ESLint passa (`pnpm run lint`)
- [ ] TypeScript compila (`npx tsc --noEmit`)
- [ ] Testes manuais passaram
```

---

## Checklist de Code Review

- [ ] Codigo segue CONSTITUICAO.md
- [ ] Sem cores hardcoded (usar tokens semanticos)
- [ ] Sem `any` ou `@ts-ignore`
- [ ] Imports organizados
- [ ] Sem duplicacao de codigo
- [ ] ESLint e TypeScript passam
- [ ] Nomes de variaveis/funcoes sao claros
- [ ] Sem caracteres Unicode invisiveis

---

## Criterio de Pronto

- [x] Branch criada seguindo padrao
- [x] Correcao/feature implementada
- [x] PR aberto com descricao
- [x] PR revisado e aprovado
- [x] Spec (issue) atualizada se necessario
- [x] Merge feito

---

_Este workflow entra em vigor a partir da data de criacao._
