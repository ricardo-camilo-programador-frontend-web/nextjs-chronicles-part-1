# ISSUE_TEMPLATE - Template para Issues como Specs Vivas

## Classificacao SDD

| Tipo     | Quando usar                              | Exemplo                                    |
| -------- | ---------------------------------------- | ------------------------------------------ |
| Completa | Feature nova, 3+ arquivos, 1+ modulo     | Adicionar checkout, i18n, autenticao         |
| Lite     | Bug non-trivial, 1-3 arquivos            | Corrigir validacao, ajustar layout         |
| Direto   | Typo, hotfix, ajuste simples (1 arquivo) | Corrigir typo no README, ajustar cor       |

---

## Template

```markdown
## 📋 Descricao

[Descreva o problema ou feature de forma clara e objetiva]

## 🎯 Objetivos

- [ ] Objetivo 1
- [ ] Objetivo 2
- [ ] Objetivo 3

## 🔍 Analise Tecnica

### Problema Atual (se aplicavel)
[Descreva o comportamento atual ou problema]

### Comportamento Esperado
[Descreva o comportamento esperado apos a implementacao]

## 📁 Arquivos Afetados

| Arquivo | Tipo de Mudanca | Detalhe |
| ------- | --------------- | ------- |
| `src/components/X.tsx` | Criar/Modificar/Remover | [O que muda] |
| `src/styles/globals.css` | Modificar | [O que muda] |

## 📐 Implementacao Sugerida

[Descreva a abordagem tecnica sugerida, se aplicavel]

## ✅ Criterios de Aceitacao

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] ESLint passa sem erros (`pnpm run lint`)
- [ ] TypeScript compila sem erros (`npx tsc --noEmit`)

## 🏷️ Labels Sugeridas

- `type/feature` ou `type/bug` ou `type/refactor`
- `priority/high` ou `priority/medium` ou `priority/low`
- `area/ui-ux` ou `area/checkout` ou `area/i18n` ou `area/theme`

## 📸 Referencia Visual (se aplicavel)

[Links para designs, screenshots ou referencias]

## 📝 Notas Adicionais

[Qualquer informacao adicional relevante para a implementacao]
```

---

## Regras Obrigatorias

1. **SEMPRE** gerar descricoes detalhadas. NUNCA issues superficiais.
2. **SEMPRE** listar arquivos afetados com tipo de mudanca.
3. **SEMPRE** definir criterios de aceitacao claros.
4. **SEMPRE** verificar se a issue nao viola a CONSTITUICAO.md.
5. **YOLO mode**: Tomar decisoes automaticamente quando houver ambiguidade.

---

## Checklist de Validacao Final

- [ ] Issue segue o template acima
- [ ] Objetivos sao claros e mensuraveis
- [ ] Arquivos afetados estao listados
- [ ] Criterios de aceitacao estao definidos
- [ ] Labels sao apropriadas
- [ ] Issue nao viola a CONSTITUICAO.md
- [ ] Spec e implementavel (nao ambigua)
- [ ] Escopo e bem definido (nao muito grande)
- [ ] Referencias visuais incluidas (se aplicavel)
- [ ] Sem caracteres Unicode invisiveis no texto

---

_Este template entra em vigor a partir da data de criacao._
