# PULL_REQUEST_TEMPLATE - Template para Pull Requests

## Tipo de Mudanca

- [ ] 🐛 Bug fix
- [ ] ✨ Nova feature
- [ ] ♻️ Refactor
- [ ] 📝 Documentacao
- [ ] 🔧 Chore
- [ ] ⚡ Performance

---

## Issue Relacionada

Fixes #[numero]

---

## 📋 Mudancas Realizadas

### Antes

```
[Descreva o estado anterior ou cole snippet relevante]
```

### Depois

```
[Descreva o estado atual ou cole snippet relevante]
```

---

## 🧪 Como Testar

1. [Passo 1]
2. [Passo 2]
3. [Passo 3]
4. Verificar que [resultado esperado]

---

## 📸 Screenshots

### Antes
![antes](url-ou-descrição)

### Depois
![depois](url-ou-descrição)

---

## 📁 Arquivos Modificados

| Arquivo | + Insercoes | - Remocoes | Detalhe |
| ------- | ----------- | ---------- | ------- |
| `src/components/X.tsx` | +10 | -5 | [O que mudou] |
| `src/styles/globals.css` | +20 | -3 | [O que mudou] |

---

## ✅ Checklist

- [ ] ESLint passa (`pnpm run lint`)
- [ ] TypeScript compila (`npx tsc --noEmit`)
- [ ] Sem cores hardcoded (usar tokens semanticos)
- [ ] Sem `any` ou `@ts-ignore`
- [ ] Commits seguem COMMIT-PATTERN.md
- [ ] Branch segue padrao ISSUE_TO_PR_WORKFLOW.md
- [ ] Spec (issue) atualizada se necessario

### Validacoes Automatizadas

- [ ] Build passa
- [ ] Sem novos warnings ESLint
- [ ] Sem erros TypeScript

---

## ⚠️ Breaking Changes

- [ ] Nao ha breaking changes
- [ ] Ha breaking changes (descrever abaixo)

```
[Descrever breaking changes, se houver]
```

---

## 🚀 Impacto

- **Performance:** [Melhorou/Piorou/Sem mudanca]
- **Bundle size:** [Aumentou/Diminuiu/Sem mudanca]
- **Acessibilidade:** [Melhorou/Piorou/Sem mudanca]

---

## 📚 Referencias

- [Link para documentacao relevante]
- [Link para issue/spec]
- [Link para referencias externas]

---

## 📝 Notas Adicionais

[Qualquer informacao adicional relevante para o review]

---

_Este template entra em vigor a partir da data de criacao._
