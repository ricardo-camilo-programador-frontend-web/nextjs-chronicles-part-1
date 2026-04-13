# VERSIONAMENTO - Regras de Versionamento Semantico

## SemVer 2.0.0

Formato: `MAJOR.MINOR.PATCH`

---

## Regras de Decisao

| Tipo de Mudanca | Impacto no Versao | Exemplo |
| --------------- | ----------------- | ------- |
| BREAKING CHANGE | MAJOR (X.0.0) | v1.0.0 → v2.0.0 |
| Nova feature (sem breaking) | MINOR (0.X.0) | v1.0.0 → v1.1.0 |
| Bug fix | PATCH (0.0.X) | v1.0.0 → v1.0.1 |

---

## Regras de Incremento

1. **MAJOR** zera MINOR e PATCH
   - `v1.5.3` → `v2.0.0`

2. **MINOR** zera PATCH
   - `v1.5.3` → `v1.6.0`

3. **PATCH** incrementa apenas PATCH
   - `v1.5.3` → `v1.5.4`

---

## Cenarios

### Branch Unica (develop)

Analisar commits desde a ultima tag:

```bash
git log v1.2.3..HEAD --oneline
```

- Se ha `BREAKING CHANGE` → MAJOR
- Se ha `feat:` → MINOR
- Se ha apenas `fix:` → PATCH

### Multiplas Branches

Apenas merges para `develop` geram novas tags.

---

## Tags

Tags **anotadas** sao obrigatorias:

```bash
git tag -a v1.2.3 -m "release: v1.2.3 - descricao resumida"
git push origin v1.2.3
```

---

## Release no GitHub

Criar release com changelog estruturado:

```markdown
# v1.2.3

## 🚀 Novos Recursos
- Feature A (#123)
- Feature B (#124)

## 🐛 Correcoes
- Fix X (#125)
- Fix Y (#126)

## ♻️ Refatoracoes
- Refactor Z (#127)

## ⚡ Performance
- Perf W (#128)

## ⚠️ Breaking Changes
- [Descrever, se houver]
```

---

## Regras Inteligentes

Ignorar commits que nao afetam funcionalidade:

| Tipo | Impacto |
| ---- | ------- |
| `chore` | Nenhum |
| `docs` | Nenhum |
| `style` | Nenhum (se apenas formatacao) |
| `refactor` | Nenhum (se sem mudanca funcional) |
| `test` | Nenhum |
| `ci` | Nenhum |

---

## Formato da Resposta da IA

Quando solicitada a determinar versao:

```markdown
## Versao Sugerida: v1.3.0

### Justificativa
- Commits `feat:` encontrados: 3
- Commits `fix:` encontrados: 5
- Nenhum BREAKING CHANGE detectado
- Decisao: MINOR (novas features sem breaking changes)

### Changelog
- ✨ feat(auth): adicionar autenticacao de usuarios
- ✨ feat(i18n): adicionar suporte a 3 novos idiomas
- ✨ feat(checkout): adicionar metodo de pagamento PIX
- 🐛 fix(checkout): corrigir validacao CPF
- ... (listar todos)
```

---

_Este documento entra em vigor a partir da data de criacao._
