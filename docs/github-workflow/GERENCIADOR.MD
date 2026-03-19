# Workflow de Gerenciamento GitHub

Execute sequencialmente a rotina a seguir ate completar todos os passos.

## Inicializacao

1. Leia o arquivo `dist/workflow/state.json`
2. Se nao existir, crie um estado inicial seguindo `workflow-state-schema.ts`
3. Consulte `workflow-state.md` para detalhes do formato

## Passo 1: GitHub Issues

### 1.1 Issues sem descricao
- Filtre apenas issues NAO processadas
- Adicione descricao seguindo `ISSUES.md`
- Marque a issue como processada

### 1.2 Issues sem labels
- Atualize as labels de acordo com `LABELS.md`
- Marque a issue como processada

### 1.3 Issues obsoletas
- Identifique issues abertas ha mais de 30 dias
- Adicione label `stale` se aplicavel

## Passo 2: Pull Requests

### 2.1 Pull Requests sem revisao
- Realize a revisao seguindo `PULL_REQUEST_REVIEW.md`
- Marque no estado

### 2.2 Pull Requests sem descricao
- Adicione template seguindo `PULL_REQUEST_TEMPLATE.md`

## Passo 3: Tags e Versionamento

### 3.1 Analise de merges
- Analise os ultimos merges para main
- Identifique mudancas que merecem release

### 3.2 Criacao de tags
- Atualize tags seguindo `TAGS.md`
- Gere changelog se aplicavel

## Passo 4: Qualidade de Codigo

### 4.1 Analise de code quality
- Execute analise seguindo `CODE_QUALITY.md`
- Crie issues de melhoria se aplicavel

## Finalizacao

1. Atualize `state.lastRun` com timestamp atual
2. Incremente `state.stats.totalRuns`
3. Execute `cleanupState(state)`
4. Salve em `dist/workflow/state.json`

## Arquivos de Referencia

| Arquivo | Proposito |
|---------|-----------|
| `workflow-state-schema.ts` | Schema do Estado |
| `LABELS.md` | Padrao de Labels |
| `ISSUES.md` | Padrao de Issues |
| `TAGS.md` | Versionamento |
| `COMMIT-PATTERN.md` | Padrao de Commits |
| `CODE_QUALITY.md` | Padroes de Qualidade |

## Comandos GitHub CLI

```bash
gh issue list --state open
gh pr list --state open
gh issue edit <number> --add-label "bug"
git tag -a v1.0.0 -m "Release v1.0.0"
gh release create v1.0.0 --title "v1.0.0"
```
