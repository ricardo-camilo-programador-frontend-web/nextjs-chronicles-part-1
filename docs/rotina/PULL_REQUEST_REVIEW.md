# PULL_REQUEST_REVIEW - Guia de Code Review

## Objetivo

Realizar code review completo e consistente de todos os Pull Requests do projeto Breath Natural.

---

## Areas de Analise

### 1. Codigo Modificado
- Logica correta
- Tratamento de erros
- Edge cases

### 2. Novos Arquivos
- Necessidade real
- Nomenclatura correta
- Estrutura adequada

### 3. Arquivos Removidos
- Impacto em outros modulos
- Referencias atualizadas

### 4. Impacto Geral
- Performance
- Bundle size
- Acessibilidade
- SEO

---

## Foco do Review

### Bugs e Logica
- [ ] Logica implementada corretamente
- [ ] Edge cases tratados
- [ ] Sem race conditions
- [ ] Sem memory leaks

### Tipagem
- [ ] Zero `any`
- [ ] Zero `@ts-ignore`
- [ ] Tipos corretos e explicitos
- [ ] Generics quando aplicavel

### Performance
- [ ] Sem renders desnecessarios
- [ ] `useMemo`/`useCallback` quando necessario
- [ ] Lazy loading de componentes pesados
- [ ] Imagens otimizadas com `next/image`

### Seguranca
- [ ] Sem dados sensiveis expostos
- [ ] Validacao de inputs
- [ ] Sanitizacao de outputs
- [ ] **Caracteres Unicode invisiveis** (ver abaixo)

### Padroes
- [ ] Segue CONSTITUICAO.md
- [ ] Nomenclatura correta
- [ ] Estrutura de diretorios correta
- [ ] Imports organizados

### Duplicacao
- [ ] Sem codigo duplicado
- [ ] Components reutilizaveis quando aplicavel
- [ ] Hooks extraidos para logica compartilhada

---

## Verificacao de Seguranca - Caracteres Unicode

Caracteres **PROIBIDOS**:

| Faixa | Nome |
| ----- | ---- |
| `U+FE00` - `U+FE0F` | Variation Selectors |
| `U+E0100` - `U+E01EF` | Variation Selectors Supplement |
| `U+200B` - `U+200F` | Zero Width Spaces |
| `U+202A` - `U+202E` | Directional Formatting |

Se encontrado, bloquear o PR com o seguinte formato:

```
🚨 BLOQUEADO - Caracteres Unicode Invisiveis Detectados

Arquivo: src/components/X.tsx
Linha: 42
Caracter: U+FE0F (Variation Selector-16)

Acao: Executar ferramenta de limpeza e refazer o commit.
```

---

## Formato de Comentarios

Cada problema deve ser reportado no formato:

```
- [ ] Problema: [descrever o problema]
  Arquivo: `src/caminho/arquivo.tsx`
  Linha: 42
  Sugestao: [sugerir correcao]
```

**Regra:** Apenas um comentario por problema. Nao repetir.

---

## Criterios de Aprovacao

Um PR pode ser aprovado quando:

1. ✅ Todos os problemas foram corrigidos
2. ✅ ESLint passa sem erros
3. ✅ TypeScript compila sem erros
4. ✅ Spec (issue) atendida
5. ✅ CONSTITUICAO.md respeitada

---

_Este guia entra em vigor a partir da data de criacao._
