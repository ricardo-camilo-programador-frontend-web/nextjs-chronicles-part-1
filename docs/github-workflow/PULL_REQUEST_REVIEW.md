# Guia de Code Review

Este documento define o processo de revisao de pull requests.

## Objetivo

Identificar **erros, problemas de arquitetura, inconsistencias ou riscos tecnicos**.

## O que Revisar

### Codigo

- Bugs potenciais
- Logica incorreta
- Problemas de tipagem (TypeScript)
- Problemas de performance
- Problemas de seguranca
- Inconsistencias com padroes do projeto
- Codigo duplicado
- Imports nao utilizados
- Nomes pouco claros
- Violacoes de Clean Code / DRY
- Problemas de manutencao futura

### Testes

- Cobertura de testes adequada
- Testes significativos
- Edge cases cobertos
- Mocks apropriados

### Documentacao

- Comentarios necessarios
- JSDoc/TSDoc quando apropriado
- README atualizado se necessario

## Regras Importantes

1. Faca **apenas um comentario por problema encontrado**
2. **Nao repita comentarios para o mesmo problema**
3. Comentarios devem ser **claros, objetivos e acionaveis**
4. Caso nao haja problemas, informe que o PR esta aprovado
5. **Nao faca o merge** - deixe para revisao humana final

## Formato de Comentarios

### Template Padrao

```markdown
- [ ] Problema: descricao clara do erro encontrado

Arquivo: caminho/do/arquivo
Linha: numero aproximado da linha

Sugestao:
Explique como corrigir o problema ou proponha uma melhoria.
```

### Exemplo - Bug

```markdown
- [ ] Problema: variavel declarada mas nunca utilizada

Arquivo: src/components/UserList.vue
Linha: 42

Sugestao:
Remover a variavel `userCache`, pois ela nao e utilizada no fluxo atual.
```

### Exemplo - Performance

```markdown
- [ ] Problema: loop dentro de loop pode causar problema de performance

Arquivo: src/stores/associado-store.ts
Linha: 78

Sugestao:
Considere usar um Map para lookup O(1) em vez de array.find dentro do loop.

```typescript
// ANTES
for (const item of items) {
  const found = otherArray.find(x => x.id === item.id)
}

// DEPOIS
const lookup = new Map(otherArray.map(x => [x.id, x]))
for (const item of items) {
  const found = lookup.get(item.id)
}
```
```

### Exemplo - Tipo

```markdown
- [ ] Problema: uso de `any` perde seguranca de tipos

Arquivo: src/services/api.ts
Linha: 25

Sugestao:
Definir interface especifica para o retorno da API.

```typescript
// ANTES
const response: any = await fetch(url)

// DEPOIS
interface UserResponse {
  id: number
  name: string
  email: string
}
const response: UserResponse = await fetch(url)
```
```

### Exemplo - Seguranca

```markdown
- [ ] Problema: vulnerabilidade de XSS ao renderizar HTML nao sanitizado

Arquivo: src/components/RichText.vue
Linha: 15

Sugestao:
Usar `v-text` ou sanitizar o HTML antes de renderizar com `v-html`.

```vue
<!-- ANTES -->
<div v-html="userContent"></div>

<!-- DEPOIS -->
<div v-text="userContent"></div>
<!-- OU -->
<div v-html="sanitize(userContent)"></div>
```
```

## Severidade

Use prefixos para indicar severidade:

| Prefixo | Significado | Acao |
|---------|-------------|------|
| `[CRITICO]` | Bloqueia merge | Deve ser corrigido |
| `[IMPORTANTE]` | Deve ser corrigido | Correcao necessaria |
| `[SUGESTAO]` | Melhoria opcional | Considere implementar |
| `[PERGUNTA]` | Duvida | Precisa de clarificacao |

### Exemplos

```markdown
- [ ] [CRITICO] Problema: SQL injection vulnerability

Arquivo: src/services/database.ts
Linha: 42

Sugestao:
Usar prepared statements em vez de concatenacao de strings.
```

```markdown
- [ ] [SUGESTAO] Problema: funcao pode ser simplificada

Arquivo: src/utils/formatters.ts
Linha: 15

Sugestao:
Considere usar optional chaining para simplificar:

```typescript
// ANTES
if (user && user.profile && user.profile.name) {
  return user.profile.name
}

// DEPOIS
return user?.profile?.name
```
```

## Checklist de Review

### Antes de Comecar

- [ ] Entender o contexto da PR (ler descricao e issue)
- [ ] Verificar se CI passou
- [ ] Verificar conflitos

### Durante Review

- [ ] Revisar logica principal
- [ ] Verificar tratamento de erros
- [ ] Verificar edge cases
- [ ] Verificar tipos TypeScript
- [ ] Verificar performance
- [ ] Verificar seguranca
- [ ] Verificar testes
- [ ] Verificar documentacao

### Apos Review

- [ ] Resumir achados
- [ ] Indicar se aprovado ou precisa alteracoes
- [ ] Responder a comentarios do autor

## Estados de Review

### Approve

```markdown
## ✅ Aprovado

PR esta pronta para merge. Nenhum problema critico encontrado.

### Sugestoes (opcionais)
- Sugestao 1
- Sugestao 2
```

### Request Changes

```markdown
## ❌ Alteracoes Necessarias

### Criticos (bloqueiam merge)
- [ ] Problema critico 1
- [ ] Problema critico 2

### Importantes (devem ser corrigidos)
- [ ] Problema importante 1

### Sugestoes (opcionais)
- Sugestao 1
```

### Comment

```markdown
## 💬 Comentarios

PR em progresso. Alguns pontos para considerar:

### Duvidas
- [PERGUNTA] Duvida sobre X

### Sugestoes
- [SUGESTAO] Melhoria em Y
```

## Comandos GitHub CLI

```bash
# Criar review de aprovacao
gh pr review <number> --approve --body "LGTM!"

# Criar review solicitando mudancas
gh pr review <number> --request-changes --body "Precisa corrigir X"

# Criar comentario
gh pr review <number> --comment --body "Comentario geral"

# Adicionar comentario em linha especifica
gh api repos/{owner}/{repo}/pulls/{number}/comments \
  -f body="Comentario" \
  -f path="src/file.ts" \
  -f line=42 \
  -f side="RIGHT"
```

## Boas Praticas

### Seja Construtivo

**Ruim:**
> Isso esta errado

**Bom:**
> Isso pode causar problemas quando X. Sugiro fazer Y.

### Seja Especifico

**Ruim:**
> Melhorar performance

**Bom:**
> O loop O(n^2) na linha 42 pode causar lentidao com muitos itens. Considere usar Map.

### Explique o Por Que

**Ruim:**
> Use const em vez de let

**Bom:**
> Use const pois a variavel nao e reatribuida, isso ajuda a previnir bugs acidentais.

### Ofereca Alternativas

**Ruim:**
> Nao faca assim

**Bom:**
> Nao faca assim porque X. Uma alternativa seria Y:

```typescript
// codigo de exemplo
```
