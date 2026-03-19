# Documentacao de Workflow GitHub

Esta pasta contem a documentacao completa para gerenciamento do projeto via GitHub, incluindo issues, pull requests, labels, tags e qualidade de codigo.

## Estrutura

```
docs/github-workflow/
├── README.md                    # Este arquivo
├── GERENCIADOR.md              # Workflow principal de gerenciamento
├── workflow-state.md           # Documentacao do estado do workflow
├── workflow-state-schema.ts    # Schema TypeScript do estado
├── LABELS.md                   # Sistema de labels GitHub
├── ISSUES.md                   # Padroes de issues
├── TAGS.md                     # Versionamento e tags
├── PULL_REQUEST_TEMPLATE.md    # Template de PR
├── PULL_REQUEST_REVIEW.md      # Guia de code review
├── PULL_REQUEST_FIX.md         # Guia de correcoes
├── COMMIT-PATTERN.md           # Padrao de commits
└── CODE_QUALITY.md             # Padroes de qualidade
```

## Guia Rapido

### Para Desenvolvedores

1. **Criar Issue**: Siga `ISSUES.md`
2. **Labels**: Consulte `LABELS.md`
3. **Commits**: Use `COMMIT-PATTERN.md`
4. **Abrir PR**: Use `PULL_REQUEST_TEMPLATE.md`

### Para Reviewers

1. **Review**: Siga `PULL_REQUEST_REVIEW.md`
2. **Correcoes**: Consulte `PULL_REQUEST_FIX.md`

### Para Automacao

1. **Workflow**: Execute `GERENCIADOR.md`
2. **Estado**: Use `workflow-state-schema.ts`
3. **Tags**: Siga `TAGS.md`

## Arquivos Principais

| Arquivo | Uso |
|---------|-----|
| `GERENCIADOR.md` | Workflow de automacao |
| `LABELS.md` | Referencia de labels |
| `ISSUES.md` | Templates de issue |
| `COMMIT-PATTERN.md` | Padrao de commits |
| `CODE_QUALITY.md` | Padroes de codigo |

## Workflows GitHub

O projeto utiliza GitHub Actions para CI/CD:

- `.github/workflows/ci.yml` - CI principal
- `.github/workflows/deploy.yml` - Deploy automatico
- `.github/workflows/sonarqube.yml` - Analise de qualidade

## Comandos Uteis

### GitHub CLI

```bash
# Issues
gh issue list --state open
gh issue create --title "[BUG] Titulo" --body-file template.md
gh issue view 330

# PRs
gh pr list --state open
gh pr create --title "Titulo" --body-file template.md
gh pr view 330
gh pr review 330 --approve

# Labels
gh label list
gh issue edit 330 --add-label "bug,priority:high"

# Releases
gh release create v1.0.0 --title "v1.0.0" --notes-file CHANGELOG.md
```

### Git

```bash
# Tags
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Commits
git commit -m ":bug: fix(BRANCH_REF): descricao"
```

## Referencias Externas

- [Gitmoji](https://gitmoji.dev/) - Emojis para commits
- [Conventional Commits](https://www.conventionalcommits.org/) - Especificacao de commits
- [Semantic Versioning](https://semver.org/) - Versionamento semantico
- [Keep a Changelog](https://keepachangelog.com/) - Formato de changelog

## Contato

Para duvidas sobre este workflow, consulte a documentacao ou abra uma issue com a label `documentation`.
