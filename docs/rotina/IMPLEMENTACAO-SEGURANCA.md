# 🔒 Implementação de Segurança contra Caracteres Invisíveis

## 📋 Resumo

Esta documentação descreve a implementação completa de proteção contra caracteres Unicode invisíveis ou maliciosos no projeto SGS_WEB.

---

## 🎯 Objetivo

Prevenir, detectar e remover automaticamente caracteres Unicode que podem ser usados para:
- Ofuscação de código
- Steganografia
- Homoglyph attacks
- Injection attacks
- Bypass de linting

---

## 📁 Arquivos Criados/Modificados

### Novos Arquivos

1. **`docs/rotina/SEGURANCA-CODIGO.md`**
   - Política completa de segurança de código
   - Definição de caracteres proibidos
   - Scripts de verificação e limpeza
   - Procedimentos de incidente

2. **`scripts/scan-invisible-chars.py`**
   - Script de varredura de caracteres proibidos
   - Detecta 6 faixas de caracteres perigosos
   - Retorna código de saída para CI/CD (0 = limpo, 1 = problemas)

3. **`scripts/clean-invisible-chars.py`**
   - Script de limpeza automática
   - Suporte a dry-run para visualização
   - Remove caracteres proibidos preservando código legítimo

### Arquivos Modificados

1. **`docs/rotina/GERENCIADOR.MD`**
   - Adicionada seção de segurança de código
   - Validação obrigatória antes de operações

2. **`docs/rotina/COMMIT-PATTERN.md`**
   - Validação de segurança antes de commits
   - Scripts de verificação obrigatórios

3. **`docs/rotina/ISSUE_TEMPLATE.md`**
   - Regras contra caracteres invisíveis
   - Validação de descrições de issues

4. **`docs/rotina/PULL_REQUEST_REVIEW.md`**
   - Verificação obrigatória em code reviews
   - Bloqueio de PRs com caracteres proibidos
   - Formato de comentário de segurança

5. **`docs/rotina/PULL_REQUEST_FIX.md`**
   - Validação antes de correções
   - Limpeza automática de caracteres

6. **`docs/rotina/WORKFLOW-EXECUTION-PROMPT.md`**
   - Segurança em todas as fases do workflow
   - Validação de Issues/PRs/Discord

7. **`README.md`**
   - Seção de segurança de código
   - Links para documentação completa

8. **`package.json`**
   - Scripts `security:scan` e `security:clean`

---

## 🚫 Caracteres Proibidos

| Faixa | Nome | Uso Malicioso |
|-------|------|---------------|
| U+FE00 a U+FE0F | Variation Selectors | Ofuscação, steganografia |
| U+E0100 a U+E01EF | Variation Selectors Supplement | Ofuscação avançada |
| U+200B a U+200F | Zero-Width Characters | Injeção de dados ocultos |
| U+202A a U+202E | Directional Formatting | Reordenação visual de código |
| U+E000 a U+F8FF | Private Use Area | Caracteres personalizados suspeitos |
| U+FFF0 a U+FFFF | Specials | Caracteres de controle |

---

## 🛠 Scripts de Segurança

### Scan de Segurança

```bash
# Scan completo
pnpm run security:scan

# Ou diretamente
python scripts/scan-invisible-chars.py

# Scan em diretório específico
python scripts/scan-invisible-chars.py src/
```

**Retorno:**
- `0`: Código limpo
- `1`: Caracteres proibidos detectados

### Limpeza Automática

```bash
# Dry run (apenas visualização)
pnpm run security:clean -- --dry-run

# Limpeza real
pnpm run security:clean

# Limpeza de diretório específico
python scripts/clean-invisible-chars.py src/
```

---

## 📊 Resultados da Limpeza

### Código-Fonte Limpo

| Diretório | Arquivos Afetados | Caracteres Removidos |
|-----------|------------------|---------------------|
| `src/` | 14 | 38 |
| `scripts/` | 4 | 14 |
| **Total** | **18** | **52** |

### Tipos de Caracteres Removidos

- **Variation Selector-16 (U+FE0F)**: 52 ocorrências
  - Usado legitimamente em emojis (⚠, 🚀, etc.)
  - Removido de código-fonte (permitido apenas em comentários/docs)

---

## 🔄 Integração com Workflow

### Pré-Commit (Obrigatório)

```bash
# 1. Scan de segurança
python scripts/scan-invisible-chars.py

# 2. Se detectar, limpar
python scripts/clean-invisible-chars.py

# 3. Validar limpeza
python scripts/scan-invisible-chars.py

# 4. Commit
git commit -m ":emoji: tipo(REF): descrição"
```

### CI/CD Pipeline

```yaml
# .github/workflows/security-scan.yml (sugestão)
jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      
      - name: Scan for invisible characters
        run: python scripts/scan-invisible-chars.py
        
      - name: Fail if invisible characters found
        run: test $(python scripts/scan-invisible-chars.py | wc -l) -eq 0
```

### Code Review

**Checklist obrigatório:**
- [ ] Scan de segurança executado
- [ ] Nenhum caractere proibido detectado
- [ ] Emojis legítimos apenas em comentários/docs
- [ ] Código-fonte completamente limpo

---

## 📚 Referências

### Documentação Completa

- **Política Geral**: `docs/rotina/SEGURANCA-CODIGO.md`
- **Commits**: `docs/rotina/COMMIT-PATTERN.md`
- **Issues**: `docs/rotina/ISSUE_TEMPLATE.md`
- **Code Review**: `docs/rotina/PULL_REQUEST_REVIEW.md`
- **Workflow**: `docs/rotina/GERENCIADOR.MD`

### Externas

- [Unicode Security Considerations](https://unicode.org/reports/tr36/)
- [CVE-2022-45430](https://nvd.nist.gov/vuln/detail/CVE-2022-45430) - Xcode backdoor
- [Homograph Attack](https://en.wikipedia.org/wiki/IDN_homograph_attack)

---

## 🎯 Próximos Passos

### Imediatos

- [ ] Configurar hook de pré-commit automático
- [ ] Adicionar workflow de CI/CD no GitHub Actions
- [ ] Treinar equipe sobre novos procedimentos

### Futuros

- [ ] Integrar com Biome/ESLint como regra nativa
- [ ] Criar extensão VS Code para detecção em tempo real
- [ ] Implementar scan automático em PRs via GitHub Actions
- [ ] Adicionar relatório de segurança mensal

---

## 📞 Suporte

Dúvidas sobre implementação:
- Consultar: `docs/rotina/SEGURANCA-CODIGO.md`
- Canal: #security-alerts
- Líder Técnico: @tech-lead

---

**Data de Implementação**: 2026-04-02
**Última Atualização**: 2026-04-02
**Próxima Revisão**: 2026-07-02
