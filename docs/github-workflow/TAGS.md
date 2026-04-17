# Versionamento e Tags

Este documento define o padrao de versionamento e criacao de tags do projeto.

## Versionamento Semantico

O projeto segue [Semantic Versioning 2.0.0](https://semver.org/).

### Formato

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
```

| Componente | Quando Incrementar | Exemplo |
|------------|-------------------|---------|
| **MAJOR** | Mudancas incompativeis na API | 1.0.0 → 2.0.0 |
| **MINOR** | Novas funcionalidades compativeis | 1.0.0 → 1.1.0 |
| **PATCH** | Correcoes de bugs compativeis | 1.0.0 → 1.0.1 |
| **PRERELEASE** | Versoes de teste | 1.0.0-alpha.1 |
| **BUILD** | Metadados de build | 1.0.0+build.123 |

### Regras

1. **MAJOR**: Quando houver breaking changes
2. **MINOR**: Quando adicionar funcionalidades mantendo compatibilidade
3. **PATCH**: Quando corrigir bugs mantendo compatibilidade
4. **Resetar**: Ao incrementar MAJOR ou MINOR, resetar componentes a direita

### Exemplos

```
v1.0.0  → Release inicial
v1.0.1  → Bug fix
v1.1.0  → Nova feature
v2.0.0  → Breaking change
v2.0.1  → Bug fix na v2
v2.1.0-alpha.1  → Pre-release
```

## Tipos de Tags

### Tags de Release

Formato: `vX.Y.Z`

```bash
v1.0.0   # Release estavel
v1.1.0   # Minor release
v2.0.0   # Major release
```

### Tags de Pre-release

Formato: `vX.Y.Z-TIPO.NUMERO`

```bash
v1.0.0-alpha.1   # Alpha (funcionalidades incompletas)
v1.0.0-beta.1    # Beta (funcionalidades completas, testes finais)
v1.0.0-rc.1      # Release Candidate (pronto para producao)
```

### Tags de Build

Formato: `vX.Y.Z+build.NUMERO`

```bash
v1.0.0+build.123
v1.0.1+build.124
```

## Branches e Tags

### Mapeamento

| Branch | Tags | Descricao |
|--------|------|-----------|
| `main`/`master` | `vX.Y.Z` | Producao |
| `develop` | - | Desenvolvimento |
| `release/X.Y.Z` | `vX.Y.Z-rc.N` | Preparacao de release |
| `feature/*` | - | Features |
| `hotfix/*` | `vX.Y.Z` | Correcoes urgentes |

### Workflow de Release

```
develop ────────> release/1.2.0 ────────> main
   │                   │                    │
   │                   │                    │
   │              v1.2.0-rc.1          v1.2.0
   │                   │                    │
   │                   ▼                    ▼
   │            Testes finais           Producao
   │
   └──> feature/nova-funcionalidade
```

## Criacao de Tags

### Annotated Tags (Recomendado)

```bash
# Criar tag annotada
git tag -a v1.0.0 -m "Release v1.0.0: Primeira versao estavel"

# Push da tag
git push origin v1.0.0
```

### Lightweight Tags

```bash
# Criar tag leve (nao recomendado para releases)
git tag v1.0.0-beta.1

# Push
git push origin v1.0.0-beta.1
```

### Usando GitHub CLI

```bash
# Criar release com tag
gh release create v1.0.0 \
  --title "v1.0.0 - Primeira Versao" \
  --notes-file CHANGELOG.md \
  --target main

# Criar pre-release
gh release create v1.0.0-rc.1 \
  --title "v1.0.0 RC1" \
  --notes "Release candidate 1" \
  --prerelease
```

## Changelog

### Formato

O changelog segue [Keep a Changelog](https://keepachangelog.com/).

```markdown
# Changelog

## [1.2.0] - 2026-03-18

### Added
- Filtro de busca na listagem de associados
- Exportacao CSV de relatorios

### Changed
- Otimizado carregamento do dashboard

### Fixed
- Erro 500 ao atualizar telefones
- Problema de ordenacao na tabela

### Security
- Atualizada dependencia com vulnerabilidade

## [1.1.0] - 2026-03-10

### Added
- Novo modulo de relatorios

## [1.0.0] - 2026-03-01

### Added
- Release inicial do sistema
```

### Categorias

| Categoria | Uso |
|-----------|-----|
| `Added` | Novas funcionalidades |
| `Changed` | Mudancas em funcionalidades existentes |
| `Deprecated` | Funcionalidades a serem removidas |
| `Removed` | Funcionalidades removidas |
| `Fixed` | Correcoes de bugs |
| `Security` | Correcoes de seguranca |

## Automacao de Versao

### Script de Versionamento

```bash
#!/bin/bash
# scripts/version.sh

CURRENT_VERSION=$(git describe --tags --abbrev=0 2>/dev/null | sed 's/v//')
VERSION_TYPE=$1  # major, minor, patch

if [ -z "$CURRENT_VERSION" ]; then
  CURRENT_VERSION="0.0.0"
fi

# Incrementar versao
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

case $VERSION_TYPE in
  major)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  minor)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  patch)
    PATCH=$((PATCH + 1))
    ;;
  *)
    echo "Uso: $0 {major|minor|patch}"
    exit 1
    ;;
esac

NEW_VERSION="v$MAJOR.$MINOR.$PATCH"

echo "Nova versao: $NEW_VERSION"
```

### GitHub Actions

```yaml
# .github/workflows/release.yml
name: Create Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Generate Changelog
        id: changelog
        run: |
          # Gerar changelog automatico
          echo "changelog=$(git log --pretty=format:'- %s' $(git describe --tags --abbrev=0 HEAD^)..HEAD)" >> $GITHUB_OUTPUT
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          body: ${{ steps.changelog.outputs.changelog }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Comandos Uteis

```bash
# Listar todas as tags
git tag

# Listar tags ordenadas por versao
git tag -l "v*" --sort=-v:refname

# Ver detalhes de uma tag
git show v1.0.0

# Deletar tag local
git tag -d v1.0.0

# Deletar tag remota
git push origin --delete v1.0.0

# Checkout em uma tag especifica
git checkout v1.0.0

# Criar branch a partir de tag
git checkout -b fix/v1.0.1 v1.0.0

# Ver diferencas entre tags
git diff v1.0.0 v1.1.0

# Listar commits entre tags
git log v1.0.0..v1.1.0 --oneline
```

## Checklist de Release

### Pre-Release

- [ ] Todas as features planejadas implementadas
- [ ] Todos os bugs criticos corrigidos
- [ ] Testes passando
- [ ] Lint sem erros
- [ ] Type-check sem erros
- [ ] Changelog atualizado
- [ ] Versao atualizada no package.json
- [ ] Documentacao atualizada

### Criacao de Tag

- [ ] Branch main/master atualizada
- [ ] Tag annotada criada
- [ ] Tag enviada para remoto
- [ ] Release criado no GitHub
- [ ] Release notes incluidas
- [ ] Assets anexados (se aplicavel)

### Post-Release

- [ ] Deploy realizado
- [ ] Monitoramento ativo
- [ ] Comunicacao enviada
- [ ] Issues relacionadas fechadas
```

Agora vou criar os arquivos restantes em paralelo: