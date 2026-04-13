# PULL_REQUEST_FIX - Instrucoes para Correcao de PRs

## Objetivo

Corrigir erros identificados em code review de forma sequencial e rastreavel.

---

## Processo

### 1. Listar Erros
Extrair todos os problemas do review no formato:
```
- [ ] Problema: ... Arquivo: ... Linha: ... Sugestao: ...
```

### 2. Corrigir Individualmente
Cada erro deve ser corrigido **individualmente** em ordem:

```bash
# Correcao 1
git add arquivo1.tsx
git commit -m ":bug: fix(component): corrigir problema X no componente Y"

# Correcao 2
git add arquivo2.tsx
git commit -m ":rotating_light: fix(styles): ajustar contraste do texto"

# Correcao 3
git add arquivo3.tsx
git commit -m ":recycle: refactor: extrair logica para hook reutilizavel"
```

### 3. Verificacao de Seguranca
**Antes de cada commit**, verificar:
- Sem caracteres Unicode invisiveis
- Codigo compila (`npx tsc --noEmit`)

### 4. Validar Apos Cada Correcao
- [ ] Compilacao passa
- [ ] Sem novos erros introduzidos
- [ ] Comportamento original preservado
- [ ] ESLint passa

---

## Diretrizes de Qualidade

### Clean Code
- Funcoes pequenas e focadas
- Nomes descritivos
- Early returns

### TypeScript
- Tipagem correta
- Sem `any`
- Sem `@ts-ignore`

### Imports
- Remover imports nao usados
- Ordenar imports
- Usar `import type` para tipos

### Evitar Duplicacao
- Extrair codigo repetido para funcoes/hooks
- Reutilizar componentes existentes

---

## Padrao de Commit

Seguir COMMIT-PATTERN.md:
```
:emoji: fix(escopo): descricao da correcao
```

---

## Finalizacao

Apos todas as correcoes:

```bash
git push origin feature/nome-da-branch
```

Notificar reviewer:
> Todas as correcoes foram aplicadas. PR pronto para re-review.

---

_Este processo entra em vigor a partir da data de criacao._
