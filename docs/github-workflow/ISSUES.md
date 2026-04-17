# Padrao de Issues GitHub

Este documento define o padrao para criacao e manutencao de issues no projeto.

## Templates de Issue

### Bug Report

```markdown
## 🐛 Descricao do Bug
Uma descricao clara e concisa do que esta acontecendo.

## 📍 Localizacao
- **Modulo**: [ex: Cadastro > Associados]
- **Rota**: [ex: /cadastro/associados]
- **Arquivo(s)**: [ex: src/views/cadastro/AssociadosView.vue]

## 🔄 Passos para Reproduzir
1. Va para '...'
2. Clique em '...'
3. Role ate '...'
4. Veja o erro

## ✅ Comportamento Esperado
Uma descricao clara do que deveria acontecer.

## ❌ Comportamento Atual
Uma descricao do que esta acontecendo atualmente.

## 📸 Screenshots
Se aplicavel, adicione screenshots que ilustrem o problema.

## 🔍 Logs e Erros
```
Cole aqui logs relevantes ou mensagens de erro do console
```

## 🌐 Ambiente
- **Navegador**: [ex: Chrome 120]
- **OS**: [ex: Windows 11]
- **Versao do Sistema**: [ex: v1.2.0]

## 📋 Contexto Adicional
Qualquer outra informacao relevante sobre o problema.

## 🔗 Relacionamentos
- Relacionado a #
- Bloqueado por #
- Bloqueia #
```

### Feature Request

```markdown
## ✨ Descricao da Feature
Uma descricao clara e concisa da funcionalidade desejada.

## 🎯 Problema que Resolve
Descricao do problema ou necessidade que esta feature endereca.

## 💡 Solucao Proposta
Descricao detalhada da solucao proposta.

## 📋 Requisitos
- [ ] Requisito funcional 1
- [ ] Requisito funcional 2
- [ ] Requisito nao funcional 1

## 🔄 Fluxo de Usuario
1. Usuario acessa...
2. Usuario clica em...
3. Sistema exibe...

## 🎨 Mockups/Wireframes
Se aplicavel, inclua mockups ou wireframes.

## 🔧 Alternativas Consideradas
Descricao de alternativas que foram consideradas.

## 📊 Impacto
- **Usuarios afetados**: [ex: todos, admins, clientes]
- **Modulos afetados**: [ex: cadastro, relatorios]
- **Breaking changes**: [Sim/Nao - explicar]

## 🔗 Relacionamentos
- Relacionado a #
- Depende de #
```

### Improvement

```markdown
## 🔄 Situacao Atual
Descricao do estado atual do codigo/funcionalidade.

## 🎯 Melhoria Proposta
Descricao clara da melhoria sugerida.

## 📋 Beneficios
- Beneficio 1
- Beneficio 2

## 📊 Metricas de Sucesso
Como medir se a melhoria foi bem sucedida.

## 🔧 Implementacao
Ideias de como implementar a melhoria.

## 📎 Referencias
- Link para documentacao
- Link para codigo relevante
```

### Tech Debt

```markdown
## 🏗️ Area Afetada
[ex: Authentication, State Management, API Layer]

## 📋 Descricao do Debito
Descricao clara do debito tecnico identificado.

## 🎯 Impacto Atual
Como este debito esta afetando o desenvolvimento:

- **Velocidade**: [ex: tornou desenvolvimento mais lento]
- **Manutenibilidade**: [ex: codigo dificil de manter]
- **Performance**: [ex: impacto na performance]
- **Testabilidade**: [ex: dificil de testar]

## 🔧 Solucao Proposta
Passos para resolver o debito tecnico.

## 📅 Prazo Sugerido
[ex: Proxima sprint, Q2, quando conveniente]

## 🔗 Referencias
- Arquivos: [lista de arquivos afetados]
- PRs relacionados: #
- Issues relacionados: #
```

## Regras de Nomeacao

### Titulo

Formato: `[TIPO] Descricao concisa`

| Tipo | Prefixo | Exemplo |
|------|---------|---------|
| Bug | `[BUG]` | `[BUG] Erro ao salvar telefone` |
| Feature | `[FEAT]` | `[FEAT] Adicionar filtro por data` |
| Improvement | `[IMPROVE]` | `[IMPROVE] Otimizar listagem` |
| Documentation | `[DOCS]` | `[DOCS] Atualizar README` |
| Tech Debt | `[DEBT]` | `[DEBT] Refatorar auth store` |

### Boas Praticas

**Titulos bons:**
- `[BUG] Erro 500 ao atualizar telefone de associado`
- `[FEAT] Adicionar exportacao CSV na listagem de clientes`
- `[IMPROVE] Reduzir tempo de carregamento do dashboard`

**Titulos ruins:**
- `Erro` (muito vago)
- `Arrumar coisa la` (nao especifico)
- `FEATURE: adicionar nova funcionalidade bem legal que faz tal coisa` (muito longo)

## Campos Obrigatorios

Toda issue DEVE conter:

1. **Titulo descritivo** com prefixo de tipo
2. **Descricao clara** do problema ou feature
3. **Labels apropriadas** (ver `LABELS.md`)
4. **Assignee** se ja conhecido
5. **Milestone** se aplicavel

## Workflow de Issues

```
Nova Issue
    │
    ▼
┌─────────────────────────────────────────┐
│           TRIAGEM                        │
│  - Verificar duplicatas                  │
│  - Adicionar labels                      │
│  - Atribuir prioridade                   │
│  - Atribuir milestone                    │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│           BACKLOG                        │
│  Issues priorizadas aguardando sprint    │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│           EM DESENVOLVIMENTO             │
│  - Atribuir a desenvolvedor             │
│  - Criar branch                         │
│  - Linkar issue no commit               │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│           EM REVISAO                     │
│  - PR criado e linkado                  │
│  - Aguardando code review               │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│           FECHADA                        │
│  - PR merged                            │
│  - Issue fechada automaticamente        │
└─────────────────────────────────────────┘
```

## Linkando Issues

### Em Commits

```bash
# Fecha issue ao fazer merge
git commit -m ":bug: fix: corrige erro ao salvar telefone (fixes #330)"

# Relaciona sem fechar
git commit -m ":sparkles: feat: adiciona filtro (refs #330)"
```

### Em PRs

```markdown
Fixes #330
Refs #331, #332
```

### Palavras-chave

| Palavra | Acao |
|---------|------|
| `fixes #N` | Fecha issue ao mergear |
| `closes #N` | Fecha issue ao mergear |
| `resolves #N` | Fecha issue ao mergear |
| `refs #N` | Apenas referencia |
| `related to #N` | Apenas referencia |

## Comandos GitHub CLI

```bash
# Criar issue
gh issue create --title "[BUG] Erro ao salvar" --body-file bug.md

# Listar issues abertas
gh issue list --state open

# Ver issue especifica
gh issue view 330

# Adicionar label
gh issue edit 330 --add-label "bug,priority:high"

# Atribuir a alguem
gh issue edit 330 --add-assignee "@me"

# Adicionar a milestone
gh issue edit 330 --milestone "Sprint 5"

# Fechar issue
gh issue close 330

# Reabrir issue
gh issue reopen 330
```

## Checklist de Issue Bem Formada

- [ ] Titulo com prefixo de tipo
- [ ] Descricao clara e completa
- [ ] Passos para reproduzir (se bug)
- [ ] Comportamento esperado
- [ ] Labels apropriadas
- [ ] Milestone atribuida
- [ ] Sem duplicatas
- [ ] Screenshots/anexos se aplicavel
